import fs from "fs";
import path from "path";
import sharp from "sharp";
import * as readline from "readline";

const fullFolder = path.join(__dirname, "artsFull");

const outDir = path.join(__dirname, "..", "public", "cimg");

const imagePaths = fs
  .readdirSync(fullFolder)
  .filter((fname) => fname.endsWith(".png"));

const formatOptions = {
  quality: 80,
  progressive: true,
  compressionLevel: 9,
};

const logPng = (png: string, count = 0, max = 0, lineWidth = 35) => {
  const progress = `(${count}/${max})`;
  const paddingWidth = lineWidth - png.length - progress.length;
  const padding = " ".repeat(paddingWidth);
  process.stdout.write(`Processing ${png}${padding}${progress}\r`);
};

const processImg = async (png: string) => {
  const image = sharp(path.join(fullFolder, png));

  const outFolder = path.join(outDir, png.split(".")[0] || "etc");
  if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder);

  await image
    .metadata()
    .then((metadata) => {
      const height = metadata.height || 0;
      const width = metadata.width || 0;
      const thirdHeight = Math.round(height / 3);

      const top = image
        .clone()
        .extract({ left: 0, top: 0, width: width, height: thirdHeight });
      const mid = image.clone().extract({
        left: 0,
        top: thirdHeight,
        width: width,
        height: thirdHeight,
      });
      const bot = image.clone().extract({
        left: 0,
        top: 2 * thirdHeight,
        width: width,
        height: thirdHeight,
      });

      void top
        .toFormat("png", formatOptions)
        .toFile(path.join(outFolder, "top.png"));
      void mid
        .toFormat("png", formatOptions)
        .toFile(path.join(outFolder, "mid.png"));
      void bot
        .toFormat("png", formatOptions)
        .toFile(path.join(outFolder, "bot.png"));
    })
    .catch((err) => {
      console.log(err);
    });
};

// check that images match seed data provided in baseCreatures.csv
const checkImages = () => {
  const baseCreatures = fs
    .readFileSync(path.join(__dirname, "baseCreatures.csv"))
    .toString()
    .split("\n")
    .map((line) => line.split(",")[0]);
  baseCreatures.shift(); // remove header

  // check if any baseCreatures do not have arts
  const missingArts = baseCreatures.filter(
    (creature) =>
      !imagePaths.includes(`${creature?.toLowerCase() as string}.png`)
  );

  if (missingArts.length > 0) {
    console.log("Missing arts for: ", missingArts);
  }

  return missingArts.length == 0;
};

checkImages();

// process images
(async () => {
  const max = imagePaths.length;
  let count = 1;
  for (const image of imagePaths) {
    logPng(image, count, max);
    await processImg(image);
    count++;
  }
})()
  .then(() => {
    console.log("Done");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
