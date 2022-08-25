import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBlog() {
  const initial = {
    title: "",
    text: "",
  };
  const [blog, setBlog] = useState(initial);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blog.title || !blog.text) {
      setError(true);
      return false;
    }

    let result = await fetch("http://localhost:3005/api/create-blog", {
      method: "Post",
      body: JSON.stringify(blog),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setBlog(initial);
    navigate("/");
    result = await result.json();
    console.log(result);
  };

  return (
    <div className="blog">
      <h1>Add Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          className="inputBox"
          type="text"
          placeholder="Enter blog title"
          name="title"
          value={blog.title}
          onChange={handleChange}
        />
        {error && !blog.title && (
          <span className="invalid-input">Enter valid title</span>
        )}

        <textarea
          name="text"
          rows="10"
          cols="50"
          value={blog.text}
          onChange={handleChange}
          placeholder="Enter text here"
          style={{ padding: "20px", fontSize: "17px" }}
        />

        {error && !blog.text && (
          <span className="invalid-input">Enter valid Blog</span>
        )}
        <br />
        <br />
        <br />
        <input className="blog-button" type="submit" value="Add Blog" />
      </form>
    </div>
  );
}
