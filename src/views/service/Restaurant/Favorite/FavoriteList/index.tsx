import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetFavoriteRestaurantListRequest } from 'src/apis/restaurant/favorite';
import { GetFavoriteRestaurantListResponseDto } from 'src/apis/restaurant/favorite/dto/response';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_ABSOLUTE_PATH, RESTAURANT_INFO_ABSOLUTE_PATH } from 'src/constant';
import { RestaurantListItem } from 'src/types';
import './style.css';

//                    component                    //
function ListItem ({ 
    restaurantId,
    restaurantImage,
    restaurantName,
    restaurantFoodCategory,
    restaurantLocation,
}: RestaurantListItem) {

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //
    const onClickHandler = () => navigator(RESTAURANT_INFO_ABSOLUTE_PATH(restaurantId));  
      

    //                    render                    //
    return (
        <div className='favorite-list-table-tr' onClick={onClickHandler}>
          <div>
            <div className='favorite-list-table-restaurant-name'>{restaurantImage}</div>
            <div className='favorite-list-table-user-name'>{restaurantName}</div>
          </div>
          <div className='favorite-list-table-status'>
              <div className='disable-bedge'>상태</div>
              <div className='disable-bedge'></div>
          </div>
          <div>
            <div className='favorite-list-reservation-date'>음식 종류 : {restaurantFoodCategory}</div>
            <div className='favorite-list-reservation-time'>식당 위치 : {restaurantLocation}</div>
          </div>

          <div className='favorite-list-table-title' style={{ textAlign: 'left' }}>{5}</div>
          <div className='favorite-list-table-writer-id'>{2}</div>
          <div className='favorite-list-table-write-date'>{3}</div>
          <div className='favorite-list-table-viewcount'>{4}</div>
        </div>
    );
}

//                    component                    //
export default function FavoriteList() {

    //                    state                    //
    const [cookies] = useCookies();
    const [restaurantList, setRestaurantList] = useState<RestaurantListItem[]>([]);
    const [viewList, setViewList] = useState<RestaurantListItem[]>([]);
    const [totalLenght, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);
    const location = useLocation();

    //                    function                    //
    const navigator = useNavigate();

    const changePage = (restaurantList: RestaurantListItem[], totalLenght: number) => {
        if(!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLenght - 1) endIndex = totalLenght;
        const viewList = restaurantList.slice(startIndex, endIndex);
        setViewList(viewList);
    };

    const changeSection = (totalPage: number) => {
        if(!currentSection) return;
        const startPage = (currentSection * COUNT_PER_SECTION) - (COUNT_PER_SECTION - 1);
        let endPage = currentSection * COUNT_PER_SECTION;
        if (endPage > totalPage) endPage = totalPage;
        const pageList: number[] = [];
        for (let page = startPage; page <= endPage; page++) pageList.push(page);
        setPageList(pageList);
    };


    const changeRestaurantList = (restaurantList: RestaurantListItem[]) => {
        
        setRestaurantList(restaurantList);

        const totalLenght = restaurantList.length;
        setTotalLength(totalLenght);

        const totalPage = Math.floor((totalLenght - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);
        

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(restaurantList, totalLenght);

        changeSection(totalPage);
    };

    //!!!
    const GetFavoriteRestaurantListResponse = (result: GetFavoriteRestaurantListResponseDto | ResponseDto | null) => {

        const message =
        !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
                result.code === 'NR' ? '존재하지 않는 식당입니다.' :
                    result.code === 'AF' ? '권한이 없습니다.' :
                        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') 
        {
            // alert(message);
            if (result?.code === 'AF') navigator(MAIN_ABSOLUTE_PATH);
            return;
        }

        const { restaurantList } = result as GetFavoriteRestaurantListResponseDto;
        changeRestaurantList(restaurantList);
        setCurrentPage(!restaurantList.length ? 0 : 1);
        setCurrentSection(!restaurantList.length ? 0 : 1);
    };
    //!!!

    //                    event handler                    //
    
    const onPageClickHandler = (page: number) => {
        setCurrentPage(page);
    };

    const onPreSectionClickHandler = () => {
        if (currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 1) * COUNT_PER_SECTION);
    };

    const onNextSectionClickHandler = () => {
        if (currentSection === totalSection) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
    };

    //!!!
    //                    effect                    //
    useEffect(() => {
        if (!cookies.accessToken) return;

        GetFavoriteRestaurantListRequest(cookies.accessToken)
        .then(GetFavoriteRestaurantListResponse);
    }, [location]);
    //!!!

    useEffect(() => {
        if (!restaurantList.length) return;
        changePage(restaurantList, totalLenght);
    }, [currentPage]);

    useEffect(() => {
        if (!restaurantList.length) return;
        changeSection(totalPage);
    }, [currentSection]);
    
  
    //                    render                    //
    return (
        <div id='favorite-list-wrapper'>
            <div className='favorite-list-top'>
                <div className='favorite-list-size-text'>전체 <span className='emphasis'>{totalLenght}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
                <div className='favorite-list-top-right'>
                </div>
            </div>
            <div className='favorite-list-table'>
                <div className='favorite-list-table-th'>
                    <div className='favorite-list-table-reception-number'>식당 사진</div>
                    <div className='favorite-list-table-status'>식당 이름</div>
                    <div className='favorite-list-table-title'>제목</div>
                    <div className='favorite-list-table-writer-id'>음식종류</div>
                    <div className='favorite-list-table-write-date'>식당위치</div>
                    <div className='favorite-list-table-viewcount'>조회수</div>
                </div>
                {viewList.map(item => <ListItem {...item} />)}
            </div>
            <div className='favorite-list-bottom'>
                <div style={{ width: '299px' }}></div>
                <div className='favorite-list-pagenation'>
                    <div className='favorite-list-page-left' onClick={onPreSectionClickHandler}></div>
                    <div className='favorite-list-page-box'>
                        {pageList.map(page => 
                        page === currentPage ?
                        <div className='favorite-list-page-active'>{page}</div> :
                        <div className='favorite-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
                        )}
                    </div>
                    <div className='favorite-list-page-right' onClick={onNextSectionClickHandler}></div>
                </div>
            </div>
        </div>
    );
}
//수정