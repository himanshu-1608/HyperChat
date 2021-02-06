import { useState } from 'react';
const Uselogin = (setIsloggedIn) =>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const HandleLogin = () =>{
        console.log(email,password);
    };
    return {
        setEmail,
        setPassword,
        HandleLogin
    }
}
export default Uselogin