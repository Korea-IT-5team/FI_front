import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetRestaurantInfoRequest } from 'src/apis/restaurant';
import { PostRestaurantInfoRequestDto } from 'src/apis/restaurant/dto/request';
import { GetRestaurantInfoResponseDto } from 'src/apis/restaurant/dto/response';
import { useUserStore } from 'src/stores';
import { RestaurantReviewListItem } from 'src/types';
import './style.css';

//              interface                   //

  

//              component : 특정 식당 정보                 //
export default function RestaurantInfo()
{

  //            state               //
  const { loginUserEmailId, loginUserRole } = useUserStore();
  const [cookies] = useCookies();
  const{restId} = useParams<string>();
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
  const [restaurantBusinessRegistrationNumber, setRestaurantBuisnessRegistrationNumber] = useState('');
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

      const { restaurantImage,restaurantName,restaurantFoodCategory,
        restaurantPostalCode,restaurantLocation,restaurantTelNumber,
        restaurantSnsAddress,restaurantOperationHours,restaurantFeatures,
        restaurantNotice,restaurantRepresentativeMenu,restaurantBusinessRegistrationNumber,
        restaurantWriterId,restaurantReviewList
       } = result as GetRestaurantInfoResponseDto;
      setRestaurantImage(restaurantImage);
      setRestaurantName(restaurantName);
      setRestaurantFoodCategory(restaurantFoodCategory);
      setRestaurantPostalCode(restaurantPostalCode);
      setRestaurantLocation(restaurantLocation);
      setRestaurantTelNumber(restaurantTelNumber);
      setRestaurantSnsAddress(restaurantSnsAddress);
      setRestaurantOperationHours(restaurantOperationHours);
      setRestaurantFeatures(restaurantFeatures);
      setRestaurantNotice(restaurantNotice);
      setRestaurantRepresentativeMenu(restaurantRepresentativeMenu);
      setRestaurantBuisnessRegistrationNumber(restaurantBusinessRegistrationNumber);
      setRestaurantWriterId(restaurantWriterId);
      setRrestaurantReviewList(restaurantReviewList);
  }
 
  
  //          effect              //
  useEffect(() => {
  if (!cookies.accessToken || restId==undefined) 
  {
      return;
  }

      GetRestaurantInfoRequest(restId,cookies.accessToken).then(GetRestaurantInfoResponse);
  }, []);


  //               constant                     //



  //                event handler               //

  const onRegistrationClickHandler = () => {
    
        if(!restaurantImage || !restaurantName || !restaurantFoodCategory || !restaurantPostalCode || !restaurantBusinessRegistrationNumber)
        {
            alert('필수 정보를 입력하지 않았습니다.');
            return;
        }
        const requestBody: PostRestaurantInfoRequestDto = 
        {
            restaurantImage:restaurantImage,
            restaurantName:restaurantName,
            restaurantFoodCategory: restaurantFoodCategory,
            restaurantPostalCode:restaurantPostalCode,
            restaurantLocation:restaurantLocation,
            restaurantBusinessRegistrationNumber:restaurantBusinessRegistrationNumber,
            restaurantTelNumber:restaurantTelNumber,
            restaurantSnsAddress:restaurantSnsAddress,
            restaurantOperationHours:restaurantOperationHours,
            restaurantFeatures:restaurantFeatures,
            restaurantNotice:restaurantNotice,
            restaurantRepresentativeMenu:restaurantRepresentativeMenu,
        }
        //signUpRequest(requestBody).then(signUpResponse);
  }


  //            render              //
  return (
    <>
    {restId ? (<div id="restaurant-info">
                    <div>{restaurantId}</div>
                    <div>{restaurantImage}</div>
                    {loginUserRole === "ROLE_USER" || (loginUserRole === "ROLE_CEO" && loginUserEmailId !== restaurantWriterId )&& (
                    <button>예약</button>)}
                    <div>{restaurantName}</div>
                    <div>{restaurantFoodCategory}</div>
                    <div>{restaurantPostalCode}</div>
                    <div>{restaurantLocation}</div>
                    {loginUserRole === "ROLE_USER" || (loginUserRole === "ROLE_CEO" && loginUserEmailId !== restaurantWriterId )&& (
                    <button>찜클릭</button>)}
                    <div>{restaurantTelNumber}</div>
                    <div>{restaurantSnsAddress}</div>
                    <div>{restaurantOperationHours}</div>
                    <div>{restaurantFeatures}</div>
                    <div>{restaurantNotice}</div>
                    <div>{restaurantRepresentativeMenu}</div>
                    <div>{restaurantBusinessRegistrationNumber}</div>
                    <div>{restaurantWriterId}</div>
                    {loginUserRole === "ROLE_CEO" && loginUserEmailId === restaurantWriterId && (
                    <button>수정</button>)}
                    {loginUserRole === "ROLE_USER" || (loginUserRole === "ROLE_CEO" && loginUserEmailId !== restaurantWriterId )&& (
                    <button>리뷰작성</button>)}
                </div>) : 

            (<><div id="restaurant-upload-update">
                    <div>{restaurantId}</div>
                    <div>{restaurantImage}</div>
                    {loginUserRole === "ROLE_USER" || (loginUserRole === "ROLE_CEO" && loginUserEmailId !== restaurantWriterId )&& (
                    <button>예약</button>)}
                    <input>{restaurantName}</input>
                    <div>{restaurantFoodCategory}</div>
                    <div>{restaurantPostalCode}</div>
                    <div>{restaurantLocation}</div>
                    {loginUserRole === "ROLE_USER" || (loginUserRole === "ROLE_CEO" && loginUserEmailId !== restaurantWriterId )&& (
                    <button>찜클릭</button>)}
                    <div>{restaurantTelNumber}</div>
                    <div>{restaurantSnsAddress}</div>
                    <div>{restaurantOperationHours}</div>
                    <div>{restaurantFeatures}</div>
                    <div>{restaurantNotice}</div>
                    <div>{restaurantRepresentativeMenu}</div>
                    <div>{restaurantBusinessRegistrationNumber}</div>
                    <div>{restaurantWriterId}</div>
                    {loginUserRole === "ROLE_CEO" && loginUserEmailId === restaurantWriterId && (
                    <button>수정</button>)}
                    {loginUserRole === "ROLE_USER" || (loginUserRole === "ROLE_CEO" && loginUserEmailId !== restaurantWriterId )&& (
                    <button>리뷰작성</button>)}
            </div>
            <div onClick={onRegistrationClickHandler}>등록하기</div></>
            )}
    
    </>
  )
}
