const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('✅ Firebase Admin initialized');
}

const db = admin.firestore();

async function createSampleMealPlans() {
  console.log('Creating sample meal plans...');
  
  const mealPlans = [
    {
      traineeName: "أحمد محمد",
      traineeId: "user1",
      date: "2025-12-10",
      mealType: "Breakfast",
      foods: [
        { name: "Oatmeal", calories: 150, protein: 5, carbs: 27, fats: 3 },
        { name: "Banana", calories: 105, protein: 1, carbs: 27, fats: 0 },
        { name: "Eggs (2)", calories: 140, protein: 12, carbs: 1, fats: 10 }
      ],
      totalCalories: 395,
      notes: "High protein breakfast for muscle building",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      traineeName: "سارە عەلی",
      traineeId: "user2",
      date: "2025-12-10",
      mealType: "Lunch",
      foods: [
        { name: "Grilled Chicken", calories: 250, protein: 45, carbs: 0, fats: 8 },
        { name: "Brown Rice", calories: 215, protein: 5, carbs: 45, fats: 2 },
        { name: "Vegetables", calories: 80, protein: 3, carbs: 15, fats: 1 }
      ],
      totalCalories: 545,
      notes: "Balanced meal with lean protein",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      traineeName: "محەمەد ئیبراهیم",
      traineeId: "user3",
      date: "2025-12-10",
      mealType: "Dinner",
      foods: [
        { name: "Salmon", calories: 280, protein: 40, carbs: 0, fats: 13 },
        { name: "Sweet Potato", calories: 180, protein: 4, carbs: 41, fats: 0 },
        { name: "Broccoli", calories: 55, protein: 4, carbs: 11, fats: 0 }
      ],
      totalCalories: 515,
      notes: "High omega-3 for recovery",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      traineeName: "أحمد محمد",
      traineeId: "user1",
      date: "2025-12-09",
      mealType: "Snack",
      foods: [
        { name: "Greek Yogurt", calories: 130, protein: 15, carbs: 10, fats: 3 },
        { name: "Almonds", calories: 160, protein: 6, carbs: 6, fats: 14 }
      ],
      totalCalories: 290,
      notes: "Post-workout snack",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      traineeName: "فاطمة حسن",
      traineeId: "user4",
      date: "2025-12-10",
      mealType: "Breakfast",
      foods: [
        { name: "Protein Shake", calories: 200, protein: 30, carbs: 15, fats: 3 },
        { name: "Whole Wheat Toast", calories: 140, protein: 6, carbs: 26, fats: 2 },
        { name: "Avocado", calories: 160, protein: 2, carbs: 9, fats: 15 }
      ],
      totalCalories: 500,
      notes: "Pre-workout energy boost",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  for (const meal of mealPlans) {
    const docRef = await db.collection('meal_plans').add(meal);
    console.log(`✅ Created meal plan: ${docRef.id} - ${meal.traineeName} (${meal.mealType})`);
  }
}

async function createSampleWorkoutPlans() {
  console.log('\nCreating sample workout plans...');
  
  const workoutPlans = [
    {
      traineeName: "أحمد محمد",
      traineeId: "user1",
      date: "2025-12-10",
      workoutType: "Strength",
      difficulty: "Intermediate",
      exercises: [
        { name: "Bench Press", sets: 4, reps: 8, weight: 80, restTime: 90 },
        { name: "Squats", sets: 4, reps: 10, weight: 100, restTime: 120 },
        { name: "Deadlifts", sets: 3, reps: 6, weight: 120, restTime: 180 },
        { name: "Pull-ups", sets: 3, reps: 12, restTime: 60 }
      ],
      totalDuration: 60,
      notes: "Focus on form and controlled movements",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      traineeName: "سارە عەلی",
      traineeId: "user2",
      date: "2025-12-10",
      workoutType: "Cardio",
      difficulty: "Beginner",
      exercises: [
        { name: "Treadmill Running", sets: 1, reps: 1, duration: 20, restTime: 0 },
        { name: "Cycling", sets: 1, reps: 1, duration: 15, restTime: 0 },
        { name: "Jump Rope", sets: 3, reps: 100, restTime: 60 },
        { name: "Cool Down Walk", sets: 1, reps: 1, duration: 10, restTime: 0 }
      ],
      totalDuration: 45,
      notes: "Keep heart rate in zone 2",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      traineeName: "محەمەد ئیبراهیم",
      traineeId: "user3",
      date: "2025-12-10",
      workoutType: "HIIT",
      difficulty: "Advanced",
      exercises: [
        { name: "Burpees", sets: 4, reps: 15, restTime: 30 },
        { name: "Mountain Climbers", sets: 4, reps: 20, restTime: 30 },
        { name: "Box Jumps", sets: 4, reps: 12, restTime: 45 },
        { name: "Battle Ropes", sets: 4, reps: 1, duration: 1, restTime: 30 }
      ],
      totalDuration: 35,
      notes: "Maximum intensity, proper rest between sets",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      traineeName: "أحمد محمد",
      traineeId: "user1",
      date: "2025-12-09",
      workoutType: "Flexibility",
      difficulty: "Beginner",
      exercises: [
        { name: "Yoga Flow", sets: 1, reps: 1, duration: 20, restTime: 0 },
        { name: "Static Stretching", sets: 1, reps: 1, duration: 15, restTime: 0 },
        { name: "Foam Rolling", sets: 1, reps: 1, duration: 10, restTime: 0 }
      ],
      totalDuration: 45,
      notes: "Recovery day - focus on mobility",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      traineeName: "فاطمة حسن",
      traineeId: "user4",
      date: "2025-12-10",
      workoutType: "Strength",
      difficulty: "Beginner",
      exercises: [
        { name: "Leg Press", sets: 3, reps: 12, weight: 60, restTime: 90 },
        { name: "Lat Pulldown", sets: 3, reps: 10, weight: 40, restTime: 60 },
        { name: "Leg Curls", sets: 3, reps: 12, weight: 30, restTime: 60 },
        { name: "Planks", sets: 3, reps: 1, duration: 1, restTime: 60 }
      ],
      totalDuration: 50,
      notes: "Building foundation strength",
      createdBy: "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  for (const workout of workoutPlans) {
    const docRef = await db.collection('workout_plans').add(workout);
    console.log(`✅ Created workout plan: ${docRef.id} - ${workout.traineeName} (${workout.workoutType})`);
  }
}

async function main() {
  try {
    await createSampleMealPlans();
    await createSampleWorkoutPlans();
    console.log('\n✨ All sample data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating sample data:', error);
    process.exit(1);
  }
}

main();
