import { S3Client } from "@aws-sdk/client-s3";
import path from "path";
import fs from "fs";
import S3SyncClient, { TransferMonitor } from "s3-sync-client";

import * as nextenv from "@next/env";
nextenv.loadEnvConfig("./");

// ensure bucket env vars exist before continuing
if (
  !process.env.BUCKET_ENDPOINT ||
  !process.env.BUCKET_ACCESS_KEY_ID ||
  !process.env.BUCKET_SECRET_ACCESS_KEY
) {
  console.error("Missing bucket env vars");
  process.exit(1);
}

// parse any command line args
// ex:  npm run img:sync -- --delete -d
const args = process.argv.slice(2);
const dryRun = args.includes("--dryrun") || args.includes("-d");
const del = args.includes("--delete") || args.includes("-D");

const localDir = path.join(__dirname, "splits");
if (!fs.existsSync(localDir)) {
  console.error("Missing ./data/splits folder");
  process.exit(1);
}

const bucketUri = "s3://ringimon";

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
  },
});

// ensure all images are uploaded as content type "image/png"
const commandInput = {
  ContentType: "image/png",
};

// create a sync client
const syncClient = new S3SyncClient({ client: s3Client });

const { sync } = syncClient;
const monitor = new TransferMonitor();
monitor.on("progress", (progress) => console.log(progress));

sync(localDir, bucketUri, { dryRun, del, monitor, commandInput })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
