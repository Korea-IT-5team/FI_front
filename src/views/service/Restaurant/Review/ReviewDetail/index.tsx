import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { DeleteReviewRequest, GetReviewDetailRequest } from 'src/apis/restaurant/review';
import { GetReviewResponseDto } from 'src/apis/restaurant/review/dto/response';
import { MAIN_ABSOLUTE_PATH, RESTAURANT_REVIEW_ABSOLUTE_DETAILS_LIST_PATH, RESTAURANT_REVIEW_ABSOLUTE_DETAIL_UPDATE_PATH } from 'src/constant';
import reviewDefault from 'src/assets/image/review-default.png'
import './style.css';

// component //
export default function ReviewDetail() {

    // state //
    const{reviewNumber} = useParams();

    const[cookies] = useCookies();
    const[reviewRestaurantId,setReviewRestaurantId] = useState<number>();
    const[reviewDate,setReviewDate] = useState<string>('');
    const[reviewImage,setReviewImage] = useState<string>('');
    const[reviewContents,setReviewContents] = useState<string>('');
    const[rating,setRating] = useState<number>();
    const[reviewWriterNickname, setReviewWriterNickname] = useState<string>('');

    // function //
    const navigation = useNavigate();

    const GetReviewDetailResponse = (result: GetReviewResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') { 
            if (result?.code === 'AF') {
                navigation(MAIN_ABSOLUTE_PATH);
                return;
            }
        return;
        }

        const{reviewRestaurantId,reviewDate,reviewImage,reviewContents,rating,reviewWriterNickname} = result as GetReviewResponseDto;
        setReviewRestaurantId(reviewRestaurantId);
        setReviewWriterNickname(reviewWriterNickname);
        setReviewDate(reviewDate);
        setReviewImage(reviewImage);
        setReviewContents(reviewContents);
        setRating(rating);
    };
    
    const DeleteReviewResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'NR' ? '존재하지 않는 식당입니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        navigation(RESTAURANT_REVIEW_ABSOLUTE_DETAILS_LIST_PATH);
    };

    // event handler //
    const onListClickHandler = () => {
        navigation(RESTAURANT_REVIEW_ABSOLUTE_DETAILS_LIST_PATH);
    };

    const onUpdateClickHandler = () => {
        if(!reviewNumber) return;
        navigation(RESTAURANT_REVIEW_ABSOLUTE_DETAIL_UPDATE_PATH(reviewNumber));
    };

    const onDeleteClickHandler = () => {
        if(!reviewNumber || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if(!isConfirm) return;

        DeleteReviewRequest(reviewNumber, cookies.accessToken)
            .then(DeleteReviewResponse);
    }
    
    // effect //
    useEffect(()=> {
        if(!cookies.accessToken || !reviewNumber) return;
        GetReviewDetailRequest(reviewNumber,cookies.accessToken)  
            .then(GetReviewDetailResponse);
    },[]);
    
    // render //
    return (
        <div id='review-detail-wrapper'>
            <div className='review-detail-main-box'>
                <div className='review-detail-info-box'>
                    <div className='review-detail-info'>작성자: {reviewWriterNickname}</div>   
                    <div className='review-detail-info-divider'>{'\|'}</div>   
                    <div className='review-detail-info'>작성일: {reviewDate}</div>   
                    <div className='review-detail-info-divider'>{'\|'}</div>   
                    <div className='review-detail-info'>평점: {rating} </div>   
                </div>
                <img src={reviewImage ? reviewImage : reviewDefault} />
                <div className='review-detail-contents-box'>내용: {reviewContents}</div>
            </div>
            <div className='review-detail-button-box'>
                <div className='review-detail-primary-button' onClick={onListClickHandler}>목록보기</div> 
                <div className='review-detail-owner-button-box'>
                    <div className='review-detail-second-button' onClick={onUpdateClickHandler}>수정</div>
                    <div className='review-detail-error-button' onClick={onDeleteClickHandler}>삭제</div>
                </div>
            </div>
        </div>
    )
}