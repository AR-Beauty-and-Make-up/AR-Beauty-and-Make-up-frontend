import * as React from "react";
import './modalAgenda.scss';
import * as BootstrapIcons from 'react-bootstrap-icons';

class RemoveConfirmModal extends React.Component {
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
              El turno fue eliminado con éxito !
            </div>
            <div className="remove-confirmation-buttons">

              <button className="remove-confirmation-button" onClick={this.props.onClose}><i
                className="bi bi-check-circle-fill"></i></button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default RemoveConfirmModal;