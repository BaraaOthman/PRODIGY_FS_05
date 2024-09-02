
import http from "./http-common";

const register = (formData) => {
    return http.post(`/users/register`, formData);
}


const login = (formData) => {
    return http.post(`/users/login`, formData);
}

const users = () =>{
    return http.get(`/users/users`);
}

const deleteUs = () =>{
    return http.delete(`/users/deleteUser`)
}

const logout = ()=>{
    return http.get('/users/logout')
}
const UserService = {
    login,
    register,
    users,
    deleteUs,
    logout
}

export default UserService;
