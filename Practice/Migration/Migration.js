const data = require("./data.json");


const insertData = async(data)=>{
    await fetch('http://localhost:4000/api/v1/products',{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "content-type":"application/json"
        }
    })
}

const AddPdt = async()=>{
    const{products} = data

    for(let i=0;i<products.length;i++){
        const productToAdded = products[i];
        productToAdded.price = Math.round(productToAdded.price*80);
        await insertData(productToAdded);
    }
}

AddPdt();