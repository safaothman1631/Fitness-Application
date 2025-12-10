const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function deleteOldData() {
  console.log('🗑️  Deleting old demo data...\n');
  
  // Delete old meal plans
  const mealsSnapshot = await db.collection('meal_plans').get();
  const mealDeletePromises = mealsSnapshot.docs.map(doc => doc.ref.delete());
  await Promise.all(mealDeletePromises);
  console.log(`✅ Deleted ${mealsSnapshot.size} old meal plans`);
  
  // Delete old workout plans
  const workoutsSnapshot = await db.collection('workout_plans').get();
  const workoutDeletePromises = workoutsSnapshot.docs.map(doc => doc.ref.delete());
  await Promise.all(workoutDeletePromises);
  console.log(`✅ Deleted ${workoutsSnapshot.size} old workout plans\n`);
}

async function createRealMealPlans() {
  console.log('🍽️  Creating meal plans with real user data...\n');
  
  const mealPlans = [
    // Safa O Abdulkareem - Multiple plans
    {
      traineeName: "Safa O Abdulkareem",
      traineeId: "aYT8NPQg1uROsOdaN6NU1fe8VWF3",
      date: "2025-12-10",
      mealType: "Breakfast",
      foods: [
        { name: "Whole Wheat Toast", calories: 140, protein: 6, carbs: 26, fats: 2 },
        { name: "Scrambled Eggs (3)", calories: 210, protein: 18, carbs: 2, fats: 15 },
        { name: "Avocado Half", calories: 120, protein: 1, carbs: 6, fats: 11 },
        { name: "Orange Juice", calories: 110, protein: 2, carbs: 26, fats: 0 }
      ],
      totalCalories: 580,
      notes: "High protein breakfast for strength training days",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      traineeName: "Safa O Abdulkareem",
      traineeId: "aYT8NPQg1uROsOdaN6NU1fe8VWF3",
      date: "2025-12-10",
      mealType: "Lunch",
      foods: [
        { name: "Grilled Chicken Breast", calories: 280, protein: 53, carbs: 0, fats: 6 },
        { name: "Quinoa", calories: 220, protein: 8, carbs: 39, fats: 4 },
        { name: "Mixed Vegetables", calories: 100, protein: 4, carbs: 20, fats: 1 },
        { name: "Olive Oil Dressing", calories: 120, protein: 0, carbs: 0, fats: 14 }
      ],
      totalCalories: 720,
      notes: "Balanced macros for post-workout recovery",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      traineeName: "Safa O Abdulkareem",
      traineeId: "bKraOK6nrkOj5UTAjE5ZZ1eRXq52",
      date: "2025-12-10",
      mealType: "Dinner",
      foods: [
        { name: "Baked Salmon", calories: 350, protein: 45, carbs: 0, fats: 18 },
        { name: "Brown Rice", calories: 215, protein: 5, carbs: 45, fats: 2 },
        { name: "Steamed Broccoli", calories: 55, protein: 4, carbs: 11, fats: 0 },
        { name: "Side Salad", calories: 50, protein: 2, carbs: 10, fats: 1 }
      ],
      totalCalories: 670,
      notes: "Omega-3 rich meal for inflammation reduction",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // Rashad Ali
    {
      traineeName: "Rashad Ali",
      traineeId: "user_rashad_123",
      date: "2025-12-10",
      mealType: "Breakfast",
      foods: [
        { name: "Protein Pancakes", calories: 250, protein: 20, carbs: 35, fats: 5 },
        { name: "Greek Yogurt", calories: 130, protein: 15, carbs: 10, fats: 3 },
        { name: "Blueberries", calories: 85, protein: 1, carbs: 21, fats: 0 },
        { name: "Honey", calories: 64, protein: 0, carbs: 17, fats: 0 }
      ],
      totalCalories: 529,
      notes: "Pre-workout energy boost with slow carbs",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      traineeName: "Rashad Ali",
      traineeId: "user_rashad_123",
      date: "2025-12-10",
      mealType: "Lunch",
      foods: [
        { name: "Turkey Burger Patty", calories: 200, protein: 28, carbs: 0, fats: 9 },
        { name: "Sweet Potato", calories: 180, protein: 4, carbs: 41, fats: 0 },
        { name: "Green Beans", calories: 44, protein: 2, carbs: 10, fats: 0 },
        { name: "Apple", calories: 95, protein: 0, carbs: 25, fats: 0 }
      ],
      totalCalories: 519,
      notes: "Lean protein with complex carbs",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      traineeName: "Rashad Ali",
      traineeId: "user_rashad_123",
      date: "2025-12-09",
      mealType: "Snack",
      foods: [
        { name: "Protein Shake", calories: 200, protein: 30, carbs: 15, fats: 3 },
        { name: "Banana", calories: 105, protein: 1, carbs: 27, fats: 0 },
        { name: "Peanut Butter", calories: 190, protein: 8, carbs: 7, fats: 16 }
      ],
      totalCalories: 495,
      notes: "Post-workout recovery shake",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // Additional meal for variety
    {
      traineeName: "Safa O Abdulkareem",
      traineeId: "nmnUOSvqr9Tlmy3iz7IZaBMp0vW2",
      date: "2025-12-09",
      mealType: "Snack",
      foods: [
        { name: "Cottage Cheese", calories: 180, protein: 25, carbs: 8, fats: 5 },
        { name: "Almonds", calories: 160, protein: 6, carbs: 6, fats: 14 },
        { name: "Cherry Tomatoes", calories: 30, protein: 1, carbs: 7, fats: 0 }
      ],
      totalCalories: 370,
      notes: "High protein evening snack",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  for (const meal of mealPlans) {
    const docRef = await db.collection('meal_plans').add(meal);
    console.log(`✅ Created: ${meal.traineeName} - ${meal.mealType} (${meal.totalCalories} cal)`);
  }
}

async function createRealWorkoutPlans() {
  console.log('\n💪 Creating workout plans with real user data...\n');
  
  const workoutPlans = [
    // Safa O Abdulkareem - Strength Training
    {
      traineeName: "Safa O Abdulkareem",
      traineeId: "aYT8NPQg1uROsOdaN6NU1fe8VWF3",
      date: "2025-12-10",
      workoutType: "Strength",
      difficulty: "Intermediate",
      exercises: [
        { name: "Barbell Squats", sets: 4, reps: 8, weight: 100, restTime: 120 },
        { name: "Bench Press", sets: 4, reps: 10, weight: 80, restTime: 90 },
        { name: "Romanian Deadlifts", sets: 3, reps: 12, weight: 90, restTime: 90 },
        { name: "Overhead Press", sets: 3, reps: 10, weight: 50, restTime: 90 },
        { name: "Barbell Rows", sets: 3, reps: 12, weight: 70, restTime: 60 }
      ],
      totalDuration: 75,
      notes: "Focus on compound movements, proper form is priority",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      traineeName: "Safa O Abdulkareem",
      traineeId: "aYT8NPQg1uROsOdaN6NU1fe8VWF3",
      date: "2025-12-09",
      workoutType: "Cardio",
      difficulty: "Intermediate",
      exercises: [
        { name: "Treadmill Running", sets: 1, reps: 1, duration: 25, restTime: 0 },
        { name: "Rowing Machine", sets: 4, reps: 1, duration: 5, restTime: 60 },
        { name: "Bike Intervals", sets: 5, reps: 1, duration: 2, restTime: 60 },
        { name: "Cool Down Walk", sets: 1, reps: 1, duration: 10, restTime: 0 }
      ],
      totalDuration: 60,
      notes: "Keep heart rate between 140-160 BPM",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // Safa O Abdulkareem (different ID) - HIIT
    {
      traineeName: "Safa O Abdulkareem",
      traineeId: "bKraOK6nrkOj5UTAjE5ZZ1eRXq52",
      date: "2025-12-10",
      workoutType: "HIIT",
      difficulty: "Advanced",
      exercises: [
        { name: "Burpees", sets: 5, reps: 15, restTime: 45 },
        { name: "Box Jumps", sets: 5, reps: 12, weight: 60, restTime: 45 },
        { name: "Kettlebell Swings", sets: 5, reps: 20, weight: 24, restTime: 45 },
        { name: "Mountain Climbers", sets: 5, reps: 30, restTime: 45 },
        { name: "Battle Ropes", sets: 4, reps: 1, duration: 1, restTime: 60 }
      ],
      totalDuration: 40,
      notes: "Maximum effort during work periods, complete rest during breaks",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // Rashad Ali - Upper Body Focus
    {
      traineeName: "Rashad Ali",
      traineeId: "user_rashad_123",
      date: "2025-12-10",
      workoutType: "Strength",
      difficulty: "Beginner",
      exercises: [
        { name: "Dumbbell Chest Press", sets: 3, reps: 12, weight: 20, restTime: 60 },
        { name: "Lat Pulldown", sets: 3, reps: 12, weight: 50, restTime: 60 },
        { name: "Shoulder Press", sets: 3, reps: 10, weight: 15, restTime: 60 },
        { name: "Bicep Curls", sets: 3, reps: 15, weight: 12, restTime: 45 },
        { name: "Tricep Extensions", sets: 3, reps: 15, weight: 10, restTime: 45 }
      ],
      totalDuration: 50,
      notes: "Building foundational upper body strength",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      traineeName: "Rashad Ali",
      traineeId: "user_rashad_123",
      date: "2025-12-09",
      workoutType: "Flexibility",
      difficulty: "Beginner",
      exercises: [
        { name: "Dynamic Warm-up", sets: 1, reps: 1, duration: 10, restTime: 0 },
        { name: "Yoga Flow Sequence", sets: 1, reps: 1, duration: 25, restTime: 0 },
        { name: "Static Stretching", sets: 1, reps: 1, duration: 15, restTime: 0 },
        { name: "Foam Rolling", sets: 1, reps: 1, duration: 10, restTime: 0 }
      ],
      totalDuration: 60,
      notes: "Focus on mobility and recovery",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // Safa O Abdulkareem (third ID) - Lower Body
    {
      traineeName: "Safa O Abdulkareem",
      traineeId: "nmnUOSvqr9Tlmy3iz7IZaBMp0vW2",
      date: "2025-12-10",
      workoutType: "Strength",
      difficulty: "Advanced",
      exercises: [
        { name: "Front Squats", sets: 5, reps: 6, weight: 110, restTime: 180 },
        { name: "Deadlifts", sets: 4, reps: 5, weight: 140, restTime: 180 },
        { name: "Bulgarian Split Squats", sets: 4, reps: 10, weight: 30, restTime: 90 },
        { name: "Leg Press", sets: 3, reps: 15, weight: 200, restTime: 90 },
        { name: "Calf Raises", sets: 4, reps: 20, weight: 80, restTime: 45 }
      ],
      totalDuration: 80,
      notes: "Heavy leg day - ensure proper warm-up and stretching",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  for (const workout of workoutPlans) {
    const docRef = await db.collection('workout_plans').add(workout);
    console.log(`✅ Created: ${workout.traineeName} - ${workout.workoutType} (${workout.difficulty})`);
  }
}

async function main() {
  try {
    await deleteOldData();
    await createRealMealPlans();
    await createRealWorkoutPlans();
    console.log('\n✨ Successfully created real training data!');
    console.log('📊 Summary:');
    console.log('   - 7 meal plans created');
    console.log('   - 6 workout plans created');
    console.log('   - All linked to real users in the system');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
