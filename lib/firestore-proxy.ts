/**
 * Firestore Proxy Client
 * Uses REST API through Vercel Edge proxy to bypass regional blocks
 */

interface FirestoreDocument {
  name?: string
  fields?: Record<string, any>
  createTime?: string
  updateTime?: string
}

interface ProxyOptions {
  useProxy?: boolean
}

class FirestoreProxy {
  private apiUrl = '/api/proxy/firestore'
  
  /**
   * Convert Firestore REST API format to simple object
   */
  private parseDocument(doc: FirestoreDocument): any {
    if (!doc.fields) return null
    
    const parsed: Record<string, any> = {}
    for (const [key, value] of Object.entries(doc.fields)) {
      if ('stringValue' in value) parsed[key] = value.stringValue
      else if ('integerValue' in value) parsed[key] = parseInt(value.integerValue)
      else if ('doubleValue' in value) parsed[key] = value.doubleValue
      else if ('booleanValue' in value) parsed[key] = value.booleanValue
      else if ('timestampValue' in value) parsed[key] = value.timestampValue
      else if ('nullValue' in value) parsed[key] = null
      else if ('arrayValue' in value) {
        parsed[key] = value.arrayValue.values?.map((v: any) => {
          if ('stringValue' in v) return v.stringValue
          if ('integerValue' in v) return parseInt(v.integerValue)
          return v
        }) || []
      }
      else if ('mapValue' in value) {
        parsed[key] = this.parseDocument({ fields: value.mapValue.fields })
      }
    }
    return parsed
  }

  /**
   * Convert simple object to Firestore REST API format
   */
  private toFirestoreFields(data: Record<string, any>): Record<string, any> {
    const fields: Record<string, any> = {}
    
    for (const [key, value] of Object.entries(data)) {
      if (value === null) {
        fields[key] = { nullValue: null }
      } else if (typeof value === 'string') {
        fields[key] = { stringValue: value }
      } else if (typeof value === 'number') {
        if (Number.isInteger(value)) {
          fields[key] = { integerValue: value.toString() }
        } else {
          fields[key] = { doubleValue: value }
        }
      } else if (typeof value === 'boolean') {
        fields[key] = { booleanValue: value }
      } else if (Array.isArray(value)) {
        fields[key] = {
          arrayValue: {
            values: value.map(v => {
              if (typeof v === 'string') return { stringValue: v }
              if (typeof v === 'number') return { integerValue: v.toString() }
              return { stringValue: String(v) }
            })
          }
        }
      } else if (value instanceof Date) {
        fields[key] = { timestampValue: value.toISOString() }
      } else if (typeof value === 'object') {
        fields[key] = { mapValue: { fields: this.toFirestoreFields(value) } }
      }
    }
    
    return fields
  }

  /**
   * Get a document
   */
  async getDoc(collection: string, docId: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.apiUrl}?collection=${collection}&docId=${docId}`,
        { method: 'GET' }
      )
      
      if (!response.ok) {
        throw new Error(`Failed to get document: ${response.statusText}`)
      }
      
      const doc = await response.json()
      return this.parseDocument(doc)
    } catch (error) {
      console.error('❌ Proxy getDoc error:', error)
      throw error
    }
  }

  /**
   * Get all documents in a collection
   */
  async getCollection(collection: string): Promise<any[]> {
    try {
      const response = await fetch(
        `${this.apiUrl}?collection=${collection}`,
        { method: 'GET' }
      )
      
      if (!response.ok) {
        throw new Error(`Failed to get collection: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      if (!data.documents) return []
      
      return data.documents.map((doc: FirestoreDocument) => ({
        id: doc.name?.split('/').pop(),
        ...this.parseDocument(doc)
      }))
    } catch (error) {
      console.error('❌ Proxy getCollection error:', error)
      throw error
    }
  }

  /**
   * Set/Update a document
   */
  async setDoc(collection: string, docId: string, data: Record<string, any>): Promise<void> {
    try {
      const fields = this.toFirestoreFields(data)
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collection,
          docId,
          method: 'PATCH',
          data: { fields }
        })
      })
      
      if (!response.ok) {
        throw new Error(`Failed to set document: ${response.statusText}`)
      }
    } catch (error) {
      console.error('❌ Proxy setDoc error:', error)
      throw error
    }
  }

  /**
   * Update specific fields in a document
   */
  async updateDoc(collection: string, docId: string, updates: Record<string, any>): Promise<void> {
    try {
      const fields = this.toFirestoreFields(updates)
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collection,
          docId,
          method: 'PATCH',
          data: { fields },
          updateMask: { fieldPaths: Object.keys(updates) }
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('❌ Update failed:', errorData)
        throw new Error(`Failed to update document: ${response.statusText}`)
      }
      
      console.log('✅ Document updated successfully')
    } catch (error) {
      console.error('❌ Proxy updateDoc error:', error)
      throw error
    }
  }
}

export const firestoreProxy = new FirestoreProxy()
