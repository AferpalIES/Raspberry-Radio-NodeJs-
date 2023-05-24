import jsmediatags from "jsmediatags"
import {Buffer} from "node:buffer"

export function accessImage(path){
  return new Promise((resolve) =>{
    jsmediatags.read(path, {
      onSuccess: function(metadata){
        let byteBuffer = metadata.tags.picture.data
        let base64String = Buffer(byteBuffer)
        resolve({base64String: base64String, format: metadata.tags.picture.format})
      }
    })
  })
}