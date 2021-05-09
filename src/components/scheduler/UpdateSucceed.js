import * as React from "react";
import './modalAgenda.scss';

class UpdateSucceed extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className="modal box-card">
        <div className="modal-content">
          <div className="remove-confirmation-card">
            {this.props.isEdit &&
            <div className="remove-confirmation-title">
              El turno fue editado con éxito <i className="bi bi-check2"></i>
            </div>}
            {!this.props.isEdit &&
            <div className="remove-confirmation-title">
              El turno fue eliminado con éxito <i className="bi bi-check2"></i>
            </div>}
            <div className="remove-confirmation-buttons">
              <button className="remove-confirmation-button" onClick={this.props.onClose}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default UpdateSucceed;