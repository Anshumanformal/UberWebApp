const {EmailService} = require("../../services/index");
const {functions, responses} = require("../../common");
const execute_query = require("../../common/db_query").execute_query
const constants = require("../../common/constants")

module.exports.register = async(req, res) => {
    try {
        let today = new Date();
        let password = req.body.driver_password

        let passwordHash = functions.hashPassword(password)
        let sql_query = 'INSERT INTO driver (vehicle_id,driver_name,driver_phone,driver_email,created_at,updated_at,driver_password)values(?,?,?,?,?,?,?)'
        let values = [req.body.vehicle_id, req.body.driver_name, req.body.driver_phone, req.body.driver_email, today, today, passwordHash]

        let result = execute_query(sql_query, values, async (err, results) => {
            if (err)
                return responses.errorResponse(res, constants.STATUS_CODES.BAD_REQUEST, "Error in SQL Query")
            else {
                // send email to the driver
                await EmailService.sendEmail({
                    // to: `${req.body.customer_email}`,
                    title: 'Driver Registration done successfully',
                    message: `<h1>Hello, ${req.body.driver_name} </h1><p>Welcome to UberApp!! You have successfully registered on 
                    UberApp as a Driver</p>`
                 })
                console.log("Email sent on your Mail :)")
                responses.successResponse(res, constants.STATUS_CODES.SUCCESS, "Driver registered successfully")

            }
        })
    } catch (error) {
        console.log("Error in register")
    }
         
}

module.exports.login = async(req, res) => {

    try {
        let sql_query = 'SELECT * FROM driver WHERE driver_email = ?';
        let values = [req.body.driver_email]

        let results = execute_query(sql_query, values, (err, results) => {
            if (err)
                return responses.errorResponse(res, constants.STATUS_CODES.BAD_REQUEST, "Error in SQL Query")
            else {
                if (results.length === 0)
                    return responses.errorResponse(res, constants.STATUS_CODES.UNAUTHORIZED, "Unauthorised Access")
                else {
                    let password_check = functions.checkPassword(req.body.driver_password, results[0].driver_password)
                    if(password_check)
                        return responses.successResponse(res, constants.STATUS_CODES.SUCCESS, "Driver logged in successfully")
                    else
                        return responses.errorResponse(res, constants.STATUS_CODES.UNAUTHORIZED, "Wrong Password")
                }
            }
        })
    } catch (error) {
        console.log('Error in driver login')
    }

}

module.exports.logout = async(req, res) => {

    // check this implementation

    try {
        return responses.successResponse(res, constants.STATUS_CODES.SUCCESS, "Driver logged out successfully")
    } catch (error) {
        console.log('Error in driver login')
    }

}
