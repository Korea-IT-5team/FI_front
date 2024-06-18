import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { PostRestaurantInfoRequest } from 'src/apis/restaurant';
import { PostRestaurantInfoRequestDto } from 'src/apis/restaurant/dto/request';
import RestaurantInputBox from 'src/components/RestaurantInputBox';
import { RESTAURANT_LIST_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import SelectBox from 'src/views/service/Restaurant/SelectBox';
import './style.css';

export default function RestaurantInfoWrite() 
{   
    // state //
    const [cookies] = useCookies();
    const [restaurantImage, setRestaurantImage] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantFoodCategory, setRestaurantFoodCategory] = useState('');
    const [restaurantLocation, setRestaurantLocation] = useState('');
    const [restaurantTelNumber, setRestaurantTelNumber] = useState('');
    const [restaurantSnsAddress, setRestaurantSnsAddress] = useState('');
    const [restaurantOperationHours, setRestaurantOperationHours] = useState('');
    const [restaurantFeatures, setRestaurantFeatures] = useState('');
    const [restaurantNotice, setRestaurantNotice] = useState('');
    const [restaurantRepresentativeMenu, setRestaurantRepresentativeMenu] = useState('');
    const { businessRegistrationNumber } = useUserStore();
    const navigation = useNavigate();

    // function //
    const PostRestaurantInfoResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
                    result.code === 'AF' ? '권한이 없습니다.' :
                        result.code === 'DE' ? '이미 식당정보를 등록하셨습니다.' :
                            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        alert("등록이 완료되었습니다.");
        navigation(RESTAURANT_LIST_ABSOLUTE_PATH)
    }
    
    // event handler //
    // 식당 정보 등록
    const onUploadClickHandler = () => {

        if (!restaurantImage || !restaurantName || !restaurantFoodCategory
            || !restaurantLocation || !restaurantTelNumber) {
            return;
        }

        const requestBody: PostRestaurantInfoRequestDto =
        {
            restaurantImage: restaurantImage,
            restaurantName: restaurantName,
            restaurantFoodCategory: restaurantFoodCategory,
            restaurantLocation: restaurantLocation,
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

    const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result?.toString();
                if (base64String) {
                    setRestaurantImage(base64String);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantName(value);
    }

    const onFoodCategoryChangeHandler = (selectFood: string) => {
        setRestaurantFoodCategory(selectFood);
    };

    const onLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantLocation(value);
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

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onUploadClickHandler();
        }
    };
   
    const isRestUploadUpActive = restaurantImage && restaurantName && restaurantFoodCategory && restaurantLocation && restaurantTelNumber;
    const ButtonClass = `${isRestUploadUpActive ? 'restaurant-info-primary' : 'restaurant-info-disable'}-button`; 

    // render //
    return (
        <div className='restaurant-info-write-wrapper'>
            <div className="restaurant-info-write-title">식당 정보 등록</div>
            <div className="restaurant-info-write-box">
                <input type="file" accept="image/*" onChange={onImageChangeHandler} />
                    {restaurantImage && (
                        <img src={restaurantImage} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    )}
                <RestaurantInputBox label="식당 이름" type="text" value={restaurantName}
                placeholder="이름을 입력해주세요" onChangeHandler={onNameChangeHandler}/>
                <div className="restaurant-info-write-selectbox">                 
                    <SelectBox value={restaurantFoodCategory} onChange={onFoodCategoryChangeHandler} />
                </div>
                <RestaurantInputBox label="식당 주소" type="text" value={restaurantLocation}
                placeholder="주소를 입력해주세요" onChangeHandler={onLocationChangeHandler}/>
                <RestaurantInputBox label="식당 SNS 주소" type="text" value={restaurantSnsAddress}
                placeholder="주소를 입력해주세요" onChangeHandler={onSnsLocationChangeHandler}/>
                <RestaurantInputBox label="식당 연락처" type="text" value={restaurantTelNumber}
                placeholder="연락처를 입력해주세요" onChangeHandler={onTelNumberChangeHandler} 
                onKeydownHandler={onKeyPressHandler}/>
                <RestaurantInputBox label="운영 시간" type="text" value={restaurantOperationHours}
                placeholder="운영시간을 입력해주세요" onChangeHandler={onOperationHoursChangeHandler}/> 
                <RestaurantInputBox label="식당 특징" type="text" value={restaurantFeatures}
                placeholder="특징을 입력해주세요" onChangeHandler={onFeaturesChangeHandler}/>     
                <RestaurantInputBox label="식당 공지" type="text" value={restaurantNotice}
                placeholder="공지를 입력해주세요" onChangeHandler={onNoticeChangeHandler}/>
                <RestaurantInputBox label="대표메뉴" type="text" value={restaurantRepresentativeMenu}
                placeholder="대표메뉴를 입력해주세요" onChangeHandler={onRepresentativeMenuChangeHandler} 
                onKeydownHandler={onKeyPressHandler}/>
                <div> 사업자 등록번호: {businessRegistrationNumber} </div>
                <div className="restaurant-info-registered-button-box">
                    <button onClick={onUploadClickHandler}
                    className={ButtonClass}>등록하기</button>
                </div>
            </div>
        </div>
    );
}