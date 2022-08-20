import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import { usersRouter } from "./routes/usersRouter";
import { vehiclesRouter } from "./routes/vehiclesRouter";
import { vehicleDataRouter } from "./routes/vehiclesDataRouter";

const app = express();
const corsOptions = {
  exposedHeaders: ["x-access-token"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/vehicles", vehiclesRouter);
app.use("/users", usersRouter);
app.use("/vehiclesdata", vehicleDataRouter);

export default app;
