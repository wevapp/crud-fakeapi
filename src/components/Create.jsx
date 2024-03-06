import React, { useEffect, useState } from "react";
import {
  createPost,
  deletePost,
  fetchPosts,
  updatedPost,
} from "../services/serviceApi";

const Create = () => {
  const [postsData, setPostsData] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    userId: "",
  });

  useEffect(() => {
    const getPosts = async () => {
      const getPostData = await fetchPosts();
      setPostsData(getPostData);
    };
    getPosts();
  }, []);

  const handleDelete = async (postId) => {
    await deletePost(postId);
    setPostsData(postsData.filter((post) => post.id !== postId));
  };

  const handleAddPost = async () => {
    if (editingPost) {
      await updatedPost(editingPost.id, newPost);
      const updatedPosts = postsData.map((post) =>
        post.id === editingPost.id ? { ...post, ...newPost } : post
      );
      setPostsData(updatedPosts);
      setEditingPost(null);
    } else {
      const post = await createPost(newPost);
      setPostsData([...postsData, post]);
    }
    setNewPost({ title: "", userId: "" });
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setNewPost({ title: post.title, userId: post.userId });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="userId"
          value={newPost.userId}
          onChange={(e) => setNewPost({ ...newPost, userId: e.target.value })}
        />
        <button onClick={handleAddPost}>
          {editingPost ? "Update" : "Add"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>userId</th>
          </tr>
        </thead>
        <tbody>
          {postsData.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.userId}</td>
              <td>
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Create;
