import React, {useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";


const EditProfileModal = (props) => {


  const [editModalOpen, setEditModalOpen] = useState(true)
  const [incomplete, setIncomplete] = useState(false)
  const [newName, setNewName] = useState(props.user.fullname)
  const [newDateOfBirth, setNewDateOfBirth] = useState(props.user.dateOfBirth)
  const [newContactNumber, setNewContactNumber] = useState(props.user.contactNumber)
  const [newAddress, setNewAddress] = useState(props.user.address)

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
    props.changeValue({
      fullname: newName,
      dateOfBirth: newDateOfBirth,
      contactNumber: newContactNumber,
      address: newAddress,
      password: props.user.password
    });
    props.onClose();
  }

  return (
    <div>
      <Dialog open={editModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editá Tus Datos</DialogTitle>
        <DialogContent>
          <TextField required
                     onChange={(e) => {
                                  campoRequerido(e)
                       setNewName(e.target.value)}}
                     id="validation-outlined-input"
                     label="Obligatorio"
                     defaultValue={props.user.fullname}
                     autoFocus
                     margin="dense"
                     type="text"
                     fullWidth
          />
          <TextField required
                     onChange={(e) => {
                       campoRequerido(e)
                       setNewDateOfBirth(e.target.value)}}
                     id="validation-outlined-input"
                     label="Obligatorio"
                     defaultValue={props.user.dateOfBirth}
                     autoFocus
                     margin="dense"
                     type="date"
                     fullWidth
          />
          <TextField required
                     onChange={(e) => {
                       campoRequerido(e)
                       setNewContactNumber(e.target.value)}}
                     id="validation-outlined-input"
                     label="Obligatorio"
                     defaultValue={props.user.contactNumber}
                     autoFocus
                     margin="dense"
                     type="text"
                     fullWidth
          />
          <TextField required
                     onChange={(e) => {
                       campoRequerido(e)
                       setNewAddress(e.target.value)}}
                     id="validation-outlined-input"
                     label="Obligatorio"
                     defaultValue={props.user.address}
                     autoFocus
                     margin="dense"
                     type="text"
                     fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="black" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="black" disabled={incomplete} onClick={saveChanges}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}
export default EditProfileModal;