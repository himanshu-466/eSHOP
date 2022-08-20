import React from 'react'
import Product from '../../Component/Product/Product'
import Slider from '../../Component/Slider/Slider'
const Home = () => {
    // const url = window.location.href;

    // const scrollToProducts = () => {
    //     if (url.includes("#products")) {
    //         window.scrollTo({
    //             top: 700,
    //             behavior: "smooth",
    //         })
    //         return
    //     }
    // }
    // useEffect(() => {
    //     scrollToProducts();
    // }, [])
    return (
        <div>
            <Slider />
            <Product />
        </div>
    )
}
export default Home