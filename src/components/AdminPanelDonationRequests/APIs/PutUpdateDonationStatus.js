import axios from 'axios'


const PutUpdateDonationStatus = async (donationId, status) => {

    try {

        const apiUrl = `https://localhost:44357/donation/edit?id=${donationId}&&status=${status} `
        const response = await axios.put(apiUrl)
        return response.data

    } catch(e) {
        return e
    }

}


export default PutUpdateDonationStatus