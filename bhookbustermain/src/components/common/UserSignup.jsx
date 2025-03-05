import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/Auth.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserSignup() {
  const navigate = useNavigate();
  const [animating, setAnimating] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm();
  
  const password = React.useRef({});
  password.current = watch("password", "");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const onSubmit = async (data) => {
    try {
      data.roleId="67bfe67942572fb2ba64ef14"
      console.log('data', data);
      const res = await axios.post("/user", data);
      toast.success('Account created successfully!');
      navigate('/user/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error)
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  const handleLoginTransition = () => {
    setAnimating(true);
    setTimeout(() => {
      navigate('/user/login');
    }, 500); // Transition duration match karna
  };

  return (
    <div className={`auth-container ${animating ? 'slide-left' : ''}`}>
      <div className="auth-left">
        <div className="auth-welcome">
          <h1>Join Us Today</h1>
          <p>Create an account and start your journey with us. It only takes a few minutes.</p>
          
          <div className="auth-switch-left">
            <button 
              className="switch-button-left login-button"
              onClick={handleLoginTransition}
            >
              <span>Login</span>
              <div className="button-glow"></div>
            </button>
          </div>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-form-container">
          <div className="glow-effect"></div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                {...register("name", { 
                  required: "Full name is required",
                  minLength: { 
                    value: 2, 
                    message: "Name must be at least 2 characters" 
                  } 
                })}
                className={errors.UserName ? "input-error" : ""}
              />
              {errors.UserName && <p className="error-message">{errors.UserName.message}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                
                placeholder="Enter your email"
                {...register("email", { 
                  required: "Email is required", 
                  pattern: { 
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                    message: "Invalid email address" 
                  } 
                })}
                className={errors.Email ? "input-error" : ""}
              />
              {errors.Email && <p className="error-message">{errors.Emailmail.message}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                 
                  placeholder="Create a password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { 
                      value: 8, 
                      message: "Password must be at least 8 characters" 
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                    }
                  })}
                  className={errors.Password ? "input-error" : ""}
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.Password && <p className="error-message">{errors.Password.message}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: value => value === password.current || "Passwords do not match"
                  })}
                  className={errors.confirmPassword ? "input-error" : ""}
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select 
                id="role" 
                {...register("role", { required: "Please select a role" })}
                className={errors.Role ? "input-error" : ""}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
              {errors.role && <p className="error-message">{errors.role.message}</p>}
            </div>
            
            <button type="submit" className="auth-button">Sign Up</button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }


export default UserSignup;