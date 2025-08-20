const fspromises = require("fs/promises");

const myReadFile = async(path)=>{
    try{
        const data = await fspromises.readFile(path,"utf-8")
        return JSON.parse(data);
    }
    catch(err){
        console.log("Error in reading file",err.message)
        return []
    }
}

const mySaveFile = async(path,prevData)=>{
    try{
        const realdata = JSON.stringify(prevData,null ,2)
        await fspromises.writeFile(path,realdata);
    }
    catch(err){
        console.log("Error in saving file",err.message)
        return []
    }
}
module.exports={myReadFile,mySaveFile}