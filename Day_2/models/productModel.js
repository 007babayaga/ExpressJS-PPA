const { v4: uuidv4 } = require('uuid');
const { myReadFile, mySaveFile } = require('../utils/Filehelper');

const PRODUCT_FILE_PATH = "./models/products.json"

const saveproduct = async(data)=>{
    const oldData = await myReadFile(PRODUCT_FILE_PATH);
    const idx = oldData.findIndex((ele)=>{
        if(ele.ItemName===data.ItemName){
            return true;
        }
        else{
            return false;
        }
    })
    if(idx !==-1){
        throw new Error("Title is already present")
    }
    data.id = uuidv4();
    oldData.push(data);
    await mySaveFile(PRODUCT_FILE_PATH,oldData);
}

const readProduct = async()=>{
    const data = await myReadFile(PRODUCT_FILE_PATH);
    return data;
}

module.exports={saveproduct,readProduct}