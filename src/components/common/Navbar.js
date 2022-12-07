import NavCSS from "./Navbar.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { callLogoutAPI } from "../../apis/MemberAPICalls";
import { decodeJwt } from '../../utils/tokenUtils';

function Navbar() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        dispatch(callLogoutAPI());
        alert('로그아웃 되었습니다.');
        navigate('/', { replace : true });
    }

    return (
        <>
            <div className={ NavCSS.NavbarDiv }>
             <div className={ NavCSS.logoDiv }>
                <img  src= {process.env.PUBLIC_URL + '/assets/img/logo.png'} alt="로고이미지"/>
             </div>
             <div className={ NavCSS.Category }>
                <ul>
                    <li><NavLink to="/main"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconHome.png'} alt="홈로고"/> HOME</NavLink></li>
                    { decoded === "ROLE_MEMBER" && <li><NavLink to="/attendance/my"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconAttendance.png'} alt="근태로고"/> ATTENDANCE</NavLink></li> }
                    { decoded === "ROLE_APP_AUTH" && <li><NavLink to="/attendance/my"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconAttendance.png'} alt="근태로고"/> ATTENDANCE</NavLink></li> }
                    { decoded === "ROLE_ADMIN" && <li><NavLink to="/attendance/manage-list"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconAttendance.png'} alt="근태로고"/> ATTENDANCE</NavLink></li> }
                    <li><NavLink to="/calendar"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconSchedule.png'} alt="스케줄로고"/> SCHEDULE</NavLink></li>
                    <li><NavLink to="/room"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconReservation.png'} alt="예약로고"/> RESERVATTION</NavLink></li>
                    <li><NavLink to="/approval"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconEDSM.png'} alt="전자결재로고"/> APPROVAL</NavLink></li>
                    {/* <li><NavLink to="/"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconBoard.png'} alt="공지로고"/> NOTICE</NavLink></li> */}
                    {/* <li><NavLink to="/"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconLibrary.png'} alt="자료실로고"/> LIBRARY</NavLink></li> */}
                    <li><NavLink to="/card"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconBusinesscard.png'} alt="명함로고"/> BUSINESS CARD</NavLink></li>
                    {/* <li><NavLink to="/"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconDirectMessage.png'} alt="쪽지"/> DM</NavLink></li> */}
                    {/* { decoded === "ROLE_ADMIN" && <li><NavLink to="rvlist-managements">회의실 예약 관리</NavLink></li>} */}
                    { decoded === "ROLE_ADMIN" && <li><NavLink to="/member"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconManagement.PNG'} alt="관리자로고"/> MANAGEMENT</NavLink></li> }
                    <li className={NavCSS.Log} onClick={ onClickLogoutHandler }><NavLink to="/"> LOGOUT</NavLink></li>
                </ul>
              </div>
            </div>

            <div className="{ NavCSS.NavBlank }">


            </div>

        </>
    );
}

export default Navbar;