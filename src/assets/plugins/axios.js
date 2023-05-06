import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://us-central1-cds-store-5fecd.cloudfunctions.net/app/api/",
});

export default axiosInstance;
