const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function createSamplePrograms() {
  console.log('📚 Creating sample nutrition and workout programs...\n');
  
  const programs = [
    // Nutrition Program 1
    {
      title: "Muscle Building Meal Plan",
      description: "High protein meal plan designed for muscle growth and strength gains",
      type: "nutrition",
      duration: "4 weeks",
      difficulty: "intermediate",
      calories: "2800",
      protein: "180g",
      carbs: "350g",
      fats: "80g",
      assignedUsers: ["aYT8NPQg1uROsOdaN6NU1fe8VWF3"], // Safa O Abdulkareem
      meals: [
        {
          name: "Power Breakfast",
          category: "breakfast",
          calories: "650",
          protein: "45",
          carbs: "75",
          fats: "18",
          ingredients: "4 Whole Eggs\n100g Oatmeal\n1 Banana\n2 tbsp Peanut Butter\n1 glass Orange Juice",
          instructions: "Cook eggs, prepare oatmeal with banana, add peanut butter",
          notes: "Start your day with high energy"
        },
        {
          name: "Pre-Workout Meal",
          category: "lunch",
          calories: "750",
          protein: "55",
          carbs: "90",
          fats: "20",
          ingredients: "200g Chicken Breast\n150g Brown Rice\nMixed Vegetables\n1 Sweet Potato",
          instructions: "Grill chicken, cook rice and sweet potato, steam vegetables",
          notes: "Eat 2 hours before training"
        },
        {
          name: "Post-Workout Recovery",
          category: "dinner",
          calories: "800",
          protein: "60",
          carbs: "95",
          fats: "22",
          ingredients: "250g Lean Beef\n200g Quinoa\nBroccoli\nSpinach Salad\nOlive Oil Dressing",
          instructions: "Cook beef medium, prepare quinoa, steam broccoli",
          notes: "Essential for muscle recovery"
        },
        {
          name: "Evening Snack",
          category: "snack",
          calories: "400",
          protein: "35",
          carbs: "45",
          fats: "12",
          ingredients: "Greek Yogurt (300g)\nMixed Berries\nHoney\nAlmonds (30g)",
          instructions: "Mix yogurt with berries and honey, add almonds",
          notes: "Before bed protein"
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      views: 0,
      likes: 0
    },
    
    // Nutrition Program 2
    {
      title: "Fat Loss Nutrition Plan",
      description: "Calorie-controlled meal plan for effective fat loss while maintaining muscle",
      type: "nutrition",
      duration: "6 weeks",
      difficulty: "beginner",
      calories: "1800",
      protein: "140g",
      carbs: "150g",
      fats: "60g",
      assignedUsers: ["user_rashad_123"], // Rashad Ali
      meals: [
        {
          name: "Light Breakfast",
          category: "breakfast",
          calories: "350",
          protein: "30",
          carbs: "35",
          fats: "12",
          ingredients: "Protein Pancakes (2)\nGreek Yogurt\nBlueberries\nSugar-free Syrup",
          instructions: "Prepare protein pancakes, top with yogurt and berries",
          notes: "Low calorie, high protein start"
        },
        {
          name: "Lean Lunch",
          category: "lunch",
          calories: "450",
          protein: "45",
          carbs: "40",
          fats: "15",
          ingredients: "Turkey Breast (150g)\nQuinoa (80g)\nGreen Salad\nLemon Dressing",
          instructions: "Grill turkey, cook quinoa, prepare fresh salad",
          notes: "Filling and nutritious"
        },
        {
          name: "Clean Dinner",
          category: "dinner",
          calories: "500",
          protein: "50",
          carbs: "45",
          fats: "18",
          ingredients: "Grilled Fish (200g)\nSweet Potato (150g)\nAsparagus\nLemon",
          instructions: "Grill fish with lemon, bake sweet potato, steam asparagus",
          notes: "Light evening meal"
        },
        {
          name: "Protein Snack",
          category: "snack",
          calories: "250",
          protein: "25",
          carbs: "20",
          fats: "10",
          ingredients: "Cottage Cheese (200g)\nCucumber\nCherry Tomatoes\nPepper",
          instructions: "Mix cottage cheese with vegetables",
          notes: "Low calorie protein boost"
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      views: 0,
      likes: 0
    },
    
    // Workout Program 1
    {
      title: "5-Day Strength Training Split",
      description: "Advanced strength program targeting all major muscle groups",
      type: "workout",
      duration: "8 weeks",
      difficulty: "advanced",
      targetMuscles: "Full Body",
      assignedUsers: ["aYT8NPQg1uROsOdaN6NU1fe8VWF3", "bKraOK6nrkOj5UTAjE5ZZ1eRXq52"],
      weeklySchedule: {
        Monday: {
          title: "Chest & Triceps",
          exercises: [
            { name: "Barbell Bench Press", sets: 4, reps: 8, weight: 100 },
            { name: "Incline Dumbbell Press", sets: 4, reps: 10, weight: 35 },
            { name: "Cable Flyes", sets: 3, reps: 12, weight: 20 },
            { name: "Tricep Dips", sets: 3, reps: 12 },
            { name: "Tricep Pushdowns", sets: 3, reps: 15, weight: 30 }
          ]
        },
        Tuesday: {
          title: "Back & Biceps",
          exercises: [
            { name: "Deadlifts", sets: 4, reps: 6, weight: 140 },
            { name: "Pull-ups", sets: 4, reps: 10 },
            { name: "Barbell Rows", sets: 4, reps: 10, weight: 80 },
            { name: "Barbell Curls", sets: 3, reps: 12, weight: 40 },
            { name: "Hammer Curls", sets: 3, reps: 12, weight: 20 }
          ]
        },
        Wednesday: {
          title: "Rest or Cardio",
          exercises: [
            { name: "Light Cardio", sets: 1, duration: 30 },
            { name: "Stretching", sets: 1, duration: 15 }
          ]
        },
        Thursday: {
          title: "Shoulders & Abs",
          exercises: [
            { name: "Overhead Press", sets: 4, reps: 8, weight: 60 },
            { name: "Lateral Raises", sets: 4, reps: 12, weight: 15 },
            { name: "Front Raises", sets: 3, reps: 12, weight: 15 },
            { name: "Face Pulls", sets: 3, reps: 15, weight: 25 },
            { name: "Hanging Leg Raises", sets: 3, reps: 15 }
          ]
        },
        Friday: {
          title: "Legs",
          exercises: [
            { name: "Squats", sets: 5, reps: 8, weight: 120 },
            { name: "Romanian Deadlifts", sets: 4, reps: 10, weight: 100 },
            { name: "Leg Press", sets: 4, reps: 12, weight: 200 },
            { name: "Leg Curls", sets: 3, reps: 12, weight: 50 },
            { name: "Calf Raises", sets: 4, reps: 20, weight: 80 }
          ]
        }
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      views: 0,
      likes: 0
    },
    
    // Workout Program 2
    {
      title: "Beginner Full Body Workout",
      description: "3-day full body workout program perfect for beginners",
      type: "workout",
      duration: "4 weeks",
      difficulty: "beginner",
      targetMuscles: "Full Body",
      assignedUsers: ["user_rashad_123"],
      weeklySchedule: {
        Monday: {
          title: "Full Body A",
          exercises: [
            { name: "Goblet Squats", sets: 3, reps: 12, weight: 20 },
            { name: "Push-ups", sets: 3, reps: 10 },
            { name: "Dumbbell Rows", sets: 3, reps: 12, weight: 15 },
            { name: "Shoulder Press", sets: 3, reps: 10, weight: 12 },
            { name: "Plank", sets: 3, duration: 1 }
          ]
        },
        Wednesday: {
          title: "Full Body B",
          exercises: [
            { name: "Leg Press", sets: 3, reps: 12, weight: 80 },
            { name: "Chest Press", sets: 3, reps: 12, weight: 25 },
            { name: "Lat Pulldown", sets: 3, reps: 12, weight: 40 },
            { name: "Bicep Curls", sets: 3, reps: 12, weight: 10 },
            { name: "Tricep Extensions", sets: 3, reps: 12, weight: 10 }
          ]
        },
        Friday: {
          title: "Full Body C",
          exercises: [
            { name: "Lunges", sets: 3, reps: 10, weight: 15 },
            { name: "Incline Press", sets: 3, reps: 12, weight: 20 },
            { name: "Cable Rows", sets: 3, reps: 12, weight: 35 },
            { name: "Side Raises", sets: 3, reps: 12, weight: 8 },
            { name: "Russian Twists", sets: 3, reps: 20 }
          ]
        }
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      views: 0,
      likes: 0
    }
  ];

  for (const program of programs) {
    const docRef = await db.collection('programs').add(program);
    console.log(`✅ Created ${program.type} program: "${program.title}" (ID: ${docRef.id})`);
    console.log(`   Assigned to: ${program.assignedUsers.join(', ')}`);
    if (program.meals) {
      console.log(`   Meals: ${program.meals.length}`);
    }
    if (program.weeklySchedule) {
      console.log(`   Days: ${Object.keys(program.weeklySchedule).length}`);
    }
    console.log('');
  }
}

async function main() {
  try {
    await createSamplePrograms();
    console.log('✨ Successfully created sample programs!');
    console.log('📊 Summary:');
    console.log('   - 2 nutrition programs');
    console.log('   - 2 workout programs');
    console.log('   - All assigned to real users');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
