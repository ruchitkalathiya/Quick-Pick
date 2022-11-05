const customer_detail = require("../model/customer_schema");
const jwt = require("jsonwebtoken");

const AuthenticateCustomer = async ( req, res, next) => {
    try{
        const token = req.cookies.ct;
        const response = {
            status: true, 
            statusCode: 400,
            message: "You must need to login for access this page",
        }
        if(!token){
           return res.status(400).json(response);
        }

        const id = jwt.verify(token, process.env.SECRET_KEY).id;
        const result = await customer_detail.findOne({_id: id});
        if(!result){
            res.status(400).json(response);
        }
        // console.log(result);
        req.id = result._id;
        next();
    }
    catch(err){
        console.log("Error while autheticating customer: " + err);
        res.status(500).json({
            message: "Server Error",
        })
    }
}

module.exports = AuthenticateCustomer;