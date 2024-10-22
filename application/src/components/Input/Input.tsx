import React, {useEffect, useState} from "react";
import {IPropsInput} from "../../types/types.ts";
import './style.css'

const Input: React.FC<IPropsInput> = ({name, value, label, onChange, isRequired}) => {

    const [isError, setIsError] = useState({
        count: 0,
        error: false
    })

    useEffect(() => {
        if (isError.count != 0) {
            value ? setIsError({
                count: 1,
                error: false
            }) : setIsError({
                count: 1,
                error: true
            })
        } else {
            setIsError({
                count: 1,
                error: false
            })
        }
    }, [value])


    return (
        <div className='input'>
            <p className={`input-default_label ${value && 'label-active'}`}>{label}{isRequired && '*'}</p>
            <input
                name={name}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={`${label}${isRequired ? '*' : ''}`}
                required={isRequired}
                className={`input-default ${value && 'input-ok'} ${isError.error && isRequired && 'input-error'}`}
            />
            <p className={`input-default_error-tag ${isError.error && isRequired ? 'label-active' : ''}`}>
                Обязательно для заполнения
            </p>
        </div>
    );
};

export default Input;