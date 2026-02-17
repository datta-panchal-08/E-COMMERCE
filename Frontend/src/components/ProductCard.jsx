import React, { useState } from 'react'
import { BsCart3 } from "react-icons/bs";
import toast from 'react-hot-toast';
import { post } from '../api/endpoint';
import { useDispatch } from 'react-redux';
import { setCart } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const token = localStorage.getItem("access-token");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectImg = (index) => {
        setSelectedIndex(index);
    }

    const addToCart = async (productId) => {
        try {
            setLoading(true);
            let res = await post("/cart/add", { productId });

            if (res.data.success) {
                dispatch(setCart(res?.data?.cart));
                toast.success(res?.data?.message);
                navigate("/cart");
            }

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=' w-56  custom-shadow rounded-xl overflow-hidden '>
            <div className="img w-full flex justify-center overflow-hidden">
                <img className='h-36 object-cover' src={product?.productImg[selectedIndex]?.url} alt={product.productName} />
            </div>
            <div className="content py-2 flex px-2 flex-col gap-3">
                <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                    {
                        product.productImg.map((img, index) => {
                            return (
                                <img
                                    key={index}
                                    onClick={() => selectImg(index)}
                                    src={img.url}
                                    alt=""
                                    className={`w-12 h-12 ${selectedIndex === index && "border-1 border-orange-400 rounded-md "} cursor-pointer`}
                                />
                            );
                        })
                    }

                </div>
                <h2 className='font-semibold text-sm'>{product?.productName}</h2>
                <div className="price">
                    <h3 className='font-semibold'>₹ {product.productPrice.toLocaleString("en-IN")}</h3>
                </div>
                <div className="">
                    <button type="button" onClick={() => addToCart(product._id)}
                        className='bg-pink-600 rounded-md cursor-pointer hover:bg-pink-700 duration-300 w-full text-sm uppercase text-white flex items-center justify-center gap-3 py-1.5 font-semibold'>
                        {
                            loading ? <div className="flex items-center justify-center"><div className="spinner"></div></div> : <><BsCart3 className='text-xl' /> Add to cart</>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard