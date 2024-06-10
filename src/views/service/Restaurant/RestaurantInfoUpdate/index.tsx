import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetRestaurantInfoRequest, PatchRestaurantInfoRequest } from 'src/apis/restaurant';
import { PatchRestaurantInfoRequestDto } from 'src/apis/restaurant/dto/request';
import { GetRestaurantInfoResponseDto } from 'src/apis/restaurant/dto/response';
import RestaurantInputBox from 'src/components/RestaurantInputBox';
import { RESTAURANT_INFO_ABSOLUTE_PATH } from 'src/constant';
import SelectBox from 'src/views/service/Restaurant/SelectBox';
import './style.css';
import { useUserStore } from 'src/stores';

export default function RestaurantInfoUpdate() 
{   
    // state //
    const { restaurantId } = useParams();
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
    const { businessRegistrationNumber } = useUserStore();
    const navigator = useNavigate();

    // function //
    const GetRestaurantInfoResponse = (result: GetRestaurantInfoResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            //alert(message);
            return;
        }

        const { restaurantImage, restaurantName, restaurantFoodCategory,
            restaurantPostalCode, restaurantLocation, restaurantTelNumber,
            restaurantSnsAddress, restaurantOperationHours, restaurantFeatures,
            restaurantNotice, restaurantRepresentativeMenu,
        } = result as GetRestaurantInfoResponseDto;
        setRestaurantImage(restaurantImage);
        setRestaurantName(restaurantName);
        setRestaurantFoodCategory(restaurantFoodCategory);
        setRestaurantPostalCode(restaurantPostalCode);
        setRestaurantLocation(restaurantLocation);
        setRestaurantTelNumber(restaurantTelNumber);
        setRestaurantSnsAddress(restaurantSnsAddress);
        setRestaurantOperationHours(restaurantOperationHours);
        setRestaurantFeatures(restaurantFeatures);
        setRestaurantNotice(restaurantNotice);
        setRestaurantRepresentativeMenu(restaurantRepresentativeMenu);
    }
   
    const PatchRestaurantInfoResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
                    result.code === 'NR' ? '존재하지 않는 식당입니다.' :
                        result.code === 'AF' ? '권한이 없습니다.' :
                            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if(!restaurantId) return;
        navigator(RESTAURANT_INFO_ABSOLUTE_PATH(restaurantId))
    }

    // event handler //
    const onUpdateClickHandler = () => {

        if (!restaurantImage || !restaurantName || !restaurantFoodCategory
            || !restaurantPostalCode || !restaurantLocation || !restaurantId) {
            //alert('필수 정보를 입력하지 않았습니다.');
            return;
        }

        const requestBody: PatchRestaurantInfoRequestDto =
        {
            restaurantImage: restaurantImage,
            restaurantName: restaurantName,
            restaurantFoodCategory: restaurantFoodCategory,
            restaurantPostalCode: restaurantPostalCode,
            restaurantLocation: restaurantLocation,
            restaurantTelNumber: restaurantTelNumber,
            restaurantSnsAddress: restaurantSnsAddress,
            restaurantOperationHours: restaurantOperationHours,
            restaurantFeatures: restaurantFeatures,
            restaurantNotice: restaurantNotice,
            restaurantRepresentativeMenu: restaurantRepresentativeMenu,
        }
        PatchRestaurantInfoRequest(restaurantId, requestBody, cookies.accessToken)
            .then(PatchRestaurantInfoResponse);
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

    const onPostalCodeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRestaurantPostalCode(value);
    }

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

    const onRepresentativeMenuKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        onUpdateClickHandler()
    };

    // effect //
    let effectFlag = false; 
    useEffect(() => {
    if (!cookies.accessToken || !restaurantId) {
        return;
    }
    if(effectFlag) return;
    effectFlag = true;

    GetRestaurantInfoRequest(restaurantId, cookies.accessToken)
        .then(GetRestaurantInfoResponse);
    }, []);
    
    const isRestUploadUpActive = restaurantImage && restaurantName && restaurantFoodCategory && restaurantPostalCode && restaurantLocation;
    const ButtonClass = `${isRestUploadUpActive ? 'restaurant-info-primary' : 'restaurant-info-disable'}-button`;

    // render //
    return (
        <>
            <div className="restaurant-info-write-title">식당 정보 수정</div>
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
        
                <RestaurantInputBox label="식당 우편번호" type="text" value={restaurantPostalCode}
                placeholder="우편번호를 입력해주세요" onChangeHandler={onPostalCodeChangeHandler}/>
        
                <RestaurantInputBox label="식당 연락쳐" type="text" value={restaurantTelNumber}
                placeholder="연락쳐를 입력해주세요" onChangeHandler={onTelNumberChangeHandler}/>
                                 
                <RestaurantInputBox label="운영 시간" type="text" value={restaurantOperationHours}
                placeholder="운영시간을 입력해주세요" onChangeHandler={onOperationHoursChangeHandler}/> 
        
                <RestaurantInputBox label="식당 특징" type="text" value={restaurantFeatures}
                placeholder="특징을 입력해주세요" onChangeHandler={onFeaturesChangeHandler}/>     
                
                <RestaurantInputBox label="식당 공지" type="text" value={restaurantNotice}
                placeholder="공지를 입력해주세요" onChangeHandler={onNoticeChangeHandler}/>
        
                <RestaurantInputBox label="대표메뉴" type="text" value={restaurantRepresentativeMenu}
                placeholder="대표메뉴를 입력해주세요" onChangeHandler={onRepresentativeMenuChangeHandler} 
                onKeydownHandler={onRepresentativeMenuKeydownHandler}/>

                <div> 사업자 등록번호: {businessRegistrationNumber} </div>
        
                <div className="restaurant-info-registered-button-box">
                    <button onClick={onUpdateClickHandler}
                    className={ButtonClass}>수정하기</button>
                </div>
            </div>
        </>
    )
}
//수정###