import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import CardLayoutCSS from "./CardLayout.module.css";
import CardHeader from "../../components/common/card/CardHeader";

function CardLayout() {

    return (
        <>
           <div className= { CardLayoutCSS.body }>
            
            <Navbar />
            <CardHeader/>
            <main>
                <Outlet />
            </main>
            </div>
        </>
    );
}

export default CardLayout;