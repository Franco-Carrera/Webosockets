import express from "express";
import os from "os";
import { fork } from "child_process";

const PORT = parseInt(process.argv[2] || 8080);

const app = express();
app.listen(PORT, () => console.log(`Now listening on ${PORT} port.`));

app.use(express.static("public"));

app.get("/info", (req, res) => {
  res.send({
    status: "success",
    payload: {
      args: process.argv,
      os: process.platform,
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage(),
      execPath: process.execPath,
      processId: process.pid,
      projectFolder: process.cwd(),
      cores: os.cpus().length,
    },
  });
});

app.get("/api/randoms", (req, res) => {
  const calculus = fork("calculus", [req.query.cant]);
  calculus.on("message", (data) => {
    res.send({ port: PORT, numbers: data }); //Numbers de calculus
  });
});
