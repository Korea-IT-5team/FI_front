import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetRestaurantListRequest } from 'src/apis/restaurant';
import { GetRestaurantListResponseDto } from 'src/apis/restaurant/dto/response';
import { RESTAURANT_INFO_ABSOLUTE_PATH, RESTAURANT_INFO_WRITE_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { RestaurantListItem } from 'src/types';
import './style.css';

// component : 식당 리스트 //
export default function RestaurantList()
{

  // state //
  const [cookies] = useCookies();
  const [searchWord, setSearchWord] = useState<string>('');
  const [restaurantList, SetRestaurantList] = useState<RestaurantListItem[]>([]);
  const {loginUserRole } = useUserStore();
  const [displayCount, setDisplayCount] = useState<number>(8); // 한 번에 보여줄 식당 목록 개수
  

  // function //
  const navigation = useNavigate();

  const GetRestaurantListResponse = (result: GetRestaurantListResponseDto | ResponseDto | null) => 
  {
      const message =
          !result ? '서버에 문제가 있습니다.' :
              result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

  
      if (!result || result.code !== 'SU') 
      {
          //alert(message);
          return;
      }
  
      const { restaurantList } = result as GetRestaurantListResponseDto;
      SetRestaurantList(restaurantList);
  };

  // event handler //
  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
  {
      const searchWord = event.target.value;
      setSearchWord(searchWord);
  };

  const onSearchClickHandler = () =>
  {
      if (!searchWord) return;

      GetRestaurantListRequest(searchWord, cookies.accessToken)
      .then(GetRestaurantListResponse);
  };

  const onRegistrationClickHandler = () =>
  {     
      if (!cookies.accessToken) return;
      navigation(RESTAURANT_INFO_WRITE_ABSOLUTE_PATH);
  };  

  const onItemClickHandler = (item: number) =>
  {     
      navigation(RESTAURANT_INFO_ABSOLUTE_PATH(item));
  };  


  // 더보기 버튼 클릭 핸들러 //
  const onLoadMoreClickHandler = () => {
      setDisplayCount(prevCount => prevCount + 8); // 현재 보여주고 있는 개수에 8개를 더함
  };

  // effect //
  let effectFlag1 = false;
  useEffect(() => {
  if(effectFlag1) return;
  effectFlag1 = true; 

 
  GetRestaurantListRequest(searchWord, cookies.accessToken)
      .then(GetRestaurantListResponse);
  }, []);
  
  // render //
  const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';
  return(
    <>
      <div className="restaurant-list-side-navigation-container">
          <div className='restaurant-list-search-input-click'>
              <input className="restaurant-list-search-input" placeholder='오늘의 맛집은?' value={searchWord} onChange={onSearchWordChangeHandler}></input>
              <div className={searchButtonClass} onClick={onSearchClickHandler}>검색</div>
          </div>
          {loginUserRole === 'ROLE_CEO' && <div className="restaurant-list-registration-button" onClick={onRegistrationClickHandler}>등록하기</div>}
      </div>

      <div className="restaurant-list">
            {!restaurantList || restaurantList.length === 0 ? 
            ( <div className="restaurant-list-select-item">해당하는 식당 정보가 없습니다.</div> ) : 
            (
              restaurantList.slice(0, displayCount).map((item) => (
              <div className='restaurant-list-select-list-item-box' onClick={() => onItemClickHandler(item.restaurantId)}>
                  <img src={item.restaurantImage} className='restaurant-list-select-item' />
                  <div className='restaurant-list-select-item'>{item.restaurantName}</div>
                  <div className='restaurant-list-select-item'>{item.restaurantFoodCategory}</div>
                  <div className='restaurant-list-select-item'>{item.restaurantLocation}</div>
              </div>
            )))
          }
      </div>
      {/* 더보기 버튼 추가 */}
      {restaurantList.length > displayCount && (
        <div className="load-more-button" onClick={onLoadMoreClickHandler}>더보기</div>
      )}
    </>
  );  
}