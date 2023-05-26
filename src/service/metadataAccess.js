import jsmediatags from "jsmediatags"
import {Buffer} from "node:buffer"
import { error } from "node:console";

export function accessImage(path){
  return new Promise((resolve, reject) =>{
    jsmediatags.read(path, {
      onSuccess: function(metadata){
        if(metadata.tags.picture){
          let byteBuffer = metadata.tags.picture.data??"";
          let base64String = Buffer(byteBuffer)
          resolve({base64String: base64String, format: metadata.tags.picture.format});
        }else{
          
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
      onSuccess: function(metadata){
        resolve(metadata.tags)
      }
    })
  })
}