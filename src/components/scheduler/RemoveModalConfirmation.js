import * as React from "react";

import './modalAgenda.scss';

class RemoveModalConfirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  remove = () => {
    debugger
    this.props.remove(this.props.turn)
    this.props.onClose()
  }

  render() {
    return (

      <div className="modal box-card">
        <div className="modal-content">
          <div className="remove-confirmation-card">
            <div className="remove-confirmation-title">
              Está seguro de borrar este turno?
            </div>
            <div className="remove-confirmation-buttons">
              <button className="remove-confirmation-button" onClick={this.remove}>Aceptar</button>
              <button className="remove-confirmation-button" onClick={this.props.onClose}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default RemoveModalConfirmation;