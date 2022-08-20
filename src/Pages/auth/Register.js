import React, { useState } from 'react'
import styles from "./auth.module.scss"
import registerimg from "../../Asset/register.png"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../../Component/card/Card';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/config";
import Loader from '../../Component/Loader/Loader';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password does not match")
        }
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                setIsLoading(false)
                toast.success("Registration Successful...")
                navigate("/login")
                // ...
            })
            .catch((error) => {
                toast.error(error.message);
                setIsLoading(false)
                // ..
            });

    }
    return (
        <>
            <ToastContainer />
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <h2>Register</h2>
                        <form onSubmit={registerUser}>
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
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}


                            />
                            <button type="submit" className="--btn --btn-primary --btn-block">
                                Register
                            </button>
                        </form>
                        <span className={styles.register}>
                            <p>Already have an account?</p>
                            <Link to="/login">Login</Link>
                        </span>
                    </div>
                </Card>
                <div className={styles.img}>
                    <img src={registerimg} alt="Register" width="400" />
                </div>
            </section>
        </>
    )
}

export default Register