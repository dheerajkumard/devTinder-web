import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('Dheeru@123');
  const [error, setError] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try{
      const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, email, password}, {withCredentials: true});
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      navigate("/profile");
    }
    catch (error) {
      setError("Signup failed");
      console.error("Signup failed:", error);
    }
  }

  const handleLogin = async () => {
    try {const res = await axios.post(BASE_URL + "/login", {
        email, password
      }, {withCredentials: true});
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (error) { 
      setError("Invalid email or password");
      console.error("Login failed:", error);
      }
  }
  return (
    <div className="my-10 flex justify-center">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{isLoginForm ? "Login" : "Signup"}</h2>
          {!isLoginForm && <><fieldset className="fieldset">            
            <input type="text" value={firstName} className="input" placeholder="First Name" onChange={(e)=> setFirstName(e.target.value)}/>
          </fieldset>
          <fieldset className="fieldset">            
            <input type="text" value= {lastName} className="input" placeholder="Last Name" onChange = {(e)=> setLastName(e.target.value)}/>
          </fieldset>
          </>}
          <fieldset className="fieldset">            
            <input type="text" value={email} className="input" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
          </fieldset>
          <fieldset className="fieldset">            
            <input type="text" value= {password} className="input" placeholder="Password" onChange = {(e)=> setPassword(e.target.value)}/>
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions">
            {isLoginForm && <button className="btn btn-primary" onClick={handleLogin}>Login</button>}
            {!isLoginForm && <button className="btn btn-primary" onClick={handleSignup}>Signup</button>}
          </div>
          <div>
            {isLoginForm ? 
              <p>New user? <button className="text-blue-500" onClick={() => {setIsLoginForm(false)}}>Create an account</button></p> 
              : <p>Already have an account? <button className="text-blue-500" onClick={() => {setIsLoginForm(true)}}>Login</button></p>}
              </div>
        </div>
      </div>
    </div>
  );
}
export default Login;