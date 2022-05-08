import axios from 'axios'


const PutUpdateDonationStatus = async (id, status) => {

    try {

        const apiUrl = `https://localhost:44357/order/edit?id=${id}&status=${status}`
        const response = await axios.put(apiUrl)
        return response.data

    } catch(e) {
        return e
    }

}


export default PutUpdateDonationStatus