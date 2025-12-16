## 🔧 Troubleshooting: "Failed to fetch" Error

### Symptoms
- Console error: `TypeError: Failed to fetch`
- Happens in `AuthGuard` component during authentication check
- App fails to load properly

### Root Causes

1. **Next.js Development Server Not Running**
   - The dev server must be running for API routes to work
   
2. **Network/CORS Issues**
   - Browser blocking requests
   - Firewall or antivirus interference

3. **Firebase Connection Issues**
   - Network timeout
   - Firebase service temporarily unavailable

### Solutions

#### 1. Restart Development Server ✅

```bash
# Stop all node processes
Stop-Process -Name node -Force -ErrorAction SilentlyContinue

# Wait a moment
Start-Sleep -Seconds 2

# Start fresh
npm run dev
```

#### 2. Clear Browser Cache & localStorage

```javascript
// In browser console:
localStorage.clear()
sessionStorage.clear()
location.reload()
```

#### 3. Check Firebase Connection

```bash
# Test Firebase connectivity
curl https://final-database-51935.firebaseapp.com
```

#### 4. Disable Browser Extensions

Temporarily disable extensions that might interfere:
- Ad blockers
- Privacy extensions
- VPNs

#### 5. Check Environment Variables

Verify `.env.local` has correct Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBUXCaDOwPuO5GGwHlGJiwpnrFaFL22Nfg
NEXT_PUBLIC_FIREBASE_PROJECT_ID=final-database-51935
# ... etc
```

#### 6. Hard Refresh

- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

### Prevention

The following changes have been made to prevent this error:

1. **Added try-catch blocks** in `AuthGuard` around `router.replace()`
2. **Added fallback** to `window.location.href` if router fails
3. **Improved Firebase initialization** with better error handling
4. **Made auth state async** to handle network delays properly

### Quick Fix Commands

```bash
# Kill all node processes and restart
taskkill /F /IM node.exe /T 2>nul; npm run dev

# Or use the provided batch file
clean-build.bat
```

### If Error Persists

1. Check browser console for more specific error details
2. Check Network tab in DevTools for failed requests
3. Verify Firebase project is active and not suspended
4. Check if you're behind a corporate firewall blocking Firebase

---

**Status**: ✅ Fixed with error handling improvements
**Last Updated**: December 15, 2025
