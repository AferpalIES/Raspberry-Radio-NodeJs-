import fs from "fs";
import { resolve } from "path";


export default function getFileRoutes(path){
    return new Promise((resolve, reject)=>{
        fs.readdir(path, (err, files)=>{
            resolve(files);
        })
    })
    
}