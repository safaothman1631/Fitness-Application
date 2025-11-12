const fs = require('fs');

const code = `"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter()
    
    useEffect(() => {
        router.replace("/giris")
    }, [router])
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
            <div className="text-center">
                <div className="text-white text-lg animate-pulse mb-2">Redirecting to login...</div>
                <div className="text-gray-400 text-sm">Please wait...</div>
            </div>
        </div>
    )
}`;

fs.writeFileSync('./app/login/page.tsx', code, 'utf8');
console.log('✅ Login page created successfully!');
