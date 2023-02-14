import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import swal from 'sweetalert'
import './profile.css'
// name:Admin
// phone:011498563
// email:admin@admin.com
// password:123456
// username:amir
const Profile = () => {
    const [isUpdate , setIsUpdate] = useState(false)
    const [profile , setProfile] = useState({})
    const [newProfile , setNewProfile] = useState({})
    const [yourName, setYourName] = useState('');
    const [userName, setUserName] = useState('');
    const [yourEmail, setYourEmail] = useState('');
    const [yourPhone, setYourPhone] = useState('');
    const [yourPassword, setYourPassword] = useState('');
    const formData = new FormData();
    formData.append('name' , yourName);
    formData.append('username' , userName);
    formData.append('email' , yourEmail);
    formData.append('phone' , yourEmail);
    formData.append('password' , yourPassword);
    const handleUpdateData = async () => {
        await axios.post(`https://client-api.fatoorah.sa/apiAdmin/Auth_private/edit_profile` , formData , {
            headers : {
                'Authorization': 'Bearer ' + profile?.token,
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'enctype': 'multipart/form-data',
            }
        })
        .then((result) => {
            if (result.data.status) {
                swal({
                    title: "update successfully!",
                    text: "You clicked the button!",
                    icon: "success",
                });
                localStorage.setItem('profileData' , JSON.stringify(result.data.data))
                window.location.reload()
            } else if(!result.data.status) {
                console.log(result.data);
                swal({
                    title: "failed!",
                    text: "You clicked the button!",
                    icon: "error",
                });
            }
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
        handleUpdateData();
    }
    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem('profileData')))
        setNewProfile(JSON.parse(localStorage.getItem('profileData')))
        newProfile && console.log(newProfile);
    } , []);

    return (
        <div className='profile'>
            <div className='profile-card'>
                <h3 className='profile-title'>My Profile</h3>
                <img className='profile-img' src={profile?.image} alt=''/>
                <span className='profile-name'>Name : <b>{profile?.name}</b></span>
                <span className='profile-phone'>Phone : <b>{profile?.phone}</b></span>
                <span className='profile-email'>Email : <b>{profile?.email}</b></span>
                <Button onClick={() => setIsUpdate(true)}>Update data</Button>
            </div>

            {isUpdate && <div className='update-form'>
                <Form onSubmit={handleValidate} noValidate validated={validated}>
                    <Row>
                        <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">
                            <Form.Control
                                required 
                                type="name" 
                                name="" 
                                placeholder="Name"
                                value={yourName}
                                onChange={(e) => setYourName(e.target.value)}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Name is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">
                            <Form.Control
                                required 
                                type="text" 
                                name="" 
                                placeholder="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <Form.Control.Feedback type='invalid'>
                                userName is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">
                            <Form.Control
                                required 
                                type="email" 
                                name="" 
                                placeholder="Email"
                                value={yourEmail}
                                onChange={(e) => setYourEmail(e.target.value)}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Email is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">
                            <Form.Control
                                required 
                                type="phone" 
                                name="" 
                                placeholder="Phone"
                                value={yourPhone}
                                onChange={(e) => setYourPhone(e.target.value)}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Phone is required
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
                                Update
                            </button>
                        </Form.Group>
                    </Row>
                </Form>
            </div>}
        </div>
    )
}

export default Profile