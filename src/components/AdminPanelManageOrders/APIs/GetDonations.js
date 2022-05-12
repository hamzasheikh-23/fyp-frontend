import axios from "axios";
import { baseURL } from "../../../baseURL";

const GetDonations = async (status) => {
  try {
    const apiUrl = `${baseURL}/order/get`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (e) {
    return e;
  }
};

export default GetDonations;
