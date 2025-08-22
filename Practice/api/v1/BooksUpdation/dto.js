const { readBooks } = require("../../../Models/booksModel");

const validateUpdation = async(req,res,next)=>{
    const{bookId} = req.params;
    const {author,title} = req.body;

    if(!author || author.length<5){
        res.status(400).json({
            isSuccess:false,
            message:"Inavalid Author"
        })
        return
    }
    if(!title || title.length<5){
        res.status(400).json({
            isSuccess:false,
            message:"Inavalid title"
        })
        return
    }
    const allBooks = await readBooks();
    const idx= allBooks.findIndex((ele)=>{
        return String(ele.id) === String(bookId);
    })
    if(idx===-1){
        res.status(400).json({
            isSuccess:false,
            message:"Invalid Book Igd"
        })
        return;
    }
    next();
}
module.exports={validateUpdation}