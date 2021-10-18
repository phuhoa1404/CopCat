const dev = {
    apiGateway: {
      URL: "http://127.0.0.1:8000",
    }
  };
  

const config = {
    MAX_ATTACHMENT_SIZE: 5000000,
    ...dev
  }
  
  export default config;