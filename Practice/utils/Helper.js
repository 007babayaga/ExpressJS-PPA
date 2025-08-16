const fsPromises = require("fs/promises");

const readFile = async(path)=>{
    try{
        const data = await fsPromises.readFile(path,"utf-8");
        return JSON.parse(data)
    }
    catch(err){
        console.log("error in reading file",err.message)
        return []
    }
}

const saveFile = async(filePath,data)=>{
    try{
        const realData = JSON.stringify(data,null ,2)
        await fsPromises.writeFile(filePath,realData);
    }
    catch(err){
        console.log("error in saving file",err.message);
        return []
    }
}


module.exports={readFile,saveFile}