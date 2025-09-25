const express = require('express');
const { createProductController, getProductsController, updateProductController, deleteProductController, listProductController, viewProductController, createCategoryController, getCategoryController, getProductsByCategoryController } = require('./conrollers');
const { validateCreateProduct, validateUpdateProduct, validateDeleteProduct, validatelistProduct, validateViewProduct, validateCreatecategory } = require('./dto');
const { validateLoggedInUserMiddleware } = require('../../middleware');

const productsRouter = express.Router();

//  this is a router level middleware any request comes will go through this middleware(it is also a global Middleware) 
// productsRouter.use(validateLoggedInUserMiddleware);

productsRouter.get("/",validatelistProduct,listProductController);
productsRouter.get("/all",getProductsController);
productsRouter.post("/",validateCreateProduct,createProductController)
productsRouter.post("/category",validateCreatecategory,createCategoryController)
productsRouter.get("/category/all",getCategoryController)
productsRouter.get("/category/:slug",getProductsByCategoryController)
productsRouter.patch("/:productId",validateLoggedInUserMiddleware,validateUpdateProduct,updateProductController)
productsRouter.delete("/:productId",validateLoggedInUserMiddleware,validateDeleteProduct,deleteProductController)
productsRouter.get("/view/:productId",validateViewProduct,viewProductController)


module.exports={productsRouter}