import { GET_OFFS, GET_APP, GET_OFF_APP, POST_OFF, GET_OFF, PATCH_OFF, PATCH_OFF_APP, PATCH_OFF_RETURN, GET_CALENDAR_OFF } from "../modules/OffModule";

export const callOffAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/off?page=${currentPage}`;

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
            console.log('[OffAPICalls] callOffAPI result : ', result);
            dispatch({ type: GET_OFFS, payload: result.data });
        }

    }

}

export const callAppNameAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/searchApp`;

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
            console.log('[OffAPICalls] callAppNameAPI result : ', result);
            dispatch({ type: GET_APP, payload: result.data });
        }

    }

}

export const callOffRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/off`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                offTitle: form.offTitle,
                offStart : form.offStart,
                offEnd : form.offEnd,
                offReason : form.offReason
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[OffAPICalls] callOffRegistAPI result : ', result);
            dispatch({ type: POST_OFF, payload: result });
        }

    }

}

export const callOffListForAppAPI = ({offResult, currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/off/result?offResult=${offResult}&page=${currentPage}`;

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
            console.log('[OffAPICalls] callOffListForAppAPI result : ', result);
            dispatch({ type: GET_OFF_APP, payload: result.data });
        }

    }

}

export const callOffDetailAPI = ({offNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/off/${offNo}`;

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
            console.log('[OffAPICalls] callOffDetailAPI result : ', result);
            dispatch({ type: GET_OFF, payload: result.data });
        }

    }

}

export const callOffUpdateAPI = ({offNo, form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/off/modify/${offNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                offTitle: form.offTitle,
                offStart : form.offStart,
                offEnd : form.offEnd,
                offReason : form.offReason
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[OffAPICalls] callOffUpdateAPI result : ', result);
            dispatch({ type: PATCH_OFF, payload: result });
        }

    }

}

export const callAppUpdateAPI = ({offNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/off/app`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                offNo : offNo
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[OffAPICalls] callAppUpdateAPI result : ', result);
            dispatch({ type: PATCH_OFF_APP, payload: result });
        }

    }

}

export const callReturnUpdateAPI = ({offNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/off/return`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                offNo : offNo
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[OffAPICalls] callReturnUpdateAPI result : ', result);
            dispatch({ type: PATCH_OFF_RETURN, payload: result });
        }

    }

}

export const callCalendarOffAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/calendar/offs`;

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
            console.log('[OffAPICalls] callCalendarOffAPI result : ', result);
            dispatch({type: GET_CALENDAR_OFF, payload: result.data})
        }
    }
}