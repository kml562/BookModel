// import aws from 'aws-sdk';

// let uploadFile= async ( file) =>{
//     return new Promise( function(resolve, reject) {
//      // this function will upload file to aws and return the link
//      let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws
 
//      var uploadParams= {
//          ACL: "public-read",
//          Bucket: "classroom-training-bucket",  //HERE
//          Key: "abc/" + file.originalname, //HERE 
//          Body: file.buffer
//      }
 
 
//      s3.upload( uploadParams, function (err, data ){
//          if(err) {
//              return reject({"error": err})
//          }
//          console.log(data)
//          console.log("file uploaded succesfully")
//          return resolve(data.Location)
//      })
 
     
 
//     })
//  }
//  export let uploaddata= async function(req, res){

//         try{
//             let files= req.files
//             console.log(files)
//             if(files && files.length>0){
//                 //upload to s3 and get the uploaded link
//                 // res.send the link back to frontend/postman
//                 let uploadedFileURL= await uploadFile( files[0] )
//                 res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
//             }
//             else{
//                 res.status(400).send({ msg: "No file found" })
//             }
            
//         }
//         catch(err){
//             res.status(500).send({msg: err})
//         }
        
//     }
    
