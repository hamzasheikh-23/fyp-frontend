import axios from 'axios'


const GetDonations = async (status) => {

    try {

        const apiUrl = `${process.env.REACT_APP_API_URL}/donation/get?status=${status}`
        const response = await axios.get(apiUrl)
        return response.data

    } catch(e) {
        return e
    }

}


export default GetDonations