import { useState } from "react";
import './style.css';

// interface //
interface Prop {
    value: string;
    onChange: (value: string) => void;
}

// component //
export default function SelectBox({ value, onChange }: Prop) {

    const listItem = [
        { name: '피자' , value: '피자' },
        { name: '햄버거' , value: '햄버거' },
        { name: '파스타' , value: '파스타' },
        { name: '일식' , value: '일식' },
        { name: '라멘' , value: '라멘' },
        { name: '국밥' , value: '국밥' },
        { name: '소고기' , value: '소고기' },
        { name: '돼지고기' , value: '돼지고기' },
        { name: '미역국' , value: '미역국' },
        { name: '뷔페' , value: '뷔페' },
        { name: '치킨' , value: '치킨' },
        { name: '한식' , value: '한식' },
        { name: '마라탕' , value: '마라탕' },
        { name: '중식' , value: '중식' },
        { name: '분식' , value: '분식' },
        { name: '냉면' , value: '냉면' },
        { name: '밀면' , value: '밀면' },
        { name: '샌드위치' , value: '샌드위치' },
        { name: '타코' , value: '타코' },
        { name: '쌀국수' , value: '쌀국수' },
        { name: '케밥' , value: '케밥' },
        { name: '샤브샤브' , value: '샤브샤브' },
        { name: '빙수' , value: '빙수' },
        { name: '피쉬앤칩스' , value: '피쉬앤칩스' },
        { name: '칼국수' , value: '칼국수' },
        { name: '타파스' , value: '타파스' },
        { name: '타이푸드' , value: '타이푸드' },
        { name: '파에야' , value: '파에야' },
        { name: '카레' , value: '카레' },
        { name: '베트남음식' , value: '베트남음식' },
        { name: '그리스음식' , value: '그리스음식' },
        { name: '순두부찌개' , value: '순두부찌개' },
        { name: '불고기' , value: '불고기' },
        { name: '기타' , value: '기타'}
    ];

    // state //
    const [show, setShow] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    
    // event handler //
    const onButtonClickHandler = () => {
        setShow(!show);
    };
    
    const onItemClickHandler = (value: string) => {
        listItem.forEach(item => { if (item.value === value) setName(item.name) })
        onChange(value);
        setShow(false);
    };

    // render //
    const buttonClass = show ? 'select-close-button' : 'select-open-button';
    return (
        <div className='select-box'>
            { value === '' ? 
                <div className='select-none'>주음식</div> :
                <div className='select-item'>{value}</div>
            }
            <div className={buttonClass} onClick={onButtonClickHandler}></div>
            {show && 
                <div className='select-list'>
                    {listItem.map((item) => 
                        <div className='select-list-item-box' onClick={() => onItemClickHandler(item.value)}>
                            <div className='select-item'>{item.name}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
}
