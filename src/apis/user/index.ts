import { GET_SIGN_IN_USER_REQUEST_URL, INFO_DELETE_REQUEST_URL, INFO_UPDATE_REQUEST_URL, PASSWORD_RECHECK_REQUEST_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import axios from "axios";
import { GetUserInfoResponseDto } from "./dto/response";
import ResponseDto from "../response.dto";

// function: 로그인 유저 정보 불러오기 API 함수 
export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetUserInfoResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 비밀번호 재확인 API 함수 
export const passwordRecheckRequest = async (accessToken: string) => {
    const result = await axios.get(PASSWORD_RECHECK_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 회원정보 수정 API 함수 
export const patchUserInfoRequest = async (accessToken: string) => {
    const result = await axios.get(INFO_UPDATE_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 회원탈퇴 API 함수 
export const deleteUserRequest = async (accessToken: string) => {
    const result = await axios.get(INFO_DELETE_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};