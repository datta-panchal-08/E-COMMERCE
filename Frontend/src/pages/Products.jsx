import React, { useEffect, useState } from 'react'
import FilterSidebar from '../components/FilterSidebar'
import ProductCard from '../components/ProductCard'
import { toast } from 'react-toastify'
import { get } from '../api/endpoint'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../redux/productSlice'

const Products = () => {
  const { products } = useSelector(state => state.product);
  const [allProducts, setAllProducts] = useState([]);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [priceFilter, setPriceFilter] = useState("lowToHigh");
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const res = await get('/product/all-products')

      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }


useEffect(() => {
  if (allProducts.length === 0) return;

  let filtered = [...allProducts];

  if (search.trim() !== "") {
    filtered = filtered.filter(p =>
      p.productName?.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category !== "All") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (brand !== "All") {
    filtered = filtered.filter(p => p.brand === brand);
  }

  if (priceFilter === "lowToHigh") {
    filtered = [...filtered].sort((a, b) => a.productPrice - b.productPrice);
  }

  if (priceFilter === "highToLow") {
    filtered = [...filtered].sort((a, b) => b.productPrice - a.productPrice);
  }

  dispatch(setProducts(filtered));

}, [search, category, brand, priceFilter, allProducts]);


  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-2 px-4 md:px-8 py-8 max-w-[1400px] mx-auto">

      {/* Sidebar */}
      <div className="w-full lg:w-[280px]">
        <FilterSidebar
          brand={brand}
          setBrand={setBrand}
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          allProducts={allProducts}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
        />
      </div>

      {/* Products Section */}
      <div className="flex-1 flex flex-col gap-5">

        {/* Product Cards */}
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {products?.map((product) => (
            <div
              key={product._id}
              className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Products
