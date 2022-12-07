import ReservationListCSS from "./ReservationList.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { callReservationListAPI } from '../../apis/ReservationAPICalls';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import RDate from "./RDate";
import LoginModal from "../../components/common/LoginModal";
import { decodeJwt } from '../../utils/tokenUtils';


function ReservationList(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reservation = useSelector(state => state.reservationReducer);

    const params = useParams();
    const reservationNo = params.reservationNo; 
    const roomNo = params.roomNo;
    const [loginModal, setLoginModal] = useState(false);



    console.log(reservation);
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }
    
    useEffect(
        () => {
            console.log('useEffect 동작 확인');
            dispatch(callReservationListAPI({
                roomNo : roomNo,
                Date
            }));
        },
        []
    );

    const onClickReservationInsert = () => {

        navigate(`/room/rvlists-in/${ roomNo }`, { replace: false })
    }

    const onClickReservationDetailer = (reservationNo) => {

        navigate(`/room/rvlists/${ reservationNo }`, { replace: false })
    }

    return(
        <>
        { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null }
        <div className={ReservationListCSS.TimeDiv}><RDate/></div>
        
        <section className={ReservationListCSS.submenu}>
                    <br/>
                    <h3>회의실 예약</h3>
                    <div className={ReservationListCSS.submenuDiv}>
                    { decoded === "ROLE_ADMIN" && <h4>회의실 예약 관리</h4>}    
                    { decoded === "ROLE_MEMBER" && <h4>회의실</h4>}
                        <ul className={ReservationListCSS.submenuUl} >
                            { decoded === "ROLE_MEMBER" && <li> <NavLink to="/room">회의실 조회</NavLink></li> }
                            { decoded === "ROLE_APP_AUTH" && <li> <NavLink to="/room">회의실 조회</NavLink></li> }
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="/room">회의실 예약 조회</NavLink></li> }
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="/room-managements">회의실 예약 등록</NavLink></li> }
                        </ul>
                    </div>
                    <br/>
                    { decoded === "ROLE_MEMBER" && <h3>회의실 예약</h3> }
                    <div className={ReservationListCSS.submenuDiv}>
                        { decoded === "ROLE_MEMBER" && <ul className={ReservationListCSS.submenuUl} >
                            <li><NavLink to="/room">회의실 예약 조회</NavLink></li>
                        </ul> }{ decoded === "ROLE_MEMBER" && <br></br> } 
                    </div>
                </section>  
            
            
            <div className={ReservationListCSS.rvListDiv}>
            <h2>회의실 예약 안내</h2>
                 
                <table>
                
                    <th>예약 번호</th>
                    <th>시작 시간</th>
                    <th>종료 시간</th>
                    <th>이용 시간</th>
                    <th>예약 날짜</th>
                    <th>예약 상태</th>
                    <th>예약 목적</th>
                    
                    <tbody>
                    {
                            Array.isArray(reservation) && reservation.map(
                                (reservation) => (
                                    <tr
                                        key={ reservation.reservationNo }
                                        onClick={ () => onClickReservationDetailer(reservation.reservationNo) }
                                    >
                                        <td>{ reservation.reservationNo }</td>
                                        <td>{ reservation.reservationTimeIn }</td>
                                        <td>{ reservation.reservationTimeOut }</td>
                                        <td>{ reservation.reservationUseTime } 시간</td>
                                        <td>{ reservation.reservationDate }</td>
                                        <td>{ reservation.reservationSetting }</td>
                                        <td>{ reservation.reservationPurpose }</td>
                                        <td></td>
                                    </tr>
                                )
                            )
                        }
                        </tbody>
                  
                </table>
 
                <button 
                    className={ ReservationListCSS.InsertBtn }
                    onClick={ onClickReservationInsert }
                    >예약 신청</button>
                
                
            
            </div>
           
        </>
    );

}

export default ReservationList;