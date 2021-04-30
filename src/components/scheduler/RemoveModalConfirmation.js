import * as React from "react";

import './modalAgenda.scss';

class RemoveModalConfirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="agendCtrls-wrapper">
        <div className="modal-background"/>
        <div className="modal-content">
          <div className="remove-product-confirmation-card">
            <div className="remove-confirmation-title">
              Está seguro de borrar este turno?
            </div>
            <div className="remove-confirmation-buttons">
              <button className="remove-confirmation-button" onClick={this.props.remove}>Aceptar</button>
              <button className="remove-confirmation-button" onClick={this.props.onClose}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default RemoveModalConfirmation;