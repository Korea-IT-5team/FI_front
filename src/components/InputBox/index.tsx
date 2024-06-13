import { ChangeEvent, KeyboardEvent } from "react";
import "./style.css"

export interface InputBoxProps {
    label?: string;
    type: 'text' | 'password';
    value: string;
    placeholder: string;
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    buttonTitle?: string;
    buttonStatus?: boolean;
    onButtonClickHandler?: () => void;
    message?: string;
    error?: boolean;
    onKeydownHandler?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputBox({ label, type, value, placeholder, onChangeHandler, buttonTitle, buttonStatus, onButtonClickHandler, message, error, onKeydownHandler }: InputBoxProps) {

    const buttonClass = buttonStatus ? 'common-input-primary-button' : 'common-input-second-button';
    const messageClass = 'common-input-message ' + (error ? 'error' : 'primary');

    return (
        <div className="common-input-box">
            <div className="common-input-content-box">
                <input
                    className="common-input"
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChangeHandler}
                    onKeyDown={onKeydownHandler}
                />
                { buttonTitle && 
                <div className={buttonClass} onClick={onButtonClickHandler}>
                    {buttonTitle}
                </div> 
                }
            </div>
            <div className={messageClass}>
                {message}
            </div>
        </div>
    );
}