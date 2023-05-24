import AlbumFileMysqlDao from "./MYSQLDB/albumFileMysqlDao.js";
import albumMysqlDao from "./MYSQLDB/albumMysqlDao.js";
import fileMysqlDao from "./MYSQLDB/fileMysqlDao.js";

const FILE_DB_OPTIONS={
    "1": fileMysqlDao
}
const ALBUM_DB_OPTIONS={
    "1":albumMysqlDao
}
const ALBUM_FILE_DB_OPTIONS={
    "1":AlbumFileMysqlDao
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