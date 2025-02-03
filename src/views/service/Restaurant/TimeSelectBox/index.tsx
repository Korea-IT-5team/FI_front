import { useState } from "react";

// interface //
interface Prop {
    value: string;
    onChange: (value: string) => void;
}

// component //
export default function TimeSelectBox({ value, onChange }: Prop) {

    const listItem = [
        { name: '08:00' , value: '08:00' },
        { name: '08:30' , value: '08:30' },
        { name: '09:00' , value: '09:00' },
        { name: '09:30' , value: '09:30' },
        { name: '10:00' , value: '10:00' },
        { name: '10:30' , value: '10:30' },
        { name: '11:00' , value: '11:00' },
        { name: '11:30' , value: '11:30' },
        { name: '12:00' , value: '12:00' },
        { name: '12:30' , value: '12:30' },
        { name: '13:00' , value: '13:00' },
        { name: '13:30' , value: '13:30' },
        { name: '14:00' , value: '14:00' },
        { name: '14:30' , value: '14:30' },
        { name: '15:00' , value: '15:00' },
        { name: '15:30' , value: '15:30' },
        { name: '16:00' , value: '16:00' },
        { name: '16:30' , value: '16:30' },
        { name: '17:00' , value: '17:00' },
        { name: '17:30' , value: '17:30' },
        { name: '18:00' , value: '18:00' },
        { name: '18:30' , value: '18:30' },
        { name: '19:00' , value: '19:00' },
        { name: '19:30' , value: '19:30' },
        { name: '20:00' , value: '20:00' },
        { name: '20:30' , value: '20:30' },
        { name: '21:00' , value: '21:00' },
        { name: '21:30' , value: '21:30' },
        { name: '22:00' , value: '22:00' },
        { name: '22:30' , value: '22:30' },
        { name: '23:00' , value: '23:00' },
        { name: '23:30' , value: '23:30' },
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
                <div className='select-none'>시간</div> :
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
