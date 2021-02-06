import { useState } from "react";

const useApp = ()=>{
    const [isLoggedIn , setIsLoggedIn] = useState(true);
    return {
        isLoggedIn,
        setIsLoggedIn
    };
}
export default useApp;