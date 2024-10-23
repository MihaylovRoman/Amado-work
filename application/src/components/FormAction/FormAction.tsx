import React, {useEffect, useState} from 'react';
import Button from "../Button/Button.tsx";
import Input from "../Input/Input.tsx";
import './style.css'
import {IProductData, IProductForm} from "../../types/types.ts";
import InputFile from "../InputFile/InputFile.tsx";
import TextArea from "../TextArea/TextArea.tsx";


const FormAction: React.FC<IProductForm> = ({existingProduct, onCancelEdit}) => {

    const [product, setProduct] = useState<IProductData>({
        id: existingProduct?.id,
        name: existingProduct?.name,
        price: existingProduct?.price,
        description: existingProduct?.description,
        image: null,
        imagePath: existingProduct?.imagePath,
    })

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const {name} = e.target;
        if (e.target.files) {
            setProduct({
                ...product,
                [name]: e.target.files[0],
            })
        } else {
            setProduct({
                ...product,
                [name]: e.target.value
            })
        }
    }


    return (
        <div className='form-wrapper'>

            <form className='form-detail'>

                <h1 className='form-detail_tag'>{existingProduct ? 'Редактирование товара' : 'Добавление товара'}</h1>
                <h2 className='form-detail_obligation'>Заполните все обязательные поля с *</h2>


                <Input name={'name'}
                       isRequired={true}
                       label={'Название'}
                       value={product.name}
                       onChange={(e) => handleChangeInput(e)}
                />

                <Input name={'price'}
                       isRequired={true}
                       label={'Цена'}
                       value={product.price}
                       onChange={(e) => handleChangeInput(e)}
                />

                <InputFile name={'image'}
                       isRequired={false}
                       label={'Фото'}
                       value={product.image}
                       onChange={(e) => handleChangeInput(e)}
                />

                <TextArea
                    name={'description'}
                    isRequired={false}
                    label={'Описание'}
                    value={product.description}
                    onChange={(e) => handleChangeInput(e)}
                />



                <Button
                    type={'another'}
                    isDisabled={!(product.name && product.price)}
                    label={existingProduct ? 'Редактировать товар' : 'Добавить товар'}
                />

                {
                    existingProduct && <Button
                        type={'cancel'}
                        isDisabled={false}
                        label={'Отменить редактирование'}
                    />
                }

            </form>

        </div>
    );
};

export default FormAction;