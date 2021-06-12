import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import ErrorIcon from '@material-ui/icons/Error';
import Button from "@material-ui/core/Button";
import React, {useState} from "react";


const EditPasswordModal = (props) => {

  const [passwordModalOpen, setPasswordModalOpen] = useState(true)
  const [incomplete, setIncomplete] = useState(true)
  const [newPassword, setNewPassword] = useState("")
  const [validPassword, setValidPassword] = useState(true)
  const [isValidOldPassword, setIsValidOldPassword] = useState(true)

  const campoRequerido = (event) => {
    if(event.target.value === ""){
      setIncomplete(true)
    }else {
      setIncomplete(false)
    }
  }
  const handleClose = () => {
    props.onClose();
  };

  const saveChanges = () => {
    props.changePassword({
      fullname: props.user.fullname,
      dateOfBirth: props.user.dateOfBirth,
      contactNumber: props.user.contactNumber,
      address: props.user.address,
      password: newPassword
  })
    props.onClose()
  }

  const validOldPassword = (event) => {
    setIsValidOldPassword(props.user.password === event)
  }

  const validatePassword = (event) =>{
    setValidPassword(newPassword === event)
  }


  return (
    <div>
      <Dialog open={passwordModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Cambio de Contraseña</DialogTitle>
        <DialogContent>
          <TextField required
                     onChange={(e) => {
                       campoRequerido(e)
                       validOldPassword(e.target.value)}}
                     id="validation-outlined-input"
                     label="Contraseña anterior"
                     autoFocus
                     margin="dense"
                     type="password"
                     fullWidth
          />
          {!isValidOldPassword && <span><ErrorIcon color="error"></ErrorIcon> Contraseña incorrecta</span>}
          <TextField required
                     onChange={(e) => {
                       campoRequerido(e)
                       setNewPassword(e.target.value)}}
                     id="validation-outlined-input"
                     label="Contraseña nueva"
                     autoFocus
                     margin="dense"
                     type="password"
                     fullWidth
          />
          <TextField required
                     onChange={(e) => {
                       campoRequerido(e)
                       validatePassword(e.target.value)}}
                     id="validation-outlined-input"
                     label="Repetí la contraseña"
                     autoFocus
                     margin="dense"
                     type="password"
                     fullWidth
          />

          {!validPassword && <span><ErrorIcon color="error"></ErrorIcon> Las contraseñas no coinciden</span>}
        </DialogContent>
        <DialogActions>
          <Button color="black" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="black" disabled={incomplete} onClick={saveChanges} >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}

export default EditPasswordModal;