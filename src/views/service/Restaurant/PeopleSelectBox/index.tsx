import { useState } from "react";
import './style.css';

// interface //
interface Prop {
    value: number|undefined;
    onChange: (value: number) => void;
    
}

// component //
export default function PeopleSelectBox({ value, onChange }: Prop) {

    const listItem = [
        { name: 1 , value: 1 },
        { name: 2 , value: 2 },
        { name: 3 , value: 3 },
        { name: 4 , value: 4 },
        { name: 5 , value: 5 },
        { name: 6 , value: 6 },
        { name: 7 , value: 7 },
        { name: 8 , value: 8 },
        { name: 9 , value: 9 },
        { name: 10 , value: 10 },
        { name: 11 , value: 11 },
        { name: 12 , value: 12 },
        { name: 13 , value: 13 },
        { name: 14 , value: 14 },
        { name: 15 , value: 15 },
        { name: 16 , value: 16 },
        { name: 17 , value: 17 },
        { name: 18 , value: 18 },
        { name: 19 , value: 19 },
        { name: 20 , value: 20 },
        { name: 21 , value: 21 },
        { name: 22 , value: 22 },
        { name: 23 , value: 23 },
        { name: 24 , value: 24 },
    ];

    // state //
    const [show, setShow] = useState<boolean>(false);
    const [name, setName] = useState<number>();
    
    // event handler //
    const onButtonClickHandler = () => {
        setShow(!show);
    };
    
    const onItemClickHandler = (value: number) => {
        listItem.forEach(item => { if (item.value === value) setName(item.name) })
        onChange(value);
        setShow(false);
    };

    // render //
    const buttonClass = show ? 'select-close-button' : 'select-open-button';
    return (
        <div className='select-box'>
            { value === undefined ? 
                <div className='select-none'>인원수</div> :
                <div className='select-item'>{value}</div>
            }
            <div className={buttonClass} onClick={onButtonClickHandler}></div>
            {show && 
                <div className='select-list'>
                    {listItem.map((item) => 
                        <div className='select-list-item-box' onClick={() => onItemClickHandler(item.value)}>
                            <div className='select-item'>{item.name}명</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
}
