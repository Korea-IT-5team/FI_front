import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetRestaurantListRequest } from 'src/apis/restaurant';
import { GetRestaurantListResponseDto } from 'src/apis/restaurant/dto/response';
import { getSignInUserRequest } from 'src/apis/user';
import { GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import { RESTAURANT_INFO_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { RestaurantListItem } from 'src/types';
import './style.css';


//              component                   //
function RestaurantList()
{

  //                  state                             //
  const [searchWord, setSearchWord] = useState<string>('');
  const [restaurantList, SetRestaurantList] = useState<RestaurantListItem[]>([]);
  const{path} = useParams();
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
   }, [path]);




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
       navigator(RESTAURANT_INFO_ABSOLUTE_PATH(0));
  };  

  const onItemClickHandler = (item:number) =>
    {     
         if (!cookies.accessToken) return;
         navigator(RESTAURANT_INFO_ABSOLUTE_PATH(item));
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
        restaurantList.slice(0, 12).map((item) => (
          <div className='select-list-item-box' onClick={() => onItemClickHandler(item.restaurantId)}>
            <div className='select-item'>{item.restaurantImage}</div>
            <div className='select-item'>{item.restaurantName}</div>
          </div>
        )))
      }
    </div>
    </>
  );  
  }

  

//              component : 식당 리스트             //
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
      <RestaurantList/>
  )
}
