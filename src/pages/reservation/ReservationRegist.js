import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { callReservationRegistAPI } from "../../apis/ReservationAPICalls";
import ReservationRegistCSS from "./ReservationRegist.module.css";
import { decodeJwt } from '../../utils/tokenUtils';

function ReservationRegist(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useState();
    const params = useParams();
    const roomNo = params.roomNo;
    const memberNo = params.memberNo;

    const [startTime, setStartTime] = useState(null);       //시작시간
    const [endTime, setEndTime] = useState(null);           // 종료 시간
    const [isSelected, setIsSelected] = useState(false);    // 시작시간 선택시
    


    //시작 시간 선택시 해당 시간 적용 및 setIsSelected의 true, setEndTime의 null 값을 반환
    const onSelect = (time) => {
        setStartTime(time);
        setIsSelected(true);
        setEndTime(null);
    };

    // 종료 시간 선택 시 해당 시간 적용 및 이용 시간 계산
    const onChangeEndTime = (time) => {
        setEndTime(time);
    }

    const [form, setForm] = useState({
        roomNo : roomNo,
        memberNo : memberNo,
        reservationDate : '',
        reservationUseTime: 0,
        reservationPurpose : '',
        
    });

    /* 입력값 변경시 클릭 이벤트 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }
    const onClickReservationRegistHandler = () => {
        
        if( 
            form.memberNo ||
            form.reservationDate === 'date' ||
            !startTime || 
            !endTime || 
            form.reservationPurpose === ''
            )
            {
        
                alert("정보를 모두 입력해주세요");
                return;
                
        }

        form.reservationUseTime = parseInt((endTime - startTime) / (1000 * 60 * 60));

        dispatch(callReservationRegistAPI({
            form : form ,
            startTime : startTime,
            endTime : endTime,
            memberNo : memberNo
        }));

        navigate(`/room/rvlist/${roomNo}`, { replace : false });
        window.location.reload();
    }

    return(
        <>
        <section className={ReservationRegistCSS.submenu}>
                    <br/>
                    <h3>회의실 예약</h3>
                    <div className={ReservationRegistCSS.submenuDiv}>
                    { decoded === "ROLE_ADMIN" && <h4>회의실 예약 관리</h4>}    
                    { decoded === "ROLE_MEMBER" && <h4>회의실</h4>}
                        <ul className={ReservationRegistCSS.submenuUl} >
                            { decoded === "ROLE_MEMBER" && <li> <NavLink to="/room">회의실 조회</NavLink></li> }
                            { decoded === "ROLE_APP_AUTH" && <li> <NavLink to="/room">회의실 조회</NavLink></li> }
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="room-managements">회의실 예약 조회</NavLink></li> }
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="room-managements">회의실 예약 등록</NavLink></li> }
                        </ul>
                    </div>
                    <br/>
                    { decoded === "ROLE_MEMBER" && <h3>회의실 예약</h3> }
                    <div className={ReservationRegistCSS.submenuDiv}>
                        { decoded === "ROLE_MEMBER" && <ul className={ReservationRegistCSS.submenuUl} >
                            <li><NavLink to="/room">회의실 예약 조회</NavLink></li>
                        </ul> }{ decoded === "ROLE_MEMBER" && <br></br> } 
                    </div>
                </section>  
            <div className={ ReservationRegistCSS.reservationDiv }>
            <h2>회의실 예약 신청</h2>
                <div className={ ReservationRegistCSS.reservationInfo }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>예약자ID</label></td>
                                <td>
                                    <input
                                        name="memberNo"
                                        autoComplete="off"
                                        defaultValue={token.sub || ''}
                                        onChange={onChangeHandler}
                                        className={ ReservationRegistCSS.inputDiv }
                                        style={ {border:'none'} }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>예약 날짜</label></td>
                                <td>
                                    <input
                                        name="reservationDate"
                                        type="date"
                                        onChange={onChangeHandler}
                                        className={ ReservationRegistCSS.inputDiv }
                                        style={ {border:'none'} }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>예약 희망 시간</label></td>
                                <td>
                                <DatePicker
                                    selected={startTime}
                                    onChange={onSelect}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    locale={ko}
                                    timeIntervals={60}
                                    minTime={setHours(setMinutes(new Date(), 0), 9)}
                                    maxTime={setHours(setMinutes(new Date(), 0), 18)}
                                    timeCaption="Time"
                                    dateFormat="h:mm"
                                    placeholderText="시작 시간"
                                    className={ ReservationRegistCSS.inputDiv }
                                    name="reservationTimeIn"
                                    />
                                </td>
                                
                                {isSelected ? // 시작 시간을 선택해야 종료 시간 선택 가능
                                <td>
                                <DatePicker
                                    selected={endTime}
                                    onChange={ (time) => onChangeEndTime(time) }
                                    showTimeSelect
                                    showTimeSelectOnly
                                    locale={ko}
                                    timeIntervals={60}
                                    minTime={startTime}
                                    maxTime={setHours(setMinutes(new Date(), getMinutes(startTime)), getHours(startTime)+2)} // 시작 시간부터 2시간
                                    excludeTimes={[
                                        // 시작 시간 제외
                                        startTime,
                                        // 5:00 선택 기준 최대 7:00까지 예외처리
                                        setHours(setMinutes(new Date(), 0), 17),
                                        setHours(setMinutes(new Date(), 0), 19)
                                    ]}
                                    timeCaption="Time"
                                    dateFormat="h:mm"
                                    placeholderText="종료 시간"
                                    className="mt-3"
                                    name="reservationTimeOut"
                                />
                                </td>
                                : null
                                }
                                
                            </tr>
                            
                            <tr>
                                <td><label>예약목적</label></td>
                                <td>
                                    <input
                                        name="reservationPurpose"
                                        autoComplete="off"                                
                                        className={ ReservationRegistCSS.inputDiv }
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className={ ReservationRegistCSS.reservationBtnDiv }>
                <button
                    className={ ReservationRegistCSS.InserBtn }
                    onClick={ onClickReservationRegistHandler }
                >예약 신청</button>
                <button
                    className={ ReservationRegistCSS.BackBtn }
                    onClick={ () => navigate(-1) }
                >돌아가기</button>
            </div>
         </div>   
        </>
    );

}

export default ReservationRegist;