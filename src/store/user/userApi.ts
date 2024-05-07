import fetchUser  from "../../utils/fetchUser";

const signupApi = async (
    email: string,
    password: string,
    token_expires_in: string,
  ) => {
    const response = await fetchUser.post('/signup', {
      email,
      password,
      token_expires_in
  })
  
      if (response.status === 400) {
        throw new Error('Email already exists');
      } else if(response.status === 500) {
        throw new Error('Network response was not ok');
      }
    return response.data;
  };

  const loginApi = async (
    email: string,
    password: string,
    token_expires_in: string,
  ) => {
    const response = await fetchUser.post('/login', {
      email,
      password,
      token_expires_in
  })

      if (response.status === 400) {
        throw new Error('Email already exists. Use the login screen!');
      } else if(response.status === 500) {
        throw new Error('Network response was not ok');
      }
    
    return response.data;
  };

  const refreshTokenApi = async (token: string, token_expires_in: string) => {
    const response = await fetchUser.post('/refresh-token', {
      refreshToken: token,
      token_expires_in
  })

      if (response.status === 400) {
        throw new Error('Email already exists. Use the login screen!');
      } else if(response.status === 500) {
        throw new Error('Network response was not ok');
      }
    
    return response.data;
  }

  export {signupApi, loginApi, refreshTokenApi}