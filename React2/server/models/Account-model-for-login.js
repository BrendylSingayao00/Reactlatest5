const mongoose = require('mongoose')

//mongodb offline
// const EmployeeSchema = new mongoose.Schema({
//     email: String,
//     pass: String
// })

// const EmployeeModel = mongoose.model("employees", EmployeeSchema)
// module.exports = EmployeeModel

// mongodb online

const POSSchema = new mongoose.Schema({
    emailadd: String,
    password: String,
    role: String
})

const POSModel = mongoose.model("employees", POSSchema)
module.exports = POSModel