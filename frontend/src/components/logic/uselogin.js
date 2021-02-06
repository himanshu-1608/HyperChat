import { useState } from 'react';
import useApi from './useApi';
import useToken from './useToken';

const Uselogin = ({ setIsLoggedIn }) => {
	const { setToken } = useToken();
	const apiCall = useApi();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [user, setUser] = useState({});
	const HandleLogin = async () => {
		const { token, user } = await apiCall({
			data: {
				userEmail: email,
				userpassword: password,
			},
			method: 'POST',
			path: 'user/loginuser',
		});
		if (token) {
			setIsLoggedIn(true);
			setUser(user);
		}
		setToken(token);
	};
	return {
		setEmail,
		setPassword,
		HandleLogin,
	};
};
export default Uselogin;
