import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'

import { login, reset } from '../../features/auth/authSlice'

const Login = () => {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const handleClick = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div data-testid="login">
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <TextField name='email' placeholder='Enter email' variant="outlined" onChange={handleChange} fullWidth required />
                    <TextField name='password' placeholder='Enter password' type='password' variant="outlined" onChange={handleChange} fullWidth required />
                    <Button type='submit' color='primary' variant="contained" onClick={handleClick} style={btnstyle} fullWidth>Sign In'</Button>
                </Paper>
            </Grid>
        </div>
    )
}

export default Login