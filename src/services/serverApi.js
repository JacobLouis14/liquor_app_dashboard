import axios from "axios";

export const serverApi = async ({ httpMethod, url, reqBody, reqHeaders }) => {
  const reqConfig = {
    method: httpMethod,
    url: url,
    data: reqBody,
    headers: reqHeaders,
  };
  try {
    const response = await axios(reqConfig);
    return response;
  } catch (err) {
    return err.response;
  }
};
