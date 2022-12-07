import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ReservDetailCSS from './ReservDetail.module.css';
import { callReservationDetailAPI } from '../../apis/ReservationAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';


function ReservDetail(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reservation = useSelector(state => state.reservationReducer);
    const params = useParams();
    const reservationNo = params.reservationNo;


    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    useEffect(
        () => {
            dispatch(callReservationDetailAPI({
                reservationNo : reservationNo
            }));
        },
        []
    );
    console.log('callReservationDetailAPI 동작');
    const onClickReservationUpdateHandler = () => {
        console.log('[ReservationDetail] onClickReservationUpdateHandler');
        navigate(`/room/rvlists-managements`, {replace: false})
    }

    return(
        <>

            <section className={ReservDetailCSS.submenu}>
                    <br/>
                    <h3>회의실 예약</h3>
                    <div className={ReservDetailCSS.submenuDiv}>
                    { decoded === "ROLE_ADMIN" && <h4>회의실 예약 관리</h4>}    
                    { decoded === "ROLE_MEMBER" && <h4>회의실</h4>}
                        <ul className={ReservDetailCSS.submenuUl} >
                            { decoded === "ROLE_MEMBER" && <li> <NavLink to="/room">회의실 조회</NavLink></li> }
                            { decoded === "ROLE_APP_AUTH" && <li> <NavLink to="/room">회의실 조회</NavLink></li> }
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="room-managements">회의실 예약 조회</NavLink></li> }
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="room-managements">회의실 예약 등록</NavLink></li> }
                        </ul>
                    </div>
                    <br/>
                    { decoded === "ROLE_MEMBER" && <h3>회의실 예약</h3> }
                    <div className={ReservDetailCSS.submenuDiv}>
                        { decoded === "ROLE_MEMBER" && <ul className={ReservDetailCSS.submenuUl} >
                            <li><NavLink to="/room">회의실 예약 조회</NavLink></li>
                        </ul> }{ decoded === "ROLE_MEMBER" && <br></br> } 
                    </div>
                </section>  
            
            <div className={ ReservDetailCSS.DetailDiv }>
             <h2>회의실 예약 상세 보기</h2>
            <div className={ ReservDetailCSS.editDiv }>
                <table className={ ReservDetailCSS.editTable }>
                    <tbody>
                        <tr>   
                            <td><label>예약 번호</label></td>
                            <td>{ reservation.reservationNo || '' }</td>
                        </tr>
                        <tr>
                            <th>시작 시간</th>
                            <td>{ reservation.reservationTimeIn || '' }</td>
                        </tr>
                        <tr>
                            <th>종료 시간</th>
                            <td>{ reservation.reservationTimeOut || '' }</td>
                        </tr>
                        <tr>
                            <th>이용 시간</th>
                            <td>{ reservation.reservationUseTime || ''} 시간</td>
                        </tr>
                        <tr>
                            <th>예약 날짜</th>
                            <td>{ reservation.reservationDate || '' }</td>
                        </tr>
                                        
                        <tr>
                            <th>예약 상태</th>
                            <td>{ reservation.reservationSetting || ''}</td>
                        </tr>
                        <tr>
                            <th>예약 목적</th>
                            <td>{ reservation.reservationPurpose || '' }</td>
                        </tr> 
                     
                    </tbody>

                </table>
                { decoded === "ROLE_ADMIN" && 
                <button
                        onClick={ onClickReservationUpdateHandler }
                        className={ ReservDetailCSS.rmUpdateBtn }
                    >
                        수정하기</button>
                }
                <button        
                    onClick={ () => navigate(-1) }    
                    className={ ReservDetailCSS.rmReturnBtn }        
                >
                    돌아가기
                </button>
            </div>
          </div>
        </>
    );

}

export default ReservDetail;