import fs from "fs";


export default function getFileRoutes(path){
    return new Promise((resolve, reject)=>{
        fs.readdir(path, (err, files)=>{
            resolve(files);
        })
    })
    
}