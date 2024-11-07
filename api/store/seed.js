
import prisma from "../prisma/prisma.js";

const seed = async () => {
    try{   
        const res = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        const db_data = await res.json();
        console.log(db_data.length);
        if(db_data.length > 0){
            try{
                for (const item of db_data){
                    await prisma.productTransaction.create({
                        data: {
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            category: item.category,
                            price: item.price,
                            image: item.image,
                            sold: item.sold,
                            dateOfSale: item.dateOfSale
                        }
                    })
                    console.log(item?.id);
                }
            }catch(err){
                console.log("Error while adding seeded data...," + err)
                return false;
            }
        }
    }catch(err){
        console.log("Error while Fetching data from S3");
        return  false;
    }
    return true;
}

export default seed;