import { DELETE_CUSTOMER, GET_CARDS, GET_CUSTOMER, GET_CUSTOMERS, GET_MY_CARD, GET_MY_CARD_DETAIL, PATCH_CUSTOMER, PATCH_MY_CARD, POST_CUSTOMER } from "../modules/CardModule";

export const callMyCardAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/my/card`;

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
            console.log('[CardAPICalls] callMyCardAPI result : ', result);
            dispatch({ type: GET_MY_CARD, payload: result.data });
        }

    }

}

export const callMyCardDetailAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/my/card/detail`;

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
            console.log('[CardAPICalls] callMyCardDetailAPI result : ', result);
            dispatch({ type: GET_MY_CARD_DETAIL, payload: result.data });
        }

    }

}

export const callMyCardUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/my/card`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                memberName: form.memberName,
                memberPhone: form.memberPhone,
                memberEmail: form.memberEmail
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[CardAPICalls] callMyCardUpdateAPI result : ', result);
            dispatch({ type: PATCH_MY_CARD, payload: result.data });
        }

    }

}

export const callCardsAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/my/members`;

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
            console.log('[CardAPICalls] callCardsAPI result : ', result);
            dispatch({ type: GET_CARDS, payload: result.data });
        }

    }

}

export const callCustomersAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/customers?page=${currentPage}`;

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
            console.log('[CardAPICalls] callCustomersAPI result : ', result);
            dispatch({ type: GET_CUSTOMERS, payload: result.data });
        }

    }

}

export const callCustomerRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/customer`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                customerName: form.customerName,
                customerEmployee: form.customerEmployee,
                customerPhone: form.customerPhone,
                customerEmail: form.customerEmail,
                customerPosition: form.customerPosition,
                customerShare: form.customerShare
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[CardAPICalls] callCustomerRegistAPI result : ', result);
            dispatch({ type: POST_CUSTOMER, payload: result.data });
        }

    }

}

export const callCustomerUpdateAPI = ({customerNo, form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/customer/modify/${customerNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                customerEmployee: form.customerEmployee,
                customerPhone: form.customerPhone,
                customerEmail: form.customerEmail,
                customerPosition: form.customerPosition,
                customerShare: form.customerShare
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[CardAPICalls] callCustomerUpdateAPI result : ', result);
            dispatch({ type: PATCH_CUSTOMER, payload: result.data });
        }

    }

}

export const callCustomerDeleteAPI = ({customerNo, form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/customer/delete/${customerNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                customerDelete: form.customerDelete
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[CardAPICalls] callCustomerDeleteAPI result : ', result);
            dispatch({ type: DELETE_CUSTOMER, payload: result.data });
        }

    }

}