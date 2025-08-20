const { v4: uuidv4 } = require('uuid');
const { myReadFile, mySaveFile } = require('../utils/Filehelper');

const ORDERS_FILE_PATH = "./models/orders.json"

const saveproduct = async(data)=>{
    const oldData = await myReadFile(ORDERS_FILE_PATH);
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
    await mySaveFile(ORDERS_FILE_PATH,oldData);
}

const readProduct = async()=>{
    const data = await myReadFile(ORDERS_FILE_PATH);
    return data;
}

module.exports={saveproduct,readProduct}