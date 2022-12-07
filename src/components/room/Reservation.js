import ReservationCSS from "./Reservation.module.css";
import { useNavigate } from 'react-router-dom';
function Reservation({reservation}){
    
    const navigate = useNavigate();

    const onClickReservationHandler = (reservationNo) => {
        navigate(`/room/rvlists/${reservationNo}`, { replace : false });
    }

    return(
        <>
        <div
            className={ ReservationCSS.RvDiv }
            onClick={ () => onClickReservationHandler(reservation.reservationNo) }
        >
            <table className={ReservationCSS.rvtbdDiv}> 
                <td>
                    { reservation.reservationNo } 　　　
                    { reservation.reservationTime } 시간 　　　　
                    { reservation.reservationDate } 　　　　
                    { reservation.reservationStatus } 　　　　
                    { reservation.room.roomName } 　　　
                    { reservation.member.memberId } 
                </td>
            </table>
        </div>
        </>
    );

}

export default Reservation;