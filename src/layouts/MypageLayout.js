import { Outlet } from "react-router-dom";
import MypageHeader from "../../src/components/common/MypageHeader";
import Navbar from "../../src/components/common/Navbar";

function MypageLayout() {

    return (
        <>
            
            
            <Navbar />
            <MypageHeader />
            <main>
                <Outlet />
             </main>
        </>
    );
}

export default MypageLayout;