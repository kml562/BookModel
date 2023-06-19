import  mongoose from "mongoose";

export const startSever =async (app,port, url) => {
try {
    mongoose.set('strictQuery', true)
    await  mongoose.connect(url,{
          useNewUrlParser: true,
          useUnifiedTopology: true
      })
      console.log("Connected to DB")


      app.listen(port, ()=>{
          console.log(`Running Up The Hill At ${port}km/hr`)
      })
} catch (error) {
    console.log(error);
}
}