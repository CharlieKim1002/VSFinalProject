import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callMemberDetailAPI, callMemberUpdateAPI } from "../../../apis/MemberAPICalls";
import MemberDetailCSS from "./MemberDetail.module.css";

function MemberDetail() {

    const params = useParams();
    const memberDetail = useSelector(state => state.memberReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const imageInput = useRef();
    // const [image, setImage] = useState(null);
    // const [imageUrl, setImageUrl] = useState(null);
    const [form, setForm] = useState({});

    const [modifyMode, setModifyMode] = useState(false);

    useEffect(() => {
        dispatch(callMemberDetailAPI({
            memberNo : params.memberNo
        }));
    }, []);

    // useEffect(() => {
    //     if(image) {
    //         const fileReader = new FileReader();
    //         fileReader.onload = (e) => {
    //             const { result } = e.target;
    //             if(result) {
    //                 setImageUrl(result);
    //             }
    //         }
    //         fileReader.readAsDataURL(image);
    //     }
    // },
    // [image]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    // const onClickImageUpload = () => {
    //     imageInput.current.click();
    // }

    // const onChangeImageUpload = (e) => {

    //     const image = e.target.files[0];

    //     setImage(image);
    // }

    /* 수정 모드 변경 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            memberNo : memberDetail.memberNo,
            memberId : memberDetail.memberId,
            memberName : memberDetail.memberName,
            memberPhone : memberDetail.memberPhone,
            memberEmail : memberDetail.memberEmail,
            positionNo : memberDetail.position.positionNo,
            deptNo : memberDetail.dept.deptNo,
            authNo : memberDetail.auth.authNo,
            memberStatus : memberDetail.memberStatus
        });
    }

    /* 사원 수정 정보 저장 */
    const onClickMemberUpdateHandler = () => {

        const formData = new FormData();

        formData.append("memberNo", form.memberNo);
        formData.append("memberId", form.memberId);
        formData.append("memberName", form.memberName);
        formData.append("memberPhone", form.memberPhone);
        formData.append("memberEmail", form.memberEmail);
        formData.append("position.positionNo", form.positionNo);
        formData.append("dept.deptNo", form.deptNo);
        formData.append("auth.authNo", form.authNo);
        formData.append("memberStatus", form.memberStatus);

        // if(image) {
        //     formData.append("memberImage", image);
        // }

        dispatch(callMemberUpdateAPI({
            form : formData
        }));

        console.log("form : ", form);

        navigate('/member', { replace : true });
        window.location.reload();
    }

    return (
        <div>
            
            <div className={MemberDetailCSS.formBodyDiv}>
                {/* <div>
                    <div>
                        { memberDetail && <img
                            className={ MemberDetailCSS.memberImage }
                            src={ (imageUrl == null) ? memberDetail.memberImageUrl : imageUrl }
                            alt="preview"
                        />}
                        <input
                            style={{ display: 'none'}}
                            type="file"
                            name='memberImage'
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }
                        />
                        <button
                            className={ MemberDetailCSS.memberImageButton }
                            onClick={ onClickImageUpload }
                            style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                            disabled={ !modifyMode }
                        >
                            이미지 첨부
                        </button>    
                    </div>
                </div> */}
                <h3>사원 상세 정보</h3>
                <div className={MemberDetailCSS.inputAreaDiv}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>이름</label></td>
                                <td>
                                    <input
                                        name='memberName'
                                        placeholder='이름'
                                        className={ MemberDetailCSS.memberInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? memberDetail.memberName : form.memberName || '' }
                                        readOnly={ modifyMode ? false : true }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>아이디</label></td>
                                <td>
                                    <input
                                        name='memberId'
                                        placeholder='아이디'
                                        className={ MemberDetailCSS.memberInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? memberDetail.memberId : form.memberId || '' }
                                        readOnly={ modifyMode ? false : true }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>전화번호</label></td>
                                <td>
                                    <input
                                        name='memberPhone'
                                        placeholder='010-0000-0000'
                                        className={ MemberDetailCSS.memberInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? memberDetail.memberPhone : form.memberPhone || '' }
                                        readOnly={ modifyMode ? false : true }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>이메일</label></td>
                                <td>
                                    <input
                                        name='memberEmail'
                                        placeholder='이메일'
                                        className={ MemberDetailCSS.memberInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? memberDetail.memberEmail : form.memberEmail || '' }
                                        readOnly={ modifyMode ? false : true }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>직책</label></td>
                                <td>
                                    <label><select name='positionNo' value={ (!modifyMode ? memberDetail.position?.positionNo : form.positionNo) || '' } onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }>
                                            <option value="1">대표</option>
                                            <option value="2">전무</option>
                                            <option value="3">상무</option>
                                            <option value="4">부장</option>
                                            <option value="5">차장</option>
                                            <option value="6">과장</option>
                                            <option value="7">대리</option>
                                            <option value="8">주임</option>
                                            <option value="9">사원</option>
                                           </select>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>부서</label></td>
                                <td>
                                    <label><select name='deptNo' value={ (!modifyMode ? memberDetail.dept?.deptNo : form.deptNo) || '' } onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }>
                                            <option value="1">인사팀</option>
                                            <option value="2">총무팀</option>
                                            <option value="3">영업팀</option>
                                            <option value="4">마케팅팀</option>
                                            <option value="5">개발팀</option>
                                           </select>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>권한</label></td>
                                <td>
                                    <label><select name='authNo' value={ (!modifyMode ? memberDetail.auth?.authNo : form.authNo) || '' } onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }>
                                            <option value="3">일반사원</option>
                                            <option value="2">결재권자</option>
                                           </select>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>재직여부</label></td>
                                <td>
                                    <label><select name='memberStatus' value={ (!modifyMode ? memberDetail.memberStatus : form.memberStatus) || '' } onChange={ onChangeHandler } readOnly={ modifyMode ? false : true }>
                                            <option value="Y">재직 중</option>
                                            <option value="N">퇴사</option>
                                           </select>
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={ MemberDetailCSS.modifyModeBtn }>
                {!modifyMode &&
                    <button
                        className={ MemberDetailCSS.modifyBtn }
                        onClick={ onClickModifyModeHandler }
                    >
                        수정
                    </button>
                }
                {modifyMode &&
                    <button
                        className={ MemberDetailCSS.modifyBtn1 }
                        onClick={ onClickMemberUpdateHandler }
                    >
                        저장
                    </button>
                }
                <button
                    className={ MemberDetailCSS.backBtn }
                    onClick={ () => navigate('/member') }
                >
                    뒤로
                </button>
            </div>

        </div>
    )
}

export default MemberDetail;