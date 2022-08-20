import React, { useEffect, useState } from 'react'
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs"
import { FaListAlt } from 'react-icons/fa';
import Search from '../../Search/Search';
import ProductItem from '../ProductItem/ProductItem';
import { useDispatch, useSelector } from "react-redux";
import { FILTER_BY_SEARCH, SORT_PRODUCTS } from '../../../Redux/Slice/filterSlice';
import { selectFilteredProducts } from '../../../Redux/Slice/filterSlice';
import Pagination from '../../Pagination/Pagination';
const ProductList = ({ products }) => {
    const [grid, setGrid] = useState(true);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest");
    const filteredProducts = useSelector(selectFilteredProducts)

    // Pagination stattus
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(2);

    // Get Current Products
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)


    // Pagination Status


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(FILTER_BY_SEARCH({ products: products, search }))
    }, [search, dispatch, products])

    useEffect(() => {
        dispatch(SORT_PRODUCTS({ products: products, sort }))
    }, [products, dispatch, sort])
    return (
        <>
            <div className={styles["product-list"]} id="product">
                <div className={styles.top}>
                    <div className={styles.icons}>
                        <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)} />
                        <FaListAlt size={22} color="#0066d4" onClick={() => setGrid(false)} />
                        <p>
                            <b>{filteredProducts.length}</b> Products found.
                        </p>
                    </div>

                    {/* Search Icon*/}
                    <div>
                        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    {/* Sort Products */}
                    <div className={styles.sort}>
                        <label>Sort by:</label>
                        <select value={sort} onChange={(e) => setSort(e.target.value)} >
                            <option value="latest">Latest</option>
                            <option value="lowest-price">Lowest Price</option>
                            <option value="highest-price">Highest Price</option>
                            <option value="a-z">A - Z</option>
                            <option value="z-a">Z - A</option>
                        </select>
                    </div>
                </div>
                <div className={grid ? `${styles.grid}` : `${styles.list}`}>
                    {products.length === 0 ? (<p>No Product Found</p>) : (<>
                        {currentProducts.map((product) => {
                            return (<div key={product.id}>
                                <ProductItem {...product} grid={grid}
                                    product={product}
                                />
                            </div>)
                        })}
                    </>)}
                </div>
                <Pagination productPerPage={productPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    totalProducts={filteredProducts.length}
                />
            </div>
        </>

    )
}

export default ProductList