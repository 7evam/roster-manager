import axios from  'axios';

export default (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
  })

  return {
    getUser(userId) {
      return instance.get(`/${userId}`)
        .then(res => res.data)
        .catch((e) => { throw e; });
    },
    authenticateUser(email,password) {
      return instance.post(`/`, {
        email,
        password
      })
        .then(res => res.data)
        .catch((e) => { throw e; });
    },
    rosterSwap(team1,team2){
      return instance.patch('/', {
        team1id: team1.id,
        team2id: team2.id,
        team1slot: team1.slot,
        team2slot: team2.slot,
      })
        .then(res => res.data)
        .catch((e) => { throw e })
    },
    rosterFill(slot,team){
      console.log('heres the slot')
      console.log(slot)
      return instance.patch('/', {
        slot,
        teamId: team.id
      })
        .then(res => res.data)
        .catch((e) => { throw e })
    }
  };
};
