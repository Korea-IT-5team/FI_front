import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Path, useLocation, useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { getSignInUserRequest } from 'src/apis/user';
import { GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import { MAIN_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';

//              interface                   //
interface Props 
{
  path:Path;
}

//              component                   //
function TopBar()
{
  //            state                //
  const { loginUserRole } = useUserStore();
  const[cookies,setCookie,removeCookie] = useCookies();

  //            function                     //
  const navigator = useNavigate();
 
  //            event handler               //
  const onLogoutClickHandler = () => 
  {
      removeCookie('accessToken',{path:'/'});
     
  };

  
   //            render              //
   return(
    <>
      <div className="top-bar-container">
          <div className="top-bar-title">Food Insight(푸드 인사이트)</div>
          <div className='top-bar-right'>
          { loginUserRole === 'ROLE_ADMIN' && <div className="top-bar-role">관리자</div> }
            <div className="second-button" onClick={onLogoutClickHandler}>로그아웃</div>
          </div>
      </div>
    </>
   );
}

//              component                   //
function SideNavigation({path}:Props)
{
  

  //                  function                  //
  const navigator = useNavigate();


  //                  event handler             //
  {
  };

  //                  render                  //
  return(
    <div className="side-navigation-container">
            
        </div>
  );
}



//              component : 식당                 //
export default function Restaurant()
{
  //            state               //
  const { setLoginUserEmailId, setLoginUserRole } = useUserStore();
  const [cookies] = useCookies();

  


  //                    function                    //
  const navigator = useNavigate();

  const getSignInUserResponse = (result: GetUserInfoResponseDto | ResponseDto | null) => {

    const message = 
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') 
    {
        alert(message);
        navigator(MAIN_ABSOLUTE_PATH);
        return;
    }

    const { userEmailId, userRole } = result as GetUserInfoResponseDto;
    setLoginUserEmailId(userEmailId);
    setLoginUserRole(userRole);
};

  
  //          effect              //
  useEffect(() => {
    if (!cookies.accessToken) 
    {
        return;
    }

    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  }, [cookies.accessToken]);

  // path에 대한 객체를 반환

  //            render              //
  return (
    <div id="wrapper">
        <TopBar/>
        <SideNavigation/>
        <div className="main-container">
        <Outlet />
        </div>
    </div>
  )
}
