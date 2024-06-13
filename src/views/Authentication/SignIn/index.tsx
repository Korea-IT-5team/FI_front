import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { signInRequest } from "src/apis/auth";
import { SignInRequestDto } from "src/apis/auth/dto/request";
import { SignInResponseDto } from "src/apis/auth/dto/response";
import ResponseDto from "src/apis/response.dto";
import InputBox from "src/components/InputBox";
import { FIND_EMAIL_INPUT_ABSOLUTE_PATH, MAIN_PATH, PASSWORD_RESET_INPUT_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH, SIGN_UP_ABSOLUTE_PATH } from "src/constant";
import "./style.css";

//   component: Sns 로그인   //
export function Sns() {

    // state //
    const { accessToken, expires } = useParams();
    const [cookies, setCookie] = useCookies();

    // function //
    const navigation = useNavigate();

    // effect //
    useEffect(() => {
        if (!accessToken || !expires) return;
        const expiration = new Date(Date.now() + (Number(expires) * 1000));
        setCookie('accessToken', accessToken, { path: '/', expires: expiration });

        navigation(SIGN_IN_ABSOLUTE_PATH);
    }, []);

    //   render   //
    return (
        <></>
    );
}

// interface //
interface SnsContainerProps {
    title: string;
}

// component // 
function SnsContainer({ title }: SnsContainerProps) {

    // event handler //
    const onSnsButtonClickHandler = (type: 'kakao' | 'naver') => {
        window.location.href = 'http://localhost:9999/api/v1/auth/oauth2/' + type;
    };
    
    // render: sns화면 //
    return (
        <div className="authentication-sns-container">
            <div className="sns-container-title label">{title}</div>
            <div className="sns-button-container">
                <div className="sns-button kakao-button" onClick={() => onSnsButtonClickHandler('kakao')}></div>
                <div className="sns-button naver-button" onClick={() => onSnsButtonClickHandler('naver')}></div>
            </div>
        </div>
    );
}

//   component: 로그인   //
export default function SignIn() {

    // state //
    const [cookie, setCookie] = useCookies();

    const [emailId, setEmailId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [message, setMessage] = useState<string>('');

    // function // 
    const navigation = useNavigate();

    const signInResponse = (result: SignInResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' :
            result.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
            result.code === 'TF' ? '서버에 문제가 있습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        setMessage(message);

        const isSuccess = result && result.code === 'SU';
        if (!isSuccess) return;

        const { accessToken, expires } = result as SignInResponseDto;
        const expiration = new Date(Date.now() + (expires * 1000));
        setCookie('accessToken', accessToken, { path: '/', expires: expiration })

        navigation(MAIN_PATH);
    };

    // event handler //
    const onEmailIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailId(event.target.value);
        setMessage('');
    };

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setMessage('');
    };

    const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        onSignInButtonClickHandler();
    };

    const onSignInButtonClickHandler = () => {

        if (!emailId || !password) {
            setMessage('이에일과 비밀번호를 모두 입력하세요.');
            return;
        }

        const requestBody: SignInRequestDto = {
            userEmailId: emailId,
            password: password
        }
        signInRequest(requestBody).then(signInResponse);
    };

    //   render   //
    return (
        <div id="authentication-wrapper">
            <div className="authentication-contents">
                <div className="authentication-sign-title">로그인</div>
                <div className="authentication-sign-container">
                    <div className="authentication-contents-box">
                        <div className="authentication-input-container">

                            <InputBox type="text" value={emailId} placeholder="이메일을 입력해주세요" onChangeHandler={onEmailIdChangeHandler} />
                            <InputBox type="password" value={password} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordChangeHandler} onKeydownHandler={onPasswordKeydownHandler} message={message} error />

                        </div>
                        <div className="authentication-button-container">
                            <div className="primary-button full-width" onClick={onSignInButtonClickHandler}>로그인</div>
                        </div>
                    </div>
                    <div className="find-container">
                        <div className="find-email">
                            <div className="text-link" onClick={() => { navigation(FIND_EMAIL_INPUT_ABSOLUTE_PATH) }}>이메일 찾기</div>
                        </div>
                        <div className="find-divider">{'\|'}</div>
                        <div className="reset-password">
                            <div className="text-link" onClick={() => { navigation(PASSWORD_RESET_INPUT_ABSOLUTE_PATH) }}>비밀번호 재설정</div>
                        </div>
                        <div className="find-divider">{'\|'}</div>
                        <div className="user-sign-up">
                            <div className="text-link" onClick={() => { navigation(SIGN_UP_ABSOLUTE_PATH) }}>회원가입</div>
                        </div>
                    </div>
                    <SnsContainer title="SNS 로그인" />
                </div>
            </div>
        </div>
    );
}