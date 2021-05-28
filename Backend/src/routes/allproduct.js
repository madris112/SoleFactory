const express    = require('express');
const router     = new express.Router();
const product    = require('../models/product');
const orderModel = require('../models/orderhistory');
const multer     = require('multer');
const path       = require("path");
const User       = require('../models/user');
const requestIp = require('request-ip');
const productCount = require('../models/productCount');
const productCountIpDetails = require('../models/productCountIpDetails');
const productRating = require('../models/productRating');
const productRatingIpDetails = require('../models/productRatingIpDetails');


console.log("hi");

router.post('/product/counter', function(req, res) {
  prodid = req.body.prodid
  console.log(prodid)
  const ip = requestIp.getClientIp(req);

  productCountIpDetails.findOne({prodid: prodid, ip: ip}, function(err, result) {
    if (err) throw err;
    else {
      if(!result){
        productCountIpDetails.create({prodid: prodid, ip: ip});
        productCount.findOne({prodid: prodid},function(e,rest){
          if(e) throw e;
          else {
            if(rest){
              var x = rest.cnt;
              x     = x+1;
              productCount.updateOne({prodid: prodid},{cnt: x}, function (err, docs) {
                  if (err){
                    console.log(err)
                  }
                  else{
                    console.log("Updated Docs : ", docs);
                  }
                });
            } else {
              productCount.create({prodid: prodid, cnt: 1})
            }
          }
        })
        return res.status(200).json(1);
      } else {
        return res.status(200).json(0);
      }
    }
  })
})
router.post('/product/rating', function(req, res) {
  prodid = req.body.prodid
  rate = req.body.rate
  console.log(prodid)
  console.log(rate)
  const ip = requestIp.getClientIp(req);

  productRatingIpDetails.findOne({prodid: prodid, ip: ip}, function(err, result) {
    if (err) throw err;
    else {
      if(!result){
        productRatingIpDetails.create({prodid: prodid, ip: ip, rating: rate});
        productRating.findOne({prodid: prodid},function(e,rest){
          if(e) throw e;
          else {
            if(rest){
              // console.log("hiiiiiiiii")
              // console.log(rate)
              var x = rest.cnt;
              var y= rest.rating;
              y = (y*x);
              y = y + rate;
              x = x+1;
              y = y/x;
              //
              // console.log(x)
              // console.log(y)
              productRating.updateOne({prodid: prodid},{cnt: x, rating: y}, function (err, docs) {
                  if (err){
                    console.log(err)
                  }
                  else{
                    console.log("Updated Docs : ", docs);
                  }
                });
            } else {
              productRating.create({prodid: prodid,rating: rate,cnt: 1})
            }
          }
        })
        return res.status(200).json(1);
      } else {
        productRating.findOne({prodid: prodid},function(e,rest){
          if(e) throw e;
          else {
            if(rest){
              // console.log("hiiiiiiiii")
              // console.log(rate)
              var x = rest.cnt;
              var y= rest.rating;
              y = (y*x);
              y = y + rate - result.rating;
              y = y/x;

              console.log(x)
              console.log(y)
              productRating.updateOne({prodid: prodid},{cnt: x, rating: y}, function (err, docs) {
                  if (err){
                    console.log(err)
                  }
                  else{
                    console.log("Updated Docs : ", docs);
                  }
                });
            } else {
              productRating.create({prodid: prodid,rating: rate,cnt: 1})
            }
          }
        })
        productRatingIpDetails.updateOne({prodid: prodid, ip: ip}, {rating: rate},function(err,docs){
          if(err){
            console.log(err)
          } else {
            console.log("Updated docs: ", docs);
          }
        });
        return res.status(200).json(0);
      }
    }
  })
})

// product search route
router.get('/product/search', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log("inside get product search" + req.query.searchname);

  if (req.query.searchname != null && req.query.searchname !== '' && req.query.searchname!=='All') {
    search = new RegExp(req.query.searchname, 'i')
  } else {
    search = new RegExp('(.*?)','i')
  }
  //console.log(search)
  try {
    let products = null
    if(req.query.category && req.query.searchname!=='All')
        products = await product.find({categoryTag:search}).sort({_id:-1})
    else{
      myarr1 = await product.find({brand:search}).sort({_id:-1})
      var myarr2=[];
      myarr1.map((data,key)=>{
        if(data.Quantity !== '0'){
          myarr2.push(data);
        }
      })
      var myarr3 = [];
      for(const item in myarr2){
        var b=0;
          try {
              ratingDetails = await productRating.findOne({
                  prodid: myarr2[item]._id,
              });
          } catch (error) {
              console.error(error)
          }
          console.log("helloji")

          if(ratingDetails){
            console.log(ratingDetails.rating)
              b = ratingDetails.rating;
              console.log(b)
          }

          current = {
              product: myarr2[item],
              curr: b
          }

          myarr3.push(current);

      }
      // myarr2 = await product.find({Title:search}).sort({_id:-1})
      // Array.prototype.push.apply(myarr1,myarr2);
      // myarr1= [...new Set(myarr1.map((obj) => obj.prop_id))]
      products = myarr3
      // console.log("hiiiihihihihi")
      // console.log(myarr1)
    }

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
    holder    = req.body.userordered;

    User.findOne({
        username: req.body.userordered,
    }).then((doc) => {
        if (!doc) {
            console.log("Something Fishy : orders find one");
        } else{

            current = doc.CoinAmt;
            remainingCnt = parseInt(current) - parseInt(req.body.coinsUsed);
            console.log(req.body.coinsUsed);
            changedamt = remainingCnt.toString();
            console.log(req.body);
              User.updateOne({
                username: req.body.userordered
            }, {
                CoinAmt: changedamt
            }
            , (err) => {
                    if(err){
                        console.log(`Error: ` + err)
                    }
            });

        }
    });



    for(const item in ProdArray){
        try {
            product.findOne({
                _id: item,
            }).then((doc) => {
                if (!doc) {
                    console.log("No such Product exist");
                } else{
                        product.updateOne({
                            _id: item
                        }, {
                         Quantity: doc.Quantity - ProdArray[item].quantity
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
                                Quantity : ProdArray[item].quantity,
                                price    : ProdArray[item].price


                            }).then((docs) => {

                                console.log("producted added succesfully");

                            });
                        } catch (error) {
                            console.error("creating order try catch" + error);
                            res.status(400).send({
                                message: "Try Again!"
                            });
                        }



                }
            });
        } catch (error) {
            console.error("finding product catch");
            res.status(400).send({
                message: "try again"
            });
        }



    }

    res.status(200).send({
        message: "order placed successfully"
    });

});

router.get('/gethistory',async(req,res)=>{
    curruser = req.query.username;

    try {
        docs = await orderModel.find({
            user: curruser
        }).sort({_id:-1});


        // console.log(docs);
        var finalOrderInfo = [];
        for(prod in docs){


            item = await product.findOne({
                _id:docs[prod].productId,
            })



            if(item){

                current = {
                    product: item,
                    history: docs[prod]
                }

                finalOrderInfo.push(current);

            }
        }
        res.status(200).send({
            History: finalOrderInfo
        });
    } catch (error) {
        console.error(error)
    }

})

function compare(a,b){
    if(a.Sort> b.Sort)
       return -1;
    if(a.Sort<b.Sort)
       return 1;
    else
       return 0;
}

router.get('/bestseller',async(req,res)=>{

    console.log("inside bestseller")

    try {
        const productList = await product.find({});
        var bestseller = [];
        for(const item in productList){

            try {
                visitdetails = await productCount.findOne({
                    prodid: productList[item]._id,
                });
            } catch (error) {
                console.error(error)
            }
            try {
                ratingDetails = await productRating.findOne({
                    prodid: productList[item]._id,
                });
            } catch (error) {
                console.error(error)
            }
            var a = 1;
            var b = 1;
            var c = 1;



            if(visitdetails){
                a = parseInt(visitdetails.cnt);

            }

            if(ratingDetails){
                b = parseInt(ratingDetails.rating);
            }

            if(ratingDetails){
                c = parseInt(ratingDetails.cnt);
            }

            SortDetails =  a + b*c;
            var curr=0;
            if(ratingDetails){
                curr = ratingDetails.rating;
            }

            current = {
                product: productList[item],
                Sort: SortDetails,
                curr: curr
            }

            bestseller.push(current);

        }
        bestseller.sort(compare);

        res.status(200).send({
            message:"best seller received",
            bestsell: bestseller
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:"something went wrong",
        })
    }

});

module.exports = router;
