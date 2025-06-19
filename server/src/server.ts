import app from "./app";
import config from "./config/config";

app.listen(config.port, () => {
  console.log(`Listening for incomming connections on port ${config.port}`);
});
