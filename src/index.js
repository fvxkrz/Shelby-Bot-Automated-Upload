import "dotenv/config";
import { execSync } from "child_process";
import fs from "fs";

function randomNumber(min = 100000, max = 9999999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uploadOnce() {
  const rand = randomNumber();
  const filename = `hello-${rand}.txt`;
  const tmpFile = "/tmp/shelby-auto.txt";

  // isi file plain text
  const content = `Hello
This is an automated upload.
File name: ${filename}
Time: ${new Date().toISOString()}
`;

  fs.writeFileSync(tmpFile, content);

  execSync(
    `shelby upload ${tmpFile} auto/${filename} -e "in 7 days" --assume-yes`,
    { stdio: "inherit", env: process.env }
  );

  console.log("✅ Uploaded:", filename);
}

// 🔥 upload pertama langsung
uploadOnce();

// 🔁 upload tiap 10 menit
setInterval(uploadOnce, 2 * 60 * 1000);
