import jsmediatags from "jsmediatags"
import {Buffer} from "node:buffer"
import { getAudioDurationInSeconds } from "get-audio-duration/dist/es6/index.js";

export function accessImage(path){
  return new Promise((resolve, reject) =>{
    jsmediatags.read(path, {
      onSuccess: function(metadata){
        if(metadata.tags.picture){
          let byteBuffer = metadata.tags.picture.data??"";
          let base64String = Buffer.from(byteBuffer).toString('base64');
          resolve({base64String: base64String, format: metadata.tags.picture.format});
        }else{
          resolve("NO IMG");
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
        metadata.tags.duration = await getAudioDurationInSeconds(path);
        metadata.tags.author=metadata.tags.artist??"Unknown";
        metadata.tags.type=metadata.type=="ID3"?"mp3":"m4a";
        resolve(metadata.tags)
      }
    })
  })
}