const fsPromises = require("fs/promises");

const readFile = async(filepath)=>{
try{
    const data = await fsPromises.readFile(filepath,"utf-8");
    return JSON.parse(data);
}
catch(err){
    console.log("error in reading file",err.message);
    return[]
}
}

const saveData = async(file,dataa)=>{
try{
    const realData = JSON.stringify(dataa,null ,2)
    await fsPromises.writeFile(file,realData);
}
catch(err){
    console.log("error in reading file",err.message);
    return []
}
}

module.exports={readFile,saveData}