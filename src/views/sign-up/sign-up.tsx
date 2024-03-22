import { useNavigate } from 'react-router-dom';
import './sign-up.scss';

export const SignUp = () => {
  const navigate = useNavigate()
  return (
    <div className="loginWrapper">
      <div className="login">
        <h1>Create account</h1>
        <div className="login-input">
          <input type="text" placeholder="Username" required />
        </div>
        <div className="login-input">
          <input type="text" placeholder="Email" required />
        </div>
        <div className="login-input">
          <input type="text" placeholder="Password" required />
        </div>
        <div className="login-input">
          <input type="text" placeholder="Confirm Password" required />
        </div>
        <div className="login-input">
          <select required>
            <option value="" disabled selected hidden>Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>

        <button onClick={()=>navigate("/register2")}>Next</button>
      </div>
    </div>
  );
}