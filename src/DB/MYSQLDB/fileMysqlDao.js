import conn from "../mysqlDB.js";
import File from "../nativeClasses/file.js";


export default class fileMysqlDao{
    constructor(){
        this.db=conn;
    }
    getConditions(fileParam){
        let conds="";
        const file=fileParam;
        conds+=file.name?`File.name='${file.name}' AND `:"";
        conds+=file.title?`File.title='${file.title}' AND `:"";
        conds+=file.type?`File.type='${file.type}' AND `:"";
        conds+=file.author?`File.author='${file.author}' AND `:"";
        conds+=file.durationInSeconds?`File.duration=${file.durationInSeconds}' AND `:"";
        conds+=file.cover?`File.cover='${file.cover}' AND `:"";
        conds+=file.id?`File.id=${file.id} AND `:"";
        conds=conds.substring(0, conds.length-4);
        return conds;
    }
    getFiles(fileParam, {numberOfFiles}){
        return new Promise((resolve, reject)=>{
            const query= `Select * from File WHERE `+this.getConditions(fileParam);
            conn.query(query, (err, result, fields)=>{
            if(err) reject(err);
            resolve(result.length>numberOfFiles?result.slice(0, numberOfFiles):result);
        });
        })
    }
    setFile(fileParam){
        const {name, title, durationInSeconds, type, cover, author}=fileParam;
        const query=`INSERT INTO File (name, title, duration, type, cover, author) VALUES ('${name}', '${title}', ${durationInSeconds}, '${type}', '${cover}', '${author}')`;
        conn.query(query);
    }

}