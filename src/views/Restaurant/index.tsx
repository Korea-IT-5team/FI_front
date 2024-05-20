import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css';
import { useCookies } from 'react-cookie';
import { Outlet, Path, useLocation, useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { getSignInUserRequest } from 'src/apis/user';
import { GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import { AUTH_PATH, GET_RESTAURANT_URL, MAIN_ABSOLUTE_PATH, POST_RESTAURANT_INFO_UPLOAD } from 'src/constant';
import { useUserStore } from 'src/stores';
import { GetRestaurantListRequest } from 'src/apis/restaurant';
import { GetRestaurantListResponseDto } from 'src/apis/restaurant/dto/response';
import { RestaurantListItem } from 'src/types';

//              interface                   //
interface Props 
{
  path:Path;
}

//              component                   //
function TopBar()
{
  //            state                //
  const {loginUserRole } = useUserStore();
  const[cookies,setCookie,removeCookie] = useCookies();

  //            function                     //
  const navigator = useNavigate();
 
  //            event handler               //
  const onLogClickHandler = () => 
  {
      navigator(AUTH_PATH);
      removeCookie('accessToken',{path:'/'});
  };

  
   //            render              //
   return(
    <>
      <div className="top-bar-container">
          <div className="top-bar-left">☰</div>
          <div className="top-bar-title">Food Insight(푸드 인사이트)</div>
          <div className='top-bar-right'>
          {loginUserRole === '' 
              ? <div className="second-button" onClick={onLogClickHandler}>로그인/회원가입</div>
              : loginUserRole === 'ROLE_CEO' 
              ? <div className="second-button" onClick={onLogClickHandler}>사장 로그아웃</div>
              : loginUserRole === 'ROLE_USER' 
              ? <div className="second-button" onClick={onLogClickHandler}>사용자 로그아웃</div>
              : loginUserRole === 'ROLE_ADMIN' 
              ? <div className="second-button" onClick={onLogClickHandler}>관리자 로그아웃</div>
              : null}
          </div>
      </div>
    </>
   );
}

//              component                   //
function SideNavigation()
{

  //                  state                             //
  const [searchWord, setSearchWord] = useState<string>('');
  const [restaurantList, SetRestaurantList] = useState<RestaurantListItem[]>([]);
  const[cookies] = useCookies();
  const {loginUserRole } = useUserStore();
  

  //                  function                  //
  const navigator = useNavigate();


  const GetRestaurantListResponse = (result: GetRestaurantListResponseDto | ResponseDto | null) => 
  {
    const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') 
    {
        alert(message);
        return;
    }

    const { restaurantList } = result as GetRestaurantListResponseDto;
    SetRestaurantList(restaurantList);
  };


  //                    effect                      //
  useEffect(() => {
  if (!cookies.accessToken) 
  {
      return;
  }

    GetRestaurantListRequest(searchWord,cookies.accessToken).then(GetRestaurantListResponse);
   }, []);




  //                  event handler             //
  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
  {
      const searchWord = event.target.value;
      setSearchWord(searchWord);
  };

  const onSearchClickHandler = () =>
  {
      if (!searchWord) return;
      if (!cookies.accessToken) return;

      GetRestaurantListRequest(searchWord,cookies.accessToken).then(GetRestaurantListResponse);
  };

  const onRegistrationClickHandler = () =>
  {     
       if (!cookies.accessToken) return;
       navigator(POST_RESTAURANT_INFO_UPLOAD);
  };  

  const onItemClickHandler = () =>
    {     
         if (!cookies.accessToken) return;
         navigator(GET_RESTAURANT_URL(1));
    };  


  //                  render                  //
  const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';
  return(
    <>
    <div className="side-navigation-container">
      <div className='search-input-click'>
        <input className="search-input" placeholder='오늘의 맛집은?' value={searchWord} onChange={onSearchWordChangeHandler}></input>
        <div className={searchButtonClass} onClick={onSearchClickHandler}>검색</div>
      </div>
      {loginUserRole === 'ROLE_CEO' && <div className="registration-button" onClick={onRegistrationClickHandler}>등록하기</div>}
    </div>
    <div className="restaurant-list">
      {!restaurantList || restaurantList.length === 0 ? (
          <div className="select-item">해당하는 식당 정보가 없습니다.</div>
        ) : (
        restaurantList.map((item) => (
          <div className='select-list-item-box' onClick={() => onItemClickHandler()} key={item.restaurantFoodCategory}>
            <div className='select-item'>{item.restaurantFoodCategory}</div>
          </div>
        )))
      }
    </div>
    </>
  );  
  }

  

//              component : 식당                 //
export default function Restaurant()
{

  //            state               //
  const { setLoginUserEmailId, setLoginUserRole } = useUserStore();
  const [searchWord, setSearchWord] = useState<string>('');
  const [cookies] = useCookies();
  const [restaurantList, SetRestaurantList] = useState<RestaurantListItem[]>([]);

  

  //                    function                    //
  const navigator = useNavigate();

  const getSignInUserResponse = (result: GetUserInfoResponseDto | ResponseDto | null) => {

    // const message = 
    //     !result ? '서버에 문제가 있습니다.' :
    //     result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    // if (!result || result.code == 'DBE') 
    // {
    //     alert(message);
    //     navigator(AUTH_PATH);
    //     return;
    // }

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
        <Outlet /> 
    </div>
  )
}
