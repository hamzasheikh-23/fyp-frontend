import axios from "axios";
import { baseURL } from "../../../baseURL";

const PutUpdateDonationStatus = async (donationId, status) => {
  try {
    const apiUrl = `${baseURL}/donation/edit?id=${donationId}&&status=${status} `;
    const response = await axios.put(apiUrl);
    return response.data;
  } catch (e) {
    return e;
  }
};

export default PutUpdateDonationStatus;
