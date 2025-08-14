import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";

const Login = () => {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('Dheeru@123');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <h2 className="card-title">Login</h2>
          <fieldset className="fieldset">            
            <input type="text" value={email} className="input" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
          </fieldset>
          <fieldset className="fieldset">            
            <input type="text" value= {password} className="input" placeholder="Password" onChange = {(e)=> setPassword(e.target.value)}/>
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;