import fetchClient from "../../utils/fetchUser";

const newsApi = async (page: number, pageSize: number) => {
  try {
    const response = await fetchClient.get(`posts?page=${page}&pageSize=${pageSize}`); 
    
    if(response.status === 500) {
        throw new Error('Network Error');
    }

   return response.data;
  }catch (error){
    throw new Error("Error fetching data");
  }
 
  };

export {newsApi}