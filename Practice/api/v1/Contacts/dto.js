
const validateCreateContact = (req,res,next)=>{
    try{
        console.log("-----------inside validateCreateContact")
        const{name,email,phoneNumber}= req.body;

        if(!name || name.length<3){
            res.status(400).json({
                isSuccess:false,
                message:"Name length should be >3"
            })
            return;
        }
        const emailRegex =  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.(com|net|org)$/;
        if(!email || !emailRegex.test(email)){
            res.status(400).json({
                isSuccess:false,
                message:"Email should match the Regex"
            })
            return;
        }
        if(!phoneNumber || phoneNumber.length<10){
            res.status(400).json({
                isSuccess:false,
                message:"phoneNumber length should be >10"
            })
            return;
        }
        next();
    }
    catch(err){
        console.log("Error in validateCreateContact",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Cannot validateCreateContact"
        })
    }
}

const validateUpdateContact = (req,res,next)=>{
    try{
        console.log("-----------inside validateUpdateContact")
        const{name,email,phoneNumber}= req.body;
        const{contactId} = req.params;

        if(contactId.length>24){
            res.status(400).json({
                isSuccess:false,
                message:"Enter a valid Id<24"
            })
            return
        }

        if(name && name.length<3){
            res.status(400).json({
                isSuccess:false,
                message:"Name length should be >3"
            })
            return;
        }
        const emailRegex =  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.(com|net|org)$/;
        if(email && emailRegex.test(email)){
            res.status(400).json({
                isSuccess:false,
                message:"Email should match the Regex"
            })
            return;
        }
        if(phoneNumber && phoneNumber.length<10){
            res.status(400).json({
                isSuccess:false,
                message:"phoneNumber length should be >10"
            })
            return;
        }
        next();
    }
    catch(err){
        console.log("Error in validateUpdateContact",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Cannot validateUpdateContact"
        })
    }
}

const validateDeleteContact = (req,res,next)=>{
    try{
        console.log("-----------inside validateDeleteContact")
        const{contactId} = req.params;

        if(contactId.length>24){
            res.status(400).json({
                isSuccess:false,
                message:"Enter a valid Id<24"
            })
            return
        }
        next();
    }
    catch(err){
        console.log("Error in validateDeleteContact",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Cannot validateDeleteContact"
        })
    }
}




module.exports={validateCreateContact,validateUpdateContact,validateDeleteContact}