import { Router } from "express";
import {_dirname}from "../../__dirname.js";
import DAO_DB_Service from "../service/DB_Service/DAO_Service.js";
import File from "../DB/nativeClasses/file.js";
import {sep} from "node:path"
import { playMusicFile, stopMusicFile, toggleMusicFile } from "../service/musicPlayer.js";
import { config } from "dotenv";
config();
const musicPlayerRouter=Router();

musicPlayerRouter.post('/:id', async (req, res)=>{
  const file = await DAO_DB_Service.getFiles(new File({id:req.params.id}));
    playMusicFile(_dirname+sep+process.env.musicDirectory+file[0].fullName);
})

musicPlayerRouter.get("/pause", (req, res)=>{
  console.log("pause");
  toggleMusicFile();
})

musicPlayerRouter.get("/resume", (req, res)=>{
  console.log("resume");
  toggleMusicFile();
})

export default musicPlayerRouter;