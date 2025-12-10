const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function addMediaToMeals() {
  try {
    console.log('🔄 Adding media (images, videos, instructions) to meals...\n');
    
    // Sample meal media data based on common meal names
    const mealMedia = {
      'breakfast': {
        imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=s9r-CxnCXkg',
        instructions: 'Start your day with a balanced breakfast rich in protein and complex carbs. Prepare ingredients the night before for quick morning assembly.'
      },
      'lunch': {
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=EvlwPzlLP3E',
        instructions: 'A well-balanced lunch should include lean protein, vegetables, and healthy fats. Meal prep this dish for easy weekday lunches.'
      },
      'dinner': {
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=jQD6S6v4TyU',
        instructions: 'Keep dinner light but satisfying with lean proteins and plenty of vegetables. Aim to finish eating 2-3 hours before bedtime.'
      },
      'snack': {
        imageUrl: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=VZT84NcHvqE',
        instructions: 'Healthy snacks help maintain energy levels between meals. Choose protein-rich options to stay fuller longer.'
      },
      'protein': {
        imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=YZJu-X1BUqQ',
        instructions: 'High protein meals support muscle recovery and growth. Cook in batches for convenient post-workout nutrition.'
      },
      'light': {
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=WTl8YXq4i7g',
        instructions: 'Light meals are perfect for fat loss while maintaining energy. Focus on vegetables and lean proteins.'
      },
      'lean': {
        imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=fhN5oI1gxHg',
        instructions: 'Lean meals maximize nutrition while controlling calories. Include plenty of fiber for satiety.'
      },
      'clean': {
        imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=Eud1pcdE2Ik',
        instructions: 'Clean eating focuses on whole, minimally processed foods. Prepare fresh ingredients for optimal nutrition.'
      }
    };

    // Get nutrition programs
    const programsSnapshot = await db.collection('programs')
      .where('type', '==', 'nutrition')
      .get();

    let updatedCount = 0;
    let totalMeals = 0;

    for (const doc of programsSnapshot.docs) {
      const program = doc.data();
      console.log(`\n📋 Processing: ${program.title}`);

      if (program.meals && program.meals.length > 0) {
        const updatedMeals = program.meals.map(meal => {
          totalMeals++;
          const mealName = (meal.name || '').toLowerCase();
          const mealCategory = (meal.category || '').toLowerCase();
          const mealNotes = (meal.notes || '').toLowerCase();
          const searchText = `${mealName} ${mealCategory} ${mealNotes}`;
          
          // Find matching media
          for (const [key, media] of Object.entries(mealMedia)) {
            if (searchText.includes(key)) {
              console.log(`  ✅ ${meal.name} - Added media (matched: ${key})`);
              updatedCount++;
              return {
                ...meal,
                imageUrl: media.imageUrl,
                videoUrl: media.videoUrl,
                instructions: media.instructions
              };
            }
          }
          
          // Default meal image if no match
          console.log(`  ℹ️  ${meal.name} - Using default meal image`);
          return {
            ...meal,
            imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
            instructions: `Prepare ${meal.name} with fresh ingredients. Follow proper portion sizes: ${meal.calories || 0} calories per serving.`
          };
        });

        await doc.ref.update({ meals: updatedMeals });
        console.log(`  💾 Saved updates to: ${program.title}`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`✅ Complete!`);
    console.log(`📊 Total meals processed: ${totalMeals}`);
    console.log(`🎬 Media added to: ${updatedCount} meals`);
    console.log(`🖼️  Default images added to: ${totalMeals - updatedCount} meals`);
    console.log('='.repeat(60));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addMediaToMeals();
