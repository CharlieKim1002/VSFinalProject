import { Outlet } from "react-router-dom";
import ApprovalHeader from "../../components/common/approval/ApprovalHeader";
import Navbar from "../../components/common/Navbar";
import ApprovalLayoutCSS from "./ApprovalLayout.module.css";
function ApprovalLayout() {

    return (
        <div className= { ApprovalLayoutCSS.Appbody }>
            <Navbar />
            <ApprovalHeader/>
            <main>
                <Outlet />
             </main>
        </div>
    );
}

export default ApprovalLayout;