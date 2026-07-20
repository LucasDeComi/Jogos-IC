import express from "express";
import routes from "./routes/index.route.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();
app.use(express.json());

app.use("/", routes);

app.use(errorHandler);

export default app;