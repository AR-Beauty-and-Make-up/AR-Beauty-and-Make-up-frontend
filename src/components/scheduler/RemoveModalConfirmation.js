import './modalConfirmation.scss';

const RemoveModalConfirmation = (props) => {


  const remove = () => {
    
    props.remove(props.turn)
    props.onClose()
  }

  return (

    <div className="modal-confirmation-content">
      <div className="confirmation-modal">
        <div className="remove-confirmation-card">
          <div className="remove-confirmation-title">
            Está seguro de borrar este turno?
          </div>
          <div className="remove-confirmation-buttons">
            <button className="remove-confirmation-button" onClick={() => remove()}>Aceptar</button>
            <button className="remove-confirmation-button" onClick={() => props.cancel()}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>

  )

}

export default RemoveModalConfirmation;