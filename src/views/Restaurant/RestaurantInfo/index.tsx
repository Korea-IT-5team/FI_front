import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetRestaurantInfoRequest } from 'src/apis/restaurant';
import { GetRestaurantInfoResponseDto } from 'src/apis/restaurant/dto/response';



import { DeleteRestaurantFavoriteRequest, GetRestaurantFavoriteStatusRequest, PostRestaurantFavoriteRequest } from 'src/apis/restaurant/favorite';
import { GetRestaurantFavoriteStatusResponseDto } from 'src/apis/restaurant/favorite/dto/response';
import { DeleteReservationRequest } from 'src/apis/restaurant/reservation';

import { RESTAURANT_DO_RESERVATION_ABSOLUTE_PATH } from 'src/constant';

import { useUserStore } from 'src/stores';
import { RestaurantReviewListItem } from 'src/types';
import ReviewList from '../Review/ReviewList';
import './style.css';

import { RESTAURANT_INFO_UPDATE_ABSOLUTE_PATH } from 'src/constant';

//              interface                   //


//            component : 특정 식당 정보                 //
export default function RestaurantInfo() {

    //            state               //
    const { loginUserEmailId, loginUserRole, reservationStatus, favoriteStatus, setReservationStatus, setFavoriteStatus } = useUserStore();
    const [cookies] = useCookies();
    const { restaurantId } = useParams();
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
    const location = useLocation();

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
            restaurantWriterId, restaurantReviewList
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
        setRestaurantBusinessRegistrationNumber(restaurantBusinessRegistrationNumber);
        setRestaurantWriterId(restaurantWriterId);
        setRestaurantReviewList(restaurantReviewList);
    }

    const DeleteReservationCancelResponse = (result: ResponseDto | null) => {
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
        if (!cookies.accessToken || !restaurantId) {
            return;
        }

        GetRestaurantInfoRequest(restaurantId, cookies.accessToken)
            .then(GetRestaurantInfoResponse);
    }, [location]);



    useEffect(() => {
        if (!cookies.accessToken || !restaurantId) {
            return;
        }

        const total = restaurantReviewList.reduce((sum, restaurantReviewList) => sum + restaurantReviewList.rating, 0);
        setGrade(total / restaurantReviewList.length);
    }, [location]);


    useEffect(() => {
        if (!cookies.accessToken || !restaurantId) {
            return;
        }

        GetRestaurantFavoriteStatusRequest(restaurantId,cookies.accessToken)
        .then(GetRestaurantFavoriteStatusResponse)
    }, [location]);

    //               constant                     //



    //                event handler               //

    const onSetRestIdNumberHandler = () => {
        if(!restaurantId) return;
        navigator(RESTAURANT_INFO_UPDATE_ABSOLUTE_PATH(restaurantId))
    }

    const onReservationClickHandler = () => {

        if(!restaurantId) return;
        navigator(RESTAURANT_DO_RESERVATION_ABSOLUTE_PATH(restaurantId));

        // navigator(RESTAURANT_DO_RESERVATION_ABSOLUTE_PATH);

    };


const onReservationCancelClickHandler = () => 
{
    const confirmed = window.confirm("정말로 취소하시겠습니까?");
    if (confirmed) 
    {

        if(!restaurantId) return;
        DeleteReservationRequest(restaurantId,cookies.accessToken)
        .then(DeleteReservationCancelResponse)


    } 
    else 
    {
        return;
    }
};

   

const onFavoriteClickHandler = () => {
    if(!loginUserEmailId || !restaurantId || !cookies.accessToken) return;

    PostRestaurantFavoriteRequest(restaurantId,cookies.accessToken)
    .then(PostRestaurantFavoriteResponse)
}


const onCancleFavoriteClickHandler = () => {
    if(!loginUserEmailId || !restaurantId || !cookies.accessToken) return;

    DeleteRestaurantFavoriteRequest(restaurantId,cookies.accessToken)
    .then(DeleteRestaurantFavoriteResponse)
}

  //            render              //
 

    //            render              //
    return (

        <>
             
             <div id="restaurant-info">

                    {loginUserRole === "ROLE_CEO" && loginUserEmailId === restaurantWriterId && (
                        <button onClick={onSetRestIdNumberHandler}>수정</button>)}
                    <div id="restaurant_image">{restaurantImage}</div>
                    <div>
                        <div>{restaurantName}</div>
                        ({loginUserRole === "ROLE_USER" && reservationStatus && (
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

                    <ReviewList value={restaurantReviewList} restaurantId={restaurantId}/>   
            </div>   
        </>
  )
}