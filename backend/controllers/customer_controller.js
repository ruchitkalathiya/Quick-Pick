const customer_schema = require('../model/customer_schema')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');
module.exports = {
    customer_register_controller: async (req, res) => {

        const {
            email,
            phone_number,
            password,
            name,
            address,
            area,
            city,
            pincode,

        } = req.body

        try {
            if (!email || !phone_number || !password || !name || !address || !area || !city || !pincode) {
                return res.status(400).json({
                    status: true,
                    statusCode: 400,
                    message: "Please filled all filed properly"
                })
            }
            const user = await customer_schema.findOne({ $or: [{ email }, { phone_number }] })
            if (user) {
                return res.status(409).json({
                    status: true,
                    statusCode: 409,
                    message: 'Email already exist'
                })
            }

            const hash_password = await bcrypt.hash(password, 10);

            const userdata = new customer_schema({
                email,
                phone_number,
                password: hash_password,
                name,
                address,
                area,
                city,
                pincode,
            })

            await userdata.save();
            const response = {
                status: true,
                statusCode: 200,
                message: 'Your account is created',
                userdata: userdata
            }
            res.status(200).json(response)

        } catch (error) {
            console.log("Error while register customer: ", error)
            res.status(500).json({
                message: 'Server error'
            })
        }
    },

    customer_login_controller: async (req, res) => {
        const { email, password } = req.body;

        const customer = await customer_schema.findOne({ email });
        if (customer) {
            const hased_password = await bcrypt.compare(password, customer.password);
            if (hased_password) {
                // console.log("--------------------")
                const token = jwt.sign({ id: customer._id }, process.env.SECRET_KEY);
                res.cookie('ct', token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true,
                });
                res.cookie('st', '', {
                    maxAge: 0,
                    httpOnly: true
                })
                res.status(200).json({
                    status: true,
                    statusCode: 200,
                    message: 'user login successfull',
                    token: token,
                    userData: customer
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
    },
    customer_logout_controller: async (req, res) => {
        try{
            res.cookie('ct', '', {
                maxAge: 0,
                httpOnly: true
            })
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Logout successful"
            })
        }
        catch(err){
            console.log("Error while logout customer: ", err);
            res.status(500).send({
                status: true,
                statusCode: 500,
                message: "Server error"
            })
        }
    },
    // customer_detail: async (req, res) => {
    //     try {
    //         const cust_id = req.id;
    //         const result = await customer_schema.findOne({ _id: cust_id });

    //         const response = {
    //             status: true,
    //             statusCode: 200,
    //             message: result ?'Userdata is found' : 'Userdata is not found',
    //             userDetail: result ? result : {}
    //         }
    //         res.status(200).json(response);
    //     }
    //     catch (err) {

    //     }
    // },
    customer_update_controller: async (req, res) => {
        try {

            const update = await customer_schema.findOneAndUpdate({ _id: req.params.customerId }, req.body, {
                new: true
            })

            if (update) {
                res.status(200).json({
                    message: 'Customer detail updated successfully'
                })
            } else {
                res.status(400).json({
                    message: 'Customer detail not updated'
                })
            }

        } catch (error) {
            res.status(500).send('error')
        }
    },
    delete_all: async (req, res) => {
        await customer_schema.deleteMany({})
        res.send('success')
    }

}