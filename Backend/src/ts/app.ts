const express = require("express");
const cp = require("child_process");

const app = express();

const port = 80;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json");
  res.header("X-Content-Type-Options", "nosniff");
  next();
});

app.use(express.urlencoded({ extended: true }));

// ----------------------------------------------------------------------------
let parameters;

async function executeSh(shPath, shCommand, parameters) {
  return new Promise((resolve, reject) => {
    let output: string[] = [];
    const proc = cp.spawn(shCommand, parameters, {
      cwd: shPath,
      shell: true,
    });

    proc.stdout.on("data", (data) => {
      output.push(data.toString());
    });
    proc.stderr.on("data", (data) => {
      console.error(data.toString());
    });
    proc.on("close", (code) => {
      if (code != 0)
        console.info(`child process close all stdio with code ${code}`);
    });
    proc.on("exit", (data) => {
      resolve(output);
    });
  });
}

function setToken(shPath, apiToken) {
  const command = `. ./token.sh ${apiToken}`;

  cp.exec(
    command,
    { cwd: shPath, env: process.env, shell: "/bin/bash" },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Hata oluştu: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Hata çıktısı: ${stderr}`);
        return;
      }
      console.log(`Başarıyla çalıştırıldı. Çıktı: ${stdout}`);
    }
  );
}

app.get("/", async (req, res) => {
  res.status(200).send("Service is up");
});

app.get("/digitalOceanTerraform", async (req, res) => {
  const shPath = "../Terraform/DigitalOcean/script";
  let out;

  // set token without file because source command is not working with childprocess
  setToken(shPath, req.query.apiToken);

  // // execute prepare sh file
  // parameters = ["prepare.sh", "-n", "2", "-p", "1", "-t", "10"];
  // out = await executeSh(shPath, "sh", parameters);
  // out = out.map((str) => str.replaceAll("\n", ""));
  // console.info(out);

  // // execute up sh file
  // parameters = ["up.sh"];
  // out = await executeSh(shPath, "sh", parameters);
  // out = out.map((str) => str.replaceAll("\n", ""));
  // console.info(out);

  res.status(200).json(out);
});

app.listen(port, () => {
  console.log(`App is running on : http://localhost:${port}`);
});