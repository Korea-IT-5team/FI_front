import axios from "axios";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "src/apis";
import ResponseDto from "src/apis/response.dto";
import { DELETE_FAVORITE_REQUEST_URL, GET_FAVORITE_LIST_URL, GET_FAVORITE_STATUS_REQUEST_URL, POST_FAVORITE_REQUEST_URL } from "src/constant";
import { GetRestaurantFavoriteStatusResponseDto } from "./dto/response";
import { GetFavoriteRestaurantListResponseDto } from './dto/response/index';

// function : 식당 찜 저장 API 함수
export const PostRestaurantFavoriteRequest = async (restaurantId: number|string, accessToken: string) => {
    const result = await axios.post(POST_FAVORITE_REQUEST_URL(restaurantId), bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : 식당 찜 저장 삭제 API 함수
export const DeleteRestaurantFavoriteRequest = async (restaurantId: number|string, accessToken: string) => {
    const result = await axios.delete(DELETE_FAVORITE_REQUEST_URL(restaurantId), bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : 식당 찜 저장상태 정보 불러오기 API 함수
export const GetRestaurantFavoriteStatusRequest = async (restaurantId: number|string, accessToken: string) => {
    const result = await axios.get(GET_FAVORITE_STATUS_REQUEST_URL(restaurantId), bearerAuthorization(accessToken))
    .then(requestHandler<GetRestaurantFavoriteStatusResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : 찜(저장) 내역 확인 API 함수
export const GetFavoriteRestaurantListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_FAVORITE_LIST_URL,bearerAuthorization(accessToken))
    .then(requestHandler<GetFavoriteRestaurantListResponseDto>)
    .catch(requestErrorHandler);
    return result;
}