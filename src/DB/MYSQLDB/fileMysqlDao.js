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
        conds+=file.id?`FIle.id=${file.id} AND `:"";
        conds=conds.substring(0, conds.length-4);
        return conds;
    }
    getFiles(fileParam){
        const query= `Select * from File WHERE `+this.getConditions(fileParam);
        conn.query(query, (err, result, fields)=>{
            if(err) throw err;
            console.log(result);
        });
    }
}