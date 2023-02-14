import './App.css';
import Login from './Components/Login/Login';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-toastify/dist/ReactToastify.minimal.css";
import Header from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                </Switch>
            </Router>
            
            <ToastContainer
                limit={3}
                rtl 
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
