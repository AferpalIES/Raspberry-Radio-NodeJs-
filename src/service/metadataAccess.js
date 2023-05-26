import jsmediatags from "jsmediatags"
import {Buffer} from "node:buffer"
import { error } from "node:console";
import { getAudioDurationInSeconds } from "get-audio-duration/dist/es6/index.js";

export function accessImage(path){
  console.log("has pasado x aqui");
  return new Promise((resolve, reject) =>{
    jsmediatags.read(path, {
      onSuccess: function(metadata){
        if(metadata.tags.picture){
          console.log(metadata.tags)
          let byteBuffer = metadata.tags.picture.data??"";
          let base64String = Buffer(byteBuffer)
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

export function accessMetadata(path){
  return new Promise((resolve) =>{
    jsmediatags.read(path, {
      onSuccess: async function(metadata){
        let duration = getAudioDurationInSeconds(path)
        metadata.tags.duration = duration
        resolve(metadata.tags)
      }
    })
  })
}