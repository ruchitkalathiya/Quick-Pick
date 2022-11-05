const express = require('express')
const routes = express.Router();
const AuthenticateCustomer = require("../../middleware/AuthenticateCustomer")
const { customer_register_controller,
    customer_login_controller, delete_all , customer_detail, customer_logout_controller} = require('../../controllers/customer_controller')

routes.post('/customerRegister', customer_register_controller)

routes.post('/customerLogin', customer_login_controller)

// routes.get('/getdetail', AuthenticateCustomer, customer_detail)

routes.get('/logoutCustomer', AuthenticateCustomer, customer_logout_controller)

routes.delete('/deleteCust', delete_all)

module.exports = routes;