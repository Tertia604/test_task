import axios from "axios";

const getConfig = async (type) => {
  const response = await axios.get(`http://localhost:3000/${type}`);
  return response.data;
};

export default getConfig;
