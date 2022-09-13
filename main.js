const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')

const writeStream = fs.createWriteStream("productData.csv");
writeStream.write(`Product Name,Product Price,Product Item,Model Number,Producty Description, Product Category\n`);


const URL = 'https://www.quill.com/hanging-file-folders/cbl/4378.html'
// console.log(URL);
axios.get(URL).then((response) => {
    // console.log(response);
    const $ = cheerio.load(response.data)
   
    $('.SearchResultsNew').each(function(index,ele){
        
        if(index>9){
            return
        }
        console.log(index);
        const product_name = $(ele)
            .find('#skuName')
            .text().replace(/,/g, '').trim()
        // console.log(product_name)
        const Product_Price = $(ele)
            .find('#SkuPriceUpdate')
            .text()
            // console.log(Product_Price); 
        const Item_Number = $(ele)
            .find('.iNumber')
            .text()
            // console.log(Item_Number);
        const Model_Number = $(ele)
            .find('.model-number')
            .text()
            // console.log(Model_Number);
        const Product_Description = $(ele)
            .find('.skuBrowseBullets')
            .text().replace(/,/g, '').trim()
            // console.log(Product_Description);
        const product_category = $(response.data)
            .find('.ML_s')
            .text()
            // console.log(product_category)

        writeStream.write(`${product_name},${Product_Price},${Item_Number},${Model_Number},${Product_Description},${product_category}\n`);
        
    })
    console.log("Done.........!");
}).catch((err) => {
    console.log(err);
    
});




















