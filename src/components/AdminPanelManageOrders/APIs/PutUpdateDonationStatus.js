import axios from "axios";
import { baseURL } from "../../../baseURL";

const PutUpdateDonationStatus = async (id, status) => {
  try {
    const apiUrl = `${baseURL}/order/edit?id=${id}&status=${status}`;
    const response = await axios.put(apiUrl);
    return response.data;
  } catch (e) {
    return e;
  }
};

export default PutUpdateDonationStatus;
