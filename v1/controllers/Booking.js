const {functions, responses} = require("../../common");
const execute_query = require("../../common/db_query").execute_query
const constants = require("../../common/constants")

module.exports.findDrivers = async(req, res) => {
    try {
        let sql_query = 'select driver_id, vehicle_id,driver_name,driver_phone from driver where driver_id not in \
        (select driver_id from booking where status="booked")'
        let values = []

        let results =  execute_query(sql_query, values,(err,results)=>{
        if (results.length === 0)
            return responses.successResponse(res, constants.STATUS_CODES.SUCCESS, "No driver found")
        if(err)
            return responses.errorResponse(res, constants.STATUS_CODES.BAD_REQUEST, err.sqlMessage)
        else
            return responses.successResponse(res, constants.STATUS_CODES.SUCCESS, "Drivers found successfully", results)
    })
    } catch (error) {
        console.log("Error in findDrivers")
    }
}

module.exports.checkBookings = async(req, res) => {
    try {
        let sql_query = 'select * from booking where booking_id=?';
        let values = [req.body.booking_id]
        let results =  execute_query(sql_query, values,(err,results)=>{

        if (results.length !== 0)
            return responses.successResponse(res, constants.STATUS_CODES.SUCCESS,"You have a booking", results)
        if (err)
            return responses.errorResponse(res, constants.STATUS_CODES.BAD_REQUEST, err.sqlMessage)
        else
            return responses.successResponse(res, constants.STATUS_CODES.SUCCESS,"Bookings matched", results)
    })
    } catch (error) {
        console.log("Error in checkBookings")
    }
         
}

module.exports.cancelBooking = async(req, res) => {
    try {
        
        const booking_id = req.body.booking_id
        let sql_query = 'update booking set status="cancelled" where booking_id=?'
        let values = [booking_id]
        let results =  execute_query(sql_query, values,(err,results)=>{

        if(results.affectedRows === 0)
            return responses.errorResponse(res, constants.STATUS_CODES.SUCCESS, "Booking_Id is not Valid")
        if(err)
            responses.errorResponse(res, constants.STATUS_CODES.BAD_REQUEST, err.sqlMessage)
        return responses.successResponse(res, constants.STATUS_CODES.SUCCESS, "Booking Cancelled")

    })
    } catch (error) {
        console.log("Error in cancelBooking")
    }
         
}

module.exports.completedBooking = async(req, res) => {
    try {
        
        const booking_id = req.body.booking_id
        var sql_query = 'update booking set status="completed" where booking_id=? and status="booked"'
        var values = [booking_id]
        let results =  execute_query(sql_query, values,(err,results)=>{
        if(results.affectedRows === 0)
            return responses.errorResponse(res, constants.STATUS_CODES.SUCCESS, "Booking_Id is not Valid")
        if(err)
            responses.errorResponse(res, constants.STATUS_CODES.BAD_REQUEST, err.sqlMessage)
        return responses.successResponse(res, constants.STATUS_CODES.SUCCESS, "Your Journey is Completed!! Thanks")
    })
    } catch (error) {
        console.log("Error in completedBooking")
    }
         
}

module.exports.bookRides = async(req, res) => {
    try {

        let current_time = functions.currentDateInIST()
        let sql_query = 'insert into booking (customer_id ,booking_date_time, source_ride, destination_ride, status, driver_id) \
                        values(?, ?, ?, ?, ?, ?)';
        let values = [req.body.customer_id,current_time, req.body.source_ride ,req.body.destination_ride,"booked",req.body.driver_id];

        let results =  execute_query(sql_query, values,(err,results) => {
        if (err)
            responses.errorResponse(res, constants.STATUS_CODES.BAD_REQUEST, err.sqlMessage)
        
        id= '000' + results.insertId
        return responses.successResponse(res, constants.STATUS_CODES.SUCCESS, `Your ride is booked and booking_Id is : ${id}`, results)
    })

    } catch (error) {
        console.log("Error in bookRides")
    }
}