const express = require('express')
const AuthenticateShop = require("../../middleware/AuthenticateShop")
const routes = express.Router();
const { register_shop_controller, all_shops_controller, update_shop_controller, delete_shop_controller, one_shop_controller, login_shop_controller, delete_all, logout_shop_controller } = require('../../controllers/shop.controller')


routes.post('/shop_register', register_shop_controller);

routes.get('/shop_register', all_shops_controller);

// routes.get('/shop_register', AuthenticateShop, one_shop_controller);

routes.put('/shop_register/:id', AuthenticateShop, update_shop_controller);

routes.delete('/shop_register/:id', AuthenticateShop, delete_shop_controller);

routes.post('/shop_login', login_shop_controller);

routes.get('/logoutShop', AuthenticateShop, logout_shop_controller)

routes.delete('/delete', delete_all)

module.exports = routes;