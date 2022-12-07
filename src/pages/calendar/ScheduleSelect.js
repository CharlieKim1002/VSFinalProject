import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callScheduleSelectAPI, callScheduleUpdateAPI, callScheduleDeleteAPI } from '../../apis/CalendarAPICalls';
import ScheduleSelectCSS from './ScheduleSelect.module.css';
import moment from 'moment';
import { decodeJwt } from '../../utils/tokenUtils';
import { preventDefault } from '@fullcalendar/react';

function ScheduleSelect ({}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const schedules = useSelector(state => state.calendarReducer);
    const params = useParams();
    const scheduleNo = params.scheduleNo;
    const [form, setForm] = useState({});
    const [Modal, setModal] = useState(true);
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    
    console.log('token : ', token.auth[0].authName);      // ROLE_ADMIN

    const [modifyMode, setModifyMode] = useState(false);

    const end = moment(schedules.scheduleEnd).subtract(1, 'day').format('YYYY-MM-DD');
    console.log('After : ', end);
    // var scheduleEnd = moment(schedules.scheduleEnd);
    // scheduleEnd.subtract(3, 'days').format("YY-MM-DD");

    // console.log('After : ', scheduleEnd);

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            scheduleNo : schedules.scheduleNo,
            scheduleTitle : schedules.scheduleTitle,
            scheduleStart : schedules.scheduleStart,
            scheduleEnd : end,
            scheduleContent : schedules.scheduleContent,
            schedulePlace : schedules.schedulePlace,
            scheduleSort : schedules.scheduleSort,
            scheduleColor : schedules.scheduleColor
        });

    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    useEffect(
        () => {
            dispatch(callScheduleSelectAPI({
                scheduleNo : scheduleNo
            }));
        },
        []
    );


    const onClickScheduleUpdateHandler = () => {

        const formData = new FormData();

        const formEnd = moment(form.scheduleEnd).add(1, 'day').format('YYYY-MM-DD');

        formData.append("scheduleNo", form.scheduleNo);
        formData.append("scheduleTitle", form.scheduleTitle);
        formData.append("scheduleStart", form.scheduleStart);
        formData.append("scheduleEnd", formEnd);
        formData.append("scheduleContent", form.scheduleContent);
        formData.append("schedulePlace", form.schedulePlace);
        formData.append("scheduleSort", form.scheduleSort);
        formData.append("scheduleColor", form.scheduleColor);

        dispatch(callScheduleUpdateAPI({
            form : formData
        }));

        navigate('/calendar', { replace : false });
        window.location.reload();
    }

    const onClickDeleteHandler = () => {

        dispatch(callScheduleDeleteAPI({
            scheduleNo : schedules.scheduleNo
        }));

        navigate('/calendar', { replace : false });
        window.location.reload();
    }

    const onClickBackHandler = () => {
        navigate('/calendar', { replace : false });
        window.location.reload();
    }

    return(
        <>
        <div className={ScheduleSelectCSS.modal}>
            <div className={ScheduleSelectCSS.modalContainer}>
                <div className={ScheduleSelectCSS.scheduleModalDiv}>
                    {/* <input name='scheduleNo' value={ schedules.scheduleNo } style={ {display : 'none'} }/>
                    <input name='scheduleColor' value={ schedules.scheduleColor } readOnly/> 
                    uncontrolled 한 input의 경고 이슈로 인해 주석 
                    */}                    
                    <table>
                        <tbody>
                            <tr>
                                <th>일정 제목</th>
                                    <td>
                                        <input
                                        name='scheduleTitle'
                                        placeholder='일정 제목'
                                        // className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? schedules.scheduleTitle : form.scheduleTitle) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { readOnly : 'on', border : 'none'} : null }
                                        />
                                    </td>
                            </tr>
                            <tr>
                                <th>일정 시작일</th>
                                <td>
                                <input
                                        type='date'
                                        name='scheduleStart'
                                        placeholder='일정 시작'
                                        // className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? schedules.scheduleStart : form.scheduleStart) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { readOnly : 'on', border : 'none'} : null }
                                        />
                                    </td>
                            </tr>
                            <tr>
                                <th>일정 종료일</th>
                                <td>
                                <input
                                        type='date'
                                        name='scheduleEnd'
                                        placeholder='일정 종료'
                                        // className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? end : form.scheduleEnd) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? {readOnly : 'on', border : 'none'} : null }
                                        />
                                    </td>
                            </tr>
                            <tr>
                                <th>일정 내용</th>
                                <td>
                                <input
                                        name='scheduleContent'
                                        placeholder='일정 내용'
                                        // className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? schedules.scheduleContent : form.scheduleContent) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? {readOnly : 'on', border : 'none'} : null }
                                        />
                                    </td>
                            </tr>
                            <tr>
                                <th>일정 장소</th>
                                <td>
                                <input
                                        name='schedulePlace'
                                        placeholder='일정 장소'
                                        // className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? schedules.schedulePlace : form.schedulePlace) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? {readOnly : 'on', border : 'none'} : null }
                                        />
                                    </td>
                            </tr>
                            <tr>
                                <th>구분</th>
                                <td>
                                <select                                        
                                        name='scheduleSort'
                                        placeholder='구분'
                                        // className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? schedules.scheduleSort : form.scheduleSort) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? {readOnly : 'on', border : 'none'} : null }
                                        >
                                            <option value='개인'>개인</option>
                                            <option value='회사'>회사</option>
                                            <option value='부서'>부서</option>
                                </select>
                                    </td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        onClick={ onClickDeleteHandler }
                    >
                        삭제
                    </button>
                    {!modifyMode &&
                        <button 
                            onClick={ onClickModifyModeHandler }
                        >
                            수정
                        </button>
                    }
                    {modifyMode &&
                        <button 
                            onClick={ onClickScheduleUpdateHandler }
                        >
                            수정
                        </button>
                    }
                    <button
                        onClick={ onClickBackHandler }
                    >
                        닫기
                    </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ScheduleSelect;