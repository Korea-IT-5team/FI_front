import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetRestaurantInfoRequest, PatchRestaurantUpdateRequestDto, PostRestaurantUploadRequestDto } from 'src/apis/restaurant';
import { PatchRestaurantInfoRequestDto, PostRestaurantInfoRequestDto } from 'src/apis/restaurant/dto/request';
import { GetRestaurantInfoResponseDto } from 'src/apis/restaurant/dto/response';
import RestInputbox from 'src/components/RestInputbox';
import SelectBox from 'src/components/Selectbox';
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
  const{restId} = useParams();
  let restIdNumber =Number(restId);
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
  const [grade,setGrade] = useState<number>();
  const [restaurantImageCheck,setRestaurantImageCheck] = useState<boolean>(false);
  const [restaurantNameCheck,setRestaurantNameCheck] = useState<boolean>(false);
  const [restaurantFoodCategoryCheck,setRestaurantFoodCategoryCheck] = useState<boolean>(false);
  const [restaurantPostalCodeCheck,setRestaurantPostalCodeCheck] = useState<boolean>(false);
  const [restaurantLocationCheck,setRestaurantLocationCheck] = useState<boolean>(false);
  const [restaurantBusinessRegistrationNumberCheck,setRestaurantBusinessRegistrationNumberCheck] = useState<boolean>(false);


  const isRestUploadUpActive = restaurantImageCheck && restaurantNameCheck && restaurantFoodCategoryCheck && restaurantPostalCodeCheck && restaurantLocationCheck
  && restaurantBusinessRegistrationNumberCheck;
  const signUpButtonClass = `${isRestUploadUpActive ? 'primary' : 'disable'}-button full-width`;

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



  const PostRestaurantUploadResponse = (result : ResponseDto | null) => 
  { 
        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
        result.code === 'AF' ? '권한이 없습니다.' : 
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') 
        {
            alert(message);
            return;
        }

        restIdNumber=1;
  }


  const PatchRestaurantUpdateResponse = (result: ResponseDto | null) => 
  {
        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
        result.code === 'NR' ? '존재하지 않는 식당입니다.':
        result.code === 'AF' ? '권한이 없습니다.' : 
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') 
        {
            alert(message);
            return;
        }

        restIdNumber=1;
  }
 
  
  //          effect              //
  useEffect(() => {

    if (!cookies.accessToken || restId==undefined || restIdNumber==0) 
    {
        return;
    }

      GetRestaurantInfoRequest(restId,cookies.accessToken).then(GetRestaurantInfoResponse);
  },[]);



  useEffect(() => {
    if (!cookies.accessToken || restId==undefined) 
    {
            return;
    }
        const total = restaurantReviewList.reduce((sum, restaurantReviewList) => sum + restaurantReviewList.rating, 0);
        setGrade(total / restaurantReviewList.length);
  },[restaurantReviewList]);


  //               constant                     //



  //                event handler               //

  //                식당 정보 등록               //
  const onUploadClickHandler = () => {
    
        if(!restaurantImage || !restaurantName || !restaurantFoodCategory 
            || !restaurantPostalCode|| !restaurantLocation || !restaurantBusinessRegistrationNumber)
        {
            alert('필수 정보를 입력하지 않았습니다.');
            return;
        }

        const requestBody: PostRestaurantInfoRequestDto = 
        {
            restaurantImage:restaurantImage,
            restaurantName:restaurantName,
            restaurantFoodCategory: restaurantFoodCategory,
            restaurantPostalCode: restaurantPostalCode,
            restaurantLocation:restaurantLocation,
            restaurantBusinessRegistrationNumber:restaurantBusinessRegistrationNumber,
            restaurantTelNumber:restaurantTelNumber,
            restaurantSnsAddress:restaurantSnsAddress,
            restaurantOperationHours:restaurantOperationHours,
            restaurantFeatures:restaurantFeatures,
            restaurantNotice:restaurantNotice,
            restaurantRepresentativeMenu:restaurantRepresentativeMenu,
        }
        PostRestaurantUploadRequestDto(requestBody,cookies.accessToken).then(PostRestaurantUploadResponse);
  }

//             식당 정보 수정               //
const onUpdateClickHandler = () => {
    
    if(!restaurantImage || !restaurantName || !restaurantFoodCategory 
        || !restaurantPostalCode|| !restaurantLocation || !restId)
    {
        alert('필수 정보를 입력하지 않았습니다.');
        return;
    }

    const requestBody: PatchRestaurantInfoRequestDto = 
    {
        restaurantId:restId,
        restaurantImage:restaurantImage,
        restaurantName:restaurantName,
        restaurantFoodCategory: restaurantFoodCategory,
        restaurantPostalCode: restaurantPostalCode,
        restaurantLocation:restaurantLocation,
        restaurantTelNumber:restaurantTelNumber,
        restaurantSnsAddress:restaurantSnsAddress,
        restaurantOperationHours:restaurantOperationHours,
        restaurantFeatures:restaurantFeatures,
        restaurantNotice:restaurantNotice,
        restaurantRepresentativeMenu:restaurantRepresentativeMenu,
    }
    PatchRestaurantUpdateRequestDto(requestBody,cookies.accessToken).then(PatchRestaurantUpdateResponse);
}


const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
{
    const { value } = event.target;
    setRestaurantImage(value);
    setRestaurantImageCheck(!(value.length===0));
}   


const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
{
    const { value } = event.target;
    setRestaurantName(value);
    setRestaurantNameCheck(!(value.length===0));
}   

const onFoodCategoryChangeHandler = (selectFood: string) => {
    setRestaurantFoodCategory(selectFood);
    setRestaurantFoodCategoryCheck(!(selectFood.length===0));
};

const onPostalCodeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
{
    const { value } = event.target;
    setRestaurantPostalCode(value);
    setRestaurantPostalCodeCheck(!(value.length===0));
}

const onLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
{
    const { value } = event.target;
    setRestaurantLocation(value);
    setRestaurantLocationCheck(!(value.length===0));
}

const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
{
    const { value } = event.target;
    setRestaurantTelNumber(value);
}

const onSnsLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
{
    const { value } = event.target;
    setRestaurantSnsAddress(value);
}

const onOperationHoursChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
{
    const { value } = event.target;
    setRestaurantOperationHours(value);
}


const onFeaturesChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
{
    const { value } = event.target;
    setRestaurantFeatures(value);
}

const onNoticeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
{
    const { value } = event.target;
    setRestaurantNotice(value);
}

const onRepresentativeMenuChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
{
    const { value } = event.target;
    setRestaurantRepresentativeMenu(value);
}

const onBusinessNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
{
    const { value } = event.target;
    setRestaurantBuisnessRegistrationNumber(value);
    setRestaurantBusinessRegistrationNumberCheck(!(value.length===0));
}

const onSetRestIdNumberHandler = () => 
{
    restIdNumber=0;
}

  //            render              //
  return (
    <>
        {restIdNumber !== 0 ? (
            <div id="restaurant-info">
                <div id="restaurant-left">
                    <div id="restaurant-left-up">
                        {loginUserRole === "ROLE_CEO" && loginUserEmailId === restaurantWriterId && (
                        <button onClick={onSetRestIdNumberHandler}>수정</button>)}
                        <div id="restaurant_image">{restaurantImage}</div>
                            <div>
                                <div>{restaurantName}</div>
                                {loginUserRole === "ROLE_USER" || (loginUserRole === "ROLE_CEO" && loginUserEmailId !== restaurantWriterId )&& (
                                <button>예약</button>)}
                            </div>
                        <div>{restaurantFoodCategory}</div>
                        <div>{grade}</div>
                        {loginUserRole === "ROLE_USER" || (loginUserRole === "ROLE_CEO" && loginUserEmailId !== restaurantWriterId )&& (
                        <button>찜클릭</button>)}
                    </div> 

                    <div id="restaurant-left-down">
                        <div>{restaurantLocation}</div>
                        <div>{restaurantSnsAddress}</div>
                        <div>{restaurantPostalCode}</div>
                        <div>{restaurantTelNumber}</div>
                    </div>
                </div>

                <div id="restaurant-right"> 
                    <div id="restaurant-right-up">        
                        <div>{restaurantOperationHours}</div>
                        <div>{restaurantFeatures}</div>
                        <div>{restaurantNotice}</div>
                        <div>{restaurantRepresentativeMenu}</div>
                        {loginUserRole === "ROLE_CEO" && loginUserEmailId === restaurantWriterId && 
                        (<div>{restaurantBusinessRegistrationNumber}</div>)}
                    </div>            

                    <div id="restaurant-right-down">   
                        {loginUserRole === "ROLE_USER" || (loginUserRole === "ROLE_CEO" && loginUserEmailId !== restaurantWriterId )&& (
                        <button>리뷰작성</button>)}
                    </div>
                </div>
            </div>
            ) : (
                <div id="restaurant-info">
                    <div id="restaurant-left">
                        <div id="restaurant-left-up">
                            <RestInputbox label="식당 이미지" type="file" value={restaurantImage}  accept={'image/*'}
                            placeholder="이미지를 삽입해주세요" onChangeHandler={onImageChangeHandler}/>
                                <div>
                                    <RestInputbox label="식당 이름" type="text" value={restaurantName}
                                    placeholder="이름을 입력해주세요" onChangeHandler={onNameChangeHandler}/>
                                </div>
                            <SelectBox value={restaurantFoodCategory} onChange={onFoodCategoryChangeHandler} /> 
                        </div> 
    
                        <div id="restaurant-left-down">
                            <RestInputbox label="식당 주소" type="text" value={restaurantLocation}
                            placeholder="주소를 입력해주세요" onChangeHandler={onLocationChangeHandler}/>

                            <RestInputbox label="식당 SNS 주소" type="text" value={restaurantSnsAddress}
                            placeholder="주소를 입력해주세요" onChangeHandler={onSnsLocationChangeHandler}/>

                            <RestInputbox label="식당 우편번호" type="text" value={restaurantPostalCode}
                            placeholder="우편번호를 입력해주세요" onChangeHandler={onPostalCodeChangeHandler}/>

                            <RestInputbox label="식당 연락쳐" type="text" value={restaurantTelNumber}
                            placeholder="연락쳐를 입력해주세요" onChangeHandler={onTelNumberChangeHandler}/>
                        </div>
                    </div>
    
                    <div id="restaurant-right"> 
                        <div id="restaurant-right-up">  
                            <RestInputbox label="운영 시간" type="text" value={restaurantOperationHours}
                            placeholder="운영시간을 입력해주세요" onChangeHandler={onOperationHoursChangeHandler}/> 

                            <RestInputbox label="식당 특징" type="text" value={restaurantFeatures}
                            placeholder="특징을 입력해주세요" onChangeHandler={onFeaturesChangeHandler}/>     
        
                            <RestInputbox label="식당 공지" type="text" value={restaurantNotice}
                            placeholder="공지를 입력해주세요" onChangeHandler={onNoticeChangeHandler}/>

                            <RestInputbox label="대표메뉴" type="text" value={restaurantRepresentativeMenu}
                            placeholder="대표메뉴를 입력해주세요" onChangeHandler={onRepresentativeMenuChangeHandler}/>
                            
                            <RestInputbox label="사업자 등록번호" type="text" value={restaurantBusinessRegistrationNumber}
                            placeholder="사업자 등록번호를 입력해주세요" onChangeHandler={onBusinessNumberChangeHandler}/>

                            {restaurantWriterId ?
                              <button onClick={onUpdateClickHandler}
                              className={signUpButtonClass}>수정</button> : 
                              <button onClick={onUploadClickHandler}
                              className={signUpButtonClass}>등록하기</button>}
                        </div>           
                    </div>
                </div>
                )
            }
    </>
  )
}
