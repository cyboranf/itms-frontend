import { useNavigate } from 'react-router-dom';
import './sign-up.scss';

export const SignUp2 = () => {
  const navigate = useNavigate()
  return (
    <div className="loginWrapper">
      <div className="login">
        <h1>Create account</h1>
        <div className="login-input">
          <input type="text" placeholder="First name" required />
        </div>
        <div className="login-input">
          <input type="text" placeholder="Last name" required />
        </div>
        <div className="login-input">
          <input type="text" placeholder="Pesel" required />
        </div>
        <div className="login-input">
          <input type="text" placeholder="Phone number" required />
        </div>

        <button onClick={()=>navigate("/register")}>Back</button>
        <div style={{ marginBottom: '25px' }}></div>
        <button onClick={()=>navigate("/login")}>Create</button>
      </div>
    </div>
  );
}