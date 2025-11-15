import React, { useState } from "react";

export default function SimpleForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: title,
      body: body,
    };

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Success:", data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "300px", margin: "20px" }}>
      <h2>Create Post</h2>

      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Body:</label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
