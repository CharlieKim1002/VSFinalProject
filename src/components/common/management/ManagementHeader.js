import { NavLink } from 'react-router-dom';
import ManageHeaderCSS from "./ManagementHeader.module.css";


function Header() {

    return (
        <>
            <div className={ ManageHeaderCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/member">MEMBER</NavLink></li>
                    <li><NavLink to="/dept">DEPT</NavLink></li>
                    <li><NavLink to="/position">POSITION</NavLink></li>
                </ul>

            </div>
        </>
    );

}

export default Header;