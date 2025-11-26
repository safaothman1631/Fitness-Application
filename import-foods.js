import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fruits from "./data/fruits.json";
import vegetables from "./data/vegetables.json";
import meats from "./data/meats.json";
import grains from "./data/grains.json";
import drinks from "./data/drinks.json";
import meals from "./data/meals.json";
import snacks from "./data/snacks.json";
import salads from "./data/salads.json";
import soups from "./data/soups.json";
import bakery from "./data/bakery.json";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function importCollection(collectionName, items) {
  for (const item of items) {
    const ref = doc(db, collectionName, item.id.toString());
    await setDoc(ref, item);
  }
}

async function main() {
  await importCollection("foods", fruits);
  await importCollection("foods", vegetables);
  await importCollection("foods", meats);
  await importCollection("foods", grains);
  await importCollection("foods", drinks);
  await importCollection("foods", meals);
  await importCollection("foods", snacks);
  await importCollection("foods", salads);
  await importCollection("foods", soups);
  await importCollection("foods", bakery);
  console.log("Import finished ✅");
}

main().catch(console.error);
