# Meal Image Expiration Fix

## Problem (کێشەکە)
Firebase Storage signed URLs were expiring after 7 days, causing meal images to become unavailable after that period.

**کێشە:** لینکەکانی وێنەی خواردنەکان دوای ماوەیەک (٧ ڕۆژ) بەسەردەچوون و وێنەکان نیشان نەدەدران.

## Solution (چارەسەر)

### 1. Extended Expiration Time
Changed all Firebase Storage signed URLs from 7 days to **1 year expiration**:

- ✅ `/api/meal-images` - Meal images
- ✅ `/api/meal-videos` - Meal videos  
- ✅ `/api/workout-images` - Workout images
- ✅ `/api/workout-videos` - Workout videos
- ✅ `/api/videos` - Exercise videos

**Result:** New URLs will last 1 year instead of 7 days.

### 2. Auto-Refresh Feature
Created automatic URL refresh system:

**New API Endpoint:**
```
POST /api/refresh-meal-images
Body: { imageUrls: string[] }
Response: { refreshedUrls: string[] }
```

**Frontend Integration:**
- Meals page automatically checks and refreshes expired URLs when opening meal details
- Transparent to user - happens in background
- If refresh fails, original URL is kept (graceful degradation)

### 3. Bulk Update Script
Created `refresh-meal-image-urls.js` to update all existing meal programs in database:

**Usage:**
```bash
node refresh-meal-image-urls.js
```

**What it does:**
- Finds all nutrition programs in Firestore
- Extracts meal image URLs
- Generates fresh signed URLs (1 year expiration)
- Updates programs in database
- Handles both `weeklySchedule` and `meals` array formats

## Implementation Details

### Files Modified:
1. **`app/api/meal-images/route.ts`** - Extended expiration to 1 year
2. **`app/api/meal-videos/route.ts`** - Extended expiration to 1 year
3. **`app/api/workout-images/route.ts`** - Extended expiration to 1 year
4. **`app/api/workout-videos/route.ts`** - Extended expiration to 1 year
5. **`app/api/videos/route.ts`** - Extended expiration to 1 year
6. **`app/meals/page.tsx`** - Added auto-refresh logic

### Files Created:
1. **`app/api/refresh-meal-images/route.ts`** - URL refresh endpoint
2. **`refresh-meal-image-urls.js`** - Bulk update script

## How It Works

### When User Opens Meal Details:
```typescript
// 1. User clicks meal card
handleMealClick(meal)

// 2. Check if URL needs refresh (has signature parameter)
if (hasSignatureParameter(meal.imageUrl)) {
  
  // 3. Call refresh API
  const refreshed = await fetch('/api/refresh-meal-images', {
    body: JSON.stringify({ imageUrls: [meal.imageUrl] })
  })
  
  // 4. Update meal with fresh URL
  setSelectedMeal({ ...meal, imageUrl: refreshed })
}
```

### URL Refresh Process:
```typescript
// Extract file path from expired URL
// URL: https://storage.googleapis.com/.../meals/images/photo.jpg?X-Goog-Signature=...
// Path: meals/images/photo.jpg

// Generate new signed URL
const [newUrl] = await file.getSignedUrl({
  action: 'read',
  expires: Date.now() + 365 * 24 * 60 * 60 * 1000 // 1 year
})
```

## Running the Bulk Update

### Prerequisites:
Make sure environment variables are set:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_CLIENT_ID`
- `FIREBASE_CERT_URL`

### Execute:
```bash
# Refresh all existing meal image URLs in database
node refresh-meal-image-urls.js
```

### Expected Output:
```
🔄 Starting meal image URL refresh...
📊 Found 5 nutrition programs

📋 Processing program: Healthy Week Plan
  🖼️  Refreshing image for meal: Breakfast Oatmeal
    ✅ Updated
  🖼️  Refreshing image for meal: Grilled Chicken Salad
    ✅ Updated

✅ Program updated: Healthy Week Plan
...

✅ Refresh complete!
📊 Updated 5 programs
❌ Errors: 0

🎉 All done!
```

## Benefits

### For Users:
✅ Meal images never expire (1 year validity)
✅ Automatic refresh if URL expires
✅ No manual intervention needed
✅ Seamless experience

### For Admins:
✅ Bulk update script for existing data
✅ API endpoint for programmatic refresh
✅ Same solution for all media types (meals, workouts, exercises)

## Future Considerations

### Option 1: Public URLs (Most Permanent)
Make meal images publicly accessible:
```typescript
await file.makePublic()
const publicUrl = `https://storage.googleapis.com/${bucket}/${filePath}`
```
**Pros:** Never expires
**Cons:** Anyone with URL can access

### Option 2: Auto-Refresh Background Job
Create scheduled function to refresh URLs before expiration:
```typescript
// Cloud Function runs monthly
export const refreshExpiringSoon = functions.pubsub
  .schedule('0 0 1 * *') // 1st of each month
  .onRun(async () => {
    // Refresh URLs expiring in next 30 days
  })
```

### Current Solution (Best for Now):
1-year signed URLs + auto-refresh on-demand = Best balance of security and usability

## Testing

### Test Expired URL Refresh:
1. Find a meal with images in database
2. Manually set `imageUrl` to an old/expired signed URL
3. Open meal details page
4. Verify image loads (should auto-refresh)

### Test Bulk Script:
1. Run: `node refresh-meal-image-urls.js`
2. Check Firestore console
3. Verify `updatedAt` timestamp changed
4. Verify `imageUrl` fields have fresh signatures

---

**ئێستا وێنەکانی خواردن بەسەرناچن! Images now last 1 year and auto-refresh! 🎉**
