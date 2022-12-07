import { Outlet } from "react-router-dom";
// import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
// import CalendarLayoutCSS from "./CalendarLayout.module.css"
import CalendarHeader from '../components/common/calendar/CalendarHeader';

function CalendarLayout() {

    return (
        <>

            <Navbar />
            <CalendarHeader/>
            <main>
                <Outlet />
             </main>
        </>
    );
}

export default CalendarLayout;