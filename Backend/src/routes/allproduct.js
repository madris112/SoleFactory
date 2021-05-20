const express = require('express');
const router  = new express.Router();
const product = require('../models/product');

router.post('/createProduct', function (req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        product.findOne({
            Title: req.body.title,
        }).then((doc) => {
            if (!doc) {
    
                coinvalue = parseInt(req.body.price);
                coinvalue = coinvalue / 10;
    
                
                try {
                    product.create({
                        Title          : req.body.title,
                        description    : req.body.description,
                        brand          : req.body.brand,
                        Quantity       : req.body.Quantity,
                        price          : req.body.price,
                        seller         : req.body.seller,
                        expiryDate     : req.body.expiryDate,
                        DiscountedPrice: req.body.discountedPrice,
                        categoryTag    : req.body.categoryTag,
                        Rating         : "0",
                        NoOfUserRated  : "0",
                        Coinvalue      : coinvalue
        
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
                        Title : req.body.title,
                        Seller: req.body.seller,
                    }).then((doc) => {
                        if (!doc) {

                                    coinvalue = parseInt(req.body.price);
                                    coinvalue = coinvalue / 10;
    
                
                                    try {
                                            product.create({
                                            Title          : req.body.title,
                                            description    : req.body.description,
                                            brand          : req.body.brand,
                                            Quantity       : req.body.Quantity,
                                            price          : req.body.price,
                                            seller         : req.body.seller,
                                            expiryDate     : req.body.expiryDate,
                                            DiscountedPrice: req.body.discountedPrice,
                                            categoryTag    : req.body.categoryTag,
                                            Rating         : "0",
                                            NoOfUserRated  : "0",
                                            Coinvalue      : coinvalue
        
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
                                message:"already exist! update its value\n",
                                product: doc
                            });
                            
                        }
                    });
                } catch (error) {

                    res.status(400).send({
                        message:"something went wrong",
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

module.exports = router;

