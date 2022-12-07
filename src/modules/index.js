import { combineReducers } from 'redux';
import roomReducer from "./roomModule";
import attendanceReducer from "./AttendanceModule";
import memberReducer from './MemberModules';
import reservationReducer from './reservationModule';
import offReducer from './OffModule';
import calendarReducer from './CalendarModule';
import deptReducer from './DeptModule';
import positionReducer from './PositionModule';
import approvalReducer from './ApprovalModule';
import cardReducer from './CardModule';
import myReducer from './MyModule';

const rootReducer = combineReducers({
    roomReducer,
    attendanceReducer,
    memberReducer,
    reservationReducer,
    offReducer,
    calendarReducer,
    deptReducer,
    positionReducer,
    approvalReducer,
    cardReducer,
    myReducer
});

export default rootReducer;