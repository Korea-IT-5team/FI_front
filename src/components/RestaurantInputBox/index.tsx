import { ChangeEvent, KeyboardEvent } from "react";
import './style.css';

// interface //
export interface InputBoxProps {
    label: string;
    type: 'text' | 'password' |'file' | 'date';
    value?: string;
    placeholder: string;
    onChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
    message?: string;
    error?: boolean;
    accept?:'image/*';
    onKeydownHandler?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

// component //
export default function RestaurantInputBox({ label, type, value, placeholder, onChangeHandler, onKeydownHandler }: InputBoxProps) {

    // render //
    return (
        <div className="restaurant-input-box">
            <div className="restaurant-input-label label">{label}</div>
            <div className="restaurant-input-content-box">
                <input
                    className="restaurant-input"
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    maxLength={300}
                    onChange={onChangeHandler}
                    onKeyDown={onKeydownHandler}
                />
            </div>
        </div>
    );
}