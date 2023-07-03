const express = require('express')
require('./db/config')
const User = require("./db/User")
const Product = require("./db/Product")
const app = express()
const cors = require("cors")

app.use(express.json());
app.use(cors())

// ***************** Register User ******************* 

app.post("/register",async (req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

// ***************** Login User ******************* 

app.post("/login", async (req, res) => {

    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            res.send(user);
        }else{
            res.send({status : false, msg : "user not found"});
        }
    }else{
        res.send({status:false,msg:"Please Defined Email or Password "})
    }
    
})

// ***************** Add Product ******************* 

app.post("/add-product", async (req,res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

// **************** Fetch Product List *******************

app.get("/products", async (req,res) => {
    let product = await  Product.find();
    if(product.length > 0){
        res.send({status:true,response:product});
    }else{
        res.send({status:false,msg:"No product data found"});
    }

})


// ***************** Delete Product **************************

app.delete("/products/:id", async (req,res) => {
    let result = await Product.deleteOne({ _id : req.params.id });
    res.send(result);
})

// ******************** fetch Single Produuct for Upadate *****************

app.get("/products/:id", async (req,res) => {
    let result = await Product.findOne({_id : req.params.id});
    if(result)
    {
        res.send(result)
    }
})

// ******************** update Single Product *****************

app.put("/products/:id", async (req,res) => {
    let result = await Product.updateOne(
        { _id : req.params.id },
        { $set : req.body }
        );
    res.send(result)
})


app.listen(5000);