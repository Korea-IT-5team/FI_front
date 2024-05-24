import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { GetRestaurantInfoRequest } from 'src/apis/restaurant';
import { GetRestaurantInfoResponseDto } from 'src/apis/restaurant/dto/response';
import { DELETEReviewRequestDto, PatchReviewUpDateRequestDto, PostReviewUploadRequestDto } from 'src/apis/restaurant/review';
import { PatchReviewRequestDto, PostReviewRequestDto } from 'src/apis/restaurant/review/dto/request';
import RestInputBox from 'src/components/RestaurantInputBox';
import { useUserStore } from 'src/stores';
import { RestaurantReviewListItem } from 'src/types';

interface Props {
    value: RestaurantReviewListItem[];
    getRestaurantInfoResponse: (result: GetRestaurantInfoResponseDto | ResponseDto | null) => void
}

//               component: 리뷰 리스트             // 
export default function ReviewList({ value, getRestaurantInfoResponse }: Props) {
    //                      state                           //
    const { loginUserEmailId, loginUserRole, restaurantId } = useUserStore();
    const [page, setPage] = useState<boolean>(true);
    const [reviewImage, setReviewImage] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [reviewContents, setReviewContents] = useState<string>("");
    const [cookies] = useCookies();


    //                  function                            //
    const PostReviewUploadResponseDto = (result: ResponseDto | null) => {
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
        GetRestaurantInfoRequest(restaurantId, cookies.accessToken)
            .then(getRestaurantInfoResponse);
    }


    const PatchReviewUploadResponseDto = (result: ResponseDto | null) => {
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
        GetRestaurantInfoRequest(restaurantId, cookies.accessToken)
            .then(getRestaurantInfoResponse);
    }


    const DELETEReviewResponseDto = (result: ResponseDto | null) => {
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
        GetRestaurantInfoRequest(restaurantId, cookies.accessToken)
            .then(getRestaurantInfoResponse);
    }

    //          effect              //


    //              event handler                           //
    const onWriteClickHandler = () => {
        setPage(false);
    }

    const onUpdateClickHandler = (item: RestaurantReviewListItem) => {
        setPage(false);

        setReviewImage(item.reviewImage);
        setRating(item.rating);
        setReviewContents(item.reviewContents);
    }

    const onDeleteClickHandler = (item: RestaurantReviewListItem) => {
        DELETEReviewRequestDto(item.reviewNumber, cookies.accessToken).then(DELETEReviewResponseDto);
    }

    const onRatingKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        { rating ? UpdateClickHandler() : UploadClickHandler() };
    };


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
        PostReviewUploadRequestDto(restaurantId, requestBody, cookies.accessToken)
            .then(PostReviewUploadResponseDto);
    }


    const UpdateClickHandler = () => {
        if (!rating) {
            alert('필수 정보를 입력하지 않았습니다.');
            return;
        }

        const requestBody: PatchReviewRequestDto =
        {
            reviewImage: reviewImage,
            rating: rating,
            reviewContents: reviewContents
        }
        PatchReviewUpDateRequestDto(restaurantId, requestBody, cookies.accessToken)
            .then(PatchReviewUploadResponseDto);
    }

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


    const ButtonClass = `${rating ? 'primary' : 'disable'}-button full-width`;

    //                                  render                            //
    return (
        <>
            {page ? (
                <>
                    {loginUserRole === "ROLE_USER" && (<div onClick={onWriteClickHandler}>리뷰작성</div>)}
                    <div className='select-list'>
                        {value.map((item) => (
                            <div className='select-list-item-box' key={item.reviewNumber}>
                                <div>
                                    <div className='select-item'>{item.reviewImage}</div>
                                    <div className='select-item'>{item.rating}</div>
                                    <div className='select-item'>{item.reviewContents}</div>
                                    <div className='select-item'>{item.reviewWriterId}</div>
                                    <div className='select-item'>{item.reviewWriterNickname}</div>
                                    <div className='select-item'>{item.reviewDate}</div>
                                </div>
                                <div className="update-delete">
                                    {loginUserRole === "ROLE_USER" && loginUserEmailId === item.reviewWriterId && (
                                        <>
                                            <div onClick={() => onUpdateClickHandler(item)}>수정</div>
                                            <div onClick={() => onDeleteClickHandler(item)}>삭제</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <RestInputBox label="리뷰 이미지" type="file" value={reviewImage}
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

                    <RestInputBox label="내용" type="file" value={reviewContents} onKeydownHandler={onRatingKeydownHandler}
                        placeholder="평점 내용을 입력해주세요" onChangeHandler={onContentsChangeHandler} />

                    {rating ?
                        <button onClick={UpdateClickHandler}
                            className={ButtonClass}>수정하기</button> :
                        <button onClick={UploadClickHandler}
                            className={ButtonClass}>등록하기</button>}
                </>
            )}
        </>
    )
}
