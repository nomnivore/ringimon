/* eslint-disable @typescript-eslint/no-non-null-assertion */
import csv from "csv";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const dataFolder = path.join(__dirname, "..", "data");

console.log(dataFolder);

const baseCreatureCSV = path.join(dataFolder, "baseCreatures.csv");
const emotionsCSV = path.join(dataFolder, "emotions.csv");
const typeCSV = path.join(dataFolder, "types.csv");
const rarityCSV = path.join(dataFolder, "rarity.csv");

const baseParser = csv.parse({ delimiter: "," }, (err, data: string[][]) => {
  void seedBaseCreatures(data);
});

const emotionParser = csv.parse({ delimiter: "," }, (err, data: string[][]) => {
  void seedEmotions(data);
});

const typeParser = csv.parse({ delimiter: "," }, (err, data: string[][]) => {
  void seedTypes(data);
});

const rarityParser = csv.parse({ delimiter: "," }, (err, data: string[][]) => {
  void seedRarity(data);
});

fs.createReadStream(baseCreatureCSV).pipe(baseParser);
fs.createReadStream(emotionsCSV).pipe(emotionParser);
fs.createReadStream(typeCSV).pipe(typeParser);
fs.createReadStream(rarityCSV).pipe(rarityParser);

async function seedBaseCreatures(data: string[][]) {
  console.log("SEEDING BaseCreatures");

  // convert data to Json[]

  data.shift(); // remove headers
  const filtered = data.filter((line) => {
    return line.length >= 4 && !line.slice(0, 3).includes("");
  });

  const models = filtered.map((line) => {
    return {
      name: line[0]!,
      topName: line[1]!,
      midName: line[2]!,
      botName: line[3]!,
    };
  });

  // seed model
  //prisma.baseCreature.createMany({data: models}) // not supported in sqlite

  for (const model of models) {
    await prisma.baseCreature.create({ data: model });
  }
}

async function seedEmotions(data: string[][]) {
  console.log("SEEDING Emotions");

  // convert data to Json[]

  data.shift(); // remove headers

  const models = data.map((line) => {
    return {
      name: line[0]!,
      hp: parseInt(line[1]!),
      spd: parseInt(line[2]!),
      phy: parseInt(line[3]!),
      mag: parseInt(line[4]!),
      ran: parseInt(line[5]!),
    };
  });

  // seed model
  //prisma.emotion.createMany({data: models}) // not supported in sqlite

  for (const model of models) {
    await prisma.emotion.create({ data: model });
  }
}

async function seedTypes(data: string[][]) {
  console.log("SEEDING Types");

  // convert data to Json[]

  data.shift(); // remove headers

  const models = data.map((line) => {
    return {
      name: line[0]!,
      id: parseInt(line[1]!),
      groupId: parseInt(line[2]!),
    };
  });

  // seed model
  //prisma.type.createMany({data: models}) // not supported in sqlite

  for (const model of models) {
    await prisma.type.create({ data: model });
  }
}

async function seedRarity(data: string[][]) {
  console.log("SEEDING Rarity");

  // convert data to Json[]

  data.shift(); // remove headers

  const models = data.map((line) => {
    return {
      name: line[0]!,
      threshold: parseFloat(line[1]!),
    };
  });

  // seed model
  //prisma.type.createMany({data: models}) // not supported in sqlite

  for (const model of models) {
    await prisma.rarity.create({ data: model });
  }
}
