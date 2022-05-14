import axios from "axios";
import { baseURL } from "../../../baseURL";

const GetDonations2 = async (status) => {
  try {
    const apiUrl = `${baseURL}/order/response/get`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (e) {
    return e;
  }
};

export default GetDonations2;
