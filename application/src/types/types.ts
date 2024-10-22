import React from "react";

//

export interface IProductData {
    id: number | undefined;
    name: string | undefined;
    price: string | undefined;
    description: string | undefined;
    imagePath?: string | undefined;
    image?: File | null;
}

export interface IProductState {
    products: IProductData[];
    isLoading: boolean;
    isError: boolean;
}

//

// Props

export interface IPropsInput {
    name: string
    label: string
    value: string | File | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isRequired: boolean;
}

export interface IPropsButton {
    label: string
    isDisabled: boolean
    type: 'cancel' | 'another'
    onClick?: () => void
}

export interface IProductForm {
    existingProduct?: IProductData;
    onCancelEdit?: () => void;
}


//