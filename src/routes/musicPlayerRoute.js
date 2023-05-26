import { Router } from "express";
import {_dirname}from "../../__dirname.js";
import DAO_DB_Service from "../service/DB_Service/DAO_Service.js";
import File from "../DB/nativeClasses/file.js";
import { playMusicFile } from "../service/musicPlayer.js";
const musicPlayerRouter=Router();

musicPlayerRouter.post('/:id', async (req, res)=>{
    //ESTA ES UNA SOLUCIÓN EJEMPLO QUE SE ME HA OCURRIDO PERO HABRÍA QUE DEBATIR LA CUESTIÓN DE DONDE ESTARÁ LA MÚSICA EN SÍ
    //EN SÍ LA CONEXIÓN FUNCIONA, QUE LO HE COMPROBADO, PERO TE DEJO A TI LA LÓGICA DE PONER EN MARCHA LA EJECUCIÓN DE LA MÚSICA
    //POR AHORA DEJO LA LÍNEA COMENTADA Y SOLO DEVUELVO EL FILE PARA COMPROBAR QUE FUNCIONA CORRECTAMENTE
    const file= await DAO_DB_Service.getFiles(new File({id:req.params.id}));
    //playMusicFile(_dirname+'/DIRECTORY_NAME/'+file.fullName);
    res.send(file);
})
export default musicPlayerRouter;