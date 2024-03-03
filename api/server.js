const express = require('express')
const app = express()

// making port
const PORT = 3003;
app.listen(PORT, ()=> {
    console.log(`Connected to port: ${PORT}`)
})

// middlewares
app.use(express.json())

// environment variables
const dotenv = require('dotenv')
dotenv.config()

// connecting to mongoDB with mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)
.then(succ => console.log('connected to mongoDB...'))
.catch(err => console.log('something went wrong...', err))

// making routes
const routes = require('./routes/routes.js')
app.use(routes)

// uploading file to mongodb
const Grid = require("gridfs-stream");
const multer = require("multer");
const { Readable } = require("stream");
const File = require('./models/file.js')

let connection = mongoose.connection;

connection.on("open", ()=> {
    console.log("connection established successfully")
    let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db)

    const  storage =  multer.memoryStorage()
    const upload  =   multer({storage})

    // Uploading file route
    app.post("/upload",upload.single("file"), async (req, res)=> {
        let {file} =  req
        console.log(file)

        let {fieldname, originalname, mimetype, buffer} = file

        let newFile = new File({
        filename: originalname,
        contentType: mimetype,
        length: buffer.length,
        })


        try{
            let uploadStream = bucket.openUploadStream(fieldname)
            let readBuffer = new Readable()
            readBuffer.push(buffer)
            readBuffer.push(null)
    
    
            const isUploaded = await new Promise((resolve, reject)=>{
                readBuffer.pipe(uploadStream)
                .on("finish", resolve("successfull"))
                .on("error" , reject("error occured while creating stream") )
            })
    
            
            newFile.id = uploadStream.id
           let savedFile =  await newFile.save()
           if(!savedFile){
            return res.status(404).send("error occured while saving our work")
           }
           return res.send({file: savedFile, message: "file uploaded successfully"})
        }
        catch(err){
            console.error(err)
        res.send("error uploading file")
        }

    
    })

    // getting and viewing the uploaded files route
    app.get('/files/:fileId', (req, res) => {
    const fileId = req.params.fileId;
    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));

    downloadStream.pipe(res);
    });
})