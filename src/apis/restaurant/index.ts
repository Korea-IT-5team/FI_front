import axios from "axios";
import { EMAIL_CHECK_REQUEST_URL, FIND_EMAIL_REQUEST_URL, GET_RESTAURANT_URL, GET_SEARCH_RESTAURANT_LIST_URL, NICKNAME_CHECK_REQUEST_URL, PASSWORD_RESET_REQUEST_URL, PASSWORD_UPDATE_REQUEST_URL, POST_RESTAURANT_INFO_UPLOAD, SIGN_IN_REQUEST_URL, SIGN_UP_REQUEST_URL, TEL_NUMBER_AUTH_CHECK_REQUEST_URL, TEL_NUMBER_AUTH_REQUEST_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { GetRestaurantInfoResponseDto, GetRestaurantListResponseDto } from "./dto/response";
import { PostRestaurantInfoRequestDto } from "./dto/request";


// function : 식당 목록 검색 API 함수
export const GetRestaurantListRequest = async (word:string,accessToken:string) => 
{
        const config = {...bearerAuthorization(accessToken),params:{word:word}};
        const result = await axios.get(GET_SEARCH_RESTAURANT_LIST_URL,config)
        .then(requestHandler<GetRestaurantListResponseDto>)
        .catch(requestErrorHandler);
        return result;
}
    

// function : 특정 식당 정보 검색 API 함수
export const GetRestaurantInfoRequest = async (restaurantId:number|string,accessToken:string) => 
{
        const result = await axios.put(GET_RESTAURANT_URL(restaurantId),bearerAuthorization(accessToken))
        .then(requestHandler<GetRestaurantInfoResponseDto>)
        .catch(requestErrorHandler)
        return result;
}

// fuction : 식당 정보 등록 API 함수 
export const PostRestaurantUploadRequestDto = async (requestBody: PostRestaurantInfoRequestDto,accessToken:string) => 
{
        const result = await axios.post(POST_RESTAURANT_INFO_UPLOAD,requestBody,bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
        return result;
} 



