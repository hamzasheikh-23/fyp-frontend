import axios from 'axios'


const PutUpdateDonationStatus = async (id, active) => {

    try {

        const apiUrl = `https://localhost:44357/user/edit/admin?id=${id}&isActive=${active}`
        const response = await axios.put(apiUrl)
        return response.data

    } catch(e) {
        return e
    }

}


export default PutUpdateDonationStatus