import { Outlet } from "react-router-dom";
import ManagementHeader from "../../components/common/management/ManagementHeader";
import Navbar from "../../components/common/Navbar";

function PositionLayout() {

    return (
        <>
            
            
            <Navbar />
            <ManagementHeader />
            <main>
                <Outlet />
             </main>
        </>
    );
}

export default PositionLayout;