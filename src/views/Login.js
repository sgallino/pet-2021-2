import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import authService from "../services/auth.js";

function Login(props) {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async data => {
        console.log("Data: ", data);

        const exito = await authService.login({email: data.email, password: data.password});

        if(exito) {
            // Si tuvo éxito, emitimos un evento para informar del éxito.
            props.onLogin(authService.getUser());
        }
    }

    return (<main className="container">
        <h1>Iniciar Sesión</h1>

        <form
            action="#"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    {...register('email')}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    {...register('password')}
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
    </main>);
}

export default Login;
