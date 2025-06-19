import express from "express";
import BaseRoute from "./routes/BaseRoute";

const app = express();
app.use(express.json());

app.use("/test", BaseRoute);

export default app;
