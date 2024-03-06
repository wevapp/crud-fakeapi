import axios from "axios";

const API_URI = import.meta.env.VITE_API;

// fetch data
export const fetchPosts = async () => {
  try {
    const { data } = await axios.get(`${API_URI}?_limit=10`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// update data
export const updatedPost = async (id, editedPost) => {
  try {
    const { data } = await axios.put(`${API_URI}/${id}`, editedPost);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// delete data
export const deletePost = async (id) => {
  try {
    await axios.delete(`${API_URI}/${id}`);
    return id;
  } catch (error) {
    console.log(error);
  }
};

// set data
export const createPost = async (newPost) => {
  try {
    const { data } = await axios.post(API_URI, newPost);
    return data;
  } catch (error) {
    console.log(error);
  }
};
