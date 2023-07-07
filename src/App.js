import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [emailCount, setEmailCount] = useState(0);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    axios
      .get("https://jsonplaceholder.typicode.com/comments", {
        params: {
          postId: 8
        }
      })
      .then((response) => {
        const postComments = response.data.filter(
          (comment) => comment.postId === 8
        );
        setEmailCount(postComments.length);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  const userPosts = posts.filter((post) => post.userId === 8);

  return (
    <div>
      <h1>Posts</h1>
      {userPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}

      <h1>Email Count for Post ID 8</h1>
      <p>{emailCount}</p>
    </div>
  );
}

export default App;
