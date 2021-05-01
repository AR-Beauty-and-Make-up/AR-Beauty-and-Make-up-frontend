
const EntitiesValidator = () => {

  const validateTurn = (turn) => {
    return !!turn.name && !!turn.service && !!turn.startDateTime && !!turn.contactNumber
  }

  return{
    validateTurn: validateTurn
  }
}

export default EntitiesValidator;