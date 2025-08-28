const { contactsModel } = require("../../../Models/contactsSchema");

const createContactController = async(req,res)=>{
    try{
        console.log("-----------inside createContactController")
        const data = req.body;
        await contactsModel.create(data);
        res.status(201).json({
            isSuccess:true,
            message:"Contacts Added Successfully",
            contact:{
                data
            }
        })
    }
    catch(err){
        console.log("----------Error in createContactController",err.message)
        if(err.code===11000){
            res.status(400).json({
            isSuccess:false,
            message:" Do not Enter duplicate Items"
        })
        }
        res.status(500).json({
            isSuccess:false,
            message:" server Error in createContactController"
        })
    }
}

const getContactController = async(req,res)=>{
    try{
        console.log("-----------inside getContactController")
        const contacts = await contactsModel.find();
        res.status(200).json({
            isSuccess:true,
            message:"Conatacts fetched succesfully",
            contacts:{
                contacts
            }
        })
    }
    catch(err){
        console.log("error in getContactController",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Error in Getting Contacts"
        })
    }
}

const updateContactController = async(req,res)=>{
    try{
        console.log("-----------inside updateContactController")
        const data = req.body;
        const{contactId} = req.params;
        const contact = await contactsModel.findByIdAndUpdate(contactId,data);

        if(contact===null){
            res.status(400).json({
                isSuccess:false,
                message:"Please enter a valid ID that is in docs"
            })
            return
        }
        res.status(200).json({
            isSuccess:true,
            message:"Contact updated Sucessfully",
            contact:{
                contact
            }
        })
    }
    catch(err){
        console.log("----------Error in updateContactController",err.message)
        if(err.code===11000){
            res.status(400).json({
            isSuccess:false,
            message:" Do not Enter duplicate Items"
        })
        }
        res.status(500).json({
            isSuccess:false,
            message:" server Error in updateContactController"
        })
    }
}

const deleteContactController = async(req,res)=>{
    try{
        console.log("-----------inside deleteContactController")
        const{contactId} = req.params;
        const contact = await contactsModel.findByIdAndDelete(contactId);

        if(contact===null){
            res.status(400).json({
                isSuccess:false,
                message:"Please enter a valid ID tp delelte"
            })
            return
        }
        res.status(204).json({
            isSuccess:true,
            message:"Contact deleted Sucessfully",
        })
    }
    catch(err){
        console.log("----------Error in deleteContactController",err.message)
        if(err.code===11000){
            res.status(400).json({
            isSuccess:false,
            message:" Do not Enter duplicate Items"
        })
        }
        res.status(500).json({
            isSuccess:false,
            message:" server Error in deleteContactController"
        })
    }
}



module.exports={createContactController,getContactController,updateContactController,deleteContactController}