import React, { useState } from 'react'
import styles from "./auth.module.scss"
import loginimg from "../../Asset/login.png"
import { FaGoogle } from "react-icons/fa"
import { Link } from "react-router-dom";
import Card from '../../Component/card/Card';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase/config"
import { useNavigate } from 'react-router-dom';
import Loader from '../../Component/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleAuthProvider } from "firebase/auth";
import { useSelector } from 'react-redux';
import { selectPreviousURL } from '../../Redux/Slice/cartSlice';
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const previousURL = useSelector(selectPreviousURL);
    const navigate = useNavigate();
    const redirectUser = () => {
        if (previousURL.includes("cart")) {
            return navigate("/cart")
        }
        else {
            navigate("/")
        }
    }
    const loginUser = (e) => {
        e.preventDefault();
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setIsLoading(false)
                toast.success("Login Successful...")
                redirectUser();
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
                setIsLoading(false)
            });

    }


    // Login With Google
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                toast.success("Login Succesfully");
                redirectUser();
            }).catch((error) => {
                toast.error(error.message);
            });

    }
    return (
        <>
            <ToastContainer />
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={loginimg} alt="Login" width="400" />
                </div>
                <Card>
                    <div className={styles.form}>
                        <h2>Login</h2>
                        <form onSubmit={loginUser} >
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            />
                            <button type="submit" className="--btn --btn-primary --btn-block">
                                Login
                            </button>
                            <div className={styles.links}>
                                <Link to="/reset">Reset Password</Link>
                            </div>
                            <p>-- or --</p>
                        </form>
                        <button
                            className="--btn --btn-danger --btn-block"
                            onClick={signInWithGoogle}

                        >
                            <FaGoogle color="#fff" /> Login With Google
                        </button>
                        <span className={styles.register}>
                            <p>Don't have an account?</p>
                            <Link to="/register">Register</Link>
                        </span>

                    </div>
                </Card>
            </section>
        </>
    )
}

export default Login