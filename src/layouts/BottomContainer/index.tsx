import { useNavigate } from "react-router";
import { INQUIRY_BOARD_LIST_ABSOLUTE_PATH, INTRODUCTION_COMPANY_ABSOLUTE_PATH, INTRODUCTION_POLICY_ABSOLUTE_PATH, INTRODUCTION_PROVISION_ABSOLUTE_PATH, NOTICE_BOARD_LIST_ABSOLUTE_PATH } from "src/constant";
import "./style.css";

// component //
export default function BottomBar() {

  // function //
  const navigation = useNavigate();

  // render // 
  return (
      <div className='bottom-box'>
          <div className='bottom-title'>Food Insight</div>
          <div className='bottom-navigation-box'>
              <div className='bottom-navigation' onClick={() => navigation(INTRODUCTION_COMPANY_ABSOLUTE_PATH)}>회사소개</div>
              <div className="bottom-divider">{'\|'}</div>
              <div className='bottom-navigation' onClick={() => navigation(INTRODUCTION_POLICY_ABSOLUTE_PATH)}>개인정보처리방침</div>
              <div className="bottom-divider">{'\|'}</div>
              <div className='bottom-navigation' onClick={() => navigation(INTRODUCTION_PROVISION_ABSOLUTE_PATH)}>이용약관</div>
              <div className="bottom-divider">{'\|'}</div>
              <div className='bottom-navigation' onClick={() => navigation(INQUIRY_BOARD_LIST_ABSOLUTE_PATH)}>도움말</div>
              <div className="bottom-divider">{'\|'}</div>
              <div className='bottom-navigation' onClick={() => navigation(NOTICE_BOARD_LIST_ABSOLUTE_PATH)}>공지사항</div>
          </div>
          <div className='bottom-detail-contents-box first'>
              <div className='bottom-detail-content'>(주)FoodInsight</div>
              <div className='bottom-detail-content'>대표자| 김나경 김다인 김유진 박주형</div>
              <div className='bottom-detail-content'>대한민국</div>
          </div>
          <div className='bottom-detail-contents-box second'>
              <div className='bottom-detail-content'>사업자등록번호 111-11-11111</div>
              <div className='bottom-detail-content'>TEL 1515-1515</div>
              <div className='bottom-detail-content'>FAX 02.000.000</div>
              <div className='bottom-detail-content'>EMAIL foodinsight@email.com</div>
          </div>
      </div>
  );
}