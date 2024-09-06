import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    let navigate  = useNavigate();
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPassowrdError] = useState(false);
    const [cpasswordError, setCPassowrdError] = useState(false);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState({name :'', email: '', password : '' , cPassword: ''})

    const handleChange = (e) => {
       setUserData({...userData , [e.target.name] : e.target.value});     
    }

    const validateEmail = () => {
        // Regular expression to validate email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(re.test(String(userData.email).toLowerCase())){
            setEmailError('');
            return true
        }else{
            setEmailError('Please enter a valid email address');    
            return false
        }
    };
    
    const validateCPassword = () => {
        // Regular expression to validate email
        if(userData.password !== userData.cPassword){
            setCPassowrdError('Password did not match');
            setError('')
            return true;
        }else{
            setCPassowrdError('');
            return false;
        }
    };

    const validatePassword = () => {
        // Regular expression to validate email
        if(userData.password === '' || userData.password.length <= 4){
            setPassowrdError('Please enter a valid password');
            setError('')
            return true;
        }else{
            setPassowrdError('');
            return false;
        }
    };
    const validateName = () => {
        // Regular expression to validate email
        if(userData.name === '' || userData.name.length < 3){
            setNameError('Please enter a valid name');
            return true;
        }else{
            setNameError('');
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        validateName();
        validateEmail();
        validatePassword();
        validateCPassword();
        if (!validateEmail() || validatePassword() || validateName() || validateCPassword()) {
            } else {
            try {
                const response =  await fetch("http://localhost:5000/api/auth/createuser", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "name": userData.name,
                        "email": userData.email,
                        "password": userData.password
                      })
                });

                if (!response.ok) {
                    // Handle HTTP errors
                    const errorData = await response.json();
                    throw { status: response.status, message: errorData.message || 'Something went wrong' };
                }
                const json = await response.json();
                if(json.status === false){
                    setError(json.message)
                }else{
                    props.showAlert("Your account has been created successfully.", "success");
                    setError('');
                    localStorage.setItem('token',json.authToken)
                    navigate('/');
                }
                
            } catch (error) {
                console.error("Error => ", error);
                alert(`${error.status} : ${error.message}`);
            }
        }
    }

  return (
    <div className="container text-center d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
    <div className="row w-100">
        <div className="col-md-8 d-flex align-items-center justify-content-center">
            <img src="/Images/LoginPageHero.png" height={500} />
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-center" style={{ paddingTop: '0px' }}>
        <form className="my-3 w-100" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="login" className="form-label d-flex justify-content-start">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder='Enter name'
                                className="form-control shadow p-3 bg-body rounded"
                                id="name"
                                name='name'
                                style={{ height: "45px" }}
                                value={userData.name}
                                onChange={handleChange}
                                required
                            />
                             {nameError && <div className="my-1 text-start" style={{ color: 'red', fontSize: "13px"}} >{nameError}</div>}
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="password" className="form-label d-flex justify-content-start">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder='Enter email'
                                className="form-control shadow p-3 bg-body rounded"
                                id="email"
                                name='email'
                                style={{ height: "45px" }}
                                value={userData.email}
                                onChange={handleChange}
                                required
                            />
                            {emailError && <div className="my-1 text-start" style={{ color: 'red', fontSize: "13px"}} >{emailError}</div>}
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="password" className="form-label d-flex justify-content-start">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder='Enter your password'
                                className="form-control shadow p-3 bg-body rounded"
                                id="password"
                                name='password'
                                style={{ height: "45px" }}
                                value={userData.password}
                                onChange={handleChange}
                                required
                            />
                             {passwordError && <div className="my-1 text-start" style={{ color: 'red', fontSize: "13px"}} >{passwordError}</div>}
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="cPassword" className="form-label d-flex justify-content-start">
                            Confirm Password
                            </label>

                            <input
                                type="password"
                                placeholder='Enter your confirm password'
                                className="form-control shadow p-3 bg-body rounded"
                                id="cPassword"
                                name='cPassword'
                                style={{ height: "45px" }}
                                value={userData.cPassword}
                                onChange={handleChange}
                                required
                            />
                        {cpasswordError && <div className="my-1 text-start" style={{ color: 'red', fontSize: "13px"}} >{cpasswordError}</div>}
                        {error && <div className="my-1 text-start" style={{ color: 'red', fontSize: "13px"}} >{error}</div>}
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary d-flex justify-content-start my-2 " >
                            Signup
                        </button>
                    </form>
        </div>
    </div>
</div>
  )
}

export default Signup