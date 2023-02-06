import fs from "fs";
import path from "path";
import sharp from "sharp";

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

imagePaths.forEach((png: string) => {
  const image = sharp(path.join(fullFolder, png));

  const outFolder = path.join(outDir, png.split(".")[0] || "etc");
  if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder);

  image
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
});
