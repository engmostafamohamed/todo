import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";
(async () => {
  try {
    const db = await mongoose.connect(
      `mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        //   user: config.MONGO_USER,
        //   pass: config.MONGO_PASSWORD,
      } as ConnectOptions
    );
    console.log("database is connected to:");
  } catch (error) {
    console.log(error);
  }
})();
