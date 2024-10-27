import './style.css'
import FormAction from "../../components/FormAction/FormAction.tsx";
import {useProducts} from "../../hooks/useProducts.ts";
import Product from "../../components/Product/Product.tsx";
import {useEffect, useState} from "react";
import {IProductData} from "../../types/types.ts";
import Loader from "../../components/Loader/Loader.tsx";
import NoProducts from "../../components/NoProducts/NoProducts.tsx";


const MainPage = () => {

    const {products, removeProduct, isLoading} = useProducts()
    const [existingProduct, setExistingProduct] = useState<IProductData | undefined>(undefined)

    const getProduct: IProductData = (id: string) => {
        const product: IProductData | undefined = products.find(product => product.id == id)

        return product
    }

    const handleClickManageButton = (id: string, type: string) => {
        type == 'edit' ? setExistingProduct(getProduct(id)) : removeProduct(id)
    }

    const handleClickCancel = () => {
        setExistingProduct(undefined)
    }


    if (isLoading) {
        return <Loader/>
    }


    return (


        <div className="mainpage">

            <FormAction existingProduct={existingProduct} onCancelEdit={handleClickCancel}/>
            <div className='controller-page'></div>
            {
                products ?
                    <div className="products">
                        {
                            products.map(product => <Product key={product.id}
                                                             product={product}
                                                             onManageClick={handleClickManageButton}
                                                             isEditing={existingProduct?.id === product.id}
                            />)
                        }
                    </div>
                    :
                    <NoProducts/>
            }

        </div>
    );
};

export default MainPage;