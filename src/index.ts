import app from "./app";
import "./database2";
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});

export default app;
