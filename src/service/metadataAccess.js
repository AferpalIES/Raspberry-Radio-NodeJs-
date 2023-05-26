import jsmediatags from "jsmediatags"
import {Buffer} from "node:buffer"
import { sep } from "node:path";
import { getAudioDurationInSeconds } from "get-audio-duration/dist/es6/index.js";

export function accessImage(path){
  return new Promise((resolve, reject) =>{
    jsmediatags.read(path, {
      onSuccess: function(metadata){
        if(metadata.tags.picture){
          let byteBuffer = metadata.tags.picture.data??"";
          let base64String = Buffer(byteBuffer).toString("base64")
          resolve({base64String: base64String, format: metadata.tags.picture.format});
        }else{
          reject(new Error(`${path} file has no picture data`));
        }
        
      }, 
      onError: function(error){
        reject(error);
      }
    })
  })
}

export async function accessMetadata(path){
  return new Promise((resolve) =>{
    jsmediatags.read(path, {
      onSuccess: async function(metadata){
        !metadata.tags.artist? metadata.tags.artist = "unknown":""
        metadata.tags.author = metadata.tags.artist
        if (!metadata.tags.title){
          let splitPath = path.split(sep)
          let fileName = splitPath[splitPath.length - 1]
          let splitName = fileName.split(".")
          let title = ""
          for (let i = 0; i<splitName.length - 1; i++){
            i>0?title += `.${splitName[i]}`:title += `${splitName[i]}`
          }
          metadata.tags.title = title
        }
        let duration = await getAudioDurationInSeconds(path)
        metadata.tags.duration = duration
        resolve(metadata.tags)
      }
    })
  })
}