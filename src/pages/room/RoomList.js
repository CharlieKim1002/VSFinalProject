import RoomListCSS from "./RoomList.module.css";
import Room from "../../components/room/Room";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { callRoomListAPI } from '../../apis/RoomAPICalls';
import { NavLink, useNavigate } from "react-router-dom";
import { decodeJwt } from '../../utils/tokenUtils';


function RoomList(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.roomReducer);
    const roomList = rooms.data;
    const [currentPage, setCurrentPage] = useState(1);

    console.log(rooms, roomList);

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }


    useEffect(
        () => {

            console.log('useEffect 동작 확인');
            dispatch(callRoomListAPI({
                currentPage : currentPage
            }));
        },[currentPage]
    );

    const onClickRoomMInsert = () =>{

        navigate(`/room/room-managements`, { replace : false })
    }

    /* 페이징 */
    const pageBtn = rooms.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return(
        <>
            
            <section className={RoomListCSS.submenu}>
                    <br/>
                    <h3>Room</h3>
                    <div className={RoomListCSS.submenuDiv}>
                    { decoded === "ROLE_ADMIN" && <h4>회의실 관리</h4>}    
                    { decoded === "ROLE_MEMBER" && <h4>회의실</h4>}
                        <ul className={RoomListCSS.submenuUl} >
                            { decoded === "ROLE_MEMBER" && <li> <NavLink to="/room">회의실 조회</NavLink></li> }
                            { decoded === "ROLE_APP_AUTH" && <li> <NavLink to="/room">회의실 조회</NavLink></li> }
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="/room">회의실 조회</NavLink></li> }
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="/room/rvlist-managements">회의실 예약 조회</NavLink></li> }
                        </ul>
                    </div>
                    <br/>
                    { decoded === "ROLE_MEMBER" && <h3>회의실 예약</h3> }
                    <div className={RoomListCSS.submenuDiv}>
                        { decoded === "ROLE_MEMBER" && <ul className={RoomListCSS.submenuUl} >
                            <li><NavLink to="/room">회의실 예약 조회</NavLink></li>
                        </ul> }{ decoded === "ROLE_MEMBER" && <br></br> } 
                    </div>
                </section>  
                
                <div className={RoomListCSS.roomListDiv}>
                <h2>회의실 시설 안내</h2>
                { 
                    Array.isArray(roomList)
                    && roomList.map((room) => (<Room key={ room.roomNo } room={ room }/>))
                }
                
            <div className={ RoomListCSS.roomPgs }>
                {
                    Array.isArray(roomList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage - 1) }
                        disabled={ currentPage === 1 }
                        className={ RoomListCSS.pagingBtn }
                    >
                        &lt;
                    </button>
                }
                {
                    pageNumber.map((num) => (
                        <li key={num} onClick={ () => setCurrentPage(num) }>
                            <button
                                onClick={ () => setCurrentPage(num) }
                                className= { RoomListCSS.num }
                            >
                                {num}
                            </button>
                        </li>
                    ))
                }
                {
                    Array.isArray(roomList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage + 1) }
                        disabled={ currentPage === pageBtn.maxPage || pageBtn.endPage === 1 }
                        className={ RoomListCSS.pagingBtn }
                    >
                        &gt;
                    </button>
                }
                </div>
            </div>
            { decoded === "ROLE_ADMIN" && 
                <button
                        onClick={ onClickRoomMInsert }
                        className={ RoomListCSS.rmInsertBtn }
                    >
                        등록하기</button>
                         } 
        </>
    );

}
export default RoomList;