1
// description : Notice board 모듈 내의 기능 URL
export const SERVER_NOTICE_BOARD_MODULE_URL = `${SERVER_API_URL}/notice-board`;
export const POST_NOTICE_BOARD_REQUEST_URL = `${SERVER_NOTICE_BOARD_MODULE_URL}/write`;
export const GET_NOTICE_BOARD_LIST_URL = `${SERVER_NOTICE_BOARD_MODULE_URL}/list`;
export const GET_NOTICE_BOARD_LIST_SEARCH_URL = `${GET_NOTICE_BOARD_LIST_URL}/search`;
export const GET_NOTICE_BOARD_URL = (noticeNumber: number | string) => `${SERVER_NOTICE_BOARD_MODULE_URL}/${noticeNumber}`;
export const NOTICE_BOARD_INCREASE_VIEW_COUNT_URL = (noticeNumber: number | string) => `${SERVER_NOTICE_BOARD_MODULE_URL}/${noticeNumber}/view-count`;
export const DELETE_NOTICE_BOARD_URL = (noticeNumber: number | string) => `${SERVER_NOTICE_BOARD_MODULE_URL}/${noticeNumber}`;
export const UPDATE_NOTICE_BOARD_URL = (noticeNumber: number | string) => `${SERVER_NOTICE_BOARD_MODULE_URL}/${noticeNumber}`;