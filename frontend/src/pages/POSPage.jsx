import React from 'react'
import { useEffect, useState} from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from "axios"

function POSPage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);

    //get backend 'products' and put it in result
    const fetchProducts = async() => {
        setIsLoading(true);
        const result = await axios.get('products');
        setProducts(await result.data);
        setIsLoading(false);
    }

    const addProductToCart = async(product) =>{

    }
    useEffect(() => {
        fetchProducts();
    },[]);



  return (
   <MainLayout>
       <div className='row'>
           <div className='col-lg-8'>
               {isLoading ? 'Loading' : <div className='row'>
                    {products.map((product, key) =>
                        <div key={key} className='col-lg-4'>
                            <div className='border' onClick={() => addProductToCart(product)}>
                                <p>{product.name}</p>
                                <img src={product.image} className="img-fluid" alt={product.name} />
                                <p>${product.price}</p>
                                </div>
                            </div>
//29:00
// why you no work man
                    )}
                </div>}
              
            </div>
            <div className='col-lg-4'></div>
                <div style={{display: "none"}}>
                    <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>
                </div>
        </div>
   </MainLayout>
  )
}

export default POSPage
