import axios from "axios";
import { baseURL } from "../../../baseURL";


const PutUpdateDonationStatus = async (id, active) => {
  try {
    const apiUrl = `${baseURL}/user/edit/admin?id=${id}&isActive=${active}`;
    const response = await axios.put(apiUrl);
    return response.data;
  } catch (e) {
    return e;
  }
};

export default PutUpdateDonationStatus;
