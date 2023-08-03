/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import * as fs from "fs";
inquirer
  .prompt([
    /* Pass your questions in here */
    {
        name: "url",
        message:"Enter URL to generate a QR code for:"
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    var URL = answers.url;
    console.log(URL);
    var qr_png = qr.image(URL, { type: "png" });
    qr_png.pipe(fs.createWriteStream(URL + ".png"));

    var logStream = fs.createWriteStream("log.txt", { flags: "a+" });
    // use {flags: 'a'} to append and {flags: 'w'} to erase and write a new file
    logStream.write(URL + "\n");
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log(error);
    } else {
      // Something else went wrong
      console.log(error);
    }
  });
