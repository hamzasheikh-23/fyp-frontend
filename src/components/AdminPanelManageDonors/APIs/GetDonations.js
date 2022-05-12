import axios from "axios";
import { baseURL } from "../../../baseURL";

const GetDonations = async (type) => {
  try {
    const apiUrl = `${baseURL}/user/get/userType/${type}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (e) {
    return e;
  }
};

export default GetDonations;
