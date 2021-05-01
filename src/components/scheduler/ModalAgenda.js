import React, { Component } from 'react';
import moment from 'moment';
import {guid , getUnique , getLast , getFirst } from "react-agenda/src/helpers";
import Rdate from 'react-datetime';
import './modalAgenda.scss';

var now = new Date();


class ModalAgenda extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
      showCtrl: false,
      multiple: {},
      name: '',
      service: '',
      contactNumber: '',
      classes: 'priority-1',
      startDateTime: now,
      endDateTime: now
    }
    this.handleDateChange = this.handleDateChange.bind(this)
    this.addEvent = this.addEvent.bind(this)
    this.updateEvent = this.updateEvent.bind(this)
    this.dispatchEvent = this.dispatchEvent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {

    if (this.props.itemColors) {
      this.setState({
        classes: Object.keys(this.props.itemColors)[0]
      })

    }
    setTimeout(function() {
      if(this.refs.eventName){
        this.refs.eventName.focus()
      }

    }.bind(this), 50);

    if (!this.props.selectedCells) {
      let start = now
      let endT = moment(now).add(15, 'Minutes');
      return this.setState({editMode: false, name: '', startDateTime: start, endDateTime: endT});
    }

    if (this.props.selectedCells && this.props.selectedCells[0] && this.props.selectedCells[0]._id) {

      let start = moment(this.props.selectedCells[0].startDateTime);
      let endT = moment(this.props.selectedCells[0].endDateTime);

      return this.setState({editMode: true, name: this.props.selectedCells[0].name, service: this.props.selectedCells[0].service, contactNumber: this.props.selectedCells[0].contactNumber, classes: this.props.selectedCells[0].classes, startDateTime: start, endDateTime: endT});

    }

    if (this.props.selectedCells && this.props.selectedCells.length === 1) {
      let start = moment(getFirst(this.props.selectedCells));
      let endT = moment(getLast(this.props.selectedCells)).add(15, 'Minutes');
      return this.setState({editMode: false, name: '', startDateTime: start, endDateTime: endT});
    }

    if (this.props.selectedCells && this.props.selectedCells.length > 0) {
      let start = moment(getFirst(this.props.selectedCells));
      let endT = moment(getLast(this.props.selectedCells)) || now;
      this.setState({editMode: false, name: '', startDateTime: start, endDateTime: endT});
    }

  }

  handleChange(event) {
    if(event.target.tagName === 'BUTTON'){
      event.preventDefault();
    }

    var data = this.state;
    data[event.target.name] = event.target.value;

    this.setState(data);
  }

  handleDateChange(ev, date) {
    var endD = moment(this.state.endDateTime)
    var data = this.state;
    data[ev] = date;

    if(ev === 'startDateTime' && endD.diff(date)< 0 ){
      data['endDateTime'] = moment(date).add(15 , 'minutes');
    }

    this.setState(data);

  }


  dispatchEvent(obj) {
    var newAdded = []
    var items = this.props.items;
    if (obj['multiple']) {
      var array = obj['multiple']
      Object.keys(array).forEach(function(key) {
        var newAr = array[key].filter(function(val, ind) {
          return array[key].indexOf(val) == ind;
        })
        var start = newAr[0];
        var endT = newAr[newAr.length - 1] || now;
        var lasobj = {
          id: guid(),
          clientName: obj.name,
          service: obj.service,
          contactNumber: obj.contactNumber,
          startDateTime: new Date(start),
          endDateTime: new Date(endT),
          classes: obj.classes
        }
        items.push(lasobj)
        newAdded.push(lasobj)
      }.bind(this));
      return this.props.Addnew(items, newAdded)
    }

    obj._id = guid();
    items.push(obj)
    this.props.Addnew(items, obj)
  }

  addEvent(e) {
    if (this.state.name.length < 1) {
      return;
    }

    if(this.props.selectedCells && this.props.selectedCells.length > 0){

      var obj = this.props.selectedCells.reduce((r, v, i, a, k = v.substring(0, 10)) => ((r[k] = r[k] || []).push(v), r), {});

      if (Object.values(obj).length > 1) {
        var newObj = {
          name: this.state.name,
          startDateTime: new Date(this.state.startDateTime),
          endDateTime: new Date(this.state.endDateTime),
          classes: this.state.classes,
          multiple: obj
        }

        return this.dispatchEvent(newObj);

      }

    }

    var newObj = {
      name: this.state.name,
      startDateTime: new Date(this.state.startDateTime),
      endDateTime: new Date(this.state.endDateTime),
      classes: this.state.classes
    }

    this.dispatchEvent(newObj);
  }

  updateEvent(e) {
    if (this.props.selectedCells[0]._id) {

      var newObj = {
        _id: this.props.selectedCells[0]._id,
        name: this.state.name,
        service: this.state.service,
        contactNumber: this.state.contactNumber,
        startDateTime: new Date(this.state.startDateTime),
        classes: this.state.classes
      }
        this.props.edit(newObj);
    }

  }

  /*removeTurn = (e) => {
    debugger
    this.setState({removeModalConfirmationOpen: true})
    this.props.remove(this.props.selectedCells[0]);
  }*/


  handleSubmit(e) {
    e.preventDefault();
    this.addEvent(e);
  }

  handleEdit(e) {
    e.preventDefault();
    this.updateEvent(e);
  }

/*  handleDelete(e){
    e.preventDefault()
    this.removeTurn(e)
  }*/

  render() {
    var itc = Object.keys(this.props.itemColors)
    var colors = itc.map(function(item, idx) {

      return <div style={{
        background: this.props.itemColors[item]
      }} className="agendCtrls-radio-buttons" key={item}>
        <button name="classes"  value={item} className={this.state.classes === item?'agendCtrls-radio-button--checked':'agendCtrls-radio-button'} onClick={this.handleChange.bind(this)}/>
      </div>
    }.bind(this))

    const divStyle = {};

    if (this.state.editMode) {

      var select = this.props.selectedCells[0];

      return (
        <div className="agendCtrls-wrapper" style={divStyle}>
          <form onSubmit={this.handleEdit}>
            <div className="agendCtrls-label-wrapper">
              <div className="agendCtrls-label-inline">
                <label>Nombre del Cliente</label>
                <input type="text" name="name" autoFocus ref="eventName" className="agendCtrls-event-input" value={this.state.name} onChange={this.handleChange.bind(this)} placeholder="Nombre del Cliente"/>

                <label>Servicio</label>
                <input type="text" name="service" autoFocus ref="serviceName" className="agendCtrls-event-input" value={this.state.service} onChange={this.handleChange.bind(this)} placeholder="Servicio"/>
              </div>
              <div className="agendCtrls-label-inline ">
                <label>Teléfono</label>
                <input type="text" name="contactNumber" autoFocus ref="contactNumber" className="agendCtrls-event-input" value={this.state.contactNumber} onChange={this.handleChange.bind(this)} placeholder="Telefono"/>
                <label>Email</label>
                <input type="text" name="email" autoFocus ref="email" className="agendCtrls-event-input" value="aca va el mail cuando lo tengamos" onChange={this.handleChange.bind(this)} placeholder="E-mail"/>
              </div>
            </div>
            <div className="agendCtrls-timePicker-wrapper">
              <div className="agendCtrls-time-picker">
                <label >Start Date</label>
                <Rdate value={this.state.startDateTime} onChange={this.handleDateChange.bind(null, 'startDateTime')} input={false} viewMode="time" ></Rdate>
              </div>
              <div className="agendCtrls-time-picker">
                <label >End Date</label>
                <Rdate value={this.state.endDateTime} onChange={this.handleDateChange.bind(null, 'endDateTime')} input={false} viewMode="time" ></Rdate>
              </div>
            </div>

            <input type="submit" value="Save"/>
          </form>
        </div>
      );

    }

    return (
      <div className="agendCtrls-wrapper" style={divStyle}>
        <form onSubmit={this.handleSubmit}>
          <div className="agendCtrls-label-wrapper">
            <div className="agendCtrls-label-inline">
              <label>Event name</label>
              <input type="text" ref="eventName" autoFocus name="name" className="agendCtrls-event-input" value={this.state.name} onChange={this.handleChange.bind(this)} placeholder="Event Name"/>
            </div>
            <div className="agendCtrls-label-inline">
              <label>Color</label>
              <div className="agendCtrls-radio-wrapper">
                {colors}</div>
            </div>
          </div>
          <div className="agendCtrls-timePicker-wrapper">
            <div className="agendCtrls-time-picker">
              <label >Start Date</label>
              <Rdate value={this.state.startDateTime} onChange={this.handleDateChange.bind(null, 'startDateTime')} input={false} viewMode="time" ></Rdate>
            </div>
            <div className="agendCtrls-time-picker">
              <label >End Date</label>
              <Rdate value={this.state.endDateTime} onChange={this.handleDateChange.bind(null, 'endDateTime')} input={false} viewMode="time" ></Rdate>
            </div>
          </div>

          <input type="submit" value="Save"/>
        </form>
      </div>
    );
  }
}

export default ModalAgenda;