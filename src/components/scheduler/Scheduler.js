import React from 'react'
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';
import {withRouter} from "react-router-dom";
import NavbarAR from "../navbar/Navbar";
import TurnService from "../../services/TurnService";


require('moment/locale/es.js');

var colors= {
  "color-2":"rgba(190, 148, 147, 1)" ,
  "color-3":"#efd6d7"
}

var now = new Date();


class Scheduler extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      turns: [],
      selected:[],
      cellHeight:30,
      showModal:false,
      locale:"es",
      rowsPerHour:2,
      numberOfDays:7,
      startDate: new Date()
    }
    this.handleCellSelection = this.handleCellSelection.bind(this)
    this.handleItemEdit = this.handleItemEdit.bind(this)
    this.handleRangeSelection = this.handleRangeSelection.bind(this)
  }

  componentDidMount = () => {
    TurnService().getTurns()
      .then(result =>{this.setState({turns: result.data})})

  }

  renderTurns = (turn) => {
    console.log()
    let startDate = new Date(turn.date)
    let endDate = new Date(turn.date).setHours(startDate.getHours() +1, startDate.getMinutes() +30)

    return{_id: turn.id,
        name: turn.clientName + " Servicio: " + turn.service,
        startDateTime : startDate,
        endDateTime   : endDate,
        classes: 'color-2 color-3'}
  }

  lastMonth = () => {
    if(now.getMonth() / 2 < 1){
      return now
    }
    return new Date(now.getFullYear(), now.getMonth()-1)
  }

  handleCellSelection(item){
    console.log('handleCellSelection',item)
  }
  handleItemEdit(item){
    console.log('handleItemEdit', item)
  }
  handleRangeSelection(item){
    console.log('handleRangeSelection', item)
  }
  render() {
    return (
      <div>
        <ReactAgenda
          minDate={this.lastMonth()}
          maxDate={new Date(now.getFullYear(), now.getMonth()+2)}
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
          onRangeSelection={this.handleRangeSelection.bind(this)}/>

      </div>
    );

  }

}

export default withRouter(Scheduler)