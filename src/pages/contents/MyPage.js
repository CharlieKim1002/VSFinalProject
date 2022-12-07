import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";
import { callMyInfoAPI, callMyInfoUpdateAPI } from '../../apis/MyAPICalls';
import MyPageCSS from './MyPage.module.css';

function MyPage() {

    const params = useParams();
    const myInfo = useSelector(state => state.myReducer);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [form, setForm] = useState({});

    const [modifyMode, setModifyMode] = useState(false);
    
    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    useEffect(() => {
        if(token) {
            dispatch(callMyInfoAPI({
                memberId: token.sub
            }));
        }
    }, []);

    useEffect(() => {
        if(image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const{ result } = e.target;
                if(result) {
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    },
    [image]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    }

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            memberPhone : myInfo.memberPhone,
            memberEmail : myInfo.memberEmail,
        });
    }

    const onClickMyInfoUpdateHandler = () => {

        const formData = new FormData();
        formData.append("memberPhone", form.memberPhone);
        formData.append("memberEmail", form.memberEmail);
        
        if(image) {
            formData.append("memberImage", image);
        }

        dispatch(callMyInfoUpdateAPI({
            form : formData
        }));

        console.log("formData : ", form);

        navigate('/mypage', { replace : true });
        window.location.reload();
    }

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    return (
        <div
            className={ MyPageCSS.backgroundDiv }
        >
            <section className={MyPageCSS.submenu}>
                    <br/>
                    <h3>MY PAGE</h3>
                    <div className={MyPageCSS.submenuDiv}>
                        <h4>내 정보</h4>
                        <ul className={MyPageCSS.submenuUl} >
                            <li> <NavLink to="/mypage" style={{ textDecoration: "none", color: "#505050" }}>내 정보 관리</NavLink></li>
                        </ul>
                    </div>
                    <br/>
                </section>
            <div className={ MyPageCSS.contentDiv}>
                <div className={ MyPageCSS.infoDiv}>
                    {/* <div className={ MyPageCSS.myImageDiv }>
                    { myInfo && <img
                        className={ MyPageCSS.myImage }
                        src={ (imageUrl == null) ? myInfo.memberImageUrl : imageUrl }
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
                        className={ MyPageCSS.myImageBtn }
                        onClick={ onClickImageUpload }
                        style={ !modifyMode ? { backgroundColor : 'gray' } : null } 
                        disabled={ !modifyMode }
                    >
                        이미지 첨부
                    </button>
                    </div> */}
                    <div className={ MyPageCSS.profileDiv }>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label>이름</label></td>
                                    <td>
                                        <input
                                            name='memberName'
                                            className={ MyPageCSS.myInfoInput }
                                            value={ myInfo.memberName || '' }
                                            readOnly={ true }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>아이디</label></td>
                                    <td>
                                        <input
                                            name='memberId'
                                            className={ MyPageCSS.myInfoInput }
                                            value={ myInfo.memberId || '' }
                                            readOnly={ true }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>전화번호</label></td>
                                    <td>
                                        <input
                                            name='memberPhone'
                                            placeholder='010-0000-0000'
                                            className={ MyPageCSS.myInfoInput }
                                            onChange={ onChangeHandler }
                                            value={ !modifyMode ? myInfo.memberPhone : form.memberPhone || '' }
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
                                            className={ MyPageCSS.myInfoInput }
                                            onChange={ onChangeHandler }
                                            value={ !modifyMode ? myInfo.memberEmail : form.memberEmail || '' }
                                            readOnly={ modifyMode ? false : true }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>부서</label></td>
                                    <td>
                                        <input
                                            name='deptName'
                                            className={ MyPageCSS.myInfoInput }
                                            value={ myInfo.dept?.deptName || '' }
                                            readOnly={ true }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>직책</label></td>
                                    <td>
                                        <input
                                            name='positionName'
                                            className={ MyPageCSS.myInfoInput }
                                            value={ myInfo.position?.positionName || '' }
                                            readOnly={ true }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>입사일</label></td>
                                    <td>
                                        <input
                                            name='memberJoinDate'
                                            className={ MyPageCSS.myInfoInput }
                                            value={ myInfo.memberJoinDate || '' }
                                            readOnly={ true }
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={ MyPageCSS.modifyModeBtn }>
                        {!modifyMode &&
                            <button
                                onClick={ onClickModifyModeHandler }
                                className={ MyPageCSS.modifyInfoBtn }
                            >
                                정보수정
                            </button>
                        }
                        {modifyMode &&
                            <button
                                onClick={ onClickMyInfoUpdateHandler }
                                className={ MyPageCSS.saveInfoBtn }
                            >
                                저장
                            </button>   
                        }
                        {modifyMode &&
                            <button
                            onClick={ () => navigate('/main')}
                            className={ MyPageCSS.cancelInfoBtn }
                            >
                            취소
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default MyPage;
