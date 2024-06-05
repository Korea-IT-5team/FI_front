import ResponseDto from "src/apis/response.dto";
import { InquiryBoardListItem } from "src/types";

// description: 문의 게시물 목록 확인 Response Body DTO
export interface GetInquiryBoardListResponseDto extends ResponseDto {
  inquiryBoardList: InquiryBoardListItem[];
}

// description: 검색 문의 게시물 목록 확인 Response Body DTO
export interface GetSearchInquiryBoardListResponseDto extends ResponseDto {
  inquiryBoardList: InquiryBoardListItem[];
}

// description: 문의 게시물 확인 Response Body DTO
export interface GetInquiryBoardResponseDto extends ResponseDto {
  inquiryNumber: number;
  status:boolean;
  inquiryTitle: string;
  inquiryWriterId: string;
  // inquiryWriterNickname: string;
  inquiryWriteDatetime: string;
  inquiryContents: string;
  inquiryComment: string | null;
}

// description: 문의 게시물 목록 확인 Response Body DTO
export interface GetInquiryBoardListItem {
  inquiryNumber: number;
  inquiryStatus: boolean;
  inquiryTitle: string;
  inquiryWriterId: string;
  inquiryWriteDatetime: string;
}


// description: 나의 문의 게시물 목록 확인 Response Body DTO
export interface GetMyInquiryBoardListResponseDto extends ResponseDto {
  inquiryBoardList: InquiryBoardListItem[];
}