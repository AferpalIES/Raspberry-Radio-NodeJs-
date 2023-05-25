import conn from "./mysqlDB.js";
import Album from "../nativeClasses/album.js";


export default class albumMysqlDao{
    constructor(){
        this.db=conn;
    }
    getConditions(albumParam){
        let conds="WHERE ";
        const album=albumParam;
        conds+=album.name?`name='${album.name}' AND `:"";
        conds+=album.description?`description='${album.description}' AND `:"";
        conds+=album.cover?`cover='${album.cover}' AND `:"";
        conds+=album.id?`id=${album.id} AND `:"";
        conds=conds=="WHERE "? "":conds.substring(0, conds.length-4);
        return conds;
    }

    getUpdateFileds(album){
        let conds="SET ";
        conds+=album.name?`name='${album.name}', `:"";
        conds+=album.description?`description='${album.description}', `:"";
        conds+=album.cover?`cover='${album.cover}', `:"";
        conds=conds=="WHERE "? "":conds.substring(0, conds.length-2);
        return conds;
    }
    get(albumParam){
        const numberOfFiles=5;
        return new Promise((resolve, reject)=>{
            const query= `Select * from Album `+this.getConditions(albumParam);
            this.db.query(query, (err, result, fields)=>{
            if(err) throw err;
                result=result.map(row=>{
                    return new Album(row);
                })
            
            resolve(result.length>numberOfFiles?result.slice(0, numberOfFiles):result);
        });
        })
    }
    set(albumParam){
        const {name, cover, description}=albumParam;
        const query=`INSERT INTO Album (name, cover, description) VALUES ('${name}', '${cover}', '${description}')`;
        this.db.query(query);
    }
    delete(albumParam){
        const conds=this.getConditions(albumParam);
        if(conds=="")throw new Error("Missing albumParam at delete");
        const query=`DELETE FROM Album `+conds;
        this.db.query(query);
    }
    async update(album, oldAlbum){
        const oldAlbumID= await this.get(oldAlbum);
        const query=`UPDATE Album ${this.getUpdateFileds(album)} WHERE id=${oldAlbumID[0].id}`;
        this.db.query(query);
    }
}