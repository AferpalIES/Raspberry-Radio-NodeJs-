import { Router } from "express";
import {_dirname}from "../../__dirname.js";
const mainRouter=Router();

mainRouter.get('/', (req, res)=>{
    res.sendFile(_dirname+'/public/main.html');
})
export default mainRouter;