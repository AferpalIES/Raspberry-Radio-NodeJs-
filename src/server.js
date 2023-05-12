import express, { urlencoded } from "express";
import { _dirname } from "../__dirname.js";
import mainRouter from "./routes/mainRoute.js";
const app= express();
app.use(urlencoded({extended:true}));
app.use(express.static(_dirname+'/public'));
app.use('/', mainRouter);
export default app;