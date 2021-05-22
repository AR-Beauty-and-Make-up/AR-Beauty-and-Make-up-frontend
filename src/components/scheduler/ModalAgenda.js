import React, {Component} from 'react';
import {guid, getUnique, getLast, getFirst,} from "react-agenda/src/helpers";
import './modalAgenda.scss';
import {servicesAR} from '../../helpers/Constants.js';
import Calendar from '../turn/Calendar'


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
      email: '',
      classes: 'priority-1',
      startDateTime: now
    }
    this.handleDateChange = this.handleDateChange.bind(this)
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
    setTimeout(function () {
      if (this.refs.eventName) {
        this.refs.eventName.focus()
      }

    }.bind(this), 50);

      return this.setState({
        editMode: true,
        name: this.props.selectedCells[0].name,
        service: this.props.selectedCells[0].service,
        contactNumber: this.props.selectedCells[0].contactNumber,
        email: this.props.selectedCells[0].email,
        classes: this.props.selectedCells[0].classes,
        startDateTime: this.props.selectedCells[0].startDateTime,
      });

  }

  handleChange(event) {
    if (event.target.tagName === 'BUTTON') {
      event.preventDefault();
    }

    var data = this.state;
    data[event.target.name] = event.target.value;

    this.setState(data);
  }

  handleDateChange(ev, date) {
    var data = this.state;
    data[ev] = date;
    this.setState(data);

  }


  dispatchEvent(obj) {
    var newAdded = []
    var items = this.props.items;
    if (obj['multiple']) {
      var array = obj['multiple']
      Object.keys(array).forEach(function (key) {
        var newAr = array[key].filter(function (val, ind) {
          return array[key].indexOf(val) == ind;
        })
        var start = newAr[0];
        var lasobj = {
          id: guid(),
          clientName: obj.name,
          service: obj.service,
          contactNumber: obj.contactNumber,
          email: obj.email,
          startDateTime: new Date(start),
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

  updateEvent(e) {
    if (this.props.selectedCells[0]._id) {

      var newObj = {
        _id: this.props.selectedCells[0]._id,
        name: this.state.name,
        service: this.state.service,
        contactNumber: this.state.contactNumber,
        email: this.state.email,
        startDateTime: new Date(this.state.startDateTime),
        classes: this.state.classes
      }
      debugger
      this.props.edit(newObj);
    }

  }

  isValidTurn = () => {
    return !!this.state.name && !!this.state.service && !!this.state.contactNumber && !!this.state.email
  }

  handleSubmit(e) {
    e.preventDefault();
    this.addEvent(e);
  }

  handleEdit(e) {
    e.preventDefault();
    this.updateEvent(e);
  }

  notEqualDates = (d1, d2) => {
  return d1 > d2 || d1 < d2
}

  render() {
    var itc = Object.keys(this.props.itemColors)
    var colors = itc.map(function (item, idx) {

      return <div style={{
        background: this.props.itemColors[item]
      }} className="agendCtrls-radio-buttons" key={item}>
        <button name="classes" value={item}
                className={this.state.classes === item ? 'agendCtrls-radio-button--checked' : 'agendCtrls-radio-button'}
                onClick={this.handleChange.bind(this)}/>
      </div>
    }.bind(this))

    const divStyle = {};


      return (
        <div className="agendCtrls-wrapper" style={divStyle}>
          <form onSubmit={this.handleEdit}>
            <div className="agendCtrls-label-wrapper">
              <div className="agendCtrls-label-inline">
                <label>Nombre del Cliente</label>
                <input type="text" name="name" autoFocus ref="eventName" className="agendCtrls-event-input"
                       value={this.state.name} onChange={this.handleChange.bind(this)}
                       placeholder="Nombre del Cliente"/>

                <label>Servicio</label>
                <select name="service" autoFocus ref="serviceName"
                        className="form-select form-select-sm agendCtrls-event-input"
                        value={this.state.service}
                        onChange={this.handleChange.bind(this)} aria-label=".form-select-sm example">
                  {servicesAR.map(service => <option value={service.value}>{service.label}</option>)}

                </select>
              </div>
              <div className="agendCtrls-label-inline ">
                <label>Teléfono</label>
                <input type="text" name="contactNumber" autoFocus ref="contactNumber" className="agendCtrls-event-input"
                       value={this.state.contactNumber} onChange={this.handleChange.bind(this)} placeholder="Telefono"/>
                <label>Email</label>
                <input type="text" name="email" autoFocus ref="email" className="agendCtrls-event-input"
                       value={this.state.email} onChange={this.handleChange.bind(this)} placeholder="E-mail"/>
              </div>

            </div>
            <div className="agendCtrls-timePicker-wrapper">
              <div className="agendCtrls-time-picker">
                <label>Fecha y Hora</label>
                {this.notEqualDates(this.state.startDateTime, now) &&
                <Calendar date={this.state.startDateTime} setDate={this.handleDateChange.bind(null, 'startDateTime')} />}
              </div>
            </div>
            {!this.isValidTurn() &&
            <div className="date-error">
              <i className="bi bi-exclamation-triangle-fill"></i>
              Debe completar todos los campos.
            </div>}

            <input className="save-changes-button" disabled={!this.isValidTurn()} type="submit" value="Guardar"/>
          </form>
        </div>
      );
  }

}

export default ModalAgenda;