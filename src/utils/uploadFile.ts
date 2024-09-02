import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "./firebase";

const storage = getStorage(app);

export const uploadFile = (
  file: File,
  folder: string, // Add a folder parameter
  onProgress: (progress: number) => void // Add a callback for progress
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const name = new Date().getTime() + "_" + file.name;
    const storageRef = ref(storage, `${folder}/${name}`); // Store in a specified folder

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        // Call the progress callback
        if (onProgress) {
          onProgress(progress);
        }

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject(error); // Reject the promise if there's an error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL); // Resolve the promise with the download URL
          })
          .catch((error) => {
            reject(error); // Reject the promise if there's an error in getting the download URL
          });
      }
    );
  });
};
