import { useEffect, useState } from 'react';
import useApi from './useApi';
import useToken from './useToken';
const useMenu = () => {
    const { getToken } = useToken();
    const apiCall = useApi();
	const [groups, setGroups] = useState([]);
    const [dms, setDms] = useState([]);
    useEffect( async ()=>{
        const token = await getToken();
        const groupData = await apiCall({
            token,
            method:'GET',
            path:''
        });
        const dmData = await apiCall({
            token,
            method:'GET',
            path:''
        });
        setGroups(groupData.group);
        setDms(dmData.dms);
    },[]);
	return {
		groups,
		dms,
	};
};
export default useMenu;
