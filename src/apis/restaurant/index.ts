import axios from "axios";
import { DELETE_RESTAURANT_INFO_DELETE, GET_RESTAURANT_ID_URL, GET_RESTAURANT_URL, GET_SEARCH_RESTAURANT_LIST_URL, PATCH_RESTAURANT_INFO_UPDATE, POST_RESTAURANT_INFO_UPLOAD } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { PatchRestaurantInfoRequestDto, PostRestaurantInfoRequestDto } from "./dto/request";
import { GetRestaurantInfoResponseDto, GetRestaurantListResponseDto } from "./dto/response";

// function : 식당 목록 검색 API 함수
export const GetRestaurantListRequest = async (word: string, accessToken: string) => {
    const config = {...bearerAuthorization(accessToken), params:{ word:word }};
    const result = await axios.get(GET_SEARCH_RESTAURANT_LIST_URL, config)
    .then(requestHandler<GetRestaurantListResponseDto>)
    .catch(requestErrorHandler);
    return result;
} 

// function : 특정 식당 정보 검색 API 함수
export const GetRestaurantInfoRequest = async (restaurantId: number|string, accessToken: string) => {
    const result = await axios.get(GET_RESTAURANT_URL(restaurantId), bearerAuthorization(accessToken))
    .then(requestHandler<GetRestaurantInfoResponseDto>)
    .catch(requestErrorHandler)
    return result;
} 

// function : 식당 정보 등록 API 함수 
export const PostRestaurantInfoRequest = async (requestBody: PostRestaurantInfoRequestDto, accessToken: string) => {
    const result = await axios.post(POST_RESTAURANT_INFO_UPLOAD, requestBody, bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler)
    return result;
} 

// function : 식당 정보 수정 API 함수 
export const PatchRestaurantInfoRequest = async (restaurantId: number|string, requestBody: PatchRestaurantInfoRequestDto, accessToken: string) => {
    const result = await axios.patch(PATCH_RESTAURANT_INFO_UPDATE(restaurantId), requestBody, bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler)
    return result;
} 

// function : 식당 정보 삭제 API 함수
export const DeleteRestaurantInfoRequest = async (restaurantId: number|string, accessToken: string) => {
    const result = await axios.delete(DELETE_RESTAURANT_INFO_DELETE(restaurantId), bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler)
    return result;
}

// function : 식당 아이디 값 불러오기 API 함수
export const getRestaurantIdRequest = async (accessToken: string) => {
    const result = await axios.get(GET_RESTAURANT_ID_URL, bearerAuthorization(accessToken))
    .then(requestHandler<GetRestaurantInfoResponseDto>)
    .catch(requestErrorHandler)
    return result;
}