import { Outlet } from "react-router-dom";
import RoomHeader from "../components/common/Room/RoomHeader";
import Navbar from "../components/common/Navbar";
function RoomLayout() {

    return (
        <>
            
            
            <Navbar />
            <RoomHeader />
            <main>
                <Outlet />
             </main>
        </>
    );
}

export default RoomLayout;