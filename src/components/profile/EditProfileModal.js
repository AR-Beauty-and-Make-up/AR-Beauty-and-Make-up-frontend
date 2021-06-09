import React, {useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";


const EditProfileModal = (props) => {


  const [editModalOpen, setEditModalOpen] = useState(true)
  const [incomplete, setIncomplete] = useState(false)

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

  return (
    <div>
      <Dialog open={editModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <TextField required
                     onChange={(e) => campoRequerido(e)}
                     id="validation-outlined-input"
                     label="Obligatorio"
                     defaultValue={props.value}
                     autoFocus
                     margin="dense"
                     type={props.type}
                     fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="black" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="black" disabled={incomplete} onClick={handleClose}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}
export default EditProfileModal;