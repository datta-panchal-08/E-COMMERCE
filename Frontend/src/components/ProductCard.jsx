import React, { useState } from 'react'
import { BsCart3 } from "react-icons/bs";

const ProductCard = ({ product }) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectImg = (index) => {
        setSelectedIndex(index);
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
                    <button className='bg-zinc-700 rounded-md cursor-pointer hover:bg-zinc-800 duration-300 w-full text-sm uppercase text-white flex items-center justify-center gap-3 py-1.5 font-semibold'>
                        <BsCart3 className='text-xl' /> Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard