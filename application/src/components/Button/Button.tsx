import React from 'react';
import {IPropsButton} from "../../types/types.ts";
import './style.css'


const Button:React.FC<IPropsButton> = ({isDisabled, label, type, onClick}) => {
    return (
        <div>
            <button disabled={isDisabled} className={`button-default button-${type} ${isDisabled ? 'button-disabled' : ''}`}>{label}</button>
        </div>
    );
};

export default Button;