import axios, { AxiosResponse } from "axios";

export const API_URL = "https://restcountries.com/v2";

const getCountries = async (
  endpoint: string
): Promise<AxiosResponse["data"]> => {
  const { data } = await axios.get(`${API_URL}${endpoint}`);
  return data;
};

export default getCountries;
