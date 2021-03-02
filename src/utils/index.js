import axios from "axios";

export const loadData = (url) => new Promise(resolve => {
  axios.get(url).then((res) => {
    resolve(res.data)
  })
});