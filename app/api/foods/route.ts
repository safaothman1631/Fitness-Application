import { NextRequest } from "next/server";
import path from "path";
import { promises as fs } from "fs";

const DATA_FILES = [
  "fruits.json",
  "vegetables.json",
  "meats.json",
  "grains.json",
  "drinks.json",
  "meals.json",
  "snacks.json",
  "salads.json",
  "soups.json",
  "bakery.json"
];

const DATA_DIR = path.join(process.cwd(), "data");

async function getAllFoods() {
  let allFoods: any[] = [];
  for (const file of DATA_FILES) {
    const filePath = path.join(DATA_DIR, file);
    try {
      const content = await fs.readFile(filePath, "utf-8");
      const items = JSON.parse(content);
      allFoods = allFoods.concat(items);
    } catch (err) {
      // skip missing files
    }
  }
  return allFoods;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const q = searchParams.get("q");
  let foods = await getAllFoods();

  if (type) {
    foods = foods.filter((item) => item.type === type);
  }
  if (q) {
    const query = q.toLowerCase();
    foods = foods.filter((item) =>
      item.name.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query))
    );
  }
  return Response.json(foods);
}
