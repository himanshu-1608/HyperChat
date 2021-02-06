const apiURL = 'http://localhost:8080';
async function apiCall({ token, data, method, path }) {
    if(token && data){
        return fetch(`${apiURL}/${path}`, {
            method: method,
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(data => data.json());
    }else if(data){
        return fetch(`${apiURL}/${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(data => data.json());
    }else if(token){
        return fetch(`${apiURL}/${path}`, {
            method: method,
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
        })
            .then(data => data.json());
    }
    else{
        return fetch(`${apiURL}/${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(data => data.json());
    }
}
const useApi = () =>{
    return apiCall;
}
export default useApi;