import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetRestaurantListRequest } from 'src/apis/restaurant';
import { GetRestaurantListResponseDto } from 'src/apis/restaurant/dto/response';
import { RESTAURANT_INFO_ABSOLUTE_PATH, RESTAURANT_INFO_WRITE_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { RestaurantListItem } from 'src/types';
import './style.css';

//              component : 식당 리스트             //
export default function RestaurantList()
{

  //            state               //
  const [cookies] = useCookies();
  const [searchWord, setSearchWord] = useState<string>('');
  const [restaurantList, SetRestaurantList] = useState<RestaurantListItem[]>([]);
  const {loginUserRole } = useUserStore();
  

  //                    function                    //
  const navigator = useNavigate();

  const GetRestaurantListResponse = (result: GetRestaurantListResponseDto | ResponseDto | null) => 
  {
      const message =
          !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' : // 지워야함
              result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

  
      if (!result || result.code !== 'SU') 
      {
          //alert(message);
          return;
      }
  
      const { restaurantList } = result as GetRestaurantListResponseDto;
      SetRestaurantList(restaurantList);
  };



  //                event handler                   //
  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
  {
      const searchWord = event.target.value;
      setSearchWord(searchWord);
  };

  const onSearchClickHandler = () =>
  {
      if (!searchWord) return;
      if (!cookies.accessToken) return;

      GetRestaurantListRequest(searchWord, cookies.accessToken)
      .then(GetRestaurantListResponse);
  };

  const onRegistrationClickHandler = () =>
  {     
      if (!cookies.accessToken) return;
      navigator(RESTAURANT_INFO_WRITE_ABSOLUTE_PATH);
  };  

  const onItemClickHandler = (item: number) =>
  {     
      if (!cookies.accessToken) return;
      navigator(RESTAURANT_INFO_ABSOLUTE_PATH(item));
  };  


  
  //          effect              //

  let effectFlag1 = false;
  useEffect(() => {
    if(effectFlag1) return;
    effectFlag1 = true;  
    if (!cookies.accessToken) 
    {
      return;
    }
    
    GetRestaurantListRequest(searchWord, cookies.accessToken)
      .then(GetRestaurantListResponse);
  }, []);

  //                  render                  //
  const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';
  return(
    <>
      <div className="restaurantlist-side-navigation-container">
          <div className='restaurantlist-search-input-click'>
              <input className="restaurantlist-search-input" placeholder='오늘의 맛집은?' value={searchWord} onChange={onSearchWordChangeHandler}></input>
              <div className={searchButtonClass} onClick={onSearchClickHandler}>검색</div>
          </div>
          {loginUserRole === 'ROLE_CEO' && <div className="restaurantlist-registration-button" onClick={onRegistrationClickHandler}>등록하기</div>}
      </div>
      <div className="restaurant-list">
            {!restaurantList || restaurantList.length === 0 ? 
            ( <div className="restaurantlist-select-item">해당하는 식당 정보가 없습니다.</div> ) 
                                                  : 
            (
              restaurantList.slice(0, 12).map((item) => (
              <div className='restaurantlist-select-list-item-box' onClick={() => onItemClickHandler(item.restaurantId)}>
                  <div className='restaurantlist-select-item'>{item.restaurantImage}</div>
                  <div className='restaurantlist-select-item'>{item.restaurantName}</div>
              </div>
            )))
          }
      </div>
    </>
  );  
  
}
//수정