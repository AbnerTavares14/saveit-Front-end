import axios from "axios";

const URL = "https://saveit-application.herokuapp.com/";

async function signUp(data) {
    return axios.post(`${URL}signup`, data);
}

async function login(data) {
    return axios.post(`${URL}login`, data);
}

async function getPosts() {
    return axios.get(`${URL}posts`);
}

async function getUser(id) {
    return axios.get(`${URL}user/${id}`);
}

function createPost(data, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.post(`${URL}posts`, data, config);
}

function verifyIfUserLikedPost(id, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.get(`${URL}like/${id}`, config);
}

function like(id, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.post(`${URL}like/${id}`, {}, config);
}

function unlike(id, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.post(`${URL}unlike/${id}`, {}, config);
}

function findUsers(username) {
    return axios.get(`${URL}users?search=${username}`);
}

function getPostsByUserId(userId) {
    return axios.get(`${URL}posts/user/${userId}`);
}


const api = {
    signUp,
    login,
    getPosts,
    getUser,
    createPost,
    verifyIfUserLikedPost,
    like,
    unlike,
    findUsers,
    getPostsByUserId

};

export default api;