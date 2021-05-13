import * as React from "react";
import './modalAgenda.scss';

const UpdateSucceed = (props) =>  {

    return (

      <div className="modal box-card">
        <div className="modal-content">
          <div className="remove-confirmation-card">
            {props.isEdit &&
            <div className="remove-confirmation-title">
              El turno fue editado con éxito <i className="bi bi-check2"></i>
            </div>}
            {!props.isEdit &&
            <div className="remove-confirmation-title">
              El turno fue eliminado con éxito <i className="bi bi-check2"></i>
            </div>}
            <div className="remove-confirmation-buttons">
              <button className="remove-confirmation-button" onClick={props.onClose}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>

    )

}

export default UpdateSucceed;