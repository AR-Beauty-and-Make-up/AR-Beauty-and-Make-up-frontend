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



require('moment/locale/es.js');

var colors = {
  "color-2": "rgba(190, 148, 147, 1)",
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
      removeConfirmModal: false

    }
    this.handleCellSelection = this.handleCellSelection.bind(this)
    this.handleItemEdit = this.handleItemEdit.bind(this)
    this.handleRangeSelection = this.handleRangeSelection.bind(this)
    this._openModal = this._openModal.bind(this)
    this._closeModal = this._closeModal.bind(this)
    this.addNewEvent = this.addNewEvent.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
    this.editEvent = this.editEvent.bind(this)
    this.changeView = this.changeView.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
  }

  componentDidMount = () => {
    TurnService().getTurns()
      .then(result => {
        this.setState({turns: result.data})
      })
  }


  componentWillReceiveProps(next, last) {
    if (next.items) {
      TurnService().getTurns()
        .then(result => {
          this.setState({turns: result.data})
        })
    }

      .then(result =>{this.setState({turns: result.data})})
  }

  renderTurns = (turn) => {
    console.log()
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

  lastMonth = () => {
    if (now.getMonth() / 2 < 1) {
      return now
    }
    return new Date(now.getFullYear(), now.getMonth() - 1)
  }

  handleCellSelection(turn) {
    if (this.state.selected && this.state.selected[0] === turn) {
      return this._openModal();
    }
    this.setState({selected: [turn]})
  }

  handleItemEdit(turn, openModal) {
    debugger
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
    debugger
    TurnService().deleteTurn(turn._id)
  }

  removeEvent(items , item){
    this.setState({ itemToRemove: item, removeConfirmModal: true});
  }

  closeModalConfirmation = () => {
    this.setState({removeConfirmModal: false})
  }

  addNewEvent(items, newItems) {

    this.setState({showModal: false, selected: [], items: items});
    this._closeModal();
  }

  editEvent(turn) {
    debugger
    this.setState({showModal: true, selected: []});
    if(this.validateTurn(turn)){
      TurnService().updateTurn(this.buildTurn(turn))
    }
    this._closeModal();
  }

  validateTurn(turn) {
    debugger
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
    var AgendaItem = function (props) {
      console.log(' item component props', props)
      return <div style={{display: 'block', position: 'absolute', background: '#FFF'}}>{props.item.name}
        <button onClick={() => props.edit(props.item)}>Edit</button>
      </div>
    }

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
            onCellSelect={this.handleCellSelection.bind(this)}
            onRangeSelection={this.handleRangeSelection.bind(this)}


            startAtTime={8}
            endAtTime={20}
            headFormat={"ddd DD MMM"}
            helper={true}
            //itemComponent={AgendaItem}
            view="calendar"
            onItemRemove={this.removeEvent.bind(this)}/>

          {this.state.showModal ? <Modal clickOutside={this._closeModal}>
            <div className="modal-content">
              <ModalAgenda     items={this.state.turns}
                               itemColors={colors}
                               selectedCells={this.state.selected}
                               Addnew={this.addNewEvent}
                               edit={this.editEvent}/>


            </div>
          </Modal> : ''
          }

          {this.state.removeConfirmModal ? <Modal clickOutside={this._closeModal}>
            <div className="modal-content">
              <RemoveModalConfirmation onClose={this.closeModalConfirmation}
                                       itemColors={colors}
                                       turn={this.state.itemToRemove}
                                       remove={this.removeTurn}
                                       renderTurns={this.setTurns}/>


            </div>
          </Modal> : ''
          }

        </div>
      </div>
    );

  }
}

export default withRouter(Scheduler)