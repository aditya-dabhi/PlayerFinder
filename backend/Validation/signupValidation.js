const Validator = require('validator')
const isEmpty = require('./isEmpty')

const signupValidation = data => {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name: '';
    data.email = !isEmpty(data.email) ? data.email: '';
    data.password = !isEmpty(data.password) ? data.password: '';

    if(!Validator.isLength(data.name, {min:2, max:30})){
        errors.name = "Name must be between 2 to 30 characters"
    }
    if(Validator.isEmpty(data.name)){
        errors.name = "Name field is required"
    }
    if(!Validator.isEmail(data.email)){
        errors.email = "Invalid Email"
    }
    if(Validator.isEmpty(data.email)){
        errors.email = "Email Field is required"
    }
    if(!Validator.isLength(data.password, {min:6})){
        errors.password = "Password must be between 6 to 30 characters"
    }
    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = signupValidation