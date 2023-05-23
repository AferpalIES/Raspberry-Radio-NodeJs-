import fileMysqlDao from './DB/MYSQLDB/fileMysqlDao.js';
import File from './DB/nativeClasses/file.js';
import app from './server.js';
const PORT= 8000;


app.listen(PORT, ()=>{
    console.log("running on port", PORT);
    
})
