# Workout Schedule System - دەستێک بۆ بەکارهێنان

## تایبەتمەندیەکان

### بۆ بەکارهێنەرانی ئاسایی (Users)
✅ **بینینی schedule-ی هەفتانە**
- هەموو 7 رۆژی هەفتە دەبینن
- کلیک لەسەر هەر رۆژێک بۆ بینینی تەمرینەکانی ئەو رۆژە

✅ **زانیاریە تەواوەکانی تەمرین**
- ناوی تەمرین
- ژمارەی Set-ەکان
- ژمارەی Rep-ەکان
- کاتی تەمرین (duration)
- تێبینیەکان (notes)
- گروپی ماسولکە (muscle group)

✅ **میدیای تەمرین**
- ڤیدیۆ (Video URL) - نیشانەی Film 🎬
- GIF Animation - نیشانەی Play ▶️
- وێنە (Image) - نیشانەی ImageIcon 🖼️

✅ **سنووردارکردنەکان**
- ناتوانن تەمرین زیاد بکەن
- ناتوانن دەستکاری بکەن
- ناتوانن بسڕنەوە
- تەنها دەتوانن ببینن و بە لێبکەن

### بۆ Superadmin
🔒 **دەسەڵاتی تەواو**
- زیادکردنی تەمرینی نوێ
- دەستکاری کردن
- سڕینەوە
- گۆڕینی رێکخستنی هەفتە
- زیادکردنی میدیا (ڤیدیۆ/GIF/وێنە)

## چۆنیەتی بەکارهێنان

### 1. بینینی Schedule-ی هەفتانە
```
Workout Center → Schedule → WEEK
```
- هەموو 7 رۆژی هەفتە دەبینیت
- هەر رۆژێک ئایکۆنی خۆی هەیە (Dumbbell یان Calendar بۆ Rest Day)
- ژمارەی تەمرینەکان پیشان دەدرێت

### 2. بینینی تەمرینەکانی رۆژێک
```
کلیک لەسەر Monday/Tuesday/etc
```
Dialog-ێک دەکرێتەوە بە:
- لیستی هەموو تەمرینەکان
- Sets & Reps
- Muscle Group
- ئایکۆنی میدیاکان (ئەگەر هەبێت)

### 3. بینینی وردەکاری تەمرینێک
```
کلیک لەسەر هەر تەمرینێک
```
Dialog-ی تری دەکرێتەوە بە:
- Stats-ی تەواو (Sets, Reps, Duration, Target)
- بەشی میدیا (Video/GIF/Image)
- تێبینیە گرنگەکان

## Data Structure

```typescript
interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  duration?: string          // وەک "60 seconds"
  notes?: string            // تێبینیەکان
  videoUrl?: string         // لینکی ڤیدیۆ
  gifUrl?: string          // لینکی GIF
  imageUrl?: string        // لینکی وێنە
  muscleGroup: string      // Chest, Back, Legs, etc.
}

interface DayWorkout {
  day: string              // Monday, Tuesday, etc.
  exercises: Exercise[]
}
```

## Default Schedule

### Monday - Chest Day
- Barbell Bench Press (4×8-10)
- Incline Dumbbell Press (3×10-12)
- Cable Flyes (3×12-15)

### Tuesday - Back Day
- Deadlift (4×6-8)
- Pull-ups (3×8-10)
- Barbell Rows (4×8-10)

### Wednesday - Leg Day
- Squats (4×8-10)
- Leg Press (3×12-15)
- Leg Curls (3×12-15)

### Thursday - Shoulder Day
- Shoulder Press (4×8-10)
- Lateral Raises (3×12-15)
- Face Pulls (3×15-20)

### Friday - Arm Day
- Barbell Curl (3×10-12)
- Tricep Dips (3×10-12)
- Hammer Curls (3×12-15)

### Saturday - Core Day
- Plank (3× 60 seconds hold)
- Russian Twists (3×20 each side)
- Leg Raises (3×15-20)

### Sunday - Rest Day
- Active Recovery
- Light stretching, yoga, or walking

## Storage

### LocalStorage Keys
- `weeklyWorkoutSchedule` - تەواوی schedule-ی هەفتانە
- `workoutTasksCompleted` - تەمرینە تەواوکراوەکان

### دواتر (Firestore Integration)
```
Collection: weeklyWorkouts
Document: {userId}
Fields:
  - schedule: DayWorkout[]
  - updatedAt: timestamp
  - updatedBy: userId (superadmin)
```

## Features بۆ داهاتوو

🔄 **بەرنامەڕێژی**
- گۆڕینی رۆژانە بە ئۆتۆماتیک
- Notification بۆ تەمرینی رۆژ
- تۆمارکردنی مێژوو

📊 **ئاماری پێشکەوتن**
- کاتی تەواوکراو
- تەمرینە تەواوکراوەکان
- Streak tracking

🎥 **میدیای باشتر**
- پێشاندانی ڤیدیۆی ڕاستەوخۆ
- GIF animation لە dialog
- وێنەی پێگەی تەمرین

👥 **بۆ Superadmin**
- UI بۆ زیادکردنی تەمرین
- Form بۆ دەستکاری
- Upload بۆ میدیا
- Drag & drop بۆ رێکخستنەوە

## تێبینی گرنگ

⚠️ **ئێستا:**
- Data لە localStorage کۆدەکرێتەوە
- هەموو بەکارهێنەران هەمان schedule دەبینن

✅ **دواتر (Firestore):**
- هەر بەکارهێنەرێک schedule-ی تایبەتی خۆی
- Superadmin دەتوانێت بۆ هەموو کەسێک دابنێت
- Real-time updates
- Cloud backup

## چۆنیەتی گۆڕین بۆ Superadmin

دواتر admin panel زیاد دەکرێت لەگەڵ:
```
/superadmin/workouts → Manage Weekly Schedule
- ✏️ Edit Exercise
- ➕ Add New Exercise  
- 🗑️ Delete Exercise
- 📤 Upload Media
- 💾 Save Changes
```
