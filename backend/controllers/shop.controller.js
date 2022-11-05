const shop_schema = require('../model/shop_schema')
// const product_schema = require('../../model/shopDetails/product_schema')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

module.exports = {

    register_shop_controller: async (req, res) => {
        // console.log(req.body);
        console.log("REQ COME.....  ")
        try {

            const {
                shop_name,
                email,
                password,
                phone_number,
                owner_name,
                address,
                area,
                city,
                pincode,
                start_time,
                end_time
            } = req.body;
            // console.log('hello thsi is shop register')
            if (!shop_name || !email || !password || !phone_number || !owner_name || !address || !area || !city || !pincode || !start_time || !end_time){
                return res.status(400).json({
                    status: true,
                    statusCode: 400,
                    message: 'Please fill all the filled properly'
                })
            }

                const checkEmail = await shop_schema.findOne({ email });
            if (checkEmail)
                return res.status(409).json({
                    status: true,
                    statusCode: 409,
                    message: 'Email is already exist.',
                })

            const hash_password = await bcrypt.hash(password, 10);
            const user = new shop_schema({
                shop_name,
                email,
                password: hash_password,
                phone_number,
                owner_name,
                address,
                area,
                city,
                pincode,
                start_time,
                end_time
            })

            const savedUser = await user.save();
            var response = {
                status: true,
                statusCode: 200,
                message: 'Your shop detail registered successfully',
                userdata: savedUser
            }
            res.status(200).send(response)


        } catch (error) {
            console.log('error', error)
            res.status(500).json(error)
        }
    },
    login_shop_controller: async (req, res) => {
        try {
            const { email, password } = req.body;

            const shop = await shop_schema.findOne({ email });
            if (shop) {
                const hased_password = await bcrypt.compare(password, shop.password);
                if (hased_password) {

                    const token = jwt.sign({ id: shop._id }, process.env.SECRET_KEY);
                    res.cookie('st', token, {
                        expires: new Date(Date.now() + 86400000),
                        // httpOnly: true,
                    })
                    res.cookie('ct', '', {
                        maxAge: 0,
                        httpOnly: true
                    })
                    res.status(200).json({
                        status: true,
                        statusCode: 200,
                        message: 'user login successfull',
                        token: token,
                        userData: shop
                    })
                } else {
                    res.status(400).json({
                        status: true,
                        statusCode: 400,
                        message: 'Email and Password are not matched'
                    })
                }
            } else {
                res.status(400).json({
                    status: true,
                    statusCode: 400,
                    message: 'User is not exits'
                })
            }

        } catch (error) {
            console.log("error: " + error);
            res.status(500).json({
                message: 'Server error'
            })
        }

    },
    logout_shop_controller: async (req, res) => {
        try{
            res.cookie('st', '', {
                maxAge: 0,
                httpOnly: true,
            })
            res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Logout successful"
            })
        }
        catch(err){
            console.log("Error while logout shopKeeper: ", err)
            res.status(500).json({
                status: true,
                statusCode: 500,
                message: "Server Error"
            })
        }
    },

    all_shops_controller: async (req, res) => {
        try {
            console.log('in......')
            const registerDetails = await shop_schema.find({});
            if (registerDetails) {
                var response = {
                    status: true,
                    statusCode: 200,
                    message: 'All shop details',
                    userdata: registerDetails
                }
                res.status(200).send(response)
            }
            else {
                var response = {
                    status: false,
                    statusCode: 400,
                    message: 'Userdata not founded...'
                }
                res.status(400).send(response)
            }
        } catch (error) {
            res.status(500).send('server crashed.')
        }
    },

    one_shop_controller: async (req, res) => {
        try {
            const _id = req.id; // this id is added while authenticating
            // console.log(_id)
            const user = await shop_schema.findOne({ _id });
            if (user) {
                var response = {
                    status: true,
                    stautsCode: 200,
                    message: 'User exist',
                    userdata: user
                }
                res.status(200).send(response);
            }
            else {
                var response = {
                    status: false,
                    statusCode: 400,
                    message: 'Userdata not exist'
                }
                res.status(400).send(response)
            }
        } catch (error) {
            res.status(500).send('sever crashed.')
        }
    },

    update_shop_controller: async (req, res) => {
        try {
            const _id = req.params.id;
            const user = await shop_schema.findByIdAndUpdate(_id, req.body, {
                new: true
            });
            if (user) {
                var response = {
                    status: true,
                    statusCode: 200,
                    message: 'Updated successfully.',
                    userdata: user
                }
                res.status(200).send(response)
            }
            else {
                var response = {
                    status: false,
                    statusCode: 400,
                    message: 'Userdata not updated'
                }
                res.status(400).send(response)
            }

        } catch (error) {
            res.status(500).send('server crashed.')
        }
    },

    delete_shop_controller: async (req, res) => {
        try {
            const _id = req.params.id;
            const delete_user = await shop_schema.findByIdAndDelete({ _id });
            if (delete_user) {
                var response = {
                    status: true,
                    statusCode: 200,
                    message: 'User deleted successfully.',
                    userdata: delete_user
                }
                res.status(200).send(response)
            }
            else {
                var response = {
                    status: false,
                    statusCode: 400,
                    message: 'Userdata not deleted.'
                }
                res.status(400).send(response)
            }

        } catch (error) {
            res.status(500).send('server crashed.')
        }

    },
    delete_all: async (req, res) => {
        try {
            const s = await shop_schema.deleteMany({});
            console.log('success')
            res.send('success')
        } catch (error) {
            console.log('error')
        }

    }
}