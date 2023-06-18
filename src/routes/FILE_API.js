import { Router } from "express";
import {_dirname}from "../../__dirname.js";
import DAO_DB_Service from "../service/DB_Service/DAO_Service.js";
import File from "../DB/nativeClasses/file.js";
const API_Router=Router();

API_Router.get('/getFiles', async(req, res)=>{
    res.send(await DAO_DB_Service.getFiles(new File({})));
})
API_Router.get('/getFileById/:id', async(req, res)=>{
    res.send(await DAO_DB_Service.getFiles(new File({id: req.params.id})));
})
export default API_Router;