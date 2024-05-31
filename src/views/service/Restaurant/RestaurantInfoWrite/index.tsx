import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { PostRestaurantInfoRequest } from 'src/apis/restaurant';
import { PostRestaurantInfoRequestDto } from 'src/apis/restaurant/dto/request';
import RestaurantInputBox from 'src/components/RestaurantInputBox';
import { RESTAURANT_LIST_ABSOLUTE_PATH } from 'src/constant';
import SelectBox from 'src/views/service/Restaurant/SelectBox';
import './style.css';
import SelectBox from '../SelectBox';

export default function RestaurantInfoWrite() 
{   
    //                                      state                                               //
    const [cookies] = useCookies();
    const [restaurantImage, setRestaurantImage] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantFoodCategory, setRestaurantFoodCategory] = useState('');
    const [restaurantPostalCode, setRestaurantPostalCode] = useState('');
    const [restaurantLocation, setRestaurantLocation] = useState('');
    const [restaurantTelNumber, setRestaurantTelNumber] = useState('');
    const [restaurantSnsAddress, setRestaurantSnsAddress] = useState('');
    const [restaurantOperationHours, setRestaurantOperationHours] = useState('');
    const [restaurantFeatures, setRestaurantFeatures] = useState('');
    const [restaurantNotice, setRestaurantNotice] = useState('');
    const [restaurantRepresentativeMenu, setRestaurantRepresentativeMenu] = useState('');
    const [restaurantBusinessRegistrationNumber, setRestaurantBusinessRegistrationNumber] = useState('');
    const [restaurantImageCheck, setRestaurantImageCheck] = useState<boolean>(false);
    const [restaurantNameCheck, setRestaurantNameCheck] = useState<boolean>(false);
    const [restaurantFoodCategoryCheck, setRestaurantFoodCategoryCheck] = useState<boolean>(false);
    const [restaurantPostalCodeCheck, setRestaurantPostalCodeCheck] = useState<boolean>(false);
    const [restaurantLocationCheck, setRestaurantLocationCheck] = useState<boolean>(false);
    const [restaurantBusinessRegistrationNumberCheck, setRestaurantBusinessRegistrationNumberCheck] = useState<boolean>(false);
    const navigator = useNavigate();

    //                                      function                                            //

    //!!!
    const PostRestaurantInfoResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
                    result.code === 'AF' ? '권한이 없습니다.' :
                        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        alert("등록이 완료되었습니다.");
        navigator(RESTAURANT_LIST_ABSOLUTE_PATH)
    }
    //!!!


    //!!!
    //                                      event handler                                       //
    // 식당 정보 등록
    const onUploadClickHandler = () => {

        if (!restaurantImage || !restaurantName || !restaurantFoodCategory
            || !restaurantPostalCode || !restaurantLocation || !restaurantBusinessRegistrationNumber) {
            return;
        }

        const requestBody: PostRestaurantInfoRequestDto =
        {
            restaurantImage: restaurantImage,
            restaurantName: restaurantName,
            restaurantFoodCategory: restaurantFoodCategory,
            restaurantPostalCode: restaurantPostalCode,
            restaurantLocation: restaurantLocation,
            restaurantBusinessRegistrationNumber: restaurantBusinessRegistrationNumber,
            restaurantTelNumber: restaurantTelNumber,
            restaurantSnsAddress: restaurantSnsAddress,
            restaurantOperationHours: restaurantOperationHours,
            restaurantFeatures: restaurantFeatures,
            restaurantNotice: restaurantNotice,
            restaurantRepresentativeMenu: restaurantRepresentativeMenu,
        }
        PostRestaurantInfoRequest(requestBody, cookies.accessToken)
            .then(PostRestaurantInfoResponse);
    }
    //!!!

    const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantImage(value);
        setRestaurantImageCheck(!(value.length === 0));
    }


    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantName(value);
        setRestaurantNameCheck(!(value.length === 0));
    }

    const onFoodCategoryChangeHandler = (selectFood: string) => {
        setRestaurantFoodCategory(selectFood);
        setRestaurantFoodCategoryCheck(!(selectFood.length === 0));
    };

    const onPostalCodeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantPostalCode(value);
        setRestaurantPostalCodeCheck(!(value.length === 0));
    }

    const onLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantLocation(value);
        setRestaurantLocationCheck(!(value.length === 0));
    }

    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantTelNumber(value);
    }

    const onSnsLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantSnsAddress(value);
    }

    const onOperationHoursChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantOperationHours(value);
    }


    const onFeaturesChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantFeatures(value);
    }

    const onNoticeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantNotice(value);
    }

    const onRepresentativeMenuChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantRepresentativeMenu(value);
    }

    const onBusinessNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantBusinessRegistrationNumber(value);
        setRestaurantBusinessRegistrationNumberCheck(!(value.length === 0));
    }

    const onBusinessNumberKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        
        onUploadClickHandler()
        
    };
   
    const isRestUploadUpActive = restaurantImageCheck && restaurantNameCheck && restaurantFoodCategoryCheck && restaurantPostalCodeCheck && restaurantLocationCheck && restaurantBusinessRegistrationNumberCheck;
    const ButtonClass = `${isRestUploadUpActive ? 'restaurantinfo-primary' : 'restaurantinfo-disable'}-button`; 

    //                                      render                                              //
    return (
<>
    <div className="restaurantinfowrite-title">식당 정보 등록</div>
    <div className="restaurantinfowrite-box">
        <RestaurantInputBox label="식당 이미지" type="file" value={restaurantImage}  accept={'image/*'}
        placeholder="이미지를 삽입해주세요" onChangeHandler={onImageChangeHandler}/>
                               
        <RestaurantInputBox label="식당 이름" type="text" value={restaurantName}
        placeholder="이름을 입력해주세요" onChangeHandler={onNameChangeHandler}/>

        <div className="restaurantinfowrite-selectbox">                 
            <SelectBox value={restaurantFoodCategory} onChange={onFoodCategoryChangeHandler} />
        </div>  
                           
        <RestaurantInputBox label="식당 주소" type="text" value={restaurantLocation}
        placeholder="주소를 입력해주세요" onChangeHandler={onLocationChangeHandler}/>

        <RestaurantInputBox label="식당 SNS 주소" type="text" value={restaurantSnsAddress}
        placeholder="주소를 입력해주세요" onChangeHandler={onSnsLocationChangeHandler}/>

        <RestaurantInputBox label="식당 우편번호" type="text" value={restaurantPostalCode}
        placeholder="우편번호를 입력해주세요" onChangeHandler={onPostalCodeChangeHandler}/>

        <RestaurantInputBox label="식당 연락처" type="text" value={restaurantTelNumber}
        placeholder="연락처를 입력해주세요" onChangeHandler={onTelNumberChangeHandler}/>
                         
        <RestaurantInputBox label="운영 시간" type="text" value={restaurantOperationHours}
        placeholder="운영시간을 입력해주세요" onChangeHandler={onOperationHoursChangeHandler}/> 

        <RestaurantInputBox label="식당 특징" type="text" value={restaurantFeatures}
        placeholder="특징을 입력해주세요" onChangeHandler={onFeaturesChangeHandler}/>     
        
        <RestaurantInputBox label="식당 공지" type="text" value={restaurantNotice}
        placeholder="공지를 입력해주세요" onChangeHandler={onNoticeChangeHandler}/>

        <RestaurantInputBox label="대표메뉴" type="text" value={restaurantRepresentativeMenu}
        placeholder="대표메뉴를 입력해주세요" onChangeHandler={onRepresentativeMenuChangeHandler}/>
                            
        <RestaurantInputBox label="사업자 등록번호" type="text" value={restaurantBusinessRegistrationNumber}
        placeholder="사업자 등록번호를 입력해주세요" onChangeHandler={onBusinessNumberChangeHandler}
        onKeydownHandler={onBusinessNumberKeydownHandler}/>

        <div className="restaurantinfo-registered-button-box">
            <button onClick={onUploadClickHandler}
            className={ButtonClass}>등록하기</button>
        </div>
    </div>
</>
  )
}
//완료