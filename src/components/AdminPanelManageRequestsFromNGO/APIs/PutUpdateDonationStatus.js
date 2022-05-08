import axios from 'axios'


const PutUpdateDonationStatus = async (caseId, status) => {

    try {

        const apiUrl = `https://localhost:44357/case/edit?id=${caseId}&&status=${status} `
        const response = await axios.put(apiUrl)
        return response.data

    } catch(e) {
        return e
    }

}


export default PutUpdateDonationStatus