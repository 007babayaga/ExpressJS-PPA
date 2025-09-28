
const { CategoryModel } = require("../../../Models/productCategoriesSchema");
const { productModel } = require("../../../Models/productSchema");

const createProductController = async (req, res) => {
    try {
        console.log("-----------inside createProductController------------ ")
        const data = req.body;
        await productModel.create(data);
        res.status(201).json({
            isSuccess: true,
            message: "Product added to Db Successfully",
            ProductAdded: {
                data
            }
        })
    }
    catch (err) {
        console.log(err)
        if (err.code == 11000 || err.text == "Validation Error") {
            res.status(400).json({
                isSuccess: false,
                message: "Please do not enter Duplicate Title"
            })
            return
        }
        console.log("Error in creating product", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Server side Error"
        })
    }
}

const getProductsController = async (req, res) => {
    try {
        console.log("-----------inside getProductsController------------ ")
        const products = await productModel.find();
        res.status(200).json({
            isSuccess: true,
            message: "Products fetched successfully",
            data: {
                products
            }
        })
    }
    catch (err) {
        console.log("erorr in getProductsController");
        res.status(500).json({
            isSuccess: false,
            message: "Server is unable to fetch products"
        })
    }
}

const updateProductController = async (req, res) => {
    try {
        console.log("-----------inside updateProductController------------ ");
        const data = req.body;
        const { productId } = req.params

        const updatedProduct = await productModel.findByIdAndUpdate(productId, data).lean();

        if (updatedProduct === null) {
            res.status(400).json({
                isSuccess: false,
                message: "(Format is corect) but Id is Invalid"
            })
            return
        }

        res.status(200).json({
            isSuccess: true,
            message: "Product Updated Successfully",
            updatedProduct: {
                updatedProduct
            }
        })
    }
    catch (err) {
        console.log(err)
        console.log("Error in Updating Product", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Server failed to Update Product"
        })
    }
}

const deleteProductController = async (req, res) => {
    try {
        console.log("-----------inside deleteProductController------------ ");
        const { productId } = req.params;
        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (deletedProduct === null) {
            res.status(400).json({
                isSuccess: false,
                message: "Format is Correct but Id is Invalid"
            })
            return
        }
        res.status(204).json({
            isSuccess: true,
            message: "Product Deleted Successfully",
            deletedProduct: {
                deletedProduct
            }
        })
    }
    catch (err) {
        console.log("Error in deleteProductController", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Server is Unable to delete Product"
        })
    }
}

const listProductController = async (req, res) => {
    try {
        console.log("-----------inside listProductController------------ ")
        const { limit, page, select = "title,price,quantity images", q = " ", maxPrice, minPrice, sort } = req.query;

        const selectedItems = select.replaceAll(",", " ");

        const searchRegex = new RegExp(q, "ig");

        let limitNum = parseInt(limit) || 4;
        if (limitNum >= 30) {
            limitNum = 30;
        }
        const pageNum = parseInt(page) || 1;
        const skipNum = (pageNum - 1) * limitNum;

        const query = productModel.find(); // abhi seedha mongoose --> mongoDb document par nhi jayega abhi sirf query le rha hai

        query.or([
            { title: searchRegex },
            { description: searchRegex },      // ye  search ki query
        ])

        if (maxPrice && !Number.isNaN(Number(maxPrice))) {
            query.where("price").lte(maxPrice);
        }
        if (minPrice && !Number.isNaN(Number(minPrice))) {
            query.where("price").gte(minPrice);
        }

        const totalDocuments = await query.clone().countDocuments();

        query.select(selectedItems);       // ye  selct ki query


        query.skip(skipNum);               // ye  limit ki query
        query.limit(limitNum);             // ye  Skip ki query

        if (sort === "asc") {
            query.sort({ price: 1 });
        } else if (sort === "desc") {
            query.sort({ price: -1 });
        }

        const products = await query       // Now All the Queries are Completed Now go to the Database and Execute Them
        res.status(200).json({
            isSuccess: true,
            message: "Products fetched successfully",
            data: {
                products,
                total: totalDocuments,
                skipNum,
                limit: Math.min(limitNum, products.length)
            }
        })
    }
    catch (err) {
        console.log("erorr in listProductController", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Server is unable to fetch products"
        })
    }

}
const viewProductController = async (req, res) => {
    try {
        console.log("-----------Inside viewProductController----------")
        const{productId} = req.params;

        const item = await productModel.findById(productId);
        res.status(200).json({
            isSuccess:true,
            message:"Product found SuccessFully",
            data:{
                product:item
            }
        })
    }
    catch (err) {
        console.log("erorr in viewProductController", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Server is unable to fetch products"
        })
    }

}
const createCategoryController = async (req, res) => {
    try {
        console.log("-----------Inside createCategoryController----------")
        const{slug,name} = req.body;

        const Category = await CategoryModel.create({
            slug:slug,
            name:name
        });
        res.status(201).json({
            isSuccess:true,
            message:"Category Added  SuccessFully",
            data:{
                productCategory:Category
            }
        })
    }
    catch (err) {
        console.log("erorr in createCategoryController", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Server is unable to Store product categories"
        })
    }

}
const getCategoryController = async (req, res) => {
    try {
        console.log("-----------Inside getCategoryController----------")

        const Categories = await CategoryModel.find();

        res.status(200).json({
            isSuccess:true,
            message:"Category Fetched  SuccessFully",
            data:{
                AllCategories:Categories
            }
        })
    }
    catch (err) {
        console.log("erorr in getCategoryController", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Server is unable to get Products Categories"
        })
    }

}

const getProductsByCategoryController = async (req, res) => {
    try {
        console.log("-----------Inside getProductsByCategoryController----------");
        const{slug} = req.params;
        const Allpdts = await productModel.find({"category":slug});
        
        res.status(200).json({
            isSuccess:true,
            message:" Products by Category Fetched  SuccessFully",
            data:{
                categoryPdts:Allpdts
            }
        })
    }
    catch (err) {
        console.log("erorr in getProductsByCategoryController", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Server is unable to get Products by Categories"
        })
    }

}
module.exports = { createProductController, getProductsController, updateProductController, deleteProductController, listProductController ,viewProductController,createCategoryController,getCategoryController,getProductsByCategoryController}