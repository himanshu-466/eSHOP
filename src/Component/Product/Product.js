import React, { useEffect, useState } from 'react'
import useFetchCollection from '../../CustomHooks/useFetchCollection';
import styles from "./Product.module.scss";
import ProductFilter from './ProductFilter/ProductFilter';
import ProductList from './ProductList/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, STORE_PRODUCTS, GET_PRICE_RANGE } from '../../Redux/Slice/productSlice';
import spinnerImg from "../../Asset/spinner.jpg";
import { FaCogs } from 'react-icons/fa';
const Product = () => {
    const { data, isLoading } = useFetchCollection("products")
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        dispatch(STORE_PRODUCTS({ products: data }))
        dispatch(GET_PRICE_RANGE({ products: data }))
    }, [dispatch, data])

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    }
    return (
        <section>
            <div className={`container ${styles.product}`}>
                <aside className={showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}>
                    {isLoading ? null : <ProductFilter />}
                </aside>
                <div className={styles.content}>
                    {isLoading ? <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} className="--center-all" /> : (<ProductList products={products} />)}
                    <div className={styles.icon} onClick={toggleFilter}>
                        <FaCogs size={20} color="orangered" />
                        <p>
                            <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Product