import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_MYINFO = 'my/GET_MYINFO';
export const PATCH_MYINFO = 'my/PUT_MYINFO';

const actions = createActions({
    [GET_MYINFO]: () => {},
    [PATCH_MYINFO]: () => {}
});

const myReducer = handleActions(
    {
        [GET_MYINFO] : (state, { payload }) => {
            return payload;
        },
        [PATCH_MYINFO] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default myReducer;