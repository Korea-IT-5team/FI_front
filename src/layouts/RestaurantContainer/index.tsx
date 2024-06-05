import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { getSignInUserRequest } from 'src/apis/user';
import { GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import { MAIN_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import './style.css';


//   component: Restaurant 공통부분   //
export default function Restaurant()
{

  //            state               //
  const {loginUserRole, setLoginUserEmailId, setLoginUserRole } = useUserStore();
  const[cookies, removeCookie] = useCookies();
  const navigator = useNavigate();


  //!!!
  //            function                     //
  const getSignInUserResponse = (result: GetUserInfoResponseDto | ResponseDto | null) => {

    const message = 
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') 
    {
        //alert(message);
        return;
    }

    const { userEmailId, userRole } = result as GetUserInfoResponseDto;
    setLoginUserEmailId(userEmailId);
    setLoginUserRole(userRole);
};
//!!!


  //            event handler               //
  const onLogClickHandler = () => 
  {
      navigator(MAIN_PATH);
      removeCookie('accessToken', {path:'/'});
  };

  
 
  //!!!
  //          effect              //
  let effectFlag = false;
  useEffect(() => {
  if (!cookies.accessToken) 
  {
      return;
  }
  if(effectFlag) return;
  effectFlag = true;

    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  }, []);
  //!!!

  // path에 대한 객체를 반환

  //            render              //
  return (
    <>
      <div id="restaurant-wrapper">
          <div className='restaurant-head-box'>
              <div className='restaurant-icon'>☰</div>
              <div className='restaurant-title'>{"Food Insight"}</div>
              {loginUserRole === '' 
                ? <div className="restaurant-sign-in" onClick={onLogClickHandler}>로그인/회원가입</div>
                : loginUserRole === 'ROLE_CEO'
                ? <div className="restaurant-sign-in" onClick={onLogClickHandler}>사장 로그아웃</div>
                : loginUserRole === 'ROLE_USER' 
                ? <div className="restaurant-sign-in" onClick={onLogClickHandler}>사용자 로그아웃</div>
                : null}
          </div>
          <Outlet />
      </div> 
    </>
  )
}
//수정##
//CSS완료
//사장쪽 점검빼고 완료
//AF 비회원일때는 어떻게 처리???