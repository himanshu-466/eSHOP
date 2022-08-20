import { doc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db, storage } from '../../../Firebase/config';
import styles from "./ViewProduct.module.scss";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Loader from '../../Loader/Loader';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from "notiflix";
import { useDispatch, useSelector } from 'react-redux';
import Search from "../../Search/Search"
import { selectProducts } from '../../../Redux/Slice/productSlice';
import useFetchCollection from '../../../CustomHooks/useFetchCollection';
import { STORE_PRODUCTS } from '../../../Redux/Slice/productSlice';
import { FILTER_BY_SEARCH, selectFilteredProducts } from "../../../Redux/Slice/filterSlice";
import Pagination from "../../Pagination/Pagination";

const ViewProduct = () => {
    const [search, setSearch] = useState("");
    const { data, isLoading } = useFetchCollection("products")
    const products = useSelector(selectProducts);
    const filteredProducts = useSelector(selectFilteredProducts)

    // Pagination stattus
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(4);

    // Get Current Products
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(STORE_PRODUCTS({ products: data }))
    }, [dispatch, data])

    useEffect(() => {
        dispatch(FILTER_BY_SEARCH({ products, search }));
    }, [dispatch, products, search]);

    const confirmDelete = (id, imageURL) => {
        Notiflix.Confirm.show(
            'Delete Product!!!',
            'You are about to delete this product',
            'Delete',
            'Cancel',
            function okCb() {
                deleteProduct(id, imageURL)
            },
            function cancelCb() {
                console.log("Delete cancled")
            },
            {
                width: '320px',
                borderRadius: '3px',
                titleColor: "orangered",
                onButtonbackground: "orangered",
                cssAnimationStyle: "zoom"

            },
        );
    }
    const deleteProduct = async (id, imageURL) => {
        try {
            // This actually delete node from firebase Firestore
            await deleteDoc(doc(db, "products", id));

            // This acually delete from storage 
            const storageRef = ref(storage, imageURL);
            await deleteObject(storageRef);
            toast.success("Product deleted successfully");

        }
        catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <>
            {isLoading && <Loader />}
            <div className={styles.table}>
                <h2>All Products</h2>

                <div className={styles.search}>
                    <p>
                        <b>{filteredProducts.length}</b> products found
                    </p>
                    <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                {filteredProducts.length === 0 ? (
                    <p>No product found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product, index) => {
                                const { id, name, price, imageURL, category } = product;
                                return (
                                    <tr key={id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={imageURL}
                                                alt={name}
                                                style={{ width: "100px" }}
                                            />
                                        </td>
                                        <td>{name}</td>
                                        <td>{category}</td>
                                        <td>{`$${price}`}</td>
                                        <td className={styles.icons}>
                                            <Link to={`/admin/add-product/${id}`}>
                                                <FaEdit size={20} color="green" />
                                            </Link>
                                            &nbsp;
                                            <FaTrashAlt
                                                size={18}
                                                color="red"
                                                onClick={() => confirmDelete(id, imageURL)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
                <Pagination productPerPage={productPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    totalProducts={filteredProducts.length}
                />
            </div>
        </>
    )
}

export default ViewProduct