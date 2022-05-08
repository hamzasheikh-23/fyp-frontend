import axios from 'axios'


const GetDonations = async (status) => {

    try {

        const apiUrl = `https://localhost:44357/case/get`
        const response = await axios.get(apiUrl)
        return response.data

    } catch(e) {
        return e
    }

}


export default GetDonations