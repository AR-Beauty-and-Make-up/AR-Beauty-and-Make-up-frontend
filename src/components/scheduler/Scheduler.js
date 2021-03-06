import React from 'react'
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
  "color-2": "rgb(190,148,147)",
  "color-3": "#efd6d7"
}

var now = new Date();


class Scheduler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    }

    this.handleItemEdit = this.handleItemEdit.bind(this)
    this.handleRangeSelection = this.handleRangeSelection.bind(this)
    this._openModal = this._openModal.bind(this)
    this._closeModal = this._closeModal.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
    this.editEvent = this.editEvent.bind(this)
    this.changeView = this.changeView.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
  }

  componentDidMount = () => {
    this.getAllTurns()
  }

  renderTurns = (turn) => {
    let startDate = new Date(turn.date)
    let endDate = new Date(turn.date).setHours(startDate.getHours() + 1, startDate.getMinutes() + 30)

    return {
      _id: turn.id,
      name: turn.clientName,
      service: turn.service,
      contactNumber: turn.contactNumber,
      email: turn.email,
      startDateTime: startDate,
      endDateTime: endDate,
      classes: 'color-2 color-3'
    }
  }

  lastMonth = () => {
    if (now.getMonth() / 2 < 1) {
      return now
    }
    return new Date(now.getFullYear(), now.getMonth() - 1)
  }

  handleItemEdit(turn, openModal) {
    if (turn && openModal) {
      this.setState({selected: [turn]})
      return this._openModal();
    }
  }

  handleRangeSelection(item) {
    this.setState({selected: item, showCtrl: true})
    this._openModal();
  }

  _openModal() {
    this.setState({showModal: true})
  }

  _closeModal(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({showModal: false})
  }

  removeTurn(turn) {
    TurnService().deleteTurn(turn._id)
  }

  removeEvent(items , item){
    this.setState({ itemToRemove: item, removeConfirmModal: true, isUpdated: false});
  }

  closeModalConfirmation = () => {
    this.setState({removeConfirmModal: false, updatedSucceed: true})
  }

  cancelModal = () => {
    this.setState({removeConfirmModal: false})
  }
  closeUpdateSucceedModal = () => {
    this.getAllTurns();
    this.setState({updatedSucceed: false})
  }

  getAllTurns() {
    TurnService().getTurns()
      .then(result => {
        this.setState({turns: result.data})
      })
  }

  editEvent(turn) {
    this.setState({showModal: true, selected: turn});
    if(this.validateTurn(turn)){
      TurnService().updateTurn(this.buildTurn(turn))
    }
    this._closeModal();
    this.setState({isUpdated: true, updatedSucceed: true})
  }

  validateTurn(turn) {
    const turnValid = EntitiesValidator().validateTurn(turn);
    this.setState({turnValid: turnValid})
    return turnValid
  }

  buildTurn(turn) {
    return {
      id: turn._id,
      clientName: turn.name,
      service: turn.service,
      contactNumber: turn.contactNumber,
      email: turn.email,
      date: moment(turn.startDateTime.toString()).tz( "America/Argentina/Buenos_Aires").format("YYYY-MM-DDTHH:mm:ss.SS")
    }
  }

  changeView(days, event) {
    this.setState({numberOfDays: days})
  }

  zoomIn(){
    const num = this.state.cellHeight + 15
    this.setState({cellHeight:num})
  }

  zoomOut(){
    const num = this.state.cellHeight - 15
    this.setState({cellHeight:num})
  }

  render() {

    return (
      <div>
        <div className="content-expanded ">
          <div className="control-buttons">
            <button  className="button-control" onClick={this.zoomIn}><i className="bi bi-plus-circle"></i> </button>
            <button  className="button-control" onClick={this.zoomOut}><i className="bi bi-dash-circle"></i> </button>
            <button className="button-control"
                    onClick={this.changeView.bind(null, 7)}> {moment.duration(7, "days").humanize()}  </button>
            <button className="button-control"
                    onClick={this.changeView.bind(null, 4)}> {moment.duration(4, "days").humanize()}  </button>
            <button className="button-control"
                    onClick={this.changeView.bind(null, 3)}> {moment.duration(3, "days").humanize()}  </button>
            <button className="button-control"
                    onClick={this.changeView.bind(null, 1)}> {moment.duration(1, "day").humanize()} </button>
          </div>


          <ReactAgenda
            minDate={this.lastMonth()}
            maxDate={new Date(now.getFullYear(), now.getMonth() + 3)}
            disablePrevButton={false}
            startDate={this.state.startDate}
            cellHeight={this.state.cellHeight}
            locale={this.state.locale}
            items={this.state.turns.map(turn => this.renderTurns(turn))}
            numberOfDays={this.state.numberOfDays}
            rowsPerHour={this.state.rowsPerHour}
            itemColors={colors}
            autoScale={false}
            fixedHeader={true}
            onItemEdit={this.handleItemEdit.bind(this)}
            onRangeSelection={this.handleRangeSelection.bind(this)}
            startAtTime={8}
            endAtTime={20}
            headFormat={"ddd DD MMM"}
            helper={true}
            view="calendar"
            onItemRemove={this.removeEvent.bind(this)}/>

          {this.state.showModal ? <Modal clickOutside={this._closeModal}>
            <div className="modal-content">
              <ModalAgenda     items={this.state.turns}
                               itemColors={colors}
                               selectedCells={this.state.selected}
                               isValidTurn={this.validateTurn}
                               Addnew={this.addNewEvent}
                               edit={this.editEvent}/>


            </div>
          </Modal> : ''
          }

          {this.state.removeConfirmModal ?
            <div className="modal-content">
              <RemoveModalConfirmation onClose={this.closeModalConfirmation}
                                       cancel={this.cancelModal}
                                       itemColors={colors}
                                       turn={this.state.itemToRemove}
                                       remove={this.removeTurn}/>


            </div>
           : ''
          }

          {this.state.updatedSucceed ?
            <div className="modal-content">
              <UpdateSucceed onClose={this.closeUpdateSucceedModal}
                                       itemColors={colors}
                                       isEdit={this.state.isUpdated}/>


            </div>
            : ''
          }

        </div>
      </div>
    );

  }
}

export default withRouter(Scheduler)