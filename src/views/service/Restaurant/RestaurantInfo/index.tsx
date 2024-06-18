import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { DeleteRestaurantInfoRequest, GetRestaurantInfoRequest } from 'src/apis/restaurant';
import { GetRestaurantInfoResponseDto } from 'src/apis/restaurant/dto/response';
import { DeleteRestaurantFavoriteRequest, GetFavoriteCheckStatusRequest, PostRestaurantFavoriteRequest } from 'src/apis/restaurant/favorite';
import { GetFavoriteCheckResponseDto } from 'src/apis/restaurant/favorite/dto/response';
import { DeleteReservationRequest, GetReservationCheckStatusRequest } from 'src/apis/restaurant/reservation';
import { GetReservationCheckResponseDto } from 'src/apis/restaurant/reservation/dto/response';
import { RESTAURANT_DO_RESERVATION_ABSOLUTE_PATH, RESTAURANT_INFO_UPDATE_ABSOLUTE_PATH, RESTAURANT_LIST_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { RestaurantReviewListItem } from 'src/types';
import ReviewList from '../Review/ReviewList';
import './style.css';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

// component : 특정 식당 정보 //
export default function RestaurantInfo() {
    useKakaoLoader({
        appkey: "1121641ff4fa6668d61874ed79c1709e",
        libraries: ["clusterer", "drawing", "services"],
    })

    // state //
    const { loginUserEmailId, loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const { restaurantId } = useParams();
    const [restaurantImage, setRestaurantImage] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantFoodCategory, setRestaurantFoodCategory] = useState('');
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
    const [favoriteUserId, setFavoriteUserId] = useState<string>("");
    const [favoriteRestaurantId, setFavoriteRestaurantId] = useState<number>();
    const [reservationUserId, setReservationUserId] = useState<String>("");
    const [reservationRestaurantId, setReservationRestaurantId] = useState<number>();
    const [grade, setGrade] = useState<number>();
    const [center, setCenter] = useState<{
        lat: number
        lng: number
    }>()

    // function //
    const navigation = useNavigate();

    const GetRestaurantInfoResponse = (result: GetRestaurantInfoResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            //alert(message);
            return;
        }

        const { restaurantImage, restaurantName, restaurantFoodCategory,
            restaurantLocation, restaurantTelNumber,
            restaurantSnsAddress, restaurantOperationHours, restaurantFeatures,
            restaurantNotice, restaurantRepresentativeMenu, restaurantBusinessRegistrationNumber,
            restaurantWriterId, restaurantReviewList, restaurantLat, restaurantLng
        } = result as GetRestaurantInfoResponseDto;
        setRestaurantImage(restaurantImage);
        setRestaurantName(restaurantName);
        setRestaurantFoodCategory(restaurantFoodCategory);
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
        setCenter({
            lat: restaurantLat,
            lng: restaurantLng,
        });
    }
    
    const DeleteReservationResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
                    result.code === 'NR' ? '존재하지 않는 식당입니다.' :
                        result.code === 'NU' ? '존재하지 않는 사용자입니다.' :
                            result.code === 'AF' ? '권한이 없습니다.' :
                                result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        alert("예약이 취소되었습니다.");
        setReservationUserId("");
        setReservationRestaurantId(undefined);
    }
    
    const PostRestaurantFavoriteResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
                    result.code === 'NR' ? '존재하지 않는 식당입니다.' :
                        result.code === 'AF' ? '권한이 없습니다.' :
                            result.code === 'NU' ? '존재하지 않는 사용자입니다.' :
                                result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!restaurantId) return;
        GetFavoriteCheckStatusRequest(restaurantId,cookies.accessToken)
            .then(GetFavoriteCheckStatusResponse);
    }
   
    const DeleteRestaurantFavoriteResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
                    result.code === 'NR' ? '존재하지 않는 식당입니다.' :
                        result.code === 'AF' ? '권한이 없습니다.' :
                            result.code === 'NU' ? '존재하지 않는 사용자입니다.' :
                                result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        setFavoriteUserId("");
        setFavoriteRestaurantId(undefined);
        
    }
    
    const GetFavoriteCheckStatusResponse = (result: GetFavoriteCheckResponseDto | ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'AF' ? '인증에 실패했습니다.' :
                    result.code === 'DBE' ? '서버에 문제가 있습니다.':
                        result.code === 'NU'? '존재하지 않는 사용자입니다.': '';
    
        if (!result || result.code !== 'SU') 
        {
            if(!result || result.code !== 'NU')
            {
                // alert(message);
            }

            return;
        }

        const {  favoriteUserId, favoriteRestaurantId } = result as GetFavoriteCheckResponseDto;
        setFavoriteUserId(favoriteUserId);
        setFavoriteRestaurantId(favoriteRestaurantId);
    };
   
    const GetReservationCheckStatusResponse = (result: GetReservationCheckResponseDto | ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'AF' ? '인증에 실패했습니다.' :
                    result.code === 'DBE' ? '서버에 문제가 있습니다.':
                        result.code === 'NU'? '존재하지 않는 사용자입니다.': '';
    
        if (!result || result.code !== 'SU') 
        {
            if(!result || result.code !== 'NU')
            {
                alert(message);
            }

            return;
        }
    
        const { reservationUserId,reservationRestaurantId } = result as GetReservationCheckResponseDto
        setReservationUserId(reservationUserId);
        setReservationRestaurantId(reservationRestaurantId);
    };

    const DeleteRestaurantInfoResponse = (result: ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'AF' ? '인증에 실패했습니다.' :
                    result.code === 'DBE' ? '서버에 문제가 있습니다.' :
                        result.code === 'NU' ? '존재하지 않는 사용자입니다.' :
                            result.code === 'NR' ?  '존재하지 않는 식당입니다.' : '';
        
        if (!result || result.code !== 'SU') 
        {
            if(!result || result.code !== 'NU')
            {
                alert(message);
            }
            return;
        }

        alert("삭제되었습니다.");
        navigation(RESTAURANT_LIST_ABSOLUTE_PATH);
    }
    
    // effect //
    useEffect(() => {
        if (!restaurantId) {
            return;
        }

        GetRestaurantInfoRequest(restaurantId, cookies.accessToken)
            .then(GetRestaurantInfoResponse);
    }, []);
   
    useEffect(() => {
        if (!restaurantId) {
            return;
        }

        const total = restaurantReviewList.reduce((sum, restaurantReviewList) => sum + restaurantReviewList.rating, 0);
        const average = total / restaurantReviewList.length;
        setGrade(parseFloat(average.toFixed(1)));
    }, [restaurantReviewList]);
    
    let effectFlag = false;
    useEffect(() => {
    if (!restaurantId) {
            return;
    }
    if(effectFlag) return;
    effectFlag = true;


    if(!cookies.accessToken) return;
    GetFavoriteCheckStatusRequest(restaurantId,cookies.accessToken)
        .then(GetFavoriteCheckStatusResponse);
    GetReservationCheckStatusRequest(restaurantId,cookies.accessToken)
        .then(GetReservationCheckStatusResponse)
    }, []);

    
    // event handler //

    const onSetRestIdNumberHandler = () => {
        if(!restaurantId) return;
        navigation(RESTAURANT_INFO_UPDATE_ABSOLUTE_PATH(restaurantId))
    }

    const onDeleteRestIdNumberHandler = () => {
        if(!restaurantId) return;
        
        const confirmed = window.confirm("정말로 삭제하시겠습니까? 삭제하면 식당의 모든 내역이 사라집니다.");
        if (confirmed) 
        {
            DeleteRestaurantInfoRequest(restaurantId, cookies.accessToken)
                .then(DeleteRestaurantInfoResponse);
        }
        else
        {
            return;
        }
    }

    const onReservationClickHandler = () => {

        if(!restaurantId) return;
        navigation(RESTAURANT_DO_RESERVATION_ABSOLUTE_PATH(restaurantId));
    };

    const onReservationCancelClickHandler = () => 
    {
        const confirmed = window.confirm("정말로 취소하시겠습니까?");
        if (confirmed) 
        {
            if(!restaurantId) return;
            DeleteReservationRequest(restaurantId,cookies.accessToken)
                .then(DeleteReservationResponse)
        } 
        else 
        {
            return;
        }
    };

    const onFavoriteClickHandler = () => {
        if(!loginUserEmailId || !restaurantId || !cookies.accessToken) return;

        PostRestaurantFavoriteRequest(restaurantId, cookies.accessToken)
            .then(PostRestaurantFavoriteResponse)
    }

    const onCancleFavoriteClickHandler = () => {
        if(!loginUserEmailId || !restaurantId || !cookies.accessToken) return;

        DeleteRestaurantFavoriteRequest(restaurantId,cookies.accessToken)
            .then(DeleteRestaurantFavoriteResponse)
    }

    // render //
    return (
        <>
            <div id="restaurant-info">
                {loginUserRole === "ROLE_CEO" && loginUserEmailId === restaurantWriterId && (
                    <button onClick={onSetRestIdNumberHandler}>수정</button>)}
                {loginUserRole === "ROLE_CEO" && loginUserEmailId === restaurantWriterId && (
                    <button onClick={onDeleteRestIdNumberHandler}>삭제</button>)}
                <img src={restaurantImage} className='' />
                <div className='restaurant-info-top'>
                    <div className='restaurant-name'>식당 이름 :{restaurantName}</div>
                    <div className='restaurant-divider'>{'\|'}</div>
                    {loginUserRole === "ROLE_USER" &&
                        (loginUserEmailId === reservationUserId && Number(restaurantId) === reservationRestaurantId ?
                            (<button onClick={onReservationCancelClickHandler}>예약취소</button>) :
                            (<button onClick={onReservationClickHandler}>예약</button>)
                        )}
                    <div>주음식 : {restaurantFoodCategory}</div>
                </div>

                {grade ? (<div>평점 : {grade}</div>) : (<div></div>)}
                {loginUserRole === "ROLE_USER" &&
                    (loginUserEmailId === favoriteUserId && Number(restaurantId) === favoriteRestaurantId ?
                        (<button onClick={onCancleFavoriteClickHandler}>찜클릭해제</button>) :
                        (<button onClick={onFavoriteClickHandler}>찜클릭</button>)
                    )}
                {center && <div className='restaurant-info-icon-box'>
                    <div className='restaurant-info-icon location'></div>
                    <div className='restaurant-information'>위치 : {restaurantLocation}</div>
                    <Map // 지도를 표시할 Container
                        id="map"
                        center={center}
                        style={{
                            // 지도의 크기
                            width: "100%",
                            height: "350px",
                        }}
                        level={3} // 지도의 확대 레벨
                        >
                            <MapMarker position={center} />
                        </Map>
                </div>}

                <div className='restaurant-info-icon-box'>
                    <div className='restaurant-info-icon sns'></div>
                    <div>SNS : {restaurantSnsAddress}</div>
                </div>

                <div className='restaurant-info-icon-box'>
                    <div className='restaurant-info-icon telnumber'></div>
                    <div>전화번호 : {restaurantTelNumber}</div>
                </div>

                <div className='restaurant-info-icon-box'>
                    <div className='restaurant-info-icon time'></div>
                    {restaurantOperationHours && <div>운영시간 : {restaurantOperationHours}</div>}
                </div>

                <div className='restaurant-info-icon-box'>
                    <div className='restaurant-info-icon menu'></div>
                    {restaurantRepresentativeMenu && <div>대표메뉴 : {restaurantRepresentativeMenu}</div>}
                </div>

                <div className='restaurant-info-icon-box'>
                    <div className='restaurant-info-icon feature'></div>
                    {restaurantFeatures && <div>특징 : {restaurantFeatures}</div>}
                </div>

                <div className='restaurant-info-icon-box'>
                    <div className='restaurant-info-icon notice'></div>
                    {restaurantNotice && <div>공지사항 : {restaurantNotice}</div>}
                </div>
                
                <ReviewList value={restaurantReviewList} restaurantId={restaurantId} />
            </div>
        </>
    )
}