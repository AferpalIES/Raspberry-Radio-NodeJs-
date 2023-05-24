import Sound from "node-mpg123";

export function playMusicFile(path){
    let music = new Sound(path)
    music.play()
    return music
}