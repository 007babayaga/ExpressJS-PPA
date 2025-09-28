// const placeOrderValidator = (req,res,next)=>{
//     try{
//         console.log("---------------Inisde placeOrderValidator-------------")
//         const{products,address} = req.body;

//         if(!products || products.length<=0){
//             res.status(400).json({
//                 isSuccess:false,
//                 message:"Enter the Products First"
//             })
//             return
//         }
//         if(!address || address===undefined){
//             res.status(400).json({
//                 isSuccess:false,
//                 message:"Enter the Address First"
//             })
//             return
//         }
//         for(let product of products){
//             const{productId,quantity} = product;
//             if(!productId||!quantity||quantity<=0){
//                 res.status(400).json({
//                     isSuccess:false,
//                     message:"Please Enter Product ID and  Quantity"
//                 })
//                 return
//             }
//         }
//         next();
//     }
//     catch(err){
//         console.log("Error in placeOrderValidator",err.message);
//         res.status(500).json({
//             isSuccess:false,
//             message:"Server Error while Validating Placing Order"
//         })
//     }
// }

// module.exports={placeOrderValidator}