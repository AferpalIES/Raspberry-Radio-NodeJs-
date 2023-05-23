import { createFileDao, createALbumDao, createAlbumFileDao } from "../DB/DBFactory.js";
import File from "../DB/nativeClasses/file.js";

export class DAO_Service{
    constructor(){
        this.fileDao= createFileDao(1);
        this.albumDao=createALbumDao(1);
    }

    getFiles(fileParam){
        this.fileDao.get(fileParam).then(res=>console.log(res));
    }
    setAlbum(albumParam){
        this.albumDao.set(albumParam);
    }
    getAlbums(albumParam){
        this.albumDao.get(albumParam).then(res=>console.log(res));
    }


}