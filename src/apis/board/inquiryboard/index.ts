import axios from 'axios';
import { PatchInquiryBoardRequestDto, PostCommentRequestDto, PostInquiryBoardRequestDto } from './dto/request';
import { DELETE_INQUIRY_BOARD_URL, GET_INQUIRY_BOARD_LIST_URL, GET_INQUIRY_BOARD_SEARCH_LIST_URL, GET_INQUIRY_BOARD_URL, PATCH_INQUIRY_BOARD_REQUEST_URL, POST_INQUIRY_BOARD_COMMENT_REQUEST_URL, POST_INQUIRY_BOARD_REQUEST_URL } from 'src/constant';
import { bearerAuthorization, requestErrorHandler, requestHandler } from 'src/apis';
import { GetInquiryBoardListResponseDto,GetInquiryBoardResponseDto,GetSearchInquiryBoardListResponseDto } from './dto/response';
import ResponseDto from 'src/apis/response.dto';

// function: 문의 게시물 작성 API 함수
export const postInquiryBoardRequest = async (requestBody: PostInquiryBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_INQUIRY_BOARD_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 문의 게시물 답글 작성 API 함수 
export const postCommentRequest = async (inquiryNumber: number | string, requestBody: PostCommentRequestDto, accessToken: string) => {
    const result = await axios.post(POST_INQUIRY_BOARD_COMMENT_REQUEST_URL(inquiryNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 문의 게시물 목록 불러오기 API 함수 
export const getInquiryBoardListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_INQUIRY_BOARD_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetInquiryBoardListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 검색 문의 게시물 목록 확인 API 함수 
export const getSearchInquiryBoardListRequest = async (searchWord: string, accessToken: string) => {
    const config = { ...bearerAuthorization(accessToken), params: { searchWord } };
    const result = await axios.get(GET_INQUIRY_BOARD_SEARCH_LIST_URL, config)
        .then(requestHandler<GetSearchInquiryBoardListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 문의 게시물 상세 확인 API 함수 
export const getInquiryBoardRequest = async (inquiryNumber: number | string, accessToken: string) => {
    const result = await axios.get(GET_INQUIRY_BOARD_URL(inquiryNumber), bearerAuthorization(accessToken))
        .then(requestHandler<GetInquiryBoardResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 문의 게시물 수정 API 함수 
export const patchInquiryBoardRequest = async (inquiryNumber: number | string, requestBody: PatchInquiryBoardRequestDto, accessToken: string) => {
    const result = await axios.patch(PATCH_INQUIRY_BOARD_REQUEST_URL(inquiryNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
    return result;
};

// function: 문의 게시물 삭제 API 함수 
export const deleteInquiryBoardRequest = async (inquiryNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_INQUIRY_BOARD_URL(inquiryNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};