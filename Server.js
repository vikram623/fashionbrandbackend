

express = require("express")

app = express()


// connect two localhost

cors = require("cors")
app.use(cors())
// bodyparser--------------------
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())


// our schema
let Userschema = require("./model/Users")
let Productschema = require("./model/Products")
let Addcartschema = require("./model/Addcart")
let wishlistschema = require("./model/Wishlist")
let Reviewschema = require("./model/Reviews")



// connect database
const { mongoose } = require("mongoose")
mongoose.connect("mongodb://localhost:27017/").then((res) => {
    console.log("mongodb connect")
}).catch((err) => {
    console.log(err)
})




// signup api
app.post("/signup", async (req, res) => {
    // console.log(req.body)
    let userdata = await Userschema.insertOne({
        name: req.body.signupdata.name,
        email: req.body.signupdata.email,
        password: req.body.signupdata.password
    })

    let result = await userdata.save()

    if (result) {
        res.json({
            status: true,
            msg: "signup success"
        })
    }
    else {
        res.json({
            status: false,
            msg: "failed to signup"
        })
    }

})





// addproduct api
app.post("/addproduct", async (req, res) => {
    console.log(req.body)
    let productdata = await Productschema.insertOne({
        productname: req.body.productdata.productname,
        productprice: req.body.productdata.productprice,
        regularproductprice: req.body.productdata.regularproductprice,
        productimage: req.body.productdata.productimage,
        productimage2: req.body.productdata.productimage2,
        productimage3: req.body.productdata.productimage3,
        productdes: req.body.productdata.productdes,
        category: req.body.productdata.category,
        productquatity: req.body.productdata.productquatity
    })
    let result = await productdata.save()
    if (result) {
        res.json({
            status: true,
            msg: "Add product"
        })
    }
    else {
        res.json({
            status: true,
            msg: "failed to add"
        })
    }



})



// alluser
app.get("/allusers", async (req, res) => {
    let userdata = await Userschema.find({})

    if (userdata) {
        res.json({
            status: true,
            ouruser: userdata
        })
    }
    else {
        res.json({
            status: false,
        })
    }
})


// forget password Api

app.post("/forgetpassword", async (req, res) => {
    let update = await Userschema.findOneAndUpdate({ _id: req.body.currentuser._id }, { $set: { password: req.body.inpassword.password } })

    if (update) {
        res.json({
            status: true,
            msg: "update password"
        })
    }
    else {
        res.json({
            status: false,
            msg: "update not password"
        })
    }
})


// getproduct data

app.get("/apiproduct", async (req, res) => {
    let productdata = await Productschema.find()
    if (productdata) {
        res.json({
            status: true,
            ourproduct: productdata
        })
    }
    else {
        res.json({
            status: false,
        })
    }
})

// review data api
app.post("/apireview", async (req, res) => {
    let reviewdata = await Reviewschema.insertOne({
        username: req.body.reviewdata.username,
        fullname: req.body.reviewdata.fullname,
        email: req.body.reviewdata.email,
        comment: req.body.reviewdata.comment,
        product_id: req.body.reviewdata.product_id,
    })
    let result = (await reviewdata).save()
    if (result) {
        res.json({
            status: true,
            msg: "Add Review succesfully"
        })
    }
    else {
        res.json({
            status: false,
            msg: "Review faild"
        })
    }

})

// allreviews

app.get("allreviews", async (req, res) => {

    let userreviews = await Reviewschema.find({})
    if (userreviews) {
        res.json({
            status: true,
            ourreviews: userreviews
        })
    }
    else {
        res.json({
            status: false,
            ourreviews: "failed"
        })
    }
})

// // addcart
app.post("/addcart", async (req, res) => {
    // console.log(req.body.item.productname)

    let cartproducts = await Addcartschema.insertOne({
        productname: req.body.item.productname,
        productprice: req.body.item.productprice,
        productimage: req.body.item.productimage,
        category: req.body.item.category,
        productquatity: req.body.item.productquatity,
    })
    let result = await cartproducts.save()

    if (result) {
        res.json({
            status: true,
        })
    }
    else {
        res.json({
            status: false,
        })
    }
})


// addcart get product
app.get("/allcart", async (req, res) => {
    let ourcarproduct = await Addcartschema.find({});
    if (ourcarproduct) {
        res.json({
            status: true,
            ourcart: ourcarproduct,
        })
    }
    else {
        res.json({
            status: false,
            ourcart: "Failed",
        })
    }
})

// Wishlisting
app.post("/wishlist", async (req, res) => {
    // console.log(req.body)
    let wishlistproduct = await wishlistschema.insertOne({
        productname: req.body.itemwish.productname,
        productprice: req.body.itemwish.productprice,
        productimage: req.body.itemwish.productimage,
        category: req.body.itemwish.category,
        productquatity: req.body.itemwish.productquatity,
    })

    let result = await wishlistproduct.save()
    if (result) {
        res.json({
            status: true,
            msg: "Successfuly"
        })
    }
    else {
        res.json({
            status: false,
            msg: "Failed"
        })
    }
})


// get wishlist items
app.get("/wishitems", async (req, res) => {
    let ourwishproducts = await wishlistschema.find({})
    if (ourwishproducts) {
        res.json({
            status: true,
            ourwishitem: ourwishproducts
        })
    }
    else {
        res.json({
            status: false,
        })
    }
})

// delete addcart product
app.delete("/cart/:id", async (req, res) => {
    let id = req.id;
    await CartSchema.findByIdAndDelete(id);
    res.json({ status: true, msg: "Removed from cart!" });
});


// productreview
app.post("/productreview", async (req, res) => {
    console.log(req.body)


    let review = await Reviewschema.insertOne({
        productid: req.body.product_id,
        name: req.body.review.fullname,
        review: req.body.review.review
    })

    let result = await review.save()

    if (result) {
        res.json({
            status: true,
            msg: "Review submit"
        })
    }
    else {
        res.json({
            status: false,
            msg: "failed to review"
        })
    }
})


// get reviews

app.get("/allreview",async(req,res)=>{
    let allreviews=await Reviewschema.find({})
    if(allreviews){
        res.json({
            status:true,
            ourreview:allreviews
        })
    }
    else{
          res.json({
            status:false,
        })
    }
})


app.listen(5000, () => {
    console.log("sever started at 5000")
})
