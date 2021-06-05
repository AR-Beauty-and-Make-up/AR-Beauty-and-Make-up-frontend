import React, {useEffect, useState, useContext} from 'react';

import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker-min.module.css'
import DatePicker from 'react-datepicker'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import TurnService from '../../services/TurnService';
import { LanguageContext } from '../../providers/languageProvider';

import TEXT from '../../helpers/Languages'


registerLocale('es', es)

const excludedTimes = [
    setHours(setMinutes(new Date(), 0), 0),
    setHours(setMinutes(new Date(), 30), 1),
    setHours(setMinutes(new Date(), 0), 3),
    setHours(setMinutes(new Date(), 30), 4),
    setHours(setMinutes(new Date(), 0), 6),
    setHours(setMinutes(new Date(), 30), 7),
    setHours(setMinutes(new Date(), 30), 19),
    setHours(setMinutes(new Date(), 0), 21),
    setHours(setMinutes(new Date(), 30), 22)
]


const Calendar = (props) => {

  
    const turnService = TurnService()
    const [datesAlreadyTaken, setDatesAlreadyTaken] = useState([])
    const [language, setLanguage] = useContext(LanguageContext)


    useEffect(() => { 
        turnService.getDates().then((response) => {
       
           let newStringDates = response.data
           
           let newDates = newStringDates.map((stringDate) => new Date(stringDate))
   
           setDatesAlreadyTaken(newDates.concat(datesAlreadyTaken))
       
        })
       
     }, [])

    
    const filterTimes = dateAndtime => {
        
        const filterPassedTime = time => {
            const currentDate = new Date();
            const selectedDate = new Date(time);
    
            return currentDate.getTime() < selectedDate.getTime();
        }

        const allowedSatudaysTimes = time => {
            const selectedDate =  new Date(time)
         
            return  selectedDate.getHours() < 13
        }

        const notEqualDates = (d1, d2) => {
            return d1 > d2 || d1 < d2
        }
        
        const filterDatesAlreadyTaken = (date) => {
            return !datesAlreadyTaken.some((dateAlreadyTaken) => !notEqualDates(dateAlreadyTaken, date) )
        }

        const filterPassedTimesAndSaturdayTimes = date => {
            if(date.getDay() !== 6){
                return filterPassedTime(date) && filterDatesAlreadyTaken(date)
            }
            else {
                return filterPassedTime(date) && filterDatesAlreadyTaken(date) && allowedSatudaysTimes(date)
            }
        }

    
        return filterPassedTimesAndSaturdayTimes(dateAndtime) 
        
    }

    const isSunday = date => {
        return date.getDay() !== 0
      };
    
    
    const sameDay = (d1, d2) => {
        return d1.getDay() === d2.getDay() &&  d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear() 
    }

    const sameHour = (d1, d2) => {
        return d1.getHours() === d2.getHours() && d1.getMinutes() === d2.getMinutes()
    }

    const [selectDate, setSelectDate] = useState(props.date)

    return (
      <DatePicker selected={selectDate} onChange={(date) => {
                setSelectDate(date)
        }}
        onCalendarClose={() => props.setDate(selectDate)}
        onClickOutside={() => props.setDate(null)}
        showTimeSelect={true}
        timeCaption={TEXT[language].calendar.timeCaption}
        excludeTimes={excludedTimes}
        filterTime={filterTimes}
        minDate={new Date()}
        maxDate={new Date().setMonth(new Date().getMonth() + 1 )}
        locale='pt-br'
        timeFormat="HH:mm"
        dateFormat="dd/MM/yyyy HH:mm"
        timeIntervals={90}
        filterDate={isSunday}
        placeholderText={TEXT[language].calendar.placeHolder}
        withPortal
        required={true}
        locale={TEXT[language].calendar.locale}
      />
      
    );
};

export default Calendar