const { readBooks, saveBooks } = require("../../../Models/booksModel");
const { saveFile } = require("../../../utils/Helper");

const updateConroller = async(req,res) =>{
    try{
        const{bookId} = req.params;
        const data = req.body;
        const allBooks = await readBooks();
        const idx = allBooks.findIndex((ele)=>{
            return ele.id === bookId;
        })
        const oldObj = allBooks[idx];
        allBooks[idx] = {...oldObj,...data};
        await saveFile("/models/books.json",allBooks);
        res.status(200).json({
            isSuccess:true,
            message:"Books updated Successfully"
        })
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({
            isSuccess:false,
            message:"Error in updating Book"
        })
    }

}
module.exports={updateConroller}