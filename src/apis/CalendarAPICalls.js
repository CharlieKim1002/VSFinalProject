import { GET_SCHEDULES, GET_SCHEDULE, POST_SCHEDULE, PUT_SCHEDULE, DELETE_SCHEDULE } from "../modules/CalendarModule";

export const callSchedulesAPI = ({}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/calendar`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[CalendarAPICalls] callScheduleAPI result : ', result);
            dispatch({ type: GET_SCHEDULES, payload: result.data });
        }

    }

}

export const callScheduleSelectAPI = ({scheduleNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/calendar/${scheduleNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[CalendarAPICalls] callScheduleSelectAPI result : ', result);
            dispatch({ type: GET_SCHEDULE, payload: result.data})
        }
    }
}

export const callScheduleUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/calendar`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[CalendarAPICalls] callScheduleUpdateAPI result : ', result);
            dispatch({ type: PUT_SCHEDULE, payload: result.data})
        }
    }
}

export const callScheduleDeleteAPI = ({scheduleNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/calendar/${scheduleNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[CalendarAPICalls] callScheduleDeleteAPI result : ', result);
            dispatch({ type: DELETE_SCHEDULE, payload: result.data })
        }
    }
}

export const callScheduleInsertAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/calendar`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[CalendarAPICalls] callScheduleInsertAPI result : ', result);
            dispatch({ type: POST_SCHEDULE, payload: result.data })
        }
    }
}
