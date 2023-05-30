import { _dirname } from "../../__dirname.js";
import { sep } from "node:path";
import getFileRoutes from "./readDir.js";
import File from "../DB/nativeClasses/file.js";
import DAO_DB_Service from "./DB_Service/DAO_Service.js";
import { accessMetadata, accessImage } from "./metadataAccess.js";

export default async function syncDataBase(){
    const path=_dirname+'/music';
    let files= await getFileRoutes(path);
    files.forEach(async file=>{
        const fileObject= await accessMetadata(path+sep+file);
        fileObject.cover=await accessImage(path+sep+file);
        const file2=new File(fileObject);
        DAO_DB_Service.setFile(file2);
    })

}