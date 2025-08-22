const validateAddBooks = (req,res,next)=>{
    const{title,author} = req.body;

    if(!title|| title.length<5){
        res.status(400).json({
            isSuccess:false,
            message:"Enter a valid book title c>5"
        })
        return;
    }
     if(!author|| author.length<5){
        res.status(400).json({
            isSuccess:false,
            message:"Enter a valid book author c>5"
        })
        return;
    }
    req.body={title:title.trim(),author};
    next();
}

module.exports={validateAddBooks}