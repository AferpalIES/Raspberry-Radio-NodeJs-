import express, { urlencoded } from "express";
const app= express();
app.use(urlencoded({extended:true}));
export default app;