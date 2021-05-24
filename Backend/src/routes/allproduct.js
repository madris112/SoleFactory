const express = require('express');
const router  = new express.Router();
const product = require('../models/product');
const orderModel = require('../models/orderhistory');
const multer  = require('multer');
const path    = require("path");




console.log("hi");

// product search route
router.post('/product/search', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req.body.searchname);

  if (req.body.searchname != null && req.body.searchname !== '' && req.body.searchname!=='All') {
    search = new RegExp(req.body.searchname, 'i')
  } else {
    search = new RegExp('(.*?)','i')
  }
  //console.log(search)
  try {
    let products = null
    if(req.body.category && req.body.searchname!=='All')
        products = await product.find({categoryTag:search})
    else
        products = await product.find({brand:search})
    // console.log(products)
    return res.status(200).json(products)
  } catch(error) {
    console.log("i have a search error: " + error);
  }
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"../uploads/"))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() +file.originalname)
  }
});

const upload = multer({ storage: storage }).single('file')

router.post('/createProduct',upload, function (req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    payload = JSON.parse(req.body.payload);
    console.log(payload);
    console.log(req.file.path);
    
    try {
        product.findOne({
            Title: payload.title,
        }).then((doc) => {
            if (!doc) {
    
                let coinvalue = parseInt(payload.price);
                    coinvalue = coinvalue / 10;
                console.log(coinvalue);

                  
                
                try {
                    product.create({
                        Title          : payload.title,
                        description    : payload.description,
                        brand          : payload.brand,
                        Quantity       : payload.Quantity,
                        price          : payload.price,
                        seller         : payload.seller,
                        expiryDate     : payload.expiryDate,
                        DiscountedPrice: payload.discountedPrice,
                        categoryTag    : payload.categoryTag,
                        imgURL         : req.file.filename,
                        CoinValue      : coinvalue,
                        Rating         : "0",
                        NoOfUserRated  : "0",
                        
        
                    }
                    ).then((docs) => {
        
                        console.log("product created successfully\n" + docs);
                        res.status(200).send({
                            message: "product created successfully",
                            product: docs
                        });
                        
                    });
                } catch (error) {
                    console.error("creating a new product failure : " + error)
                    res.status(400).send({
                        message: "Failed Try Again !"
                    })
                }
            } else{
    
                try {
                    product.findOne({
                        Title : payload.title,
                        Seller: payload.seller,
                    }).then((doc) => {
                        if (!doc) {

                                    let coinvalue = parseInt(payload.price);
                                        coinvalue = coinvalue / 10;
    
                
                                    try {
                                            product.create({
                                            Title          : payload.title,
                                            description    : payload.description,
                                            brand          : payload.brand,
                                            Quantity       : payload.Quantity,
                                            price          : payload.price,
                                            seller         : payload.seller,
                                            expiryDate     : payload.expiryDate,
                                            DiscountedPrice: payload.discountedPrice,
                                            categoryTag    : payload.categoryTag,
                                            Rating         : "0",
                                            NoOfUserRated  : "0",
                                            Coinvalue      : coinvalue,
                                            imgURL         : req.file.filename
        
                                        }
                                        ).then((docs) => {
        
                                            console.log("product created successfully\n" + docs);
                                            res.status(200).send({
                                                message: "product created successfully",
                                                product: docs
                                        });
                        
                    });
                } catch (error) {
                    console.error("creating a new product failure : " + error)
                    res.status(400).send({
                        message: "Failed Try Again !"
                    })
                }
                            
                        } else{

                            console.log("product already exist");
                            res.status(201).send({
                                message: "already exist! update its value\n",
                                product: doc
                            });
                            
                        }
                    });
                } catch (error) {

                    res.status(400).send({
                        message: "something went wrong",
                    })
                    
                }
                
                
            }
        });
    } catch (error) {
        console.error("error in product find one : " + error);
        res.status(400).send({
            message: "unable to add try again!"
        })
    }
});



router.post('/order',(req,res) =>{
    console.log("inside order");
    
    
    
    ProdArray = JSON.parse(req.body.inventory);
    holder = req.body.userordered;
    console.log(req.body.userordered);
    console.log(holder);
    
    
    for(const item in ProdArray){

        var NewQuantity = ProdArray[item].quantity;

        
        
 
        try {
            product.findOne({
                _id: item,
            }).then((doc) => {
                if (!doc) {
                    console.log("No such Product exist");
                } else{

                    let order = doc;
                    reducedQuantity = NewQuantity;
                    NewQuantity = order.Quantity - NewQuantity;

                    console.log(order);
                    console.log(NewQuantity);
                    
                    

                        product.updateOne({ 
                            _id: item
                        }, {
                         Quantity: NewQuantity
                        }
                        , (err) => {
                               if(err){
                                   console.log(`Error: ` + err)
                               }
                        });

                        
                        try {
                            orderModel.create({
                                productId: item,
                                user     : req.body.userordered,
                                Quantity : reducedQuantity,
                                price    : ProdArray[item].price
    
    
                            }).then((docs) => {
    
                                console.log(docs);
                                
                            });
                        } catch (error) {
                            console.error("creating order try catch" + error)
                        }
                    
                    
                    
                }
            });
        } catch (error) {
            console.error("finding product catch");
        }

        

        

    

    
        
    
    }

});
module.exports = router;

