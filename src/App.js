import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/contents/Login";
import Error from "./pages/Error";
import FindId from "./pages/contents/FindId";

import CalendarLayout from "./layouts/CalendarLayout";
import Calendar from "./pages/calendar/Calendar";

import Attendance from "./pages/attendance/Attendance";
import AttendanceLayout from "./layouts/attendance/AttendanceLayout";
import MyAttList from "./pages/attendance/MyAttList";
import AttListForAdmin from "./pages/attendance/AttListForAdmin";
import Off from "./pages/off/Off";
import OffDetail from "./pages/off/OffDetail";
import MyOffList from "./pages/off/MyOffList";
import OffUpdate from "./pages/off/OffUpdate";
import OffListForApp from "./pages/off/OffListForApp";

import RoomLayout from "./layouts/RoomLayout";
import RoomList from "./pages/room/RoomList";
import RoomDetail from "./pages/room/RoomDetail";
import RoomMInsert from "./pages/admin/room/RoomMInsert";
import RoomMUpdate from "./pages/admin/room/RoomMUpdate";
import ReservationList from "./pages/reservation/ReservationList";
import ReservDetail from "./pages/reservation/ReservDetail";
import ReservationRegist from "./pages/reservation/ReservationRegist";
import ReservationMUpdate from "./pages/admin/reservation/ReservationMUpdate";

import Member from "./pages/admin/management/Member";
import MemberLayout from "./layouts/management/MemberLayout";
import MemberDetail from "./pages/admin/management/MemberDetail";
import Dept from "./pages/admin/dept/Dept";
import DeptLayout from "./layouts/management/DeptLayout";
import Position from "./pages/admin/position/Position";
import PositionLayout from "./layouts/management/PositionLayout";

import ApprovalLayout from "./layouts/approval/ApprovalLayout";
import ApprovalMain from "./pages/approval/ApprovalMain";
import ApproverList from "./pages/approval/ApproverList"

import CardLayout from "./layouts/card/CardLayout";
import CustomerList from "./pages/card/CustomerList";
import Card from "./pages/card/Card";
import OfficeCardList from "./pages/card/OfficeCardList";
import ScheduleSelect from './pages/calendar/ScheduleSelect';
import ScheduleRegist from './pages/calendar/ScheduleRegist';
import MainLayout from "./layouts/attendance/MainLayout";
import MyPage from "./pages/contents/MyPage";
import MypageLayout from "./layouts/MypageLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login/> }/>
        <Route path="/findId" element={ <FindId/> }/>
        <Route path="/calendar" element={ <CalendarLayout/> }>
          <Route index element={ <Calendar/> }/>
          <Route path="/calendar/:scheduleNo" element={ <ScheduleSelect/> }/>
          <Route path="/calendar/regist" element={ <ScheduleRegist/> }/>
        </Route>
        <Route path="/main" element={ <MainLayout/> }>
          <Route index element={ <Attendance/> }/>
        </Route>
        <Route path="/mypage" element={ <MypageLayout/> }>
          <Route index element={ <MyPage/> }/>
        </Route>
        <Route path="/attendance" element={ <AttendanceLayout/> }>
          <Route path="/attendance/my" element={ <MyAttList/> }/>
          <Route path="/attendance/manage-list" element={ <AttListForAdmin/> }/>
        </Route>
        <Route path="/off" element={<AttendanceLayout/>  }>
          <Route index element={ <MyOffList/> }/>
          <Route path="/off/regist" element={ <Off/> }/>
          <Route path="/off/result" element={ <OffListForApp/> }/>
          <Route path="/off/:offNo" element={ <OffDetail/> }/>
          <Route path="/off/modify/:offNo" element={ <OffUpdate/> }/>
        </Route>
        <Route path="/room" element={<RoomLayout/>}>
          <Route index element={ <RoomList/> }/>
          <Route path="rooms/:roomNo" element={ <RoomDetail/> }/>
          <Route path="room-managements" element={ <RoomMInsert/> }/>
          <Route path="rooms-managements" element={ <RoomMUpdate/> }/>
          <Route path="rvlist/:roomNo" element={ <ReservationList/> }/>
          <Route path="rvlists-in/:roomNo" element={ <ReservationRegist/> }/>
          <Route path="rvlists/:reservationNo" element={ <ReservDetail/> }/>
          <Route path="rvlists-managements" element={ <ReservationMUpdate/> }/>
        </Route>
        <Route path="/member" element={ <MemberLayout/> }>
          <Route index element={ <Member/>}/>
          <Route path="/member/:memberNo" element={ <MemberDetail/> }/>
        </Route>
        <Route path="/dept" element={ <DeptLayout/> }>
          <Route index element={ <Dept/>}/>
        </Route>
        <Route path="/position" element={ <PositionLayout/> }>
          <Route index element={ <Position/>}/>
        </Route>
        <Route path="*" element={ <Error/> }/>

        <Route path="/approval" element = { <ApprovalLayout/>}>
        <Route index element={ <ApprovalMain/>}/>
        <Route path="approver" element={ <ApproverList/>}/>
        </Route>

        <Route path="/card" element={ <CardLayout/> }>
          <Route index element={ <Card/> }/>
          <Route path="/card/customers" element={ <CustomerList/> }/>
          <Route path="/card/office" element={ <OfficeCardList/> }/>
        </Route>

      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
