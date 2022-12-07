import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Hour(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(
        () => {
            console.log("useEffect 동작 확인");
            dispatch(callReservationHour({
                
            }))
        }
    );

    return(
        <>

        </>
    );

}

export default Hour;