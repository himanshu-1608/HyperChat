import { useState } from 'react';
import useApi from './useApi';
import useToken from './useToken';

const Uselogin = (setIsloggedIn) => {
	const { setToken } = useToken();
	const apiCall = useApi();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const HandleLogin = async () => {
		const { token } = await apiCall({
			data: {
				email: email,
				password: password,
			},
			method: 'POST',
			path: 'user/loginuser',
		});
		if (token) {
			setIsloggedIn(true);
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
