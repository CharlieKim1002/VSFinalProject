import { callCalendarOffAPI } from "../../../apis/OffAPICalls";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ScheduleSelect from "../ScheduleSelect";

function OffTitle () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const offLists = useSelector(state => state.offReducer);

    var i;
    var offTitle=[];
    for(i = 0; i < offLists.length; i++) {
        offTitle.push(React.createElement('ul', {value : `${offLists[i].offNo}`, key : `${offLists[i].offNo}`}, `${offLists[i].member.memberName}`));
    }
    
    useEffect(
        () => {
            dispatch(callCalendarOffAPI({
          }));
        }
        , []
    );


    return(
      <div>
            {offTitle}
            </div>
    );

}

export default OffTitle;