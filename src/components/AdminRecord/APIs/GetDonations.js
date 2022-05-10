import axios from 'axios'


const GetDonations = async (type) => {

    try {

        const apiUrl = `https://localhost:44357/user/get/userType/${type}`
        const response = await axios.get(apiUrl)
        return response.data

    } catch(e) {
        return e
    }

}


export default GetDonations