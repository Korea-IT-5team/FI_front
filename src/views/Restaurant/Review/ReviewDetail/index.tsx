import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { MAIN_ABSOLUTE_PATH, RESTAURANT_REVIEW_ABSOLUTE_DETAILS_LIST_PATH, RESTAURANT_REVIEW_ABSOLUTE_DETAILS_UPDATE_PATH } from 'src/constant';
import { DeleteReviewRequest, GetReviewDetailRequest } from 'src/apis/restaurant/review';
import { GetReviewDetailResponseDto } from 'src/apis/restaurant/review/dto/response';

//          component           //
export default function ReviewDetail()
{
  //           state             //
  const{setReviewNumber,ReviewNumber} = useUserStore();
  const{reviewNumber} = useParams();

  const[cookies] = useCookies();
  const[reviewRestaurantId,setReviewRestaurantId] = useState<number>();
  const[reviewDate,setReviewDate] = useState<string>('');
  const[reviewImage,setReviewImage] = useState<string>('');
  const[reviewContents,setReviewContents] = useState<string>('');
  const[rating,setRating] = useState<number>();
  const location = useLocation();

  //              function               //
  const navigator = useNavigate();

  const GetReviewDetailResponse = (result: GetReviewDetailResponseDto | ResponseDto | null) => 
  {
    const message = 
      !result ? '서버에 문제가 있습니다.' : 
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if(!result || result.code !== 'SU')
    {
        alert(message);
        if(result?.code === 'AF')
        {
          navigator(MAIN_ABSOLUTE_PATH);
          return;
        }
        return;
    }

    const{reviewNumber,reviewRestaurantId,reviewDate,reviewImage,reviewContents,rating} = 
    result as GetReviewDetailResponseDto;
    setReviewRestaurantId(reviewRestaurantId);
    setReviewDate(reviewDate);
    setReviewImage(reviewImage);
    setReviewContents(reviewContents);
    setRating(rating);
    setReviewNumber(reviewNumber);
  };

  const DeleteReviewResponse = (result: ResponseDto | null) => {
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

    navigator(RESTAURANT_REVIEW_ABSOLUTE_DETAILS_LIST_PATH);
  };

  //            event handler            //
 

  const onListClickHandler = () => 
  {
      navigator(RESTAURANT_REVIEW_ABSOLUTE_DETAILS_LIST_PATH);
  };

  const onUpdateClickHandler = () => 
  {
      navigator(RESTAURANT_REVIEW_ABSOLUTE_DETAILS_UPDATE_PATH(ReviewNumber));
  };

  const onDeleteClickHandler = () => 
  {
    if(!ReviewNumber || !cookies.accessToken) return;
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if(!isConfirm) return;

    DeleteReviewRequest(ReviewNumber, cookies.accessToken)
    .then(DeleteReviewResponse);
  }
  
  //              effect                //
  useEffect(()=> {
    if(!cookies.accessToken || !reviewNumber) return;
    GetReviewDetailRequest(Number(reviewNumber),cookies.accessToken)  
    .then(GetReviewDetailResponse);
  },[location]);

 
  //           render            //
  return (
    <div id='review-detail-wrapper'>
      <div className='review-detail-main-box'>
        <div className='review-detail-top-box'>
          <div className='review-detail-title-box'>{reviewImage}</div>
          <div className='review-detail-info-box'>
            <div className='review-detail-info'>작성자 </div>   
            <div className='review-detail-info-divider'>{'\|'}</div>   
            <div className='review-detail-info'>작성일 {reviewDate}</div>   
            <div className='review-detail-info-divider'>{'\|'}</div>   
            <div className='review-detail-info'>{rating} </div>   
          </div>
        </div>
        <div className='review-detail-contents-box'>{reviewContents}</div>
      </div>
      <div className='review-detail-button-box'>
        <div className='primary-button' onClick={onListClickHandler}>목록보기</div> 
        <div className='review-detail-owner-button-box'>
          <div className='second-button' onClick={onUpdateClickHandler}>수정</div>
          <div className='error-button' onClick={onDeleteClickHandler}>삭제</div>
        </div>
      </div>
    </div>
  )
}