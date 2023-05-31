import { MpgPlayer } from "mpg123";

let player = new MpgPlayer()


export function playMusicFile(path){
    player.play(path)
}

export function toggleMusicFile(){
    player.pause()
}

export function stopMusicFile(){
    player.close()
}

export function setVolume(volume){
    player.volume(volume)
}

export function setProgress(progress){
    player.seek(progress)
}

export function convertSecondstoProgress(seconds){
    let duration = player.length
    let progress = seconds/duration
    return progress
}
