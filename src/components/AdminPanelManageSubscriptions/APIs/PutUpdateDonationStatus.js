import axios from 'axios';
import {baseURL} from '../../../baseURL';


const PutUpdateDonationStatus = async (id, status) => {

    try {

        const apiUrl = `${baseURL}/subscription/edit?id=${id}&isActive=${status}`
        const response = await axios.put(apiUrl)
        return response.data

    } catch(e) {
        return e
    }

}


export default PutUpdateDonationStatus