import axios from 'axios'

const USER_API_URL = 'http://localhost:5000/fuelStations'

class UserDataService {

    retrieveAllUsers() {

        return axios.get(`${USER_API_URL}`);
    }

    retrieveUser() {

        return axios.get(`${USER_API_URL}`);
    }

    deleteUser() {

        return axios.delete(`${USER_API_URL}`);
    }

    updateUser(user) {

        return axios.put(`${USER_API_URL}`, user);
    }

    createUser(user) {

        return axios.post(`${USER_API_URL}`, user);
    }
}

export default new UserDataService()