const Validator = require('validator')
const isEmpty = require('./isEmpty')

const eventValidation = data => {
    let errors = {}
    data.nameofevent = !isEmpty(data.nameofevent) ? data.nameofevent: '';
    data.typeofsport = !isEmpty(data.typeofsport) ? data.typeofsport: '';
    data.numberofplayers = !isEmpty(data.numberofplayers) ? data.numberofplayers: '';

    if(Validator.isEmpty(data.nameofevent)){
        errors.nameofevent = "Name of event is required."
    }
    if(Validator.isEmpty(data.typeofsport)){
        errors.typeofsport = "Type of sport is required."
    }
    if(!Validator.isNumeric(data.numberofplayers)){
        errors.numberofplayers = "Must be a number"
    }
    if(Validator.isEmpty(data.numberofplayers)){
        errors.numberofplayers = "Number of players is required."
    }
    else if(data.numberofplayers <= 1){
        errors.numberofplayers = "Must be atleast 2 players."
    }
    else if(data.numberofplayers > 50){
        errors.numberofplayers = "Must be less than 50 players."
    }
    return{
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = eventValidation