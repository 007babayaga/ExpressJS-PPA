const { saveBooks, readBooks } = require("../../../Models/booksModel");

const createBookController = async(req,res)=>{
    try{
        const data = req.body;
        await saveBooks(data);
        res.status(201).json({
            isSuccess:true,
            message:"Book added Successfully"
        })
    }
    catch(err){
        console.log("Error in saving file",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Error in adding book"
        })
    }
}
const getBookController = async(req,res)=>{
    const allBoooks = await readBooks();
    res.status(200).json({
        isSuccess:true,
        message:"Books fetched successFully",
        data:allBoooks
    })
}
module.exports={createBookController,getBookController}