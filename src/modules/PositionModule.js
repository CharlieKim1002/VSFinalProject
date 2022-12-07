import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_POSITION = 'position/GET_POSITION';
export const POST_POSITION = 'position/POST_POSITION';
export const DELETE_POSITION = 'position/DELETE_POSITION';

const actions = createActions({
    [GET_POSITION]: () => {},
    [POST_POSITION]: () => {},
    [DELETE_POSITION]: () => {},
});

const positionReducer = handleActions(
    {
        [GET_POSITION]: (state, { payload }) => {
            return payload;
        },
        [POST_POSITION]: (state, { payload }) => {
            return payload;
        },
        [DELETE_POSITION]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default positionReducer;