import conn from "./mysqlDB.js";
import File from "../nativeClasses/file.js";

export default class fileMysqlDao{
    constructor(){
        this.db=conn;
    }
    getConditions(fileParam){
        let conds="WHERE ";
        const file=fileParam;
        conds+=file.name?`name='${file.name}' AND `:"";
        conds+=file.title?`title='${file.title}' AND `:"";
        conds+=file.type?`type='${file.type}' AND `:"";
        conds+=file.author?`author='${file.author}' AND `:"";
        conds+=file.durationInSeconds?`duration=${file.durationInSeconds} AND `:"";
        conds+=file.cover?`cover='${file.cover}' AND `:"";
        conds+=file.id?`id=${file.id} AND `:"";
        conds=conds=="WHERE "? "":conds.substring(0, conds.length-4);
        return conds;
    }
    getUpdateFileds(file){
        let conds= "SET ";
        conds+=file.name?`name='${file.name}', `:"";
        conds+=file.title?`title='${file.title}', `:"";
        conds+=file.type?`type='${file.type}', `:"";
        conds+=file.author?`author='${file.author}', `:"";
        conds+=file.durationInSeconds?`duration=${file.durationInSeconds}', `:"";
        conds+=file.cover?`cover='${file.cover}', `:"";
        conds=conds=="WHERE "? "":conds.substring(0, conds.length-2);
        return conds;
    }
    get(fileParam){
        const numberOfFiles=50;
        return new Promise((resolve, reject)=>{
            const query= `Select * from File `+this.getConditions(fileParam);
            conn.query(query, (err, result, fields)=>{
            if(err) throw err;
            result=result.map(row=>{
                return new File(row);
            })
            resolve(result.length>numberOfFiles?result.slice(0, numberOfFiles):result);
        });
        })
    }
    set(fileParam){
        const {name, title, durationInSeconds, type, cover, author}=fileParam;
        console.log(cover);
        const query=`INSERT INTO File (name, title, duration, type, cover, author) VALUES ('${name}', '${title}', ${durationInSeconds}, '${type}', '${cover.base64String}', '${author}')`;
        conn.query(query);
    }
    delete(fileParam){
        const conds=this.getConditions(fileParam);
        if(conds=="") throw new Error('Missing file to delete');
        const query= `DELETE FROM File `+conds;
        conn.query(query);
    }
    async update(file, oldFile){
        const oldFileID= await this.get(oldFile);
        const query=`UPDATE File ${this.getUpdateFileds(file)} WHERE id=${oldFileID[0].id}`;
        this.db.query(query);
    }
}