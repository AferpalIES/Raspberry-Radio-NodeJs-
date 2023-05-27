import jsmediatags from "jsmediatags"
import {Buffer} from "node:buffer"
import { sep } from "node:path";
import { getAudioDurationInSeconds } from "get-audio-duration/dist/es6/index.js";

export function accessImage(path){
  return new Promise((resolve, reject) =>{
    jsmediatags.read(path, {
      onSuccess: function(metadata){
        if(metadata.tags.picture && typeof(metadata.tags.picture)!="string"){
          let byteBuffer = metadata.tags.picture.data;
          let base64String = Buffer.from(byteBuffer).toString('base64');
          resolve({base64String: base64String, format: metadata.tags.picture.format});
        }else{
          resolve({base64String:"not found", format:"not found"})
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
        resolve(await normaliceTags(metadata, path));
      }
    })
  })
}


async function normaliceTags(metadata, path){
      const normalicedTypes={
        "ID3":"mp3",
        "MP4":"m4a"
      }
      !metadata.tags.artist? metadata.tags.artist = "unknown":""
      metadata.tags.author = metadata.tags.artist;
      let name = path.split(sep).at(-1);
      metadata.tags.name=name.substring(0, name.lastIndexOf('.'));
      console.log(metadata);
      if (!metadata.tags.title){
        let fileName = path.split(sep).at(-1);
        let splitName = fileName.substring(0, fileName.lastIndexOf('.'));
        metadata.tags.title = splitName;
      }
      let duration = await getAudioDurationInSeconds(path)
      metadata.tags.duration = duration;
      metadata.tags.type=normalicedTypes[metadata.type];
      return metadata.tags;
}