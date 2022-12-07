import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SCHEDULES = 'calendar/GET_SCHEDULES';
export const GET_SCHEDULE = 'calendar/GET_SCHEDULE';
export const POST_SCHEDULE = 'calendar/POST_SCHEDULE';
export const PUT_SCHEDULE = 'calendar/PUT_SCHEDULE';
export const DELETE_SCHEDULE = 'calendar/DELETE_SCHEDULE';

const actions = createActions({
    [GET_SCHEDULES]: () => {},
    [GET_SCHEDULE]: () => {},
    [POST_SCHEDULE]: () => {},
    [PUT_SCHEDULE]: () => {},
    [DELETE_SCHEDULE]: () => {}
});

/* 리듀서 */
const calendarReducer = handleActions(
    {
        [GET_SCHEDULES] : (state, { payload }) => {
            return payload;
        },
        [GET_SCHEDULE] : (state, { payload }) => {
            return payload;
        },
        [POST_SCHEDULE] : (state, { payload }) => {
            return payload;
        },
        [PUT_SCHEDULE] : (state, { payload }) => {
            return payload;
        },
        [DELETE_SCHEDULE] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default calendarReducer;