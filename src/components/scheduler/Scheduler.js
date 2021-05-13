import {useState, useEffect} from 'react'
import {ReactAgenda, ReactAgendaCtrl, guid, getUnique, getLast, getFirst, Modal} from 'react-agenda';
import {withRouter} from "react-router-dom";
import NavbarAR from "../navbar/Navbar";
import TurnService from "../../services/TurnService";
import moment from 'moment-timezone';
import './scheduler.scss';
import './modalAgenda.scss';
import ModalAgenda from "./ModalAgenda";
import EntitiesValidator from "../../helpers/EntitiesValidator";
import RemoveModalConfirmation from "./RemoveModalConfirmation";
import UpdateSucceed from "./UpdateSucceed";



require('moment/locale/es.js');

var colors = {
  "color-2": "rgba(190, 148, 147, 1)",
  "color-3": "#efd6d7"
}

var now = new Date();


const Scheduler = () => {

  const [state, setState] = useState({
      turns: [],
      selected: [],
      cellHeight: 30,
      showModal: false,
      locale: "es",
      rowsPerHour: 2,
      numberOfDays: 7,
      startDate: new Date(),
      removeConfirmModal: false,
      isUpdated: false
    })



    useEffect(() => getAllTurns(), [])

  const renderTurns = (turn) => {
    let startDate = new Date(turn.date)
    let endDate = new Date(turn.date).setHours(startDate.getHours() + 1, startDate.getMinutes() + 30)

    return {
      _id: turn.id,
      name: turn.clientName,
      service: turn.service,
      contactNumber: turn.contactNumber,
      startDateTime: startDate,
      endDateTime: endDate,
      classes: 'color-2 color-3'
    }
  }

  const lastMonth = () => {
    if (now.getMonth() / 2 < 1) {
      return now
    }
    return new Date(now.getFullYear(), now.getMonth() - 1)
  }

  const handleItemEdit = (turn, openModal) => {
    debugger
    if (turn && openModal) {
      setState( (prevState) => ({...prevState, selected: [turn]}))
      return _openModal()
    }
  }

  const handleRangeSelection = (item) => {
    setState((prevState) => ({...prevState, selected: item, showCtrl: true}))
    _openModal();
  }

  const _openModal = () => {
    debugger
    setState((prevState) => ({...prevState, showModal: true}))
  }

  const _closeModal = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setState((prevState) => ({...prevState, showModal: false}))
  }

  const removeTurn = (turn) => {
    TurnService().deleteTurn(turn._id)
  }

  const removeEvent = (items , item) => {
    setState((prevState) => ({...prevState, 
                              itemToRemove: item, 
                              removeConfirmModal: true, 
                              isUpdated: false}));
  }

  const closeModalConfirmation = () => {
    setState((prevState) => ({...prevState, removeConfirmModal: false, updatedSucceed: true}))
  }

  const closeUpdateSucceedModal = () => {
    getAllTurns()
    setState((prevState) => ({...prevState, updatedSucceed: false}))
  }

  const getAllTurns = () => {
    TurnService().getTurns()
      .then(result => {
        setState((prevState) => ({...prevState, turns: result.data}))
      })
  }

  const editEvent = (turn) => {
    debugger
    setState((prevState) => ({...prevState, showModal: true, selected: turn}))
    if(validateTurn(turn)){
      TurnService().updateTurn(buildTurn(turn))
    }
    _closeModal()
    setState((prevState) => ({...prevState, isUpdated: true, updatedSucceed: true}))
  }

  const validateTurn = (turn) => {
    const turnValid = EntitiesValidator().validateTurn(turn);
    setState((prevState) => ({...prevState, turnValid: turnValid}))
    return turnValid
  }

  const buildTurn = (turn) => {
    return {
      id: turn._id,
      clientName: turn.name,
      service: turn.service,
      contactNumber: turn.contactNumber,
      date: moment(turn.startDateTime.toString()).tz( "America/Argentina/Buenos_Aires").format("YYYY-MM-DDTHH:mm:ss.SS")
    }
  }

  const changeView = (days, event) => {
    setState((prevState) => ({...prevState, numberOfDays: days}))
  }

  const zoomIn = () => {
    const num = state.cellHeight + 15
    setState((prevState) => ({...prevState, cellHeight:num}))
  }

  const zoomOut = () =>{
    const num = state.cellHeight - 15
    setState((prevState) => ({...prevState, cellHeight:num}))
  }



    return (
      <div>
        <div className="content-expanded ">
          <div className="control-buttons">
            <button  className="button-control" onClick={() => zoomIn()}><i className="bi bi-plus-circle"></i> </button>
            <button  className="button-control" onClick={() => zoomOut()}><i className="bi bi-dash-circle"></i> </button>
            <button className="button-control"
                    onClick={() => changeView(null, 7)}> {moment.duration(7, "days").humanize()}  </button>
            <button className="button-control"
                    onClick={() => changeView(null, 4)}> {moment.duration(4, "days").humanize()}  </button>
            <button className="button-control"
                    onClick={() => changeView(null, 3)}> {moment.duration(3, "days").humanize()}  </button>
            <button className="button-control"
                    onClick={() => changeView(null, 1)}> {moment.duration(1, "day").humanize()} </button>
          </div>


          <ReactAgenda
            minDate={lastMonth()}
            maxDate={new Date(now.getFullYear(), now.getMonth() + 3)}
            disablePrevButton={false}
            startDate={state.startDate}
            cellHeight={state.cellHeight}
            locale={state.locale}
            items={state.turns.map(turn => renderTurns(turn))}
            numberOfDays={state.numberOfDays}
            rowsPerHour={state.rowsPerHour}
            itemColors={colors}
            autoScale={false}
            fixedHeader={true}
            onItemEdit={(turn, modal) => handleItemEdit(turn, modal)}
            onRangeSelection={(turn) => handleRangeSelection(turn)}
            startAtTime={8}
            endAtTime={20}
            headFormat={"ddd DD MMM"}
            helper={true}
            view="calendar"
            onItemRemove={(turns, turn) => removeEvent(turns, turn)}/>

          {state.showModal ?
          
          <Modal clickOutside={(event) => _closeModal(event)}>
            <div className="modal-content">
              <ModalAgenda     items={state.turns}
                               itemColors={colors}
                               selectedCells={state.selected}
                               isValidTurn={(turn) => validateTurn(turn)}
                               edit={(turn) => editEvent(turn)}/>


            </div>
          </Modal> : ''
          }

          {state.removeConfirmModal ?
            <div className="modal-content">
              <RemoveModalConfirmation onClose={() => closeModalConfirmation()}
                                       itemColors={colors}
                                       turn={state.itemToRemove}
                                       remove={removeTurn}/>


            </div>
           : ''
          }

          {state.updatedSucceed ?
            <div className="modal-content">
              <UpdateSucceed onClose={() => closeUpdateSucceedModal()}
                                       itemColors={colors}
                                       isEdit={state.isUpdated}/>


            </div>
            : ''
          }

        </div>
      </div>
    );

  
}

export default Scheduler