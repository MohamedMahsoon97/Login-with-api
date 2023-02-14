import React, { useState } from 'react'
import axios from 'axios';
import { Col, Form } from 'react-bootstrap';
import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [profileData , setProfileData] = useState({})
    const [yourEmail, setYourEmail] = useState('');
    const [yourPassword, setYourPassword] = useState('');
    let history = useHistory();
    const formData = new FormData();
    formData.append('name' , yourEmail);
    formData.append('password' , yourPassword);

    const handleLogin = async () => {
        await axios
        .post(
            `https://client-api.fatoorah.sa/apiAdmin/Auth_general/login` , formData , {
                headers: {
                    'enctype': 'multipart/form-data',
                },
            }
        )
        .then((result) => {
            if (result.data.status) {
                console.log(result.data.data);
                setProfileData(result.data.data);
                localStorage.setItem('profileData' , JSON.stringify(result.data.data))
                swal({
                    title: "Login successfully!",
                    text: "You clicked the button!",
                    icon: "success",
                });
                // window.location.reload()
                history.push("/profile")
            } else if (!result.data.status) {
                swal({
                    title: "Login failed!",
                    text: "You clicked the button!",
                    icon: "error",
                });
            }
            
        }).catch((err) => {
            console.log(err);
        })
    }

    const [validated, setValidated] = useState(false);
    const handleValidate = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        handleLogin();
    }

    // https://client-api.fatoorah.sa/apiAdmin/Auth_private/edit_profile
    // name:Admin
    // phone:011498563
    // email:admin@admin.com
    // password:123456
    // username:amir

    return (
        <div className='login'>
            <div className='seller-login-content'>
                <h2 className='login-title'>Login</h2>
                <Form onSubmit={handleValidate} noValidate validated={validated} className="row">
                    <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom01">
                        <Form.Control
                                required 
                                type="name" 
                                name="" 
                                placeholder="Email"
                                value={yourEmail}
                                onChange={(e) => setYourEmail(e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Name is required
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom01">
                        <Form.Control 
                            required
                            type="password" 
                            placeholder='password' 
                            value={yourPassword}
                            onChange={(e) => setYourPassword(e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid'>
                            password is required
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12"  controlId="validationCustom01">
                        <button className='login-seller-btn' id="new-verify-phone-btn" type='submit'>
                            Login
                        </button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Login