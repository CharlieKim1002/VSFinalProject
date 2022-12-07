import { createActions, handleActions } from "redux-actions";


/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_RESERVATION = 'room/GET_RESERVATION';
export const GET_RESERVATIONS = 'room/GET_RESERVATIONS';
export const POST_RESERVATION = 'room/POST_RESERVATION';
export const PUT_RESERVATION = 'room/PUT_RESERVATION';

const actions = createActions({
    [GET_RESERVATION]: () => {},
    [GET_RESERVATIONS]: () => {},
    [POST_RESERVATION]: () => {},
    [PUT_RESERVATION]: () => {}
});

/* 리듀서 */
const reservationReducer = handleActions(
    {
        [GET_RESERVATION] : (state, { payload }) =>{
            return payload;
        },
        [GET_RESERVATIONS] : (state, { payload }) =>{
            return payload;
        },
        [POST_RESERVATION] : (state, { payload }) => {
            return payload;
        },
        [PUT_RESERVATION] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default reservationReducer;