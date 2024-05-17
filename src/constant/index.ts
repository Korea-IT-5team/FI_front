// description : Navigation URL PATH
export const MAIN_PATH = '/main'
export const SNS_PATH = '/sns/:accessToken/:expires';
export const AUTH_PATH = '/authentication';
export const BUSINESS_REGISTRATION_PATH = 'business-registration';
export const FIND_EMAIL_PATH = '/find-email';
export const FIND_PASSWORD_PATH = '/find-password';
export const PASSWORD_RESET_PATH = '/password-reset';
export const RESTAURANT_LIST_PATH = 'restaurant-list';
export const RESTAURANT_INFO_PATH = '/restarant-info';
export const RESERVATION_PATH = 'reservation';
export const RESERVATION_INFO_PATH = '/reservation-info';
export const MYPAGE_PATH = '/my-page';
export const INFO_UPDATE_PATH = 'info-update';
export const FAVORITE_PATH = '/favorite-list';
export const REVIEW_PATH = '/review-list';
export const INQUIRY_PATH = '/inquiry';
export const NOTICE_PATH = '/notice'; 
export const LIST_PATH = 'list';
export const INQUIRY_DETAILS_PATH = ':inquiryNumber';
export const NOTICE_DETAILS_PATH = ':noticeNumber';
export const WRITE_PATH = 'write';
export const MY_BOARD_PATH = 'my-board';
export const USER_DELETE_PATH = '/user-delete';

// description: Navigation 절대 URL PATH 
export const MAIN_ABSOLUTE_PATH = MAIN_PATH;
export const BUSINESS_REGISTRATION_ABSOLUTE_PATH = `${AUTH_PATH}/${BUSINESS_REGISTRATION_PATH}`;
export const RESTAURANT_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${RESTAURANT_LIST_PATH}`;
export const RESERVATION_ABSOLUTE_PATH = `${RESERVATION_INFO_PATH}/${RESERVATION_PATH}`;
export const INFO_UPDATE_ABSOLUTE_PATH = `${MYPAGE_PATH}/${INFO_UPDATE_PATH}`;
export const INQUIRY_LIST_ABSOLUTE_PATH = `${INQUIRY_PATH}/${LIST_PATH}`;
export const NOTICE_LIST_ABSOLUTE_PATH = `${NOTICE_PATH}/${LIST_PATH}`;
export const INQUIRY_DETAILS_ABSOLUTE_PATH = (inquiryNumber: string | number) => `${INQUIRY_PATH}/${LIST_PATH}/${inquiryNumber}`;
export const NOTICE_DETAILS_ABSOLUTE_PATH = (noticeNumber: string | number) => `${NOTICE_PATH}/${LIST_PATH}/${noticeNumber}`;
export const INQUIRY_WRTIE_ABSOLUTE_PATH = `${INQUIRY_PATH}/${WRITE_PATH}`;
export const NOTICE_WRITE_ABSOLUTE_PATH = `${NOTICE_PATH}/${WRITE_PATH}`;
export const MY_INQURIY_BOARD_ABSOLUTE_PATH = `${INQUIRY_PATH}/${MY_BOARD_PATH}`;

// description: API URL PATH
export const SERVER_DOMAIN_URL = 'http://localhost:9999';
export const SERVER_API_URL = `${SERVER_DOMAIN_URL}/api/v1`;

// description: AUTH 모듈 내의 기능 URL
export const SERVER_AUTH_MODULE_URL = `${SERVER_API_URL}/auth`;
export const SIGN_IN_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-in`;
export const SIGN_UP_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-up`;
export const TEL_NUMBER_AUTH_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/tel-number-auth`;
export const TEL_NUMBER_AUTH_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/tel-number-check`;
export const EMAIL_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-check`;
export const NICKNAME_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/nickname-check`;
export const FIND_EMAIL_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/find-email`;
export const PASSWORD_RESET_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/password-reset`;
export const PASSWORD_UPDATE_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/password-update`;

// description: USER 모듈 내의 기능 URL
export const SERVER_USER_MODULE_URL = `${SERVER_API_URL}/user`;
export const GET_SIGN_IN_USER_REQUEST_URL = `${SERVER_USER_MODULE_URL}/`;
export const PASSWORD_RECHECK_REQUEST_URL = `${SERVER_USER_MODULE_URL}/password-recheck`;
export const INFO_UPDATE_REQUEST_URL = `${SERVER_USER_MODULE_URL}/info-update`;
export const INFO_DELETE_REQUEST_URL = `${SERVER_USER_MODULE_URL}/info-delete`;

// description: RESTAURANT 모듈 내의 기능 URL
export const SERVER_RESTAURANT_MODULE_URL = `${SERVER_API_URL}/restaurant`;
export const GET_SEARCH_RESTAURANT_LIST_URL = `${SERVER_RESTAURANT_MODULE_URL}/search`;
export const GET_RESTAURANT_URL = (restaurantId: number | string) => `${SERVER_RESTAURANT_MODULE_URL}/${restaurantId}`;
export const POST_RESTAURANT_INFO_UPLOAD = `${GET_RESTAURANT_URL}/info-upload`;
export const PATCH_RESTAURANT_INFO_UPDATE = `${GET_RESTAURANT_URL}/info-update`;

// description: REVIEW 모듈 내의 기능 URL
export const SERVER_REVIEW_MODULE_URL = `${SERVER_RESTAURANT_MODULE_URL}/review`;
// description: 아래의 경우 GET_REVIEW_URL로 먼저 화살표함수와 URL을 적어줘서 코드의 가독성을 향상시킬 수 있다.
// export const GET_REVIEW_URL = (restaurantId: number | string) => `${SERVER_REVIEW_MODULE_URL}/${restaurantId}`;
// export const POST_REVIEW_REQUEST_URL = `${GET_REVIEW_URL}/write`;
// export const PATCH_REVIEW_REQUEST_URL = `${GET_REVIEW_URL}/update`;
// export const DELETE_REVIEW_REQUEST_URL = `${GET_REVIEW_URL}/delete`;
export const POST_REVIEW_REQUEST_URL = (restaurantId: number | string) => `${SERVER_REVIEW_MODULE_URL}/${restaurantId}/write`;
export const PATCH_REVIEW_REQUEST_URL = (restaurantId: number | string) => `${SERVER_REVIEW_MODULE_URL}/${restaurantId}/update`;
export const DELETE_REVIEW_REQUEST_URL = (restaurantId: number | string) => `${SERVER_REVIEW_MODULE_URL}/${restaurantId}/delete`;

// description: RESERVATION 모듈 내의 기능 URL
export const SERVER_RESERVATION_MODULE_URL = `${SERVER_RESTAURANT_MODULE_URL}/reservation`;
export const GET_RESERVATION_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}/list`;
export const GET_RESERVATION_URL = (reservationNumber: number | string) => `${SERVER_RESERVATION_MODULE_URL}/${reservationNumber}`;
export const POST_RESERVATION_REQUEST_URL = (restaurantId: number | string) => `${SERVER_RESERVATION_MODULE_URL}/${restaurantId}/do`;
export const DELETE_RESERVATION_REQUEST_URL = (restaurantId: number | string) => `${SERVER_RESERVATION_MODULE_URL}/${restaurantId}/cancel`;

// description: FAVORITE 모듈 내의 기능 URL
export const SERVER_FAVORITE_MODULE_URL = `${SERVER_RESTAURANT_MODULE_URL}/favorite`;
export const GET_FAVORITE_LIST_URL = `${SERVER_FAVORITE_MODULE_URL}/list`;
export const POST_FAVORITE_REQUEST_URL = (restaurantId: number | string) => `${SERVER_FAVORITE_MODULE_URL}/${restaurantId}`;

// description: INQUIRY BOARD 모듈 내의 기능 URL
export const SERVER_INQUIRY_BOARD_MODULE_URL = `${SERVER_API_URL}/inquiry-board`;
export const POST_INQUIRY_BOARD_REQUEST_URL = `${SERVER_INQUIRY_BOARD_MODULE_URL}/write`;
export const GET_INQUIRY_BOARD_LIST_URL = `${SERVER_INQUIRY_BOARD_MODULE_URL}/list`;
export const GET_INQUIRY_BOARD_SEARCH_LIST_URL = `${GET_INQUIRY_BOARD_LIST_URL}/search`;
export const GET_INQUIRY_BOARD_URL = (inquiryNumber: number | string) => `${SERVER_INQUIRY_BOARD_MODULE_URL}/${inquiryNumber}`;
export const POST_INQUIRY_BOARD_COMMENT_REQUEST_URL = (inquiryNumber: number | string) => `${SERVER_INQUIRY_BOARD_MODULE_URL}/${inquiryNumber}/comment`;
export const DELETE_INQUIRY_BOARD_URL = (inquiryNumber: number | string) => `${SERVER_INQUIRY_BOARD_MODULE_URL}/${inquiryNumber}`;
export const PUT_INQUIRY_BOARD_REQUEST_URL = (inquiryNumber: number | string) => `${SERVER_INQUIRY_BOARD_MODULE_URL}/${inquiryNumber}`;
export const GET_MY_INQUIRY_BOARD_LIST_URL = `${SERVER_INQUIRY_BOARD_MODULE_URL}/my-list`;
export const GET_MY_INQUIRY_BOARD_SEARCH_LIST_URL = `${GET_MY_INQUIRY_BOARD_LIST_URL}/search`;
export const GET_MY_INQUIRY_BOARD_URL = (inquiryNumber: number | string) => `${GET_MY_INQUIRY_BOARD_LIST_URL}/${inquiryNumber}`;

// description : Notice board 모듈 내의 기능 URL
export const SERVER_NOTICE_BOARD_MODULE_URL = `${SERVER_API_URL}/notice-board`;
export const POST_NOTICE_BOARD_REQUEST_URL = `${SERVER_NOTICE_BOARD_MODULE_URL}/write`;
export const GET_NOTICE_BOARD_LIST_URL = `${SERVER_NOTICE_BOARD_MODULE_URL}/list`;
export const GET_NOTICE_BOARD_LIST_SEARCH_URL = `${GET_NOTICE_BOARD_LIST_URL}/search`;
export const GET_NOTICE_BOARD_URL = (noticeNumber: number | string) => `${SERVER_NOTICE_BOARD_MODULE_URL}/${noticeNumber}`;
export const NOTICE_BOARD_INCREASE_VIEW_COUNT_URL = (noticeNumber: number | string) => `${SERVER_NOTICE_BOARD_MODULE_URL}/${noticeNumber}/view-count`;
export const DELETE_NOTICE_BOARD_URL = (noticeNumber: number | string) => `${SERVER_NOTICE_BOARD_MODULE_URL}/${noticeNumber}`;
export const UPDATE_NOTICE_BOARD_URL = (noticeNumber: number | string) => `${SERVER_NOTICE_BOARD_MODULE_URL}/${noticeNumber}`;
