const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { google } = require("googleapis");
const multerDrive = require("multer-drive");

// const auth = new google.auth.JWT({
//   email: "naikvaibhav1994@gmail.com",
//   key: "rzHEqCql-gEhUH_XImrpzSt1",
//   scopes: ["https://www.googleapis.com/auth/drive"]
// });
//set storage engine
// const storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function(req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   }
// });

// //init upload
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10000000 },
//   fileFilter: function(req, file, cb) {
//     checkFileType(file, cb);
//   }
// }).single("myImage");

// //check file type
// function checkFileType(file, cb) {
//   //Allowed ext
//   const fileTypes = /jpeg|jpg|png|gif/;
//   //check ext
//   const extname = fileTypes.test(
//     path.extname(file.originalname).toLocaleLowerCase()
//   );
//   //check mime
//   const mimetype = fileTypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only!");
//   }
// }

// router.get("/", (req, res) => res.render("./index"));

// router.post("/upload", (req, res) => {
//   upload(req, res, err => {
//     if (err) {
//       res.render("index", {
//         msg: err
//       });
//     } else {
//       //   console.log(req.file);
//       //   res.send("test");
//       if (req.file == undefined) {
//         res.render("index", {
//           msg: "Error: No File Selected!"
//         });
//       } else {
//         res.render("index", {
//           msg: "File uploaded!",
//           file: `uploads/${req.file.filename}`
//         });
//       }
//     }
//   });
// });
// const multer = Multer({
//   storage: Multer.MemoryStorage,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // no larger than 5mb
//   }
// });

// router.post('/upload', multer.single('my file'), (req, res, next) => {
//   const { google } = require('googleapis');
//   const stream = require('stream');
//   const serviceAccount = 'PATH TO SERVICE ACCOUNT';
//   let fileObject = req.file;
//   let bufferStream = new stream.PassThrough();
//   bufferStream.end(fileObject.buffer);
//     const jWTClient = new google.auth.JWT(
//       'naikvaibhav1994@gmail.com',
//       null,
//       'rzHEqCql-gEhUH_XImrpzSt1',
//       ['<COMMA SEPARATED SCOPES WHICH ARE AUTHORIZED>']
//     )
//     google.drive({ version: 'v3'})
//         .files.create({
//             auth: jWTClient,
//             media: {
//                 mimeType: 'application/jpeg',
//                 body: bufferStream
//             },
//             resource: {
//                 name: 'test.jpeg',
//                 // if you want to store the file in the root, remove this parents
//                 parents: ['Drive folder id in which the file needs to be uploaded.']
//             },
//             fields: 'id',
//         }).then(function (resp) {
//             console.log(resp,'resp');
//         }).catch(function (error) {
//             console.log(error);
//         })
//     res.send('File uploaded');
// });
module.exports = router;
