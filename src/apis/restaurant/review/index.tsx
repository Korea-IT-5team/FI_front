import React from 'react'
import { bearerAuthorization, requestErrorHandler, requestHandler } from 'src/apis';
import { PatchReviewRequestDto, PostReviewRequestDto } from './dto/request';
import axios from 'axios';
import { DELETE_REVIEW_REQUEST_URL, PATCH_REVIEW_REQUEST_URL, POST_REVIEW_REQUEST_URL } from 'src/constant';
import ResponseDto from 'src/apis/response.dto';

// fuction : 식당 리뷰 작성 API 함수 
export const PostReviewUploadRequestDto = async (restaurantId:number, requestBody: PostReviewRequestDto,accessToken:string) => 
{
    const result = await axios.post(POST_REVIEW_REQUEST_URL(restaurantId),requestBody,bearerAuthorization(accessToken))
      .then(requestHandler<ResponseDto>)
      .catch(requestErrorHandler)
      return result;
} 

// fuction : 식당 리뷰 수정 API 함수 
export const PatchReviewUpDateRequestDto = async (restaurantId:number, requestBody: PatchReviewRequestDto,accessToken:string) => 
{
      const result = await axios.post(PATCH_REVIEW_REQUEST_URL(restaurantId),requestBody,bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
        return result;
} 


  // fuction : 식당 리뷰 삭제 API 함수 
export const DELETEReviewRequestDto = async (restaurantId:number,accessToken:string) => 
{
      const result = await axios.post(DELETE_REVIEW_REQUEST_URL(restaurantId),bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
        return result;
} 
  