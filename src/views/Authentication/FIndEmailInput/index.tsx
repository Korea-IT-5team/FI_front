import { ChangeEvent, useState } from 'react';
import { findEmailRequest } from 'src/apis/auth';
import { FindEmailRequestDto} from 'src/apis/auth/dto/request';
import ResponseDto from 'src/apis/response.dto';
import "./style.css";
import InputBox from 'src/components/InputBox';
import { useNavigate } from 'react-router';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';
import { PASSWORD_RESET_INPUT_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';

// component: 이메일 찾기 // 
export default function FindEmailInput() {

    // state //
    const [userName, setUserName] = useState<string>('');
    const [userTelNumber, setUserTelNumber] = useState<string>('');
    const [userEmailId, setUserEmailId] = useState<string>('');

    const [userTelNumberButtonStatus, setUserTelNumberButtonStatus] = useState<boolean>(false);

    const [isUserNameCheck, setUserNameCheck] = useState<boolean>(false);
    const [isUserTelNumberCheck, setUserTelNumberCheck] = useState<boolean>(false);
    const [isUserTelNumberPattern, setUserTelNumberPattern] = useState<boolean>(false);

    const [UserNameMessage, setUserNameMessage] = useState<string>('');
    const [userTelNumberMessage, setUserTelNumberMessage] = useState<string>('');

    const [isUserTelNumberError, setUserTelNumberError] = useState<boolean>(false);

    const findEmailButtonClass = `${isUserNameCheck && isUserTelNumberCheck ? 'primary' : 'disable'}-button full-width`;

  // function // 
    const navigator = useNavigate();

    const findEmailResponse = (result: ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'NF' ? '사용자 정보 불일치합니다.' : 
            result.code === 'NU' ? '사용자 정보가 없습니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''
    
        const isSuccess = result && result.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }

        const {userEmailId} = result as GetMyInfoResponseDto;
        setUserEmailId(userEmailId);
    };

    // event handler // 
    const onUserNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserName(value);
        setUserNameCheck(false)
        setUserNameMessage('');
    };

    const onUserTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserTelNumber(value);
        setUserTelNumberButtonStatus(value !== '');
        setUserTelNumberCheck(false);
        setUserTelNumberMessage('');
    };

    const onUserTelNumberButtonClickHandler = () => {
        if (!userTelNumberButtonStatus) return;

        const userTelNumberPattern = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
        const isUserTelNumberPattern = userTelNumberPattern.test(userTelNumber);
        setUserTelNumberPattern(isUserTelNumberPattern);

        if (!isUserTelNumberPattern) {
            setUserTelNumberMessage('전화번호 형식이 아닙니다.');
            setUserTelNumberError(true);
            setUserTelNumberCheck(false);
            return;
        }

        setUserTelNumberButtonStatus(false);
        setUserTelNumberCheck(false);
    };

    const onFindEmailButtonClickHandler = () => {
        if (!userName || !userTelNumber) {
            alert('모든 내용을 입력해주세요.');
            return;
        }

        const requestBody: FindEmailRequestDto = {
            userName: userName,
            userTelNumber: userTelNumber
        }
        findEmailRequest(requestBody).then(findEmailResponse);

    };

   // render //
    return (
        <div className='find-email-container'>
            <div className='find-email-title'>이메일 찾기</div>
            <div className='find-email-box'>
                <div className='find-email-input'>
                    <InputBox type="text" value={userName} placeholder="이름을 입력해주세요" onChangeHandler={onUserNameChangeHandler} message={UserNameMessage} error />

                    <InputBox type="text" value={userTelNumber} placeholder="전화번호를 입력해주세요" onChangeHandler={onUserTelNumberChangeHandler} buttonStatus={userTelNumberButtonStatus} onButtonClickHandler={onUserTelNumberButtonClickHandler} message={userTelNumberMessage} error={isUserTelNumberError} />
                </div>
                <div className='find-email-button'>
                    <div className={findEmailButtonClass} onClick={onFindEmailButtonClickHandler}>이메일 찾기</div> 
                </div>
                {userEmailId &&
                <div>
                    <div className='return-Email-id' >{userEmailId}</div>
                </div>
                }
                <div className='navigation-button'>
                    <div className='moving-sign-up' onClick={() => navigator(SIGN_IN_ABSOLUTE_PATH)}>로그인</div>
                    <div className="find-divider">{'\|'}</div>
                    <div className='moving-password-reset' onClick={() => navigator(PASSWORD_RESET_INPUT_ABSOLUTE_PATH)}>비밀번호 재설정</div>
                </div>
            </div>
        </div>
    )
}
