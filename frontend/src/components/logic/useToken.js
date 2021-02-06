function getToken() {
	const tokenString = sessionStorage.getItem('token');
	const userToken = JSON.parse(tokenString);
	return userToken
}
function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}
const useToken = () =>{
    return{
        setToken,
        getToken
    };
}
export default useToken;