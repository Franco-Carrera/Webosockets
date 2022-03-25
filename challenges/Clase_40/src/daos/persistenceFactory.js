import config from "../config/config.js";

export default class PersistenceFactory {
  static getPersistence = async () => {
    switch (config.app.persistence) {
      case "ARRAY":
        let { default: UsersDaoArray } = await import("./usersDaoArray.js");
        return new UsersDaoArray();
        break;
      case "FILE":
        let { default: UsersDaoFile } = await import("./usersDaoFile.js");
        return new UsersDaoFile();
        break;
      case "DB":
        let { default: UsersDaoDB } = await import("./usersDaoDB.js");
        return new UsersDaoDB();
        break;
    }
  };
}
