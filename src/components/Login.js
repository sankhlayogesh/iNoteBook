import React, { useState,  } from 'react'
import { useNavigate  } from 'react-router-dom';

function Login(props) {
    let navigate  = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPassowrdError] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = async (e, type) => {
        if(type === 'email'){
            setEmail(e.target.value)
        }else{
            setPassword(e.target.value)
        }
    }


    const validateEmail = () => {
        // Regular expression to validate email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(re.test(String(email).toLowerCase())){
            setEmailError('');
            return true
        }else{
            setEmailError('Please enter a valid email address');    
            setError('');
            return false
        }
    };

    const validatePassword = () => {
        // Regular expression to validate email
        if(password === '' || password.length <= 4){
            setPassowrdError('Please enter a valid password');
            setError('')
            return true;
        }else{
            setPassowrdError('');
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        validateEmail();
        validatePassword();
        
        if (!validateEmail() || validatePassword()) {
            } else {
            setEmailError('');
            
            try {
                const response =  await fetch("http://localhost:5000/api/auth/login", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "email": email,
                        "password": password
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
                    props.showAlert('Login Successfully' , 'success')
                    setError('');
                    console.log("json.authToken", json.authToken)
                    localStorage.setItem('token',json.authToken)
                    navigate('/')
                }
                console.log("json => ", json)
                
            } catch (error) {
                console.error("Error => ", error);
                props.showAlert(error.message , 'danger');  
                // alert(`${error.status} : ${error.message}`);
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
                    <form className="my-3 w-100">
                        <div>
                            <label htmlFor="login" className="form-label d-flex justify-content-start">
                                Email
                            </label>
                            <input
                                type="text"
                                placeholder='example@gmail.com'
                                className="form-control shadow p-3 bg-body rounded"
                                id="email"
                                name='email'
                                style={{ height: "45px" }}
                                value={email}
                                onChange={(e) => handleChange(e, 'email')}
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
                                value={password}
                                onChange={(e) => handleChange(e, 'password')}
                                required
                            />
                        {passwordError && <div className="my-1 text-start" style={{ color: 'red', fontSize: "13px"}} >{passwordError}</div>}
                        {error && <div className="my-1 text-start" style={{ color: 'red', fontSize: "13px"}} >{error}</div>}
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary d-flex justify-content-start my-2 " onClick={handleSubmit}>
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
        // <div className="flex items-center h-[100vh] w-full px-[150px] justify-center space-x-36">
        //     <img src="/Images/LoginPageHero.png" alt="HeroImage" className="w-[20rem]" />
        //     <div className="flex flex-col items-center space-y-24 max-w-[350px]">
        //         <img src="/Images/RescheduledIcon.png" alt="Banner" className="w-[200px]" />
        //         <div>
        //             <p className="text-[#4B465C] text-[26px] font-semibold">Welcome Back!</p>
        //             <p className="text-[#4B465C] text-[18px] mt-[5px]">Please login with your registered mobile number</p>
        //             <div className="mt-[15px]">
        //                 <p className="text-[14px]">Mobile Number</p>
        //                 <input type="text" placeholder="+919495xxxxxx" required className="w-[100%] border-[1px] border-[#DBDADE] rounded-[5px] h-[35px] px-[10px]" />
        //             </div>

        //             <button  className=" mt-[40px] w-full text-center rounded-[5px] text-white bg-[#3C3836] py-[5px] cursor-pointer font-medium" >Get OTP</button>
        //         </div>
        //     </div>
        // </div>
    );
}

export default Login