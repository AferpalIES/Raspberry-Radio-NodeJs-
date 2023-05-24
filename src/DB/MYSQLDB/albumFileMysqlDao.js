import conn from "./mysqlDB.js";
import AlbumFile from "../nativeClasses/albumFile.js";


export default class AlbumFileMysqlDao{
    constructor(){
        this.db=conn;
    }
    getConditions(albumFile){
        let conds="WHERE ";
        conds+=albumFile.album?`albumfile.album=${albumFile.album} AND `:"";
        conds+=albumFile.file?`albumfile.file=${albumFile.file} AND `:"";
        conds+=albumFile.id?`albumfile.id=${albumFile.id} AND `:"";
        conds=conds=="WHERE "? "":conds.substring(0, conds.length-4);
        return conds;
    }
    get(albumFileParam){
        return new Promise((resolve, reject)=>{
            const query= `Select * from AlbumFile `+this.getConditions(albumFileParam);
            this.db.query(query, (err, result)=>{
                if(err) throw new Error("Error at getting fileAlbum");
                resolve(result);
            });
        })
        
    }
    set(albumFileParam){
        const {track, album, file}=albumFileParam;
        const query=`INSERT INTO albumfile (track, album, file) VALUES (${track}, ${album}, ${file})`;
        conn.query(query);
    }
    delete(albumFileParam){
        const conds=this.getConditions(albumFileParam);
        if(conds=="")throw new Error("Missing albumfileParam at delete");
        const query=`DELETE FROM albumfile `+conds;
        this.db.query(query);

    }
}
