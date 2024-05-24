import React from 'react'
import { PostReservationRequestDto } from './dto/request';
import axios from 'axios';
import { POST_RESERVATION_REQUEST_URL } from 'src/constant';
import { bearerAuthorization, requestErrorHandler, requestHandler } from 'src/apis';
import ResponseDto from 'src/apis/response.dto';

// fuction : 식당 예약 API 함수 

export const PostReservationUploadRequest = async (restaurantId:number, requestBody: PostReservationRequestDto,accessToken:string) => 
  {
      const result = await axios.post(POST_RESERVATION_REQUEST_URL(restaurantId), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
        return result;
  } 