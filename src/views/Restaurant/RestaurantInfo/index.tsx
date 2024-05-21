import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, Path, useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetRestaurantInfoRequest, GetRestaurantListRequest } from 'src/apis/restaurant';
import { GetRestaurantInfoResponseDto, GetRestaurantListResponseDto } from 'src/apis/restaurant/dto/response';
import { getSignInUserRequest } from 'src/apis/user';
import { GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import { AUTH_PATH, GET_RESTAURANT_URL, POST_RESTAURANT_INFO_UPLOAD, RESTAURANT_INFO_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { RestaurantListItem, RestaurantReviewListItem } from 'src/types';
import './style.css';

//              interface                   //

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
              : null}
          </div>
      </div>
    </>
   );
}

  

//              component : 특정 식당 정보                 //
export default function RestaurantInfo()
{

  //            state               //
  const { setLoginUserEmailId, setLoginUserRole } = useUserStore();
  const [searchWord, setSearchWord] = useState<string>('');
  const [cookies] = useCookies();
  const{restaurantId2} = useParams<string>();
  const [restaurantId, setRestaurantId] = useState<number>();
  const [restaurantImage, setRestaurantImage] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantFoodCategory, setRestaurantFoodCategory] = useState('');
  const [restaurantPostalCode, setRestaurantPostalCode] = useState('');
  const [restaurantLocation, setRestaurantLocation] = useState('');
  const [restaurantTelNumber, setRestaurantTelNumber] = useState('');
  const [restaurantSnsAddress, setRestaurantSnsAddress] = useState('');
  const [restaurantOperationHours, setRestaurantOperationHours] = useState('');
  const [restaurantFeatures, setRestaurantFeatures] = useState('');
  const [restaurantNotice, setRestaurantNotice] = useState('');
  const [restaurantRepresentativeMenu, setRestaurantRepresentativeMenu] = useState('');
  const [restaurantBuisnessRegistrationNumber, setRestaurantBuisnessRegistrationNumber] = useState('');
  const [restaurantWriterId,setRestaurantWriterId] = useState('');
  const [restaurantReviewList,setRrestaurantReviewList] = useState<RestaurantReviewListItem[]>([]);

  

  //                    function                    /

  const navigator = useNavigate();
  const GetRestaurantInfoResponse = ( result : GetRestaurantInfoResponseDto | ResponseDto | null) =>
  {
      const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

      if (!result || result.code !== 'SU') 
      {
          alert(message);
          return;
      }


  }
 
  
  //          effect              //
  useEffect(() => {
  if (!cookies.accessToken || restaurantId2==undefined) 
  {
      return;
  }

      GetRestaurantInfoRequest(restaurantId2,cookies.accessToken).then(GetRestaurantInfoResponse);
  }, []);

  // path에 대한 객체를 반환

  //            render              //
  return (
    <div id="wrapper">
      <TopBar/>
        <div>{restaurantId}</div>
        <div>{restaurantImage}</div>
        <div>예약</div>
        <div>{restaurantName}</div>
        <div>{restaurantFoodCategory}</div>
        <div>{restaurantPostalCode}</div>
        <div>{restaurantLocation}</div>
        <div>찜클릭</div>
        <div>{restaurantTelNumber}</div>
        <div>{restaurantSnsAddress}</div>
        <div>{restaurantOperationHours}</div>
        <div>{restaurantFeatures}</div>
        <div>{restaurantNotice}</div>
        <div>{restaurantRepresentativeMenu}</div>
        <div>{restaurantBuisnessRegistrationNumber}</div>
        <div>{restaurantWriterId}</div>
        <div>수정</div>
        <div>리뷰작성</div>

    </div>
  )
}
