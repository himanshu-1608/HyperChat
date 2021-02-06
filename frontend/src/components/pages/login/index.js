import '../../../assests/styles/login.css';
import Uselogin from '../../logic/uselogin';
function LoginPage({ setIsLoggedIn }) {
	const { setEmail, setPassword, HandleLogin } = Uselogin({ setIsLoggedIn });
	return (
		<div className="login-page">
			<div className="login-box">
				Login in hyper chat
				<input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
				<input
					placeholder="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div className="button" onClick={HandleLogin}>
					Log In
				</div>
			</div>
		</div>
	);
}
export default LoginPage;
