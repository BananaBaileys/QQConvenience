import React from 'react'
import { useEffect, useState} from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from "axios"
import { ComponentToPrint } from '../components/ComponentsToPrint';
import { useReactToPrint } from 'react-to-print';

function POSPage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const toastOptions = {
        autoClose: 400,
        pauseOnHover: true,
    }

    //get backend 'products' and put it in result
    const fetchProducts = async() => {
        setIsLoading(true);
        const result = await axios.get('products');
        setProducts(await result.data);
        setIsLoading(false);
    }

    const addProductToCart = async(product) =>{
        // check if the adding product exist
        let findProductInCart = await cart.find( i=>{
            return i.id === product.id
        });

        if (findProductInCart) {
            let newCart = [];
            let newItem;

            cart.forEach(cartItem => {
                if(cartItem.id === product.id) {
                    newItem = {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                        totalAmount: cartItem.price * (cartItem.quantity + 1)
                    }
                    newCart.push(newItem);
                } else {
                    newCart.push(cartItem);
                }
            });

            setCart(newCart);
            toast(`Added ${newItem.name} to cart`, toastOptions)
        } else {
            let addingProduct = {
                ...product,
                'quantity': 1,
                'totalAmount': product.price,
            }
            setCart([...cart, addingProduct]);
            toast(`Added ${product.name} to cart`, toastOptions)
        }

    }

    const removeProduct = async(product) =>{
        const newCart = cart.filter(cartItem => cartItem.id !== product.id);
        setCart(newCart);
    }

    const componentRef = useRef();

    const handleReactToPrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handlePrint = () => {
        handleReactToPrint();
    }

    useEffect(() => {
        fetchProducts();
    },[]);

    useEffect(() => {
        let newTotalAmount = 0;
        cart.forEach(icart => {
            newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
        })
        setTotalAmount(newTotalAmount);
    },[cart])

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
                <div className='table-responsive bg-dark'>
                    <table className='table table-responsive table-dark table-hover'>
                        <thread>
                            <tr>
                                <td>#</td>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Qty</td>
                                <td>Total</td>
                                <td>Action</td>
                            </tr>
                        </thread>
                    </table>
                </div>
        </div>
   </MainLayout>
  )
}

export default POSPage
