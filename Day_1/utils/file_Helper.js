const fsPromises = require('fs/promises');

const myReadFile = async(filePath)=>{
try{
    const data =  await fsPromises.readFile(filePath,"utf-8");
    return JSON.parse(data);
}
catch(err){
    console.log("Error in file Reading-",err.message)
    return []
}
}

const mySaveFile = async(filepath,data)=>{
    try{
        const save = JSON.stringify(data,null,2);
        await fsPromises.writeFile(filepath,save);
    }
    catch(err){
        console.log("Error in saving the file",err.message);
    }
}

module.exports={myReadFile,mySaveFile}