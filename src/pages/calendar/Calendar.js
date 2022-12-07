import React from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { useDispatch, useSelector } from "react-redux";
import { callSchedulesAPI } from "../../apis/CalendarAPICalls";
import CalendarCSS from "./Calendar.module.css";
import { useEffect, useState } from "react";
import PersnalTitle from './title/PersnalTitle';
import CompanyTitle from './title/CompanyTitle';
import { decodeJwt } from '../../utils/tokenUtils';
import DeptTitle from './title/DeptTitle';
import OffTitle from './title/OffTitle';
import moment from 'moment';
import { callCalendarOffAPI } from '../../apis/OffAPICalls';

function Calendar() {

    const apiKey = process.env.REACT_APP_CAL_API_KEY;
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const schedules = useSelector(state => state.calendarReducer);
    const offList = useSelector(state => state.offReducer);
    const [persnalChecked, setPersnalChecked] = useState(true);
    const [companyChecked, setCompanyChecked] = useState(true);
    const [deptChecked, setDeptChecked] = useState(true);
    const [offChecked, setOffChecked] = useState(true);
    // const [Modal, setModal] = useState(false);

    const schedule = schedules.map(schedule => {
      return { title: schedule.scheduleTitle,
              content: schedule.scheduleContent,
              start : schedule.scheduleStart,
              end : schedule.scheduleEnd,
              backgroundColor : schedule.scheduleColor,
              sort : schedule.scheduleSort };
    });

    const offLists = offList.map(offLists => {
      return { title: offLists.member.memberName,
              start : offLists.offStart,
              end : offLists.offEnd
              };
    });

    console.log('offLists : ', offLists);

    var index;
    for (index = 0; index < schedule.length; index++) {
      schedule[index].start = (schedule[index].start).substr(0, 10);
      schedule[index].end = (schedule[index].end).substr(0, 10);
    }

    var i;
    const persnal = [];
    const company = [];
    const dept = [];
    for(i = 0; i < schedule.length; i++) {
      if(Object.values(schedule[i])[5] === '개인') {
        persnal.push(schedule[i]);
      } else if(Object.values(schedule[i])[5] === '회사') {
        company.push(schedule[i]);
      } else if(Object.values(schedule[i])[5] === '부서') {
        dept.push(schedule[i]);
      } 
    } 

    const persnalTitleListHandler = (e) => {
      if(e.target.checked) {
        setPersnalChecked(true);
      } else if(!e.target.checked) {
        setPersnalChecked(false);
      }
    }

    const companyTitleListHandler = (e) => {
      if(e.target.checked) {
        setCompanyChecked(true);
      } else if(!e.target.checked) {
        setCompanyChecked(false);
      }
    }

    const deptTitleListHandler = (e) => {
      if(e.target.checked) {
        setDeptChecked(true);
      } else if(!e.target.checked) {
        setDeptChecked(false);
      }
    }
    
    const offTitleListHandler = (e) => {
      if(e.target.checked) {
        setOffChecked(true);
      } else if(!e.target.checked) {
        setOffChecked(false);
      }
    }

    // console.log('result : ', result);

    useEffect(
      () => {
          dispatch(callSchedulesAPI({
        }));
      }
      , []
  );

    useEffect(
      () => {
          dispatch(callCalendarOffAPI({
        }));
      }
      , []
  );

  console.log('offList : ',offList);
    // const test = JSON.stringify(schedule);
    // const result = JSON.parse(test);

    // -------------------------------------------------------- 더티 코드 리팩토링 필요
    var result = [];
    if(persnalChecked && companyChecked && deptChecked && !offChecked) {               // 셋 다 체크
      result = schedule;
    } else if (persnalChecked && companyChecked && !deptChecked && !offChecked ){       // 개인, 회사
      for(i = 0; i < schedule.length; i++) {
        if(Object.values(schedule[i])[5] === '개인') {
          result.push(schedule[i])
        } else if(Object.values(schedule[i])[5] === '회사') {
          result.push(schedule[i]);
        }
      }
    } else if (persnalChecked && !companyChecked && !deptChecked && !offChecked){      // 개인
      result = persnal;
    } else if (!persnalChecked && !companyChecked && !deptChecked && !offChecked){     // 체크 안함
      result = null;
    } else if (!persnalChecked && !companyChecked && deptChecked && !offChecked){      // 부서
      result = dept;
    } else if (!persnalChecked && companyChecked && !deptChecked && !offChecked) {     // 회사
      result = company;
    } else if (!persnalChecked && companyChecked && deptChecked && !offChecked) {      // 회사, 부서
      for(i = 0; i < schedule.length; i++) {
        if(Object.values(schedule[i])[5] === '부서') {
          result.push(schedule[i])
        } else if(Object.values(schedule[i])[5] === '회사') {
          result.push(schedule[i]);
        }
      }
    } else if (persnalChecked && !companyChecked && deptChecked && !offChecked) {      // 개인, 부서
      for(i = 0; i < schedule.length; i++) {
        if(Object.values(schedule[i])[5] === '개인') {
          result.push(schedule[i])
        } else if(Object.values(schedule[i])[5] === '부서') {
          result.push(schedule[i]);
        }
      }
    } else if(persnalChecked && companyChecked && deptChecked && offChecked) {        // 넷 다 체크
      for(i = 0; i < schedule.length; i++) {
          result.push(schedule[i])     
    }
      for(i = 0; i < offLists.length; i++) {
          result.push(offLists[i])  
      }
    } else if (persnalChecked && companyChecked && !deptChecked && offChecked) {      // 개인, 회사, 연차
      for(i = 0; i < schedule.length; i++) {
        if(Object.values(schedule[i])[5] === '개인') {
          result.push(schedule[i])
        } else if(Object.values(schedule[i])[5] === '회사') {
          result.push(schedule[i]);
        }
      }
      for(i = 0; i < offLists.length; i++) {
        result.push(offLists[i])  
    }
    } else if (persnalChecked && !companyChecked && !deptChecked && offChecked) {     // 개인, 연차
      for(i = 0; i < schedule.length; i++) {
        if(Object.values(schedule[i])[5] === '개인') {
          result.push(schedule[i])
        }
      }
      for(i = 0; i < offLists.length; i++) {
        result.push(offLists[i])  
    }
    } else if (!persnalChecked && !companyChecked && !deptChecked && offChecked) {    // 연차
        result = offLists;
    } else if (!persnalChecked && !companyChecked && deptChecked && offChecked) {     // 부서, 연차
      for(i = 0; i < schedule.length; i++) {
        if(Object.values(schedule[i])[5] === '부서') {
          result.push(schedule[i])
        }
      }
      for(i = 0; i < offLists.length; i++) {
        result.push(offLists[i])  
    }
    } else if (!persnalChecked && companyChecked && !deptChecked && offChecked) {     // 회사, 연차
      for(i = 0; i < schedule.length; i++) {
        if(Object.values(schedule[i])[5] === '회사') {
          result.push(schedule[i])
        }
      }
      for(i = 0; i < offLists.length; i++) {
        result.push(offLists[i])  
    }
    } else if (!persnalChecked && companyChecked && deptChecked && offChecked) {      // 회사, 부서, 연차
      for(i = 0; i < schedule.length; i++) {
        if(Object.values(schedule[i])[5] === '부서') {
          result.push(schedule[i])
        } else if(Object.values(schedule[i])[5] === '회사') {
          result.push(schedule[i]);
        }
      }
      for(i = 0; i < offLists.length; i++) {
        result.push(offLists[i])  
    }
    } else if (persnalChecked && !companyChecked && deptChecked && offChecked) {      // 개인, 부서, 연차
    for(i = 0; i < schedule.length; i++) {
      if(Object.values(schedule[i])[5] === '개인') {
        result.push(schedule[i])
      } else if(Object.values(schedule[i])[5] === '부서') {
        result.push(schedule[i]);
      }
    }
    for(i = 0; i < offLists.length; i++) {
      result.push(offLists[i])  
  }
  }
    console.log(result);
    // -------------------------------------------------------- 더티 코드 리팩토링 필요

    return(
        <>
        <div className={CalendarCSS.calendarContainer}>
        <div className={CalendarCSS.calendarNav}>
        <br></br>
          <h3> Schedule List</h3>
          <div className={CalendarCSS.calendarNavDiv}>
          <input id='persnal'className={CalendarCSS.caledarInput} type='checkbox' defaultChecked='on' name='sort' value='개인' onClick= { persnalTitleListHandler } /><label htmlFor='persnal'>개인</label>
            {persnalChecked ? <PersnalTitle/> : null }
          <input className={CalendarCSS.caledarInput}  type='checkbox' defaultChecked='on' name='sort' value='회사' onClick= { companyTitleListHandler }/><label htmlFor='company'>회사</label>
            {companyChecked ? <CompanyTitle/> : null }
          <input className={CalendarCSS.caledarInput} type='checkbox' defaultChecked='on' name='sort' value='부서' onClick= { deptTitleListHandler }/><label htmlFor='dept'>부서</label>
            {deptChecked ? <DeptTitle/> : null }
          <input className={CalendarCSS.caledarInput} type='checkbox' defaultChecked='on' name='sort' value='연차' onClick= { offTitleListHandler }/><label htmlFor='off'>연차</label>
          {offChecked ? <OffTitle/> : null }
          </div>
        </div>
           <div className="cal-container" 
           style={{ marginTop : '60px', marginLeft : '60px'}}>
              <FullCalendar
                plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                googleCalendarApiKey={apiKey}
                select={ function(e) {
                  const clickEnd = moment(e.endStr).subtract(1, 'day').format('YYYY-MM-DD');
                  navigate(`/calendar/regist`, { state : { start : e.startStr, end : clickEnd }});
                }}
                events= {
                  // {'title': '제목3', 'content': '내용3', 'start': '2022-11-21', 'end': '2022-11-25', 'backgroundColor': '#C27EE2'},
                  // {title: '제목3', content: '내용3', start: '2022-12-24', end: '2022-12-25', backgroundColor: '#C27EE2'}
                result
                }
                height={'800px'}
                
              />
      
           </div>

           </div>
        </>
        
    );
    
}

export default Calendar;