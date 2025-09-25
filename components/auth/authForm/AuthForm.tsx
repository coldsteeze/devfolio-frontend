"use client";

import { FormEvent, useState, useEffect } from 'react';
import styles from './AuthForm.module.scss';
import '../../../styles/UI/inputs.scss';
import '../../../styles/UI/buttons.scss';
import { loginOrRegistr } from '@/services/authService';

export default function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [isChanging, setIsChanging] = useState(false);

    useEffect(() => {
        if (isChanging) {
            const timer = setTimeout(() => {
                setIsChanging(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [isChanging]);

    const handleSwitch = (toLogin: boolean) => {
        setIsChanging(true);
        setTimeout(() => {
            setIsLogin(toLogin);
            setIsChanging(false);
        }, 400);
    };
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await loginOrRegistr(isLogin, email, password);
    };

    return (
        <div className={`${styles.mainContainer} ${!isLogin ? styles['right-panel-active'] : ''}`}>
            <form className={styles.mainContainer__login} onSubmit={handleSubmit}>
                <h2>
                    Login
                </h2>
                <input
                    className='input input--auth'
                    type="text"
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className='input input--auth'
                    type="text"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type='submit'
                    className='button'
                >Login</button>
            </form>
            <form className={styles.mainContainer__reg} onSubmit={handleSubmit}>
                <h2>
                    Sign Up
                </h2>
                <input
                    className='input input--auth'
                    type="text"
                    placeholder='First name'
                />
                <input
                    className='input input--auth'
                    type="text"
                    placeholder='Last name'
                />
                <input
                    className='input input--auth'
                    type="text"
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className='input input--auth'
                    type="text"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type='submit'
                    className='button'
                >Sign Up</button>

            </form>
            <div className={`${styles.overlay} ${isChanging ? styles.changing : ''}`}>
                {isLogin ? (
                    <div className={styles.overlay__content}>
                        <h2>
                            Your contacts and projects are waiting for you.
                        </h2>
                        <p>
                            Sign in and keep moving forward.
                        </p>
                        <button
                            className='button'
                            type="button"
                            onClick={() => handleSwitch(false)}
                        >
                            Switch to Sign Up
                        </button>
                    </div>
                ) : (
                    <div className={styles.overlay__content}>
                        <h2>
                            Join a professional community
                        </h2>
                        <p>
                            Share your expertise, discover projects, and expand your network.
                        </p>
                        <button
                            className='button'
                            type="button"
                            onClick={() => handleSwitch(true)}
                        >
                            Switch to Sign In
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}