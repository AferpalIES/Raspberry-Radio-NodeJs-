import { Router } from "express";
import {_dirname}from "../../__dirname.js";
import DAO_DB_Service from "../service/DB_Service/DAO_Service.js";
import File from "../DB/nativeClasses/file.js";
import { playMusicFile } from "../service/musicPlayer.js";
import { config } from "dotenv";
config();
const musicPlayerRouter=Router();

musicPlayerRouter.post('/:id', async (req, res)=>{
  const file = await DAO_DB_Service.getFiles(new File({id:req.params.id}));
    playMusicFile(_dirname+"/"+process.env.musicDirectory+file[0].fullName);
})

export default musicPlayerRouter;