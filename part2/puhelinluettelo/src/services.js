import axios from "axios";
const baseUrl = "http://localhost:3002/persons";

const getAll = () => {
  const request = axios.get(baseUrl).then(response => response.data);
  return request;
};

const create = newObject => {
  const request = axios
    .post(baseUrl, newObject)
    .then(response => response.data);
  return request;
};

const update = (id, newObject) => {
  const request = axios
    .put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data);
  return request;
};

const deleteRecord = id => {
  const request = axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data);
  return request;
};

export default { getAll, create, update, deleteRecord };
