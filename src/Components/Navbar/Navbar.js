import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Link, useHistory } from 'react-router-dom';
import './navbar.css'
const Header = () => {
    const history = useHistory();
    const [isLogged , setIsLogged] = useState(false);
    const [user , setUser] = useState({});
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profileData')))
        if (user) {
            setIsLogged(true)
        } else if (!user) {
            setIsLogged(false)
        }
    } , []);
    const handleLogout = () => {
        localStorage.removeItem('profileData')
        history.push('/')
        window.location.reload();
    }
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">Mahsoon</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {
                            !isLogged ? 
                            <div>
                                <Link to="/login">login</Link>
                            </div> 
                            :
                            <div className='d-flex'>
                                <div>Logged by : <Link to="/profile">{user?.name}</Link></div>
                                <span onClick={handleLogout} style={{margin : '0px 20px'}}>Logout</span>
                            </div>
                        }
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header