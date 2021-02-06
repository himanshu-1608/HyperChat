import { useEffect, useState } from "react";

const useApp = ()=>{
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    return {
        isLoggedIn,
        setIsLoggedIn
    };
}
export default useApp;