import axios from 'axios';
import { bearerAuthorization, requestErrorHandler, requestHandler } from 'src/apis';
import ResponseDto from 'src/apis/response.dto';
import { DELETE_RESERVATION_REQUEST_URL, GET_RESERVATION_CEO_LIST_URL, GET_RESERVATION_LIST_URL, POST_RESERVATION_REQUEST_URL } from 'src/constant';
import { PostReservationRequestDto } from './dto/request';
import { GetReservationListResponseDto } from './dto/response';

// function : 본인예약 내역 목록확인 API 함수
export const GetUserReservationListRequest = async (accessToken:string) => 
{
      const result = await axios.get(GET_RESERVATION_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetReservationListResponseDto>)
        .catch(requestErrorHandler)
        return result;
}


// function : 예약자 내역 목록확인 API 함수
export const GetCeoReservationListRequest = async (restaurantId:number,accessToken:string) => 
{
      const result = await axios.get(GET_RESERVATION_CEO_LIST_URL(restaurantId), bearerAuthorization(accessToken))
        .then(requestHandler<GetReservationListResponseDto>)
        .catch(requestErrorHandler)
        return result;
} 


<<<<<<< HEAD
// function : 식당 예약 API 함수 
export const PostReservationUploadRequest = async (restaurantId:number, requestBody: PostReservationRequestDto,accessToken:string) => 
=======
// fuction : 식당 예약 API 함수 
export const PostReservationRequest = async (restaurantId:number, requestBody: PostReservationRequestDto,accessToken:string) => 
>>>>>>> a9a56f98a07d593c0668f6b2ee208473665b7a8f
{
      const result = await axios.post(POST_RESERVATION_REQUEST_URL(restaurantId), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
        return result;
} 

<<<<<<< HEAD
// function : 식당 예약 취소 API 함수 
export const DeleteReservationCancelRequest = async (restaurantId:number,accessToken:string) => 
=======
// fuction : 식당 예약 취소 API 함수 
export const DeleteReservationRequest = async (restaurantId:number,accessToken:string) => 
>>>>>>> a9a56f98a07d593c0668f6b2ee208473665b7a8f
{
      const result = await axios.delete(DELETE_RESERVATION_REQUEST_URL(restaurantId), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
        return result;
} 





