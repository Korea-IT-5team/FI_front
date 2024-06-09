import axios from 'axios';
import { bearerAuthorization, requestErrorHandler, requestHandler } from 'src/apis';
import ResponseDto from 'src/apis/response.dto';
import { DELETE_REVIEW_REQUEST_URL, GET_REVIEW_DETAILS_LIST_URL, GET_REVIEW_DETAIL_URL, PATCH_REVIEW_REQUEST_URL, POST_REVIEW_REQUEST_URL } from 'src/constant';
import { PatchReviewRequestDto, PostReviewRequestDto } from './dto/request';
import { GetReviewListResponseDto, GetReviewResponseDto } from './dto/response';

//시작
// function : 식당 리뷰 작성 API 함수 
export const PostReviewRequest = async (restaurantId: number|string, requestBody: PostReviewRequestDto, accessToken: string) => {
  const result = await axios.post(POST_REVIEW_REQUEST_URL(restaurantId), requestBody, bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler)
  return result;
}
//완료

//시작
// function : 식당 리뷰 수정 API 함수 
export const PatchReviewRequest = async (reviewNumber: number|string, requestBody: PatchReviewRequestDto, accessToken: string) => {
  const result = await axios.patch(PATCH_REVIEW_REQUEST_URL(reviewNumber), requestBody, bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler)
  return result;
}
//완료

//시작
// function : 식당 리뷰 삭제 API 함수 
export const DeleteReviewRequest = async (reviewNumber: number|string, accessToken: string) => {
  const result = await axios.delete(DELETE_REVIEW_REQUEST_URL(reviewNumber), bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler)
  return result;
}
//완료

//시작
// function : 식당 리뷰 내역 목록 확인 API 함수
export const GetReviewDetailsRequest = async (accessToken: string) => {
  const result = await axios.get(GET_REVIEW_DETAILS_LIST_URL, bearerAuthorization(accessToken))
    .then(requestHandler<GetReviewListResponseDto>)
    .catch(requestErrorHandler)
  return result;
}
//완료


//시작
// function : 식당 리뷰 내역 확인 API 함수
export const GetReviewDetailRequest  = async (reviewNumber:number|string, accessToken: string) => {
  const result = await axios.get(GET_REVIEW_DETAIL_URL(reviewNumber), bearerAuthorization(accessToken))
    .then(requestHandler<GetReviewResponseDto>)
    .catch(requestErrorHandler)
  return result;
}
//완료

//기능부분완료