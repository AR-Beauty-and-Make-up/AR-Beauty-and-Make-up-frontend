import React, {useContext, useEffect, useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {UserContext} from "../../providers/userProvider";
import UserService from "../../services/UserService";


const EditProfileModal = (props) => {


  const [user, setUser] = useContext(UserContext)
  const [incomplete, setIncomplete] = useState(false)
  const [dataOfUser, setDataOfUser] = useState({...user})

  const campoRequerido = (event) => {
    if(event.target.value === ""){
      setIncomplete(true)
    }else {
      setIncomplete(false)
    }
  }

  const saveChanges = () => {
    UserService().updateUser(user.id, dataOfUser).then((response) => {
      setUser(response.data)
    })
    props.onClose()
  }

  const setNewName = (name) => {
    var updatedUser = {...dataOfUser}
    updatedUser.fullname = name
    setDataOfUser(updatedUser)
  }
  const setNewDateOfBirth = (date) => {
    var updatedUser = {...dataOfUser}
    updatedUser.dateOfBirth = date
    setDataOfUser(updatedUser)
  }
  const setNewContactNumber = (number) => {
    var updatedUser = {...dataOfUser}
    updatedUser.contactNumber = number
    setDataOfUser(updatedUser)
  }
  const setNewAddress = (anAddress) => {
    var updatedUser = {...dataOfUser}
    updatedUser.address = anAddress
    setDataOfUser(updatedUser)
  }

  return (
    <div>
      <Dialog open={true} onClose={props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editá Tus Datos</DialogTitle>
        <DialogContent>
          <TextField required
                     onChange={(e) => {
                                  campoRequerido(e)
                       setNewName(e.target.value)}}
                     id="validation-outlined-input"
                     label="Nombre y Apellido"
                     defaultValue={user.fullname}
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
                     label="Fecha de Nacimiento"
                     defaultValue={user.dateOfBirth}
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
                     label="Número de contacto"
                     defaultValue={user.contactNumber}
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
                     label="Dirección"
                     defaultValue={user.address}
                     autoFocus
                     margin="dense"
                     type="text"
                     fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="black" onClick={props.onClose}>
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