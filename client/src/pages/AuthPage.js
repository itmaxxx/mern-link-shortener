import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()
    const [ form, setForm ] = useState({ email: 'max@dm.com', password: 'Maka1122' })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    })

    const changeHandler = event => {
        setForm({ ...form, [ event.target.name ]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) {
            
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })

            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Auth page</h1>
                <form>
                    <div className="card">
                        <div className="card-content text-darken-2">
                            <div className="input-field">
                                <label htmlFor="email">Email</label>
                                <input 
                                    placeholder="johndoe@gmail.com" 
                                    id="email" 
                                    name="email"
                                    type="text" 
                                    className="validate" 
                                    value={ form.email }
                                    onChange={ changeHandler } 
                                    required />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password</label>
                                <input 
                                    placeholder="********" 
                                    id="password" 
                                    name="password"
                                    type="password" 
                                    className="validate" 
                                    value={ form.password }
                                    onChange={ changeHandler } 
                                    required />
                            </div>
                        </div>
                        <div className="card-action">
                            <button 
                                className="waves-effect waves-light btn" 
                                onClick={loginHandler}
                                disabled={ loading } >
                                Login
                            </button>
                            <button 
                                className="waves-effect waves-light btn" 
                                onClick={ registerHandler }
                                disabled={ loading } >
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}