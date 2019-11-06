import axios from  'axios';

export default (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
  })

  return {
    read() {
      return instance.get('/')
        .then(res => res.data)
        .catch((e) => { throw e; });
    },
  };
};
