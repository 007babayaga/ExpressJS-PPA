
const { readFile,saveFile } = require("../utils/Helper");
const { v4: uuidv4 } = require('uuid');

const PATH = "./Models/books.json"

const saveBooks = async(data)=>{
    const oldData = await readFile(PATH);
    data.id = uuidv4();
    oldData.push(data);
    await saveFile(PATH,oldData);
}

const readBooks = async()=>{
    const books = await readFile(PATH);
    return books;
}

module.exports = {saveBooks,readBooks}