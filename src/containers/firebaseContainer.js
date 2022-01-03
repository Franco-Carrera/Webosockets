import admin from "firebase-admin";
import { createRequire } from "module";
import { __dirname } from "../utils.js";
import fs from "fs";

const require = createRequire(import.meta.url);
const serviceAccount = require;

////Conectar como clase profe
