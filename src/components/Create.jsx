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
    <div className="container">
      <div className="text-center my-4">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
        >
          +Add
        </button>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add Something
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <input
                  type="text"
                  placeholder="Title"
                  className="form-control mt-4"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="userId"
                  className="form-control mt-4"
                  value={newPost.userId}
                  onChange={(e) =>
                    setNewPost({ ...newPost, userId: e.target.value })
                  }
                />
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleAddPost}
              >
                {editingPost ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* fields */}

      <table className="table table-striped table-hover">
        <thead className="border">
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Title</th>
            <th className="text-center">userId</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {postsData.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.userId}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-sm btn-warning mx-2 rounded-none"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo"
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(post.id)}
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Create;
