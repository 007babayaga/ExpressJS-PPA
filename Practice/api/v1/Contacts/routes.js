const express = require('express');
const { validateCreateContact, validateUpdateContact, validateDeleteContact } = require('./dto');
const { createContactController, getContactController, updateContactController, deleteContactController } = require('./controllers');

const contactRouter = express.Router();

contactRouter.post("/",validateCreateContact,createContactController)
contactRouter.get("/",getContactController)
contactRouter.patch("/:contactId",validateUpdateContact,updateContactController)
contactRouter.delete("/:contactId",validateDeleteContact,deleteContactController)




module.exports={contactRouter}