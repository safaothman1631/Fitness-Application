# Video System - Complete Guide

## چارەسەری کێشەی ڤیدیۆکان لە پڕۆگرامەکاندا

### کێشەکە
- ڤیدیۆکان لە Firebase Storage هەڵگیراون بەڵام لە workout page نیشان نادرێن
- URL ـەکان signed URLs ـن کە دوای 7 ڕۆژ بەسەر دەچن
- کێشەکانی Content Security Policy (CSP) ڕێگە لە کارکردنی ڤیدیۆکان دەگرن

### چارەسەرکراوەکان

#### 1. CSP Configuration (`next.config.mjs`)
```javascript
// Allow loading videos from any HTTPS source
"media-src * blob: data:",

// Allow connecting to Firebase Storage
"connect-src 'self' ... https://*.firebasestorage.app",
```

#### 2. API Enhancement (`/api/videos`)
```javascript
// New feature: Get specific video by name
GET /api/videos?name=180%20Jump%20Turns_Female%20(2).mp4

// Returns fresh signed URL (7 days expiry)
{
  "videos": [{
    "name": "180 Jump Turns_Female (2).mp4",
    "url": "https://storage.googleapis.com/...",
    "size": 1234567,
    "contentType": "video/mp4"
  }]
}
```

#### 3. URL Refresh Scripts

**Check Programs:**
```bash
node check-program-structure.js
```

**Fix Expired URLs:**
```bash
node fix-video-urls.js
```

**Show Full URLs:**
```bash
node show-video-urls.js
```

### Video Data Structure in Firestore

```javascript
{
  "weeklySchedule": {
    "monday": {
      "exercises": [{
        "name": "push ups",
        "sets": 3,
        "reps": "12",
        "videos": [{
          "name": "180 Jump Turns_Female (2).mp4",
          "url": "https://storage.googleapis.com/final-database-51935.firebasestorage.app/exercises/videos/ex_1763806631164_v6lmzytx3/180%20Jump%20Turns_Female%20%282%29.mp4?GoogleAccessId=...&Expires=1765299275&Signature=...",
          "sets": "3",
          "reps": "12",
          "notes": ""
        }],
        "videoUrls": ["https://storage.googleapis.com/..."],
        "videoUrl": "https://storage.googleapis.com/..."
      }]
    }
  }
}
```

### Video Storage Structure

```
Firebase Storage:
  exercises/
    videos/
      ex_1763806631164_v6lmzytx3/
        180 Jump Turns_Female (2).mp4
      ex_1763806637520_o7nk2wqp3/
        180 Jump Turns_Male (2).mp4
```

### Testing Videos

1. **Check if video exists in storage:**
```bash
node check-videos-in-storage.js
```

2. **Verify program structure:**
```bash
node check-program-structure.js
```

3. **View full URLs:**
```bash
node show-video-urls.js
```

4. **Test URL directly:**
- Copy URL from console
- Paste in browser
- If it loads, issue is with CSP or video element
- If it doesn't load, URL is expired

### Common Issues & Solutions

#### Issue 1: "Video Unavailable" Error
**Cause:** CSP blocking Firebase Storage
**Solution:** Update CSP in `next.config.mjs`:
```javascript
"media-src * blob: data:",
```

#### Issue 2: Expired URLs
**Cause:** Signed URLs expire after 7 days
**Solution:** Run refresh script:
```bash
node fix-video-urls.js
```

#### Issue 3: CORS Errors
**Cause:** Firebase Storage CORS not configured
**Solution:** Add CORS configuration to Firebase Storage bucket

#### Issue 4: Videos Not Loading on Initial Page Load
**Cause:** Lazy loading issues
**Solution:** Add `preload="metadata"` to video elements

### Best Practices

1. **URL Expiry:**
   - Signed URLs expire after 7 days
   - Regenerate URLs periodically
   - Consider generating URLs on-demand instead of storing them

2. **CSP Security:**
   - Use `media-src *` for development
   - Restrict to specific domains in production
   - Always include `blob:` and `data:` for inline videos

3. **Video Element:**
   ```javascript
   <video 
     src={video.url}
     controls
     preload="metadata"
     crossOrigin="anonymous"
     onError={handleError}
   />
   ```

4. **Error Handling:**
   - Log full video object for debugging
   - Show user-friendly error messages
   - Provide fallback UI when video fails

### Development Workflow

1. **Add videos to Firebase Storage:**
   - Upload to `exercises/videos/` folder
   - Use unique folder names (e.g., `ex_timestamp_randomid`)

2. **Assign videos in program:**
   - Select videos in program creation UI
   - Videos are stored with signed URLs

3. **View in workout page:**
   - URLs are used directly from Firestore
   - If expired, refresh using API

4. **Monitor & Refresh:**
   - Check program structure periodically
   - Refresh expired URLs before they expire
   - Consider implementing auto-refresh

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/videos` | GET | List all videos with pagination |
| `/api/videos?name={name}` | GET | Get specific video with fresh URL |
| `/api/programs` | GET | Get all programs |
| `/api/programs?userId={id}` | GET | Get user's programs |

### Video Loading Flow

```
1. User opens workout page
   ↓
2. Fetch programs from /api/programs?userId={userId}
   ↓
3. Extract exercises from weeklySchedule
   ↓
4. Get video URLs from exercise.videos[].url
   ↓
5. Render video elements with URLs
   ↓
6. If error: Log details & show fallback UI
```

### Monitoring & Debugging

**Console Logs to Watch:**
```
🔄 Refreshing URLs for X videos in exercise: {name}
✅ Refreshed URL for: {video.name}
⚠️ Could not refresh URL for: {video.name}
❌ Video load failed: {video.name}
   URL: {video.url}
   Video object: {full object}
```

**Browser DevTools:**
- Network tab: Check video request status (200, 403, 404)
- Console: Look for CSP violations
- Sources: Verify URL format in video element

### Production Considerations

1. **URL Refresh Strategy:**
   - Option A: Regenerate URLs on-demand (recommended)
   - Option B: Background job to refresh URLs periodically
   - Option C: Store video names and generate URLs when needed

2. **CDN/Caching:**
   - Consider using Firebase CDN for better performance
   - Cache signed URLs for shorter periods (1-2 days)

3. **Security:**
   - Restrict CSP to known domains in production
   - Implement rate limiting on video API
   - Verify user permissions before serving videos

4. **Performance:**
   - Use `preload="metadata"` for faster loading
   - Consider video transcoding for different resolutions
   - Implement lazy loading for multiple videos

---

**Last Updated:** January 2025
**Status:** CSP configured, API enhanced, scripts ready
**Next Steps:** Test with real users, monitor URL expiry
