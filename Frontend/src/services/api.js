import axios from "axios";
  
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


const request = async ({endpoint, method="GET", data=null, params=null}) => {
    try {
      const response = await api({url:endpoint, method, data, params});
      return response;
   
  }catch (error){
      throw error.response?.data || error;
  }

  
} 

export default request;