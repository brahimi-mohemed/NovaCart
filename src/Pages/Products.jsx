import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Card from "../Components/Card"

function Products({products, categories, error}){
    const [currentPage, setCurrentPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const selectedCategory = searchParams.get("category")
    const [inputs, setInputs] = useState({
        search: "",
        category: selectedCategory || "all",
        sort: "default"
    })

    const displayedProducts = 
        products.filter(item => item.title.toLowerCase().includes(inputs.search.trim().toLocaleLowerCase()))
        .filter(item => {
            if (inputs.category === "all" || item.category === inputs.category){
                return true
            }
        }).sort((a, b)=> {
            switch (inputs.sort) {
                case "default" :
                    return true

                case "rating" :
                    return b.rating - a.rating 

                case "priceLow" :
                    return a.price - b.price
                    
                case "priceHigh" :
                    return b.price - a.price

                case "name-asc" :
                    return a.title.localeCompare(b.title)    

                case "name-desc" :
                    return b.title.localeCompare(a.title)    
            }
        })

    const itemsPerPage = 20
    const totalPages = Math.ceil(displayedProducts.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentProducts = displayedProducts.slice(startIndex, startIndex + itemsPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [inputs.search, inputs.category, inputs.sort])

    useEffect(()=> {
        window.scrollTo(0, 0)
    }, [currentPage])

    const handleChange = (e) => {
        const name = e.target.name 
        const value = e.target.value
        setInputs(state => ({...state, [name]: value}))
    }

    const resetFilters = () => {
        setInputs({        
        search: "",
        category: "all",
        sort: "default"
    })
        setSearchParams("")
        setCurrentPage(1)
    }

    return(
        <>
        <div className="products-heading">
            <h1>Products</h1>
            <p>Browse our complete collection.</p>
        </div>
        <div className="search-field">
            <label>Search
                <input name="search" onChange={handleChange} value={inputs.search} placeholder="Search product..."/>
            </label>
            <label>Filter By
                <select className="filter-select" onChange={handleChange} name="category" value={inputs.category}>
                    <option value="all">All</option>
                {categories.map(item => (
                    <option key={item.slug} value={item.slug}>
                        {item.name}
                    </option>
                ))}
                </select>
            </label>
            <label>Sort By
                <select className="sort-select" onChange={handleChange} name="sort" value={inputs.sort}>
                    <option value="default">default</option>
                    <option value="rating">rating</option>
                    <option value="priceLow">Price: low → high</option>
                    <option value="priceHigh">Price: high → low</option>
                    <option value="name-asc">Name A → Z</option>
                    <option value="name-desc">Name Z → A</option>
                </select>
            </label>
            <button onClick={resetFilters} className="reset-btn">Reset</button>
            <p className="search-result">{currentProducts.length.toString().padStart(2)} Results </p>
        </div>

        <div className="products-container">

            {error && <p className="txt-msg">{error.message} </p>}
            {!displayedProducts.length && !error && 
            <p className="txt-msg">No products found, Try changing your search or filters.</p>}
            {currentProducts.map((product, index) => (
                <Card key={index} product={product}/>
            ))}
        </div>
        <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(page => page - 1)}>
                Previous
            </button>

            {Array.from({length: totalPages}, (_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                >
                    {index + 1}
                </button>
            ))}
            <button
                disabled={currentPage === totalPages}
                onClick={() => {
                    setCurrentPage(page => page + 1)
                    }}>
                Next
            </button>

        </div>
        </>
    )

}

export default Products