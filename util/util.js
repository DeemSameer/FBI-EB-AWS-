import fs from "fs";
import Jimp from "jimp";
import axios, {isCancel, AxiosError} from 'axios';
import path,{ resolve  } from 'path'; // Import the path module


// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
 export async function filterImageFromURL(inputURL) {
 return new Promise(async (resolve, reject) => {
    try {
      const photo = await axios({
        method: 'get',
        url: inputURL,
        responseType: 'arraybuffer'
      })
      .then(function ({data: inputURL}) {
        return Jimp.read(inputURL);
      }); 
    const outpath = "./tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";

    photo 
    .resize(256, 256) // resize
    .quality(60) // set JPEG quality
    .greyscale() // set greyscale
    .write(outpath, (img) => {
      resolve(path.resolve(outpath));
    });
  } catch (error) {
    reject(error);
  }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
 export async function deleteLocalFiles(files) {
  for (let file of files) {
    try{
      fs.unlinkSync(file);
    }catch(error){
      console.log(error);
    }
  }
}
