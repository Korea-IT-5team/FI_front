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
        { name: '한식', value: '한식' },
        { name: '일식', value: '일식' },
        { name: '중식', value: '중식' },
        { name: '양식', value: '양식' },
        { name: '분식', value: '분식' },
        { name: '치킨', value: '치킨' },
        { name: '피자', value: '피자' },
        { name: '패스트푸드', value: '패스트푸드' },
        { name: '고기', value: '고기' },
        { name: '뷔페', value: '뷔페' },
        { name: '멕시칸푸드', value: '멕시칸푸드' },
        { name: '아시안푸드', value: '아시안푸드' },
        { name: '카페', value: '카페' },
        { name: '기타', value: '기타'}
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
