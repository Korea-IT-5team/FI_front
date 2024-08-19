import React from 'react'
import "./style.css";

export default function Provision() {
  return (
    <div id='provision-wrapper'>
      <div className='provision-container'>
        <div className='provision-title-box'>
          <div className='provision-title'>이용약관</div>
          <div className='provision-title-detail-box'>
            <div className='provision-title-detail-first'>맛집예약 이용약관</div>
            <div className='provision-title-detail-second'>본 약관은 [식당명] (이하 "당사")의 예약 서비스 이용에 관한 조건을 명시한 것입니다. 고객은 본 약관을 숙지하고 동의한 후 예약을 진행해 주시기 바랍니다.</div>
          </div>
          <div className='provision-title-detail-box'>
            <div className='provision-title-detail-first'>제1조 (목적)</div>
            <div className='provision-title-detail-second'>본 약관은 당사가 제공하는 예약 서비스의 이용에 대한 당사와 고객의 권리와 의무를 규정함을 목적으로 합니다.</div>
          </div>
          <div className='provision-title-detail-box'>
            <div className='provision-title-detail-first'>제2조 (용어의 정의)</div>
            <div className='provision-title-detail-second'>1."서비스"라 함은 고객이 온라인을 통해 당사의 식당 예약을 할 수 있도록 제공되는 모든 서비스를 의미합니다.</div>
            <div className='provision-title-detail-second'>2."고객"이라 함은 본 약관에 따라 당사가 제공하는 서비스를 이용하는 모든 이를 의미합니다.</div>
          </div>
          <div className='provision-title-detail-box'>
            <div className='provision-title-detail-first'>제3조 (예약 절차)</div>
            <div className='provision-title-detail-second'>1. 고객은 당사의 웹사이트 또는 앱을 통해 예약을 신청할 수 있습니다.</div>
            <div className='provision-title-detail-second'>2. 예약 신청 시 고객은 정확한 정보(이름, 연락처, 예약 인원 등)를 제공해야 합니다.</div>
            <div className='provision-title-detail-second'>3. 예약은 당사의 확인을 통해 확정됩니다. 확인되지 않은 예약은 무효입니다.</div>
          </div>
          <div className='provision-title-detail-box'>
            <div className='provision-title-detail-first'>제4조 (예약 변경 및 취소)</div>
            <div className='provision-title-detail-second'>1. 예약 변경 및 취소는 예약일로부터 최소 [몇 시간/일] 이전에 가능합니다.</div>
            <div className='provision-title-detail-second'>2. 예약 변경 및 취소는 웹사이트, 앱, 또는 고객센터를 통해 접수됩니다.</div>
            <div className='provision-title-detail-second'>3. 예약 시간에 늦을 경우, 사전 통지 없이 [몇 분] 이상 지연 시 예약이 자동 취소될 수 있습니다.</div>
            <div className='provision-title-detail-second'>4. 무단 취소 및 노쇼(No-show)가 반복될 경우, 향후 예약 서비스 이용에 제한이 있을 수 있습니다.</div>
          </div>
          <div className='provision-title-detail-box'>
            <div className='provision-title-detail-first'>제5조 (이용 제한)</div>
            <div className='provision-title-detail-second'>1. 당사는 다음과 같은 경우 예약을 제한하거나 취소할 수 있습니다.</div>
            <div className='provision-title-detail-second'>- 고객이 제공한 정보가 허위인 경우</div>
            <div className='provision-title-detail-second'>- 예약 이외의 목적으로 서비스를 이용하는 경우</div>
            <div className='provision-title-detail-second'>- 공공질서 및 미풍양속에 반하는 행위를 하는 경우</div>
            <div className='provision-title-detail-second'>2. 기타 당사가 부적절하다고 판단하는 행위가 발생한 경우</div>
          </div>
          <div className='provision-title-detail-box'>
            <div className='provision-title-detail-first'>제6조 (개인정보 보호)</div>
            <div className='provision-title-detail-second'>1. 당사는 고객의 개인정보를 보호하기 위해 관련 법령을 준수합니다.</div>
            <div className='provision-title-detail-second'>2. 개인정보의 수집, 이용, 보관, 처리에 관한 세부 사항은 당사의 개인정보 처리방침에 따릅니다.</div>
          </div>
          <div className='provision-title-detail-box'>
            <div className='provision-title-detail-first'>제7조 (책임의 한계)</div>
            <div className='provision-title-detail-second'>1. 당사는 예약 서비스 제공과 관련하여 발생하는 어떠한 직접적 또는 간접적 손해에 대해서도 책임을 지지 않습니다.</div>
            <div className='provision-title-detail-second'>2. 천재지변, 화재, 정전, 기타 불가항력적인 사유로 인해 예약이 취소될 경우, 당사는 이에 대한 책임을 지지 않습니다.</div>
          </div>
          <div className='provision-title-detail-box'>
            <div className='provision-title-detail-first'>제8조 (약관의 개정)</div>
            <div className='provision-title-detail-second'>1. 당사는 필요 시 본 약관을 개정할 수 있으며, 개정된 약관은 당사의 웹사이트에 공지됩니다.</div>
            <div className='provision-title-detail-second'>2.개정된 약관은 공지된 후 효력이 발생하며, 고객은 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.</div>
          </div>
          <div className='provision-title-detail-box'>
            <div className='provision-title-detail-first'>제9조 (준거법 및 관할)</div>
            <div className='provision-title-detail-second'>본 약관은 대한민국 법률에 따라 규율되며, 분쟁 발생 시 관할 법원은 당사 소재지를 관할하는 법원으로 합니다.</div>
          </div>
        </div>
      </div>
    </div>
  )
}