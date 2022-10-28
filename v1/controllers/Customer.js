const {EmailService} = require("../../services/index");
const {functions, responses} = require("../../common");
const execute_query = require("../../common/db_query").execute_query
const constants = require("../../common/constants")

module.exports.register = async(req, res) => {
    try {
        let today = new Date();
        console.table(req.body)

        let password = req.body.customer_password
        let passwordHash = functions.hashPassword(password)
        let sql_query = 'INSERT INTO customer (customer_name,customer_email,customer_password ,customer_phone, created_at ,updated_at ) values(?,?,?,?,?,?)'
    let values = [req.body.customer_name, req.body.customer_email, passwordHash, req.body.customer_phone, today, today]

        let result = execute_query(sql_query, values, async (err, results) => {
            if (err)
                return responses.errorResponse(res, constants.STATUS_CODES.BAD_REQUEST, err.sqlMessage)
            else {
                // send email to the customer
                await EmailService.sendEmail({
                    // to: `${req.body.customer_email}`,
                    title: 'User Registration done successfully',
                    message: `<h1>Hello, ${req.body.customer_name} </h1><p>Welcome to UberApp!! You have successfully registered on UberApp as a Customer</p>`
                 })
                console.log("Email sent on your Mail :)")
                responses.successResponse(res, constants.STATUS_CODES.SUCCESS, "Customer registered successfully")
            }
        })
    } catch (error) {
        console.log("Error in customer registration")
    }
}

module.exports.login = async(req, res) => {

    try {
        let sql_query = 'SELECT * FROM customer WHERE customer_email = ?';
        let values = [req.body.customer_email]

        let results = execute_query(sql_query, values, (err, results) => {
            if (err)
                return responses.errorResponse(res, constants.STATUS_CODES.BAD_REQUEST, err.sqlMessage)
            else {
                if (results.length === 0)
                    return responses.errorResponse(res, constants.STATUS_CODES.UNAUTHORIZED, "Unauthorised Access")
                else {
                    let password_check = functions.checkPassword(req.body.customer_password, results[0].customer_password)
                    if(password_check)
                        return responses.successResponse(res, constants.STATUS_CODES.SUCCESS, "Customer logged in successfully")
                    else
                        return responses.errorResponse(res, constants.STATUS_CODES.UNAUTHORIZED, "Wrong Password")
                }
            }
        })
    } catch (error) {
        console.log('Error in Customer login')
    }

}

module.exports.logout = async(req, res) => {

    // check this implementation

    try {
        return responses.successResponse(res, constants.STATUS_CODES.SUCCESS, "Customer logged out successfully")
    } catch (error) {
        console.log('Error in customer login')
    }

}

module.exports.getAllCustomers = async(req, res) => {

    try {
        let sql_query = 'select * from customer'
        let values = []
        let result = execute_query(sql_query, values, async (err, results) => {
            if (err)
                return responses.errorResponse(res, constants.STATUS_CODES.BAD_REQUEST, err.sqlMessage)
            else
                return responses.successResponse(res, constants.STATUS_CODES.SUCCESS, "All customers fetched successfully", results)
        })
    } catch (error) {
        console.log('Error in getAllCustomers')
    }
}
