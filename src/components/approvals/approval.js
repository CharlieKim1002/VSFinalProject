import { useNavigate } from 'react-router-dom';


function Approval({ room : {docNo,docTitle} }){

    const navigate = useNavigate();

    const onClickRoomHandler = (docNo) => {
        navigate(`/aproval/list/${docNo}`, { replace : false });
    }

    return(
        <div
            onClick={ () => onClickRoomHandler(docNo) }
        >
            <p> {docTitle}</p>
        </div>
    );

} 

export default Approval;


