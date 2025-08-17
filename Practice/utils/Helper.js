const fsPromises = require("fs/promises");


const readFile = async(path) =>{
    try{
        const data = await fsPromises.readFile(path,"utf-8");
        return JSON.parse(data);
    }
    catch(err){
        console.log("error in Reading the fiel",err.message);
        return []
    }
}
const saveFile = async(path,data) =>{
    try{
        const realData = JSON.stringify(data,null,2);
        await fsPromises.writeFile(path,realData)
    }
    catch(err){
        console.log("error in Reading the fiel",err.message);
        return []
    }
}

module.exports={readFile,saveFile}