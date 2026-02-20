import React from 'react'

const FilterSidebar = ({ allProducts, search, setSearch, category, setCategory, brand, setBrand ,priceFilter,setPriceFilter}) => {

  const categories = allProducts.map(p => p.category);
  const uniqueCategory = ["All", ...new Set(categories)];

  const brands = allProducts.map(p => p.brand);
  const uniqueBrand = ["All", ...new Set(brands)];

  const handleCategoryClick = (val) => {
    setCategory(val);
  }

  const handleBrandChange = (e) =>{
    setBrand(e.target.value);
  }
  
  const handleFilterChange = (e) =>{
    setPriceFilter(e.target.value);
  }

  const resetFilters = () =>{
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceFilter("lowToHigh");
  }

  return (
    <div className=' hidden mt-5 md:flex md:flex-col md:gap-3 px-2 py-4  bg-gray-100 rounded-md h-[70vh] w-fit'>
      <div className="search">
        <input
        type="text"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className='border-2 border-gray-300 outline-none py-1 bg-white rounded-md px-1' placeholder='Search...' />
      </div>

      <div className="category flex flex-col justify-start gap-2">
        <h2 className='text-[1rem] font-semibold'>Category</h2>

        {
          uniqueCategory.map((item, index) => {
            return <div key={index} className="flex items-center gap-1">
              <input
                type="radio"
                name="category"
                checked={category === item}
                onChange={() => handleCategoryClick(item)}
              />
              <label htmlFor="">{item}</label>
            </div>
          })
        }

      </div>

      <div className="brand">
        <h2 className='font-semibold'>Brand</h2>
        <select  className='mt-1 py-1.5 outline-none border-2 border-gray-200 rounded-md bg-white w-full'
        value={brand} onChange={handleBrandChange}>
          {
            uniqueBrand.map((item, index) => {
              return <option value={item} key={index}>{item}</option>
            })
          }
        </select>
      </div>

      <div className="">
        <h2 className='font-semibold'>Price</h2>
        <select 
         value={priceFilter}
         onChange={handleFilterChange}
        className=" mt-1 w-full cursor-pointer border font-semibold outline-none rounded-md border-gray-200 border-2 bg-white py-1 px-2">
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
       
       <button onClick={resetFilters} className='text-white font-semibold bg-pink-600 rounded-md px-3 py-1'>Reset</button>

    </div>
  )
}

export default FilterSidebar