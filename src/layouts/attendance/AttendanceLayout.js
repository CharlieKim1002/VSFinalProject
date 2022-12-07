import { Outlet } from "react-router-dom";
import AttendanceHeader from "../../components/common/attendance/AttendanceHeader";
import Navbar from "../../components/common/Navbar";
import AttendanceLayoutCSS from "./AttendanceLayout.module.css";

function AttendanceLayout() {

    return (
        <>
            <div className= { AttendanceLayoutCSS.Attendancebody }>
            
                <Navbar />
                <AttendanceHeader />
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default AttendanceLayout;