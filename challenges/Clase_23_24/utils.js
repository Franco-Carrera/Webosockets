import { fileURLToPath } from "url";
import { dirname } from "path";
///Ruta del file con import meta url

//, y dirname el path específico del file

const filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(filename);
