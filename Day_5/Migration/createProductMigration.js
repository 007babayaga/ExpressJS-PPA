const data = require("./data.json");

const createProduct=async(soloproduct)=>{
    try{
        const resp = await fetch('http://localhost:3900/api/v1/products/',{
            method:"POST",
            body:JSON.stringify(soloproduct),
            headers:{
                "Content-Type": "application/json",
            },
        });
        const result = await resp.json();
        if(resp.status!=201){
            console.log("Error in Creating Product")
            console.log(result.message);
        }
    }
    catch(err){
        console.log("--Error in creating Product",err.message);
    }
}


const createProductMigration = async()=>{
    const{products} = data;
    for(let i =0;i<products.length;i++){
        const productData = products[i];
        productData.price= Math.round(productData.price *85);
        await createProduct(productData)
        console.log("Product created",i+1);
    }
}

createProductMigration();
