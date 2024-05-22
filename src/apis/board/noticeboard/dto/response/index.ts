import ResponseDto from "src/apis/response.dto";
import { NoticeBoardListItem } from "src/types";

// description: 공지 게시물 목록 확인 Response Body DTO
export interface GetNoticeBoardListResponseDto extends ResponseDto {
  noticeBoardList: NoticeBoardListItem[];
}

// description: 검색 공지 게시물 목록 확인 Response Body DTO
export interface GetSearchNoticeBoardResponseDto extends ResponseDto {
  noticeBoardList: NoticeBoardListItem[];
}

// description: 공지 게시물 확인 Reponse Body DTO
export interface GetNoticeBoardResponseDto extends ResponseDto {
  noticeNumber: number;
  noticeTitle: string;
  noticeWriteId: string;
  noticeWriteDatetime: string;
  noticeContents: string;
  viewCount: number;

}