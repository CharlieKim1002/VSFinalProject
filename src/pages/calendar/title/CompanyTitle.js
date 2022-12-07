import { callSchedulesAPI } from "../../../apis/CalendarAPICalls";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ScheduleSelect from "../ScheduleSelect";

function CompanyTitle () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const schedules = useSelector(state => state.calendarReducer);

    var i;
    var companyTitle= [];
    for(i = 0; i < schedules.length; i++) {
      if(schedules[i].scheduleSort === '회사') {
        companyTitle.push(React.createElement('ul', {value : `${ schedules[i].scheduleNo }`, key : `${schedules[i].scheduleNo}`, data_msg : `${schedules[i].scheduleNo}`}, `${schedules[i].scheduleTitle}`));
      }

    }

    useEffect(
        () => {
            dispatch(callSchedulesAPI({
          }));
        }
        , []
    );

    const scheduleUpdateHandler = (e) => {
      // console.log(e.target.getAttribute('data_msg'));      // scheduleNo
      navigate(`/calendar/${(e.target.getAttribute('data_msg'))}`, { replace : false });
    }

    return(
      <div onClick={ scheduleUpdateHandler }>
            {companyTitle}
            </div>
    );

}

export default CompanyTitle;