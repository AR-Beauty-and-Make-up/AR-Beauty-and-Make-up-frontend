
const EntitiesValidator = () => {

  const validateTurn = (turn) => {
    return !!turn.clientName && !!turn.service && !! turn.startDateTime && !!turn.contactNumber
  }

  return{
    validateTurn: validateTurn
  }
}

export default EntitiesValidator;