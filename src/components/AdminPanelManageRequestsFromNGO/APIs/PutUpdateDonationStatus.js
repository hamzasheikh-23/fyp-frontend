import axios from "axios";
import { baseURL } from "../../../baseURL";

const PutUpdateDonationStatus = async (caseId, status) => {
  try {
    const apiUrl = `${baseURL}/case/edit?id=${caseId}&&status=${status} `;
    const response = await axios.put(apiUrl);
    return response.data;
  } catch (e) {
    return e;
  }
};

export default PutUpdateDonationStatus;
