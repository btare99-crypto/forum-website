import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import LatestComments from "../components/LatestComments";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || [],
  );
  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem("comments")) || [],
  );
  const [category, setCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handlePostsUpdate = () => {
      setPosts(JSON.parse(localStorage.getItem("posts")) || []);
    };

    window.addEventListener("postsUpdated", handlePostsUpdate);

    return () => {
      window.removeEventListener("postsUpdated", handlePostsUpdate);
    };
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleCommentClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const filteredPosts = posts.filter((p) => {
    const matchesCategory =
      category === "All Posts" ||
      p.category === category ||
      (category === "My Posts" && p.author === currentUser);
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["General", "Tech", "Sports", "Education", "Ideas"];

  return (
    <>
      <div className="searchbar">
        <div className="searchbar-categories">
          <nav>
            <ul>
              <li>
                <div className="dropdown">
                  <button
                    className="dropbtn"
                    onClick={() =>
                      setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                    }
                  >
                    Categories ▾
                  </button>
                  <div
                    className="dropdown-content"
                    style={{
                      display: isCategoryDropdownOpen ? "block" : "none",
                    }}
                  >
                    {categories.map((cat) => (
                      <a
                        key={cat}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCategory(cat);
                          setIsCategoryDropdownOpen(false);
                        }}
                      >
                        {cat}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  id="all-posts"
                  className={category === "All Posts" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setCategory("All Posts");
                  }}
                >
                  All Posts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  id="my-posts"
                  className={category === "My Posts" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setCategory("My Posts");
                  }}
                >
                  My Posts
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="searchbar-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <section className="preview">
        <div className="preview-container animated-text">
          <h2>Explore Forum</h2>
          <p>
            Explore the forum below and find answers to all of your questions
          </p>
        </div>
      </section>

      <section className="main-content">
        <section className="createpost">
          <div className="latest-comments-header">
            <div>
              <h2 className="latest-comments-title">
                <i class="fa-solid fa-layer-group"></i> {category}
              </h2>
              <p className="latest-comments-subtitle">
                Discover what others are sharing
              </p>
            </div>
            <div className="postbutton">
              <button onClick={() => navigate("/create-post")}>
                Create new post
              </button>
            </div>
          </div>
        </section>

        <section className="card-grid">
          <div className="cards">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onViewClick={handlePostClick}
                onCommentClick={handleCommentClick}
              />
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <div className="no-posts" style={{ display: "block" }}>
              No posts found
            </div>
          )}
        </section>
      </section>

      <section>
        <LatestComments comments={comments} />
      </section>
    </>
  );
};

export default HomePage;
