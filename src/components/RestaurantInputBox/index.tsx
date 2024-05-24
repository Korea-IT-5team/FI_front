import React, { ChangeEvent, KeyboardEvent } from "react";
import './style.css';

export interface InputBoxProps {
    label: string;
    type: 'text' | 'password' |'file';
    value: string;
    placeholder: string;
    onChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
    message?: string;
    error?: boolean;
    accept?:'image/*';
    onKeydownHandler?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export default function RestaurantInputBox({ label, type, value, placeholder, accept, onChangeHandler, onKeydownHandler }: InputBoxProps) {

    return (
        <div className="input-box">
            <div className="input-label label">{label}</div>
            <div className="input-content-box">
                <input
                    className="input"
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChangeHandler}
                    onKeyDown={onKeydownHandler}
                />
            </div>
        </div>
    );
}