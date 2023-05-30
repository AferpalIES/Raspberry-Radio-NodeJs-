import conn from "./mysqlDB.js";
import AlbumFile from "../nativeClasses/albumFile.js";


export default class AlbumFileMysqlDao{
    constructor(){
        this.db=conn;
    }
    getConditions(albumFile){
        let conds="WHERE ";
        conds+=albumFile.album?`album=${albumFile.album} AND `:"";
        conds+=albumFile.file?`file=${albumFile.file} AND `:"";
        conds+=albumFile.track?`track=${albumFile.track} AND `:"";
        conds+=albumFile.id?`id=${albumFile.id} AND `:"";
        conds=conds=="WHERE "? "":conds.substring(0, conds.length-4);
        return conds;
    }
    getUpdateFileds(albumFile){
        let conds= "SET ";
        conds+=albumFile.album?`album=${albumFile.album}, `:"";
        conds+=albumFile.file?`file=${albumFile.file}, `:"";
        conds+=albumFile.track?`track=${albumFile.track}, `:"";
        conds=conds=="SET "? "":conds.substring(0, conds.length-2);
        return conds;
    }

    get(albumFileParam){
        return new Promise((resolve, reject)=>{
            const query= `Select * from albumFile `+this.getConditions(albumFileParam);
            this.db.query(query, (err, result)=>{
                if(err) throw new Error("Error at getting fileAlbum");
                result= result? result.map(res=>new AlbumFile(res)):new AlbumFile({});
                resolve(result);
            });
        })
        
    }
    set(albumFileParam){
        const {track, album, file}=albumFileParam;
        const query=`INSERT INTO albumFile (track, album, file) VALUES (${track}, ${album}, ${file})`;
        conn.query(query);
    }
    delete(albumFileParam){
        const conds=this.getConditions(albumFileParam);
        if(conds=="")throw new Error("Missing albumfileParam at delete");
        const query=`DELETE FROM albumFile `+conds;
        this.db.query(query);

    }
    async update(albumFile, oldAlbumFile){
        const oldAlbumFileID=await this.get(oldAlbumFile);
        const query=`UPDATE albumFile ${this.getUpdateFileds(albumFile)} WHERE id=${oldAlbumFileID[0].id}`;
        this.db.query(query);
    }
}
