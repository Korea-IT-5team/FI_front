import axios from "axios";
import { GET_RESTAURANT_URL, GET_SEARCH_RESTAURANT_LIST_URL, PATCH_RESTAURANT_INFO_UPDATE, POST_RESTAURANT_INFO_UPLOAD } from "src/constant";
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
export const GetRestaurantInfoRequest = async (restaurantId: number, accessToken: string) => {
const result = await axios.put(GET_RESTAURANT_URL(restaurantId), bearerAuthorization(accessToken))
.then(requestHandler<GetRestaurantInfoResponseDto>)
.catch(requestErrorHandler)
return result;
}


// function : 식당 정보 등록 API 함수 
export const PostRestaurantUploadRequestDto = async (requestBody: PostRestaurantInfoRequestDto, accessToken: string) => {
const result = await axios.post(POST_RESTAURANT_INFO_UPLOAD, requestBody, bearerAuthorization(accessToken))
.then(requestHandler<ResponseDto>)
.catch(requestErrorHandler)
return result;
} 


// function : 식당 정보 수정 API 함수 
export const PatchRestaurantUpdateRequestDto = async (requestBody: PatchRestaurantInfoRequestDto, accessToken: string) => {
const result = await axios.post(PATCH_RESTAURANT_INFO_UPDATE, requestBody, bearerAuthorization(accessToken))
.then(requestHandler<ResponseDto>)
.catch(requestErrorHandler)
return result;
} 



