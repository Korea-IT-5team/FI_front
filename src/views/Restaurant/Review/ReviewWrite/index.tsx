import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate, useParams } from 'react-router';
import RestaurantInputBox from 'src/components/RestaurantInputBox';
import { PostReviewRequestDto } from 'src/apis/restaurant/review/dto/request';
import { PostReviewRequest } from 'src/apis/restaurant/review';
import ResponseDto from 'src/apis/response.dto';
import { RESTAURANT_INFO_ABSOLUTE_PATH } from 'src/constant';


//                  component                 //
export default function ReviewWrite()
{
  
  //                  state                     //
  const navigator = useNavigate();
  const {RestaurantId} = useUserStore();
  const [reviewImage, setReviewImage] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [reviewContents, setReviewContents] = useState<string>("");
  const [cookies] = useCookies();
  


  //                function                    //

  const PostReviewResponse = (result: ResponseDto | null) => {
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

    navigator(RESTAURANT_INFO_ABSOLUTE_PATH(RestaurantId));
  }

   

  //                 event handler                //

  const onContentsKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    UploadClickHandler();
  };

  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setReviewImage(value);
  }

  const onRatingChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const result = Number(value);
    setRating(result);
  }

  const onContentsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setReviewContents(value);
  }

  const UploadClickHandler = () => {
    if (!rating) {
        alert('필수 정보를 입력하지 않았습니다.');
        return;
    }

    const requestBody: PostReviewRequestDto =
    {
        reviewImage: reviewImage,
        rating: rating,
        reviewContents: reviewContents
    }

    PostReviewRequest(RestaurantId, requestBody, cookies.accessToken)
    .then(PostReviewResponse);
}


  const ButtonClass = `${rating ? 'primary' : 'disable'}-button full-width`;
  
  //                effect                  //
  

  //                render                  //
  return (
            <>
                <RestaurantInputBox label="리뷰 이미지" type="file" value={reviewImage}
                placeholder="이미지를 삽입해주세요" onChangeHandler={onImageChangeHandler} />

                <select id="rating" name="rating" defaultValue={rating} onClick={() => onRatingChangeHandler}>
                    <option value="1.0">1.0</option>
                    <option value="1.5">1.5</option>
                    <option value="2.0">2.0</option>
                    <option value="2.5">2.5</option>
                    <option value="3.0">3.0</option>
                    <option value="3.5">3.5</option>
                    <option value="4.0">4.0</option>
                    <option value="4.5">4.5</option>
                    <option value="5.0">5.0</option>
                </select>

                <RestaurantInputBox label="내용" type="text" value={reviewContents} onKeydownHandler={onContentsKeydownHandler}
                placeholder="평점 내용을 입력해주세요" onChangeHandler={onContentsChangeHandler} />
                    
                <button onClick={UploadClickHandler}
                className={ButtonClass}>등록하기</button> :
            </>
  )
}