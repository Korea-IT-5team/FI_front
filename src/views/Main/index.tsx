import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetRestaurantListRequest } from 'src/apis/restaurant';
import { GetRestaurantListResponseDto } from 'src/apis/restaurant/dto/response';
import { getSignInUserRequest } from 'src/apis/user';
import { GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import restaurantDefault from 'src/assets/image/restaurant-default.png';
import { MAIN_ABSOLUTE_PATH, RESTAURANT_INFO_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { RestaurantListItem } from 'src/types';
import "./style.css";

// component //
export default function Main() {

  // state //
  const { setLoginUserEmailId, setLoginUserRole } = useUserStore(); 
  const [cookies] = useCookies();
  const [searchWord] = useState<string>('');
  const [restaurantList, SetRestaurantList] = useState<RestaurantListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(restaurantList.length / itemsPerPage);
  const [curSlide, setCurSlide] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  // function // 
  const navigation = useNavigate();

  const getSignInUserResponse = (result: GetUserInfoResponseDto | ResponseDto | null) => {
    const message = 
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      navigation(SIGN_IN_ABSOLUTE_PATH);
      return;
    }

    const { userEmailId, userRole } = result as GetUserInfoResponseDto;
    setLoginUserEmailId(userEmailId);
    setLoginUserRole(userRole);
  };

  const GetRestaurantListResponse = (result: GetRestaurantListResponseDto | ResponseDto | null) => {
    const message =
        !result ? '서버에 문제가 있습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
        return;
    }

    const { restaurantList } = result as GetRestaurantListResponseDto;
    restaurantList.sort(() => Math.random() - 0.5);
    SetRestaurantList(restaurantList);
  };

  const handleNextPage = () => {
    if(currentPage==4 || currentPage == totalPages-1) return;
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if(!currentPage) return;
    setCurrentPage(currentPage - 1);
  };
  const trainCompartment = ['','','','',''];

  const FIRST_SLIDE_INDEX = 0; 
  const LAST_SLIDE_INDEX = trainCompartment.length - 1; 
  const MOVE_SLIDE_INDEX = 1;

  const moveToSlide = (value: string) => {
    if (value === 'next') {
      setCurSlide((prevState) =>
        prevState < LAST_SLIDE_INDEX
          ? prevState + MOVE_SLIDE_INDEX
          : FIRST_SLIDE_INDEX
      );
    }
    if (value === 'prev') {
      setCurSlide((prevState) =>
        prevState > FIRST_SLIDE_INDEX
          ? prevState - MOVE_SLIDE_INDEX
          : LAST_SLIDE_INDEX
      );
    }
  };

  const autoMoveSlide = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }

  const id = setInterval(() => {
      setCurSlide((prevState) =>
        prevState < LAST_SLIDE_INDEX
          ? prevState + MOVE_SLIDE_INDEX
          : FIRST_SLIDE_INDEX
      );
    }, 3000)
  };

  // event handler //
  const onItemClickHandler = (item: number) => {
    navigation(RESTAURANT_INFO_ABSOLUTE_PATH(item));
  };

  // effect //
  useEffect(() => {
    if (!cookies.accessToken) {
      navigation(MAIN_ABSOLUTE_PATH);
      return;
    }

    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  }, [cookies.accessToken]);
  
  let effectFlag1 = false;

  useEffect(() => {
    if(effectFlag1) return;
    effectFlag1 = true; 

    GetRestaurantListRequest(searchWord, cookies.accessToken)
        .then(GetRestaurantListResponse);
  }, []);

  useState(() => {
    autoMoveSlide();
  },);

// render //
  return (
    <div id="main-wrapper">
      <div className='main-container'>
        <div className='main-banner' >
          <div className='main-show'>
            {trainCompartment.map((item, index) => (
              <div
                className='compartment'
                key={index}
                style={{
                  transform: `translateX(${-100 * curSlide}%)`,
                  transition: 'all 0.7s ease-in-out'}}>
              </div>
            ))}
          </div>
        </div>
        <div id='main-restaurant-list-wrapper'>
          <div className="pagination-left-arrow" onClick={handlePrevPage}></div>
            {!restaurantList || restaurantList.length === 0 ?
            (<div className='restaurant-list-no-item'>해당하는 식당이 없습니다.</div>) : 
            (<div className='restaurant-list-box'>
            {restaurantList.slice(startIndex, endIndex).map((item) => (
                <div
                key={item.restaurantId}
                className="restaurant-list-item-box"
                onClick={() => onItemClickHandler(item.restaurantId)}>
                <img src={item.restaurantImage ? item.restaurantImage : restaurantDefault} className="restaurant-list-item" alt="restaurant" />
                <div className="restaurant-list-item-top-box">
                  <div className="restaurant-list-item name">{item.restaurantName}</div>
                  <div className="restaurant-list-item category">{item.restaurantFoodCategory}</div>
                </div>
                <div className="restaurant-list-item location">{item.restaurantLocation}</div>
              </div>
            ))}
            </div>)}
          <div className="pagination-right-arrow" onClick={handleNextPage}></div>
        </div>
      </div>
    </div>
  );
}
