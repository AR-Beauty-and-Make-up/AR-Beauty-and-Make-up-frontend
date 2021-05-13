import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {guid , getUnique , getLast , getFirst,  } from "react-agenda/src/helpers";
import Rdate from 'react-datetime';
import './modalAgenda.scss';

var now = new Date()


const ModalAgenda = (props) => {
  debugger
  const [state, setState]  = useState({
        editMode: false,
        showCtrl: false,
        multiple: {},
        name: '',
        service: '',
        contactNumber: '',
        classes: 'priority-1',
        startDateTime: now,
        endDateTime: now
      })

    useEffect(() => {

    if (props.itemColors) {
      setState((prevState) => ({...prevState, classes: Object.keys(this.props.itemColors)[0] }))

    }
    setTimeout((refs) => {
      if(refs.eventName){
        refs.eventName.focus()
      }

    }, 50);

    if (!props.selectedCells) {
      let start = now
      let endT = moment(now).add(15, 'Minutes');
      return setState((prevState) => ({...prevState, editMode: false, 
                                                      name: '', 
                                                      startDateTime: start, 
                                                      endDateTime: endT}));
    }

    if (props.selectedCells && props.selectedCells[0] && props.selectedCells[0]._id) {

      let start = moment(props.selectedCells[0].startDateTime);
      let endT = moment(props.selectedCells[0].endDateTime);

      return setState((prevState) => ({...prevState, editMode: true, 
                                          name: props.selectedCells[0].name, 
                                          service: props.selectedCells[0].service, 
                                          contactNumber: props.selectedCells[0].contactNumber, 
                                          classes: props.selectedCells[0].classes, 
                                          startDateTime: start, 
                                          endDateTime: endT}))

    }

    if (props.selectedCells && props.selectedCells.length === 1) {
      let start = moment(getFirst(props.selectedCells));
      let endT = moment(getLast(props.selectedCells)).add(15, 'Minutes');
      return setState((prevState) => ({...prevState, editMode: false, 
                                                      name: '', 
                                                      startDateTime: start, 
                                                      endDateTime: endT}))
    }

    if (props.selectedCells && props.selectedCells.length > 0) {
      let start = moment(getFirst(props.selectedCells));
      let endT = moment(getLast(props.selectedCells)) || now;
      setState((prevState) => ({...prevState, editMode: false, 
                                              name: '', 
                                              startDateTime: start, 
                                              endDateTime: endT}))
    }

  }, [])
  const handleChange = (event) => {
    if(event.target.tagName === 'BUTTON'){
      event.preventDefault();
    }

    var data = {...state};
    data[event.target.name] = event.target.value;

    setState(data);
  }

  const handleDateChange = (ev, date) => {
    var endD = moment(state.endDateTime)
    var data = {...state}
    data[ev] = date

    if(ev === 'startDateTime' && endD.diff(date)< 0 ){
      data['endDateTime'] = moment(date).add(15 , 'minutes');
    }

    setState(data);

  }


  const dispatchEvent = (obj) => {
    var newAdded = []
    var items = props.items;
    if (obj['multiple']) {
      var array = obj['multiple']
      Object.keys(array).forEach((key) => {
        var newAr = array[key].filter((val, ind) =>{
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
      });
      return props.Addnew(items, newAdded)
    }

    obj._id = guid();
    items.push(obj)
    props.Addnew(items, obj)
  }

  const updateEvent = (e) => {
    if (props.selectedCells[0]._id) {

      var newObj = {
        _id: props.selectedCells[0]._id,
        name: state.name,
        service: state.service,
        contactNumber: state.contactNumber,
        startDateTime: new Date(state.startDateTime),
        classes: state.classes
      }
        props.edit(newObj);
    }

  }

  const isValidTurn = () => {
    return !!state.name && !!state.service && !!state.contactNumber
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //addEvent(e);
  }

  const handleEdit = (e) => {
    e.preventDefault();
    updateEvent(e);
  }

 
    var itc = Object.keys(props.itemColors)
    var colors = itc.map((item, idx) => {

    return <div style={{background: props.itemColors[item]}} 
                className="agendCtrls-radio-buttons" key={item}>
                      <button 
                      name="classes"  value={item} 
                      className={state.classes === item?'agendCtrls-radio-button--checked':'agendCtrls-radio-button'} 
                      onClick={(event) => handleChange(event)}/>
            </div>
    })

    const divStyle = {};

    if (state.editMode) {

      return (
        <div className="agendCtrls-wrapper" style={divStyle}>
          <form onSubmit={(event) => handleEdit(event)}>
            <div className="agendCtrls-label-wrapper">
              <div className="agendCtrls-label-inline">
                <label>Nombre del Cliente</label>
                <input type="text" name="name" autoFocus ref="eventName" 
                      className="agendCtrls-event-input" 
                      value={state.name} 
                      onChange={(event) => handleChange(event)} 
                      placeholder="Nombre del Cliente"/>

                <label>Servicio</label>
                <input type="text" name="service" autoFocus ref="serviceName" 
                      className="agendCtrls-event-input" 
                      value={state.service} 
                      onChange={(event) => handleChange(event)} 
                      placeholder="Servicio"/>
              </div>
              <div className="agendCtrls-label-inline ">
                <label>Teléfono</label>
                <input type="text" name="contactNumber" autoFocus ref="contactNumber" 
                        className="agendCtrls-event-input" 
                        value={state.contactNumber} 
                        onChange={(event) => handleChange(event)} 
                        placeholder="Telefono"/>
                <label>Email</label>
                <input type="text" name="email" autoFocus ref="email" 
                      className="agendCtrls-event-input" 
                      value="aca va el mail cuando lo tengamos" 
                      onChange={(event) => handleChange(event)}
                      placeholder="E-mail"/>
              </div>

            </div>
            <div className="agendCtrls-timePicker-wrapper">
              <div className="agendCtrls-time-picker">
                <label >Desde</label>
                <Rdate value={state.startDateTime} 
                      onChange={(event) => handleDateChange(null, 'startDateTime')} 
                      input={false} 
                      viewMode="time" ></Rdate>
              </div>
              <div className="agendCtrls-time-picker">
                <label >Hasta</label>
                <Rdate value={state.endDateTime} 
                      onChange={() => handleDateChange(null, 'endDateTime')} 
                      input={false} viewMode="time" ></Rdate>
              </div>
            </div>
            {!isValidTurn() &&
            <div className="date-error">
              <i className="bi bi-exclamation-triangle-fill"></i>
              Debe completar todos los campos.
            </div>}

            <input disabled={!isValidTurn()} type="submit" value="Guardar"/>
          </form>
        </div>
      );

    }

    return (
      <div className="agendCtrls-wrapper" style={divStyle}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="agendCtrls-label-wrapper">
            <div className="agendCtrls-label-inline">
              <label>Event name</label>
              <input type="text" ref="eventName" autoFocus name="name" 
                    className="agendCtrls-event-input" 
                    value={state.name} 
                    onChange={(event) => handleChange(event)} 
                    placeholder="Event Name"/>
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
              <Rdate value={state.startDateTime} 
                    onChange={() => handleDateChange(null, 'startDateTime')} 
                    input={false} viewMode="time" ></Rdate>
            </div>
            <div className="agendCtrls-time-picker">
              <label >End Date</label>
              <Rdate value={state.endDateTime} 
                    onChange={() => handleDateChange(null, 'endDateTime')} 
                    input={false} viewMode="time" ></Rdate>
            </div>
          </div>

          <input type="submit" value="Save"/>
        </form>
      </div>
    )
  
}

export default ModalAgenda