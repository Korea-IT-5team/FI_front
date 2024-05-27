import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetRestaurantInfoRequest, PatchRestaurantInfoRequest, PostRestaurantInfoRequest } from 'src/apis/restaurant';
import { PatchRestaurantInfoRequestDto, PostRestaurantInfoRequestDto } from 'src/apis/restaurant/dto/request';
import { GetRestaurantInfoResponseDto } from 'src/apis/restaurant/dto/response';
import { DeleteRestaurantFavoriteRequest, GetRestaurantFavoriteStatusRequest, PostRestaurantFavoriteRequest } from 'src/apis/restaurant/favorite';
import { GetRestaurantFavoriteStatusResponseDto } from 'src/apis/restaurant/favorite/dto/response';
import { DeleteReservationRequest } from 'src/apis/restaurant/reservation';
import RestInputBox from 'src/components/RestaurantInputBox';
import SelectBox from 'src/components/Selectbox';
<<<<<<< HEAD
import { RESTAURANT_RESERVATION_ABSOLUTE_PATH } from 'src/constant';
=======
import { RESTAURANT_DO_RESERVATION_ABSOLUTE_PATH } from 'src/constant';
>>>>>>> 608271d7aea915b6d8a8a1d4cc1dda0553997695
import { useUserStore } from 'src/stores';
import { RestaurantReviewListItem } from 'src/types';
import ReviewList from '../Review/ReviewList';
import './style.css';

//              interface                   //


//            component : 특정 식당 정보                 //
export default function RestaurantInfo() {

    //            state               //
    const { loginUserEmailId, loginUserRole, RestaurantId, reservationStatus, favoriteStatus, setReservationStatus, setRestaurantId, setFavoriteStatus } = useUserStore();
    const [cookies] = useCookies();
    const { restaurantId } = useParams();
    let restIdNumber = Number(restaurantId);
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
    const [restaurantBusinessRegistrationNumber, setRestaurantBusinessRegistrationNumber] = useState('');
    const [restaurantWriterId, setRestaurantWriterId] = useState('');
    const [restaurantReviewList, setRestaurantReviewList] = useState<RestaurantReviewListItem[]>([]);
    const [grade, setGrade] = useState<number>();
    const [restaurantImageCheck, setRestaurantImageCheck] = useState<boolean>(false);
    const [restaurantNameCheck, setRestaurantNameCheck] = useState<boolean>(false);
    const [restaurantFoodCategoryCheck, setRestaurantFoodCategoryCheck] = useState<boolean>(false);
    const [restaurantPostalCodeCheck, setRestaurantPostalCodeCheck] = useState<boolean>(false);
    const [restaurantLocationCheck, setRestaurantLocationCheck] = useState<boolean>(false);
    const [restaurantBusinessRegistrationNumberCheck, setRestaurantBusinessRegistrationNumberCheck] = useState<boolean>(false);
    const location = useLocation();


    const isRestUploadUpActive = restaurantImageCheck && restaurantNameCheck && restaurantFoodCategoryCheck && restaurantPostalCodeCheck && restaurantLocationCheck && restaurantBusinessRegistrationNumberCheck;
    const ButtonClass = `${isRestUploadUpActive ? 'primary' : 'disable'}-button full-width`;

    //                    function                    //
    const navigator = useNavigate();

    const GetRestaurantInfoResponse = (result: GetRestaurantInfoResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const { restaurantImage, restaurantName, restaurantFoodCategory,
            restaurantPostalCode, restaurantLocation, restaurantTelNumber,
            restaurantSnsAddress, restaurantOperationHours, restaurantFeatures,
            restaurantNotice, restaurantRepresentativeMenu, restaurantBusinessRegistrationNumber,
            restaurantWriterId, restaurantReviewList, restaurantId
        } = result as GetRestaurantInfoResponseDto;
        setRestaurantId(restaurantId);
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
        setRestaurantBusinessRegistrationNumber(restaurantBusinessRegistrationNumber);
        setRestaurantWriterId(restaurantWriterId);
        setRestaurantReviewList(restaurantReviewList);

    }



    const PostRestaurantInfoResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
                    result.code === 'AF' ? '권한이 없습니다.' :
                        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        restIdNumber = 1;
    }


    const PatchRestaurantInfoResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
                    result.code === 'NR' ? '존재하지 않는 식당입니다.' :
                        result.code === 'AF' ? '권한이 없습니다.' :
                            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        GetRestaurantInfoRequest(Number(restaurantId), cookies.accessToken)
            .then(GetRestaurantInfoResponse);
        restIdNumber = 1;
    }

    const DeleteReservationResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
                    result.code === 'NR' ? '존재하지 않는 식당입니다.' :
                        result.code === 'AF' ? '권한이 없습니다.' :
                            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        
        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        alert("예약이 취소되었습니다.");
        setReservationStatus(false);
    }


    const PostRestaurantFavoriteResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
                    result.code === 'NR' ? '존재하지 않는 식당입니다.' :
                        result.code === 'AF' ? '권한이 없습니다.' :
                            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        setFavoriteStatus(true);
    }


    const DeleteRestaurantFavoriteResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
                    result.code === 'NR' ? '존재하지 않는 식당입니다.' :
                        result.code === 'AF' ? '권한이 없습니다.' :
                            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        setFavoriteStatus(false);
    }

    const GetRestaurantFavoriteStatusResponse = (result: GetRestaurantFavoriteStatusResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
                    result.code === 'NR' ? '존재하지 않는 식당입니다.' :
                        result.code === 'AF' ? '권한이 없습니다.' :
                            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const { favoriteStatus } = result as GetRestaurantFavoriteStatusResponseDto;
        setFavoriteStatus(favoriteStatus);
    }


    //          effect              //
    useEffect(() => {
        if (!cookies.accessToken || Number(restaurantId) == 0) {
            return;
        }

        GetRestaurantInfoRequest(Number(restaurantId), cookies.accessToken)
            .then(GetRestaurantInfoResponse);
    }, [location]);



    useEffect(() => {
        if (!cookies.accessToken || restaurantId == undefined) {
            return;
        }

        const total = restaurantReviewList.reduce((sum, restaurantReviewList) => sum + restaurantReviewList.rating, 0);
        setGrade(total / restaurantReviewList.length);
    }, [location]);


    useEffect(() => {
        if (!cookies.accessToken || restaurantId == undefined) {
            return;
        }

        GetRestaurantFavoriteStatusRequest(RestaurantId,cookies.accessToken)
        .then(GetRestaurantFavoriteStatusResponse)
    }, [location]);

    //               constant                     //



    //                event handler               //
    // 식당 정보 등록
    const onUploadClickHandler = () => {

        if (!restaurantImage || !restaurantName || !restaurantFoodCategory
            || !restaurantPostalCode || !restaurantLocation || !restaurantBusinessRegistrationNumber) {
            alert('필수 정보를 입력하지 않았습니다.');
            return;
        }

        const requestBody: PostRestaurantInfoRequestDto =
        {
            restaurantImage: restaurantImage,
            restaurantName: restaurantName,
            restaurantFoodCategory: restaurantFoodCategory,
            restaurantPostalCode: restaurantPostalCode,
            restaurantLocation: restaurantLocation,
            restaurantBusinessRegistrationNumber: restaurantBusinessRegistrationNumber,
            restaurantTelNumber: restaurantTelNumber,
            restaurantSnsAddress: restaurantSnsAddress,
            restaurantOperationHours: restaurantOperationHours,
            restaurantFeatures: restaurantFeatures,
            restaurantNotice: restaurantNotice,
            restaurantRepresentativeMenu: restaurantRepresentativeMenu,
        }
        PostRestaurantInfoRequest(requestBody, cookies.accessToken)
            .then(PostRestaurantInfoResponse);
    }

    // 식당 정보 수정
    const onUpdateClickHandler = () => {

        if (!restaurantImage || !restaurantName || !restaurantFoodCategory
            || !restaurantPostalCode || !restaurantLocation || !restaurantId) {
            alert('필수 정보를 입력하지 않았습니다.');
            return;
        }

        const requestBody: PatchRestaurantInfoRequestDto =
        {
            restaurantId: Number(restaurantId),
            restaurantImage: restaurantImage,
            restaurantName: restaurantName,
            restaurantFoodCategory: restaurantFoodCategory,
            restaurantPostalCode: restaurantPostalCode,
            restaurantLocation: restaurantLocation,
            restaurantTelNumber: restaurantTelNumber,
            restaurantSnsAddress: restaurantSnsAddress,
            restaurantOperationHours: restaurantOperationHours,
            restaurantFeatures: restaurantFeatures,
            restaurantNotice: restaurantNotice,
            restaurantRepresentativeMenu: restaurantRepresentativeMenu,
        }
        PatchRestaurantInfoRequest(requestBody, cookies.accessToken)
            .then(PatchRestaurantInfoResponse);
    }


    const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantImage(value);
        setRestaurantImageCheck(!(value.length === 0));
    }


    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantName(value);
        setRestaurantNameCheck(!(value.length === 0));
    }

    const onFoodCategoryChangeHandler = (selectFood: string) => {
        setRestaurantFoodCategory(selectFood);
        setRestaurantFoodCategoryCheck(!(selectFood.length === 0));
    };

    const onPostalCodeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantPostalCode(value);
        setRestaurantPostalCodeCheck(!(value.length === 0));
    }

    const onLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantLocation(value);
        setRestaurantLocationCheck(!(value.length === 0));
    }

    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantTelNumber(value);
    }

    const onSnsLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantSnsAddress(value);
    }

    const onOperationHoursChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantOperationHours(value);
    }


    const onFeaturesChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantFeatures(value);
    }

    const onNoticeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantNotice(value);
    }

    const onRepresentativeMenuChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantRepresentativeMenu(value);
    }

    const onBusinessNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantBusinessRegistrationNumber(value);
        setRestaurantBusinessRegistrationNumberCheck(!(value.length === 0));
    }

    const onSetRestIdNumberHandler = () => {
        restIdNumber = 0;
    }

    const onBusinessNumberKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        {
            restaurantWriterId ?
                onUpdateClickHandler() : onUploadClickHandler()
        };
    };

    const onReservationClickHandler = () => {
        navigator(RESTAURANT_DO_RESERVATION_ABSOLUTE_PATH);
    };

const onReservationCancelClickHandler = () => 
{
    const confirmed = window.confirm("정말로 취소하시겠습니까?");
    if (confirmed) 
    {
        DeleteReservationRequest(RestaurantId,cookies.accessToken)
        .then(DeleteReservationResponse)
    } 
    else 
    {
        return;
    }
};

const onFavoriteClickHandler = () => {
    if(!loginUserEmailId || !RestaurantId || !cookies.accessToken) return;

    PostRestaurantFavoriteRequest(RestaurantId,cookies.accessToken)
    .then(PostRestaurantFavoriteResponse)
}


const onCancleFavoriteClickHandler = () => {
    if(!loginUserEmailId || !RestaurantId || !cookies.accessToken) return;

    DeleteRestaurantFavoriteRequest(RestaurantId,cookies.accessToken)
    .then(DeleteRestaurantFavoriteResponse)
}

  //            render              //
  return (
    
    <>
        {restIdNumber ? (
            <div id="restaurant-info">
                    {loginUserRole === "ROLE_CEO" && loginUserEmailId === restaurantWriterId && (
                    <button onClick={onSetRestIdNumberHandler}>수정</button>)}
                    <div id="restaurant_image">{restaurantImage}</div>
                        <div>
                            <div>{restaurantName}</div>
                        ({loginUserRole === "ROLE_USER" && reservationStatus &&(
                            <button onClick={onReservationCancelClickHandler}>예약취소</button>)})
                            
                        ({loginUserRole === "ROLE_USER" && !reservationStatus && (
                            <button onClick={onReservationClickHandler}>예약</button>)})
                           
                        </div>
                    <div>{restaurantFoodCategory}</div>
                    <div>{grade}</div>
                    {loginUserRole === "ROLE_USER" && favoriteStatus ?
                    (<button onClick={onCancleFavoriteClickHandler}>찜클릭해제</button>) : 
                    (<button onClick={onFavoriteClickHandler}>찜클릭</button>)
                    }
                    
                    <div>{restaurantLocation}</div>
                    <div>{restaurantSnsAddress}</div>
                    <div>{restaurantPostalCode}</div>
                    <div>{restaurantTelNumber}</div>
                    
                    <div>{restaurantOperationHours}</div>
                    <div>{restaurantFeatures}</div>
                    <div>{restaurantNotice}</div>
                    <div>{restaurantRepresentativeMenu}</div>
                    {loginUserRole === "ROLE_CEO" && loginUserEmailId === restaurantWriterId && 
                    (<div>{restaurantBusinessRegistrationNumber}</div>)}
                    
                    <ReviewList value={restaurantReviewList}/>   
            </div>
            ) : (
                <div id="restaurant-info">
                    <div id="restaurant-left">
                        <div id="restaurant-left-up">
                            <RestInputBox label="식당 이미지" type="file" value={restaurantImage}  accept={'image/*'}
                            placeholder="이미지를 삽입해주세요" onChangeHandler={onImageChangeHandler}/>
                                <div>
                                    <RestInputBox label="식당 이름" type="text" value={restaurantName}
                                    placeholder="이름을 입력해주세요" onChangeHandler={onNameChangeHandler}/>
                                </div>
                            <div>  
                                <SelectBox value={restaurantFoodCategory} onChange={onFoodCategoryChangeHandler} />
                            </div>
                        </div> 
    
                        <div id="restaurant-left-down">
                            <RestInputBox label="식당 주소" type="text" value={restaurantLocation}
                            placeholder="주소를 입력해주세요" onChangeHandler={onLocationChangeHandler}/>

                            <RestInputBox label="식당 SNS 주소" type="text" value={restaurantSnsAddress}
                            placeholder="주소를 입력해주세요" onChangeHandler={onSnsLocationChangeHandler}/>

                            <RestInputBox label="식당 우편번호" type="text" value={restaurantPostalCode}
                            placeholder="우편번호를 입력해주세요" onChangeHandler={onPostalCodeChangeHandler}/>

                            <RestInputBox label="식당 연락쳐" type="text" value={restaurantTelNumber}
                            placeholder="연락쳐를 입력해주세요" onChangeHandler={onTelNumberChangeHandler}/>
                        </div>
                    </div>
    
                    <div id="restaurant-right"> 
                        <div id="restaurant-right-up">  
                            <RestInputBox label="운영 시간" type="text" value={restaurantOperationHours}
                            placeholder="운영시간을 입력해주세요" onChangeHandler={onOperationHoursChangeHandler}/> 

                            <RestInputBox label="식당 특징" type="text" value={restaurantFeatures}
                            placeholder="특징을 입력해주세요" onChangeHandler={onFeaturesChangeHandler}/>     
        
                            <RestInputBox label="식당 공지" type="text" value={restaurantNotice}
                            placeholder="공지를 입력해주세요" onChangeHandler={onNoticeChangeHandler}/>

                            <RestInputBox label="대표메뉴" type="text" value={restaurantRepresentativeMenu}
                            placeholder="대표메뉴를 입력해주세요" onChangeHandler={onRepresentativeMenuChangeHandler}/>
                            
                            <RestInputBox label="사업자 등록번호" type="text" value={restaurantBusinessRegistrationNumber}
                            placeholder="사업자 등록번호를 입력해주세요" onChangeHandler={onBusinessNumberChangeHandler}
                            onKeydownHandler={onBusinessNumberKeydownHandler}/>

                            {restaurantWriterId ?
                              <button onClick={onUpdateClickHandler}
                              className={ButtonClass}>수정하기</button> : 
                              <button onClick={onUploadClickHandler}
                              className={ButtonClass}>등록하기</button>}
                        </div>           
                    </div>
                </div>
                )
            }
    </>
  )
}
