const product_Schema = require('../model/product_schema')
// const shop_schema = require('../../model/shopDetails/shop_schema')

const mongoose = require('mongoose');

const fs = require('fs')

module.exports = {
    add_product_controller: async (req, res) => {
        try {
            // console.log(req.body)
            const {
                name,
                description,
                stock,
                price,
                tags,
            } = req.body;
            if (!name || !description || !stock || !price || !tags || isNaN(price) || isNaN(stock)) { // if given string is not a number then isNaN return true   
                return res.status(400).json({
                    status: true,
                    statusCode: 400,
                    message: "Please filled all filed properly"
                })
            }
            // const tags = req.body.tags.split(',')
            // // const user_found = await shop_schema.findOne({ _id: shop_id });

            // !user_found && res.status(400).json({
            //     message: 'shop is not registered'
            // })
            // console.log(req.body);
            console.log(tags);
            const product = new product_Schema({
                shop_id: req.id,
                name,
                description,
                stock,
                price,
                tags
            })

            const saved_product = await product.save();

            response = {
                status: true,
                statusCode: 200,
                message: 'Product detail is added successfully',
                productDetail: saved_product
            }
            res.status(200).json(response)

            // const product_found = await product_Schema.findOne({ user_id })
            // console.log(user_found, product_found)

            // if (user_found && product_found) {
            //     console.log('hello')
            //     const success = await product_Schema.findOneAndUpdate({ user_id }, {
            //         $push: {
            //             all_products: all_products
            //         }
            //     }); //add new obj in array

            //     const response = {
            //         status: true,
            //         statusCode: 200,
            //         message: 'Product detail is added successfully.',
            //         userdata: success
            //     }
            //     res.status(200).send(response)
            // }
            // else if (user_found) {
            //     const product = await add.save();
            //     const response = {
            //         status: true,
            //         statusCode: 200,
            //         message: 'Product detail is added successfully.',
            //         userdata: product
            //     }
            //     res.status(200).send(response)
            // }
            // else {
            //     const response = {
            //         status: false,
            //         statusCode: 400,
            //         message: 'Please Enter correct user id',
            //     }
            //     res.status(400).send(response)
            // }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status: true,
                statusCode: 500,
                message: error
            })
        }
    },
    all_shop_product_controller: async (req, res) => {
        try {
            // console.log('inside')
            const id = req.id;
            const product_details = await product_Schema.find({ shop_id: id })
            // .populate('shop_id');
            // console.log(product_details)
            if (product_details) {
                // console.log(product_details)
                var response = {
                    status: true,
                    statusCode: 200,
                    message: 'Product founded...',
                    products: product_details
                }
                res.status(200).send(response)
            }
            else {
                var response = {
                    status: false,
                    statusCode: 400,
                    message: 'Product not founded...'
                }
                res.status(400).send(response)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send('server crashed.')
        }
    },
    get_all_shop_product_controller: async (req, res) => {
        try {
            const shop_id = req.params.shop_id;
            const product_details = await product_Schema.find({ shop_id: shop_id })
            // .populate('shop_id');
            // console.log(product_details)
            if (product_details) {
                // console.log(product_details)
                var response = {
                    status: true,
                    statusCode: 200,
                    message: 'Product founded...',
                    products: product_details
                }
                res.status(200).send(response)
            }
            else {
                var response = {
                    status: false,
                    statusCode: 400,
                    message: 'Product not founded...'
                }
                res.status(400).send(response)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send('server crashed.')
        }
    },
    get_all_shop_product_controller1: async (req, res) => {
        try {
            const shop_id = req.id;
            const product_details = await product_Schema.find({ shop_id: shop_id })
            // .populate('shop_id');
            // console.log(product_details)
            if (product_details) {
                // console.log(product_details)
                var response = {
                    status: true,
                    statusCode: 200,
                    message: 'Product founded...',
                    products: product_details
                }
                res.status(200).send(response)
            }
            else {
                var response = {
                    status: false,
                    statusCode: 400,
                    message: 'Product not founded...'
                }
                res.status(400).send(response)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send('server crashed.')
        }
    },
    one_product_controller: async (req, res) => {
        try {
            const product_id = req.params.product_id;
            const product_detail = await product_Schema.findOne({ _id: product_id }).populate();
            if (product_detail) {
                const response = {
                    status: true,
                    stautsCode: 200,
                    userdata: product_detail
                }
                res.status(200).send(response);
            }
            else {
                const response = {
                    status: false,
                    stautsCode: 400,
                    message: 'user not exist.'
                }
                res.status(400).send(response)
            }
        } catch (error) {
            res.status(500).send('sever crashed.')
        }
    },
    update_product_controller: async (req, res) => {
        try {
            const product_id = req.params.product_id;

            const update = await product_Schema.findOneAndUpdate({ _id: product_id }, req.body, {
                new: true
            })
            // console.log('update', update)
            // update.tags.push('one'),
            //     await update.save();

            // update.image.imgId = "imgid"
            // await update.save();

            const response = {
                status: true,
                stautsCode: 200,
                userdata: update,
                message: 'Product details updated successfully.'
            }
            res.status(200).send(response)

            let user;
            // user = await product_Schema.findOneAndUpdate({ user_id, "all_products._id": product_id }, req.body, {
            //     new: true
            // })


        } catch (error) {
            res.status(500).send(error)
        }
    },
    delete_product_controller: async (req, res) => {
        try {
            const shop_id = req.params.shop_id;
            const product_id = req.params.product_id;

            await product_Schema.findOneAndDelete({ $and: [{ shop_id, product_id }] });

            const response = {
                status: true,
                stautsCode: 200,
                message: 'Shop details deleted successfully.'
            }
            res.status(200).send(response)

            // const delete_user = await product_Schema.findOneAndUpdate({ user_id }, {
            //     $pull: {
            //         all_products: { _id: product_id }
            //     }
            // });
            // if (delete_user) {
            //     const response = {
            //         status: true,
            //         stautsCode: 200,
            //         message: 'Shop details deleted successfully.'
            //     }
            //     res.status(200).send(response)
            // }
            // else {
            //     const response = {
            //         status: false,
            //         stautsCode: 400,
            //         message: 'user not exist.'
            //     }
            //     res.status(400).send(response)
            // }

        } catch (error) {
            res.status(500).send('server crashed.')
        }

    },
    get_all_products: async (req, res) => {
        try {
            const products = await product_Schema.find({});
            const response = {
                status: true,
                statusCode: 200,
                message: 'All product details',
                products: products,
            }
            res.status(200).send(response);

        }
        catch (err) {
            console.log("Error while geting all produt: " + err);
        }
    }
    ,
    image_controller: async (req, res) => {
        try {

            const product = await product_Schema.findOne({ _id: req.params.productId });

            product.image.imgId = req.file.filename;
            product.image.url = `D:/quick-pick final/QuickPick/frontend/public/upload/images/${req.file.filename}`
            console.log('added..')
            await product.save();

            const response = {
                status: true,
                statusCode: 200,
                message: 'successfully uploded',
                product: product
            }

            res.status(200).send(response);

        } catch (error) {
            console.log(error)
            res.status(500).send('error');
        }
    },

    remove_image: (req, res) => {
        const path = ''
        fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
    },
    delete_all: async (req, res) => {
        try {
            await product_Schema.deleteMany({})
            res.send('successs')
        } catch (error) {
            res.send('error')
        }
    }

}