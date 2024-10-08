import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbarr() {
  let navigate  = useNavigate();
  let location = useLocation();
  useEffect(()=> {
    console.log(location.pathname)
  }, [location])

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark  bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">INoteBook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? "active" : ''}`} to="/about">About</Link>
            </li>
          </ul>
          { !localStorage.getItem("token") ?<form className="d-flex" role="search">
          <Link  to="/login" className="btn btn-primary mx-2" role="button" >Login</Link>
          <Link  to="/signup" className="btn btn-primary mx-2" role="button" >Signup</Link>
          </form> : <Button onClick={handleLogout} className='btn btn-primary'> Logout</Button> }
        </div>
      </div>
    </nav> 
  )
}
