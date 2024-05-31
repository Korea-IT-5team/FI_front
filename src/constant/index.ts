// description : Navigation URL PATH
export const MAIN_PATH = '/main';
export const SNS_PATH = '/sns/:accessToken/:expires';

export const AUTH_PATH = '/authentication';
export const SIGN_IN_PATH = 'sign-in';
export const SIGN_UP_PATH = 'sign-up';
export const FIND_EMAIL_INPUT_PATH = 'find-email-input';
export const PASSWORD_RESET_INPUT_PATH = 'password-reset-input';
export const PASSWORD_RESET_CHECK_PATH = 'password-reset-check/:userEmailId';
export const PASSWORD_RESET_FINALLY_PATH = 'password-reset-finally';

export const RESTAURANT_PATH = '/restaurant';
export const RESTAURANT_INFO_PATH = 'info/:restaurantId';
export const RESTAURANT_INFO_WRITE_PATH = 'info/write';
export const RESTAURANT_INFO_UPDATE_PATH = 'info/update/:restaurantId';
export const RESTAURANT_LIST_PATH = 'list';

export const REVIEW_PATH = 'review';
export const RESTAURANT_REVIEW_DETAILS_LIST_PATH = 'reviewDetailsList';
export const RESTAURANT_REVIEW_DETAIL_PATH = 'reviewDetail/:reviewNumber';
export const RESTAURANT_REVIEW_WRITE_PATH = 'reviewWrite/:restaurantId';
export const RESTAURANT_REVIEW_UPDATE_PATH = 'reviewUpdate/:reviewNumber';

export const RESERVATION_PATH = 'reservation';
export const DO_RESERVATION_PATH = 'doReservation/:restaurantId';
export const RESERVATION_LIST_PATH = 'reservationList';

export const FAVORITE_PATH = 'favorite';
export const RESTAURANT_FAVORITE_LIST_PATH = 'favoriteList';

export const MY_PAGE_PATH = '/my-page';
export const MY_PAGE_SITE_PATH = 'site';
export const USER_INFO_UPDATE_PATH = 'user-info-update';
export const USER_DELETE_PATH = 'user-delete';
export const USER_DELETE_FINALLY_PATH = 'user-delete-finally';

export const BOARD_PATH = '/board';
export const NOTICE_PATH = 'notice';
export const NOTICE_BOARD_LIST_PATH = 'list';
export const NOTICE_BOARD_WRITE_PATH = 'write';
export const NOTICE_BOARD_UPDATE_PATH = 'update';
export const NOTICE_DETAILS_PATH = ':noticeNumber';

export const INQUIRY_PATH = 'inquiry';
export const INQUIRY_BOARD_LIST_PATH = 'list';
export const INQUIRY_BOARD_WRITE_PATH = 'write';
export const INQUIRY_BOARD_UPDATE_PATH =  'update';
export const INQUIRY_MY_BOARD_LIST_PATH = 'my-board';
export const INQUIRY_DETAILS_PATH = ':inquiryNumber';


// description: Navigation 절대 URL PATH 
export const MAIN_ABSOLUTE_PATH = MAIN_PATH;

export const SIGN_IN_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_IN_PATH}`;
export const SIGN_UP_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_UP_PATH}`;
export const FIND_EMAIL_INPUT_ABSOLUTE_PATH = `${AUTH_PATH}/${FIND_EMAIL_INPUT_PATH}`;
export const PASSWORD_RESET_INPUT_ABSOLUTE_PATH = `${AUTH_PATH}/${PASSWORD_RESET_INPUT_PATH}`;
export const PASSWORD_RESET_CHECK_ABSOLUTE_PATH = (userEmailId: string ) => `${AUTH_PATH}/${PASSWORD_RESET_CHECK_PATH}/${userEmailId}`;
export const PASSWORD_RESET_FINALLY_ABSOLUTE_PATH = `${AUTH_PATH}/${PASSWORD_RESET_FINALLY_PATH}`;

export const RESTAURANT_INFO_ABSOLUTE_PATH = (restaurantId: number | string) => `${RESTAURANT_PATH}/info/${restaurantId}`;
export const RESTAURANT_INFO_WRITE_ABSOLUTE_PATH = `${RESTAURANT_PATH}/${RESTAURANT_INFO_WRITE_PATH}`;
export const RESTAURANT_INFO_UPDATE_ABSOLUTE_PATH = (restaurantId: number | string) => `${RESTAURANT_PATH}/info/update/${restaurantId}`;
export const RESTAURANT_LIST_ABSOLUTE_PATH = `${RESTAURANT_PATH}/${RESTAURANT_LIST_PATH}`;

export const RESTAURANT_DO_RESERVATION_ABSOLUTE_PATH = (restaurantId: number | string) => `${RESTAURANT_PATH}/${RESERVATION_PATH}/doReservation/${restaurantId}`;
export const RESTAURANT_RESERVATION_ABSOLUTE_LIST_PATH = `${RESTAURANT_PATH}/${RESERVATION_PATH}/${RESERVATION_LIST_PATH}`;
export const RESTAURANT_REVIEW_ABSOLUTE_DETAILS_LIST_PATH = `${RESTAURANT_PATH}/${REVIEW_PATH}/${RESTAURANT_REVIEW_DETAILS_LIST_PATH}`;

export const RESTAURANT_REVIEW_ABSOLUTE_DETAIL_PATH = (reviewNumber: number | string) => `${RESTAURANT_PATH}/${REVIEW_PATH}/reviewDetail/${reviewNumber}`;
export const RESTAURANT_REVIEW_ABSOLUTE_DETAIL_WRITE_PATH = (restaurantId: number | string) => `${RESTAURANT_PATH}/${REVIEW_PATH}/reviewWrite/${restaurantId}`;
export const RESTAURANT_REVIEW_ABSOLUTE_DETAIL_UPDATE_PATH = (reviewNumber: number | string) => `${RESTAURANT_PATH}/${REVIEW_PATH}/reviewUpdate/${reviewNumber}`;

export const RESTAURANT_FAVORITE_ABSOLUTE_LIST_PATH = `${RESTAURANT_PATH}/${FAVORITE_PATH}/${RESTAURANT_FAVORITE_LIST_PATH}`;

export const MY_PAGE_ABSOLUTE_PATH = MY_PAGE_PATH;
export const MY_PAGE_SITE_ABSOLUTE_PATH = `${MY_PAGE_PATH}/${MY_PAGE_SITE_PATH}`;
export const USER_INFO_UPDATE_ABSOLUTE_PATH = `${MY_PAGE_PATH}/${USER_INFO_UPDATE_PATH}`;
export const USER_DELETE_ABSOLUTE_PATH = `${MY_PAGE_PATH}/${USER_DELETE_PATH}`;
export const USER_DELETE_FINALLY_ABSOLUTE_PATH = `${MY_PAGE_PATH}/${USER_DELETE_PATH}/${USER_DELETE_FINALLY_PATH}`;

export const BOARD_ABSOLUTE_PATH = BOARD_PATH;

export const NOTICE_BOARD_LIST_ABSOLUTE_PATH = `${BOARD_PATH}/${NOTICE_PATH}/${NOTICE_BOARD_LIST_PATH}`;
export const NOTICE_BOARD_WRITE_ABSOLUTE_PATH = `${BOARD_PATH}/${NOTICE_PATH}/${NOTICE_BOARD_WRITE_PATH}`;
export const NOTICE_BOARD_UPDATE_ABSOLUTE_PATH = (noticeNumber: number | string) => `${BOARD_PATH}/${NOTICE_PATH}/${NOTICE_BOARD_UPDATE_PATH}/${noticeNumber}`;
export const NOTICE_DETAILS_ABSOLUTE_PATH = (noticeNumber: number | string) => `${BOARD_PATH}/${NOTICE_PATH}/${noticeNumber}`;

export const INQUIRY_BOARD_LIST_ABSOLUTE_PATH = `${BOARD_PATH}/${INQUIRY_PATH}/${INQUIRY_BOARD_LIST_PATH}`;
export const INQUIRY_BOARD_WRITE_ABSOLUTE_PATH = `${BOARD_PATH}/${INQUIRY_PATH}/${INQUIRY_BOARD_WRITE_PATH}`;
export const INQUIRY_BOARD_UPDATE_ABSOLUTE_PATH = (inquiryNumber: number | string) => `${BOARD_PATH}/${INQUIRY_PATH}/${INQUIRY_BOARD_UPDATE_PATH}/${inquiryNumber}`;
export const INQUIRY_MY_BOARD_LIST_ABSOLUTE_PATH = `${BOARD_PATH}/${INQUIRY_PATH}/${INQUIRY_MY_BOARD_LIST_PATH}`;
export const INQUIRY_DETAILS_ABSOLUTE_PATH = (inquiryNumber: number | string) => `${BOARD_PATH}/${INQUIRY_PATH}/${inquiryNumber}`;


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
export const PASSWORD_UPDATE_REQUEST_URL = (userEmailId: string) => `${SERVER_AUTH_MODULE_URL}/password-update/${userEmailId}`;
export const PASSWORD_RECHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/password-recheck`;
export const BUSINESS_REGISTRATION_REQUEST_PATH = `${SERVER_AUTH_MODULE_URL}/business-registration`;

// description: USER 모듈 내의 기능 URL
export const SERVER_USER_MODULE_URL = `${SERVER_API_URL}/user`;
export const GET_SIGN_IN_USER_REQUEST_URL = `${SERVER_USER_MODULE_URL}/`;
// export const PASSWORD_RECHECK_REQUEST_URL = `${SERVER_USER_MODULE_URL}/password-recheck`;
export const INFO_UPDATE_REQUEST_URL = `${SERVER_USER_MODULE_URL}/info-update`;
export const INFO_DELETE_REQUEST_URL = `${SERVER_USER_MODULE_URL}/info-delete`;
export const GET_MY_INFO_URL = `${SERVER_USER_MODULE_URL}/information`;

// description: RESTAURANT 모듈 내의 기능 URL
export const SERVER_RESTAURANT_MODULE_URL = `${SERVER_API_URL}/restaurant`;
export const GET_SEARCH_RESTAURANT_LIST_URL = `${SERVER_RESTAURANT_MODULE_URL}/search`;
export const GET_RESTAURANT_URL = (restaurantId: number | string) => `${SERVER_RESTAURANT_MODULE_URL}/${restaurantId}`;
export const POST_RESTAURANT_INFO_UPLOAD = `${SERVER_RESTAURANT_MODULE_URL}/info-upload`;
//###
export const PATCH_RESTAURANT_INFO_UPDATE = (restaurantId: number | string) => `${SERVER_RESTAURANT_MODULE_URL}/${restaurantId}/info-update`;
//###

// description: REVIEW 모듈 내의 기능 URL
export const SERVER_REVIEW_MODULE_URL = `${SERVER_RESTAURANT_MODULE_URL}/review`;
// description: 아래의 경우 GET_REVIEW_URL로 먼저 화살표함수와 URL을 적어줘서 코드의 가독성을 향상시킬 수 있다.
export const GET_REVIEW_DETAILS_LIST_URL =  `${SERVER_REVIEW_MODULE_URL}/list`;
export const GET_REVIEW_DETAIL_URL = (reviewNumber:number|string) => `${SERVER_REVIEW_MODULE_URL}/${reviewNumber}`;

export const POST_REVIEW_REQUEST_URL = (restaurantId: number | string) => `${SERVER_REVIEW_MODULE_URL}/write/${restaurantId}`;
export const PATCH_REVIEW_REQUEST_URL = (reviewNumber: number | string) => `${SERVER_REVIEW_MODULE_URL}/update/${reviewNumber}`;
export const DELETE_REVIEW_REQUEST_URL = (reviewNumber: number | string) => `${SERVER_REVIEW_MODULE_URL}/delete/${reviewNumber}`;

// description: RESERVATION 모듈 내의 기능 URL
export const SERVER_RESERVATION_MODULE_URL = `${SERVER_RESTAURANT_MODULE_URL}/reservation`;
export const GET_RESERVATION_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}/list`;
export const GET_RESERVATION_CEO_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}/ceo-list`;
export const GET_RESERVATION_URL = (reservationNumber: number | string) => `${SERVER_RESERVATION_MODULE_URL}/${reservationNumber}`;
export const POST_RESERVATION_REQUEST_URL = (restaurantId: number | string) => `${SERVER_RESERVATION_MODULE_URL}/${restaurantId}`;
export const DELETE_RESERVATION_REQUEST_URL = (restaurantId: number | string) => `${SERVER_RESERVATION_MODULE_URL}/${restaurantId}`;
export const GET_RESERVATION_CHECK_REQUEST_URL = (restaurantId: number | string) => `${SERVER_RESERVATION_MODULE_URL}/${restaurantId}`;

// description: FAVORITE 모듈 내의 기능 URL
export const SERVER_FAVORITE_MODULE_URL = `${SERVER_RESTAURANT_MODULE_URL}/favorite`;
export const GET_FAVORITE_LIST_URL = `${SERVER_FAVORITE_MODULE_URL}/list`;
export const POST_FAVORITE_REQUEST_URL = (restaurantId: number | string) => `${SERVER_FAVORITE_MODULE_URL}/${restaurantId}`;
export const DELETE_FAVORITE_REQUEST_URL = (restaurantId: number | string) => `${SERVER_FAVORITE_MODULE_URL}/${restaurantId}`;
export const GET_FAVORITE_CHECK_REQUEST_URL = (restaurantId: number | string) => `${SERVER_FAVORITE_MODULE_URL}/${restaurantId}`;

// description: INQUIRY BOARD 모듈 내의 기능 URL
export const SERVER_INQUIRY_BOARD_MODULE_URL = `${SERVER_API_URL}/inquiry-board`;
export const POST_INQUIRY_BOARD_REQUEST_URL = `${SERVER_INQUIRY_BOARD_MODULE_URL}/`;
export const GET_INQUIRY_BOARD_LIST_URL = `${SERVER_INQUIRY_BOARD_MODULE_URL}/list`;
export const GET_INQUIRY_BOARD_SEARCH_LIST_URL = `${GET_INQUIRY_BOARD_LIST_URL}/search`;
export const GET_INQUIRY_BOARD_URL = (inquiryNumber: number | string) => `${SERVER_INQUIRY_BOARD_MODULE_URL}/${inquiryNumber}`;
export const POST_INQUIRY_BOARD_COMMENT_REQUEST_URL = (inquiryNumber: number | string) => `${SERVER_INQUIRY_BOARD_MODULE_URL}/${inquiryNumber}/comment`;
export const DELETE_INQUIRY_BOARD_URL = (inquiryNumber: number | string) => `${SERVER_INQUIRY_BOARD_MODULE_URL}/${inquiryNumber}`;
export const PATCH_INQUIRY_BOARD_REQUEST_URL = (inquiryNumber: number | string) => `${SERVER_INQUIRY_BOARD_MODULE_URL}/${inquiryNumber}`;
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
export const PATCH_NOTICE_BOARD_URL = (noticeNumber: number | string) => `${SERVER_NOTICE_BOARD_MODULE_URL}/${noticeNumber}`;

export const COUNT_PER_PAGE = 10;
export const COUNT_PER_SECTION = 10;
//###수정