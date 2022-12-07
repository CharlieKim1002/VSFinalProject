import { Outlet } from "react-router-dom";
import ManagementHeader from "../../components/common/management/ManagementHeader";
import Navbar from "../../components/common/Navbar";

function DeptLayout() {

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

export default DeptLayout;