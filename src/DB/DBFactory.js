import conn from "./mysqlDB";
import fileMysqlDao from "./MYSQLDB/fileMysqlDao";

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
    return FILE_DB_OPTIONS[dbType];
}

export function createALbumDao(dbType){
    return ALBUM_DB_OPTIONS[dbType]
}
export function createAlbumFileDao(dbType){
    return ALBUM_FILE_DB_OPTIONS[dbType];
}