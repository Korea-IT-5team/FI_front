import React, { useState } from "react";
import './style.css';
import { useUserStore } from "src/stores";

interface Prop {
    value: string;
    onChange: (value: string) => void;
}

//                    component                    //
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
        { name: '중식' , value: '중식' }
    ];

    //                    state                    //
    const [show, setShow] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const { loginUserEmailId, loginUserRole } = useUserStore();
    
    //                    event handler                    //
    const onButtonClickHandler = () => {
        setShow(!show);
    };
    
    const onItemClickHandler = (value: string) => {
        listItem.forEach(item => {
            if (item.value === value) setName(item.name)
        })
        onChange(value);
        setShow(false);
    };

  
    //                    render                    //
    const buttonClass = show ? 'select-close-button' : 'select-open-button';
    return (
        <div className='select-box'>
            { value === '' ? 
            <div className='select-none'>주음식</div> :
            <div className='select-item'>{name}</div>
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