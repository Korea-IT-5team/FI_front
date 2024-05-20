import axios from 'axios';
import { PatchNoticeBoardRequestDto, PostNoticeBoardRequestDto } from './noticeboard/dto/request';
import { DELETE_NOTICE_BOARD_URL, GET_NOTICE_BOARD_LIST_SEARCH_URL, GET_NOTICE_BOARD_LIST_URL, GET_NOTICE_BOARD_URL, NOTICE_BOARD_INCREASE_VIEW_COUNT_URL, PATCH_NOTICE_BOARD_URL, POST_NOTICE_BOARD_REQUEST_URL } from 'src/constant';
import { bearerAuthorization, requestErrorHandler, requestHandler } from '..';
import ResponseDto from '../response.dto';
import { GetNoticeBoardListResponseDto, GetNoticeBoardResponseDto, GetSearchNoticeBoardResponseDto, noticeBoardIncreaseViewCountResponseDto } from './noticeboard/dto/response';

// function: 공지 게시물 작성 API 함수
export const postNoticeBoardRequest = async (requestBody: PostNoticeBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_NOTICE_BOARD_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 공지 게시물 목록 확인 API 함수 
export const getNoticeBoardListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_NOTICE_BOARD_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetNoticeBoardListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 검색 공지 게시물 목록 확인 API 함수 
export const getSearchNoticeBoardListRequest = async (word: string, accessToken: string) => {
    const config = { ...bearerAuthorization(accessToken), params: { word } };
    const result = await axios.get(GET_NOTICE_BOARD_LIST_SEARCH_URL, config)
        .then(requestHandler<GetSearchNoticeBoardResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 공지 게시물 확인 API 함수 
export const getNoticeBoardRequest = async (noticeNumber: number | string, accessToken: string) => {
    const result = await axios.get(GET_NOTICE_BOARD_URL(noticeNumber), bearerAuthorization(accessToken))
        .then(requestHandler<GetNoticeBoardResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function:공지 게시물 수정 API 함수 
export const putNoticeBoardRequest = async (noticeNumber: number | string, requestBody: PatchNoticeBoardRequestDto, accessToken: string) => {
    const result = await axios.patch(PATCH_NOTICE_BOARD_URL(noticeNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
    return result;
};

// function: 공지 게시물 조회수 증가 API 함수 
export const increaseViewCountRequest = async (noticeNumber: number | string, accessToken: string) => {
    const result = await axios.patch(NOTICE_BOARD_INCREASE_VIEW_COUNT_URL(noticeNumber), {}, bearerAuthorization(accessToken))
        .then(requestHandler<noticeBoardIncreaseViewCountResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 공지 게시물 삭제 API 함수 
export const deleteNoticeBoardRequest = async (noticeNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_NOTICE_BOARD_URL(noticeNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};