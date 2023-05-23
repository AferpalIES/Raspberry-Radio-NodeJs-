import conn from "./mysqlDB.js";
import fileMysqlDao from "./MYSQLDB/fileMysqlDao.js";

const FILE_DB_OPTIONS={
    "1": fileMysqlDao
}
const ALBUM_DB_OPTIONS={
    "1":conn
}
const ALBUM_FILE_DB_OPTIONS={
    "1":conn
}
export function createFileDao(dbType){
    return new FILE_DB_OPTIONS[dbType]();
}

export function createALbumDao(dbType){
    return new ALBUM_DB_OPTIONS[dbType]();
}
export function createAlbumFileDao(dbType){
    return new ALBUM_FILE_DB_OPTIONS[dbType]();
}