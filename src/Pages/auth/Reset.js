import React, { useState } from 'react'
import styles from "./auth.module.scss"
import resetimg from "../../Asset/forgot.png"
import { Link } from "react-router-dom";
import Card from '../../Component/card/Card';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../../Firebase/config";
import { toast } from 'react-toastify';
import Loader from '../../Component/Loader/Loader';
const Reset = () => {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const resetPassword = (e) => {
        e.preventDefault();
        setIsLoading(true)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false)
                toast.success("Check your email to reset your password")
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message);
            });

    }
    return (
        <>
            {isLoading && <Loader />}

            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={resetimg} alt="Reset" width="400" />
                </div>
                <Card>
                    <div className={styles.form}>
                        <h2>Reset Password</h2>
                        <form onSubmit={resetPassword}>
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit" className="--btn --btn-primary --btn-block">
                                Reset Password
                            </button>
                            <div className={styles.links}>
                                <p>
                                    <Link to="/login">Login</Link>
                                </p>
                                <p>
                                    <Link to="/register">Register</Link>
                                </p>
                            </div>
                        </form>


                    </div>
                </Card>
            </section>
        </>
    )
}

export default Reset