import conn from "../mysqlDB.js";
import Album from "../nativeClasses/album.js";


export default class albumMysqlDao{
    constructor(){
        this.db=conn;
    }
    getConditions(albumParam){
        let conds="WHERE ";
        const album=albumParam;
        conds+=album.name?`Album.name='${album.name}' AND `:"";
        conds+=album.description?`Album.title='${album.title}' AND `:"";
        conds+=album.cover?`Album.cover='${album.cover}' AND `:"";
        conds+=album.id?`Album.id=${album.id} AND `:"";
        conds=conds=="WHERE "? "":conds.substring(0, conds.length-4);
        return conds;
    }
    get(albumParam){
        const numberOfFiles=5;
        return new Promise((resolve, reject)=>{
            const query= `Select * from Album `+this.getConditions(albumParam);
            this.db.query(query, (err, result, fields)=>{
            if(err) reject(err);
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
}