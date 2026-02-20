const currentPage = window.location.pathname.split("/").pop(); 
let currentUser = localStorage.getItem("currentUser"); 
let users = JSON.parse(localStorage.getItem("users")) || []; 
let posts = JSON.parse(localStorage.getItem("posts")) || []; 
let comments = JSON.parse(localStorage.getItem("comments")) || []; 

function renderLastThreeComments() { 
    const postId = Number(localStorage.getItem("selectedPost")); 
    
    const sortedComments = comments.sort((a, b) => b.id - a.id); 

    const lastThreeComments = sortedComments.slice(0, 3); 

    const commentsContainer = document.querySelector(".latest-comments-container");

    commentsContainer.innerHTML = ""; 

    lastThreeComments.forEach((comment) => { 
      const relatedPost = posts.find((p) => Number(p.id) === Number(comment.postId));
      
      const postAuthor = relatedPost ? relatedPost.author : "Unknown"; 

      const commentDiv = document.createElement("div"); 
      commentDiv.classList.add("single-comment"); 

      commentDiv.innerHTML = `
        <i class="fa-solid fa-circle-user"></i>
        <span class="profile-header-name">
            ${comment.author} to ${postAuthor} 
        </span>
        <p class="comment-date">${comment.date} at ${comment.time}</p>
        <p>${comment.comment}</p>
    `; 
      commentsContainer.appendChild(commentDiv);
    });
  }
function goTo(page){ 
    window.location.href = page; 
};

function getPostImage(post) { 
  return post.image && post.image.trim() !== "" 
    ? post.image 
    : "images/nophotoimage.avif"; 
}

function getPostComments(postId) { 
  return comments.filter(c => c.postId === postId); 
}

function profileHeaderName() { 
  const profileHeaderName = document.querySelector(".profile-header-name"); 
  const iconGuest = document.querySelector(".icon-guest"); 
  const iconLoggedIn = document.querySelector(".icon-logged-in"); 
  if (!profileHeaderName) return; 
  if (profileHeaderName) { 
    if (currentUser) { 
      profileHeaderName.innerText = currentUser; 
    } else { 
      profileHeaderName.innerText = `Guest`;
      iconGuest.style.display = "block"; 
      iconLoggedIn.style.display = "none"; 
    }
  }
}
document.addEventListener("DOMContentLoaded", profileHeaderName);

if (currentUser) { 
  const loginLink = document.getElementById("login-link");
  if (loginLink) {
    loginLink.style.display = "none"; 
  }
}

if (!currentUser) { 
  const logoutLink = document.querySelector(".logout-link");
  if (logoutLink) logoutLink.style.display = "none"; 
}


if (currentPage === "register.html") { 
  const form = document.querySelector("form"); 

  form.addEventListener("submit", function (e) { 
    
    e.preventDefault();

    const usernameInput = document.getElementById("username");
    const username = usernameInput.value;

    const email = document.getElementById("email").value;

    const passwordInput = document.getElementById("password");
    const password = passwordInput.value.trim(); 

    const confirmPasswordInput = document.getElementById("confirm-password");
    const confirmPassword = confirmPasswordInput.value.trim();

    const errorMsgForMatchingPass = document.getElementById("password-match");
    const errorMsgForUsernameFormat = document.getElementById("username-requirements");

    if (password !== confirmPassword) { 
      errorMsgForMatchingPass.style.visibility = "visible";
      confirmPasswordInput.style.borderBottomColor = "red";
      return; 
    }
 
    const usernameRegex = /^[A-Z][A-Za-z0-9._\- ]{2,}$/;
    if (!usernameRegex.test(username)) { 
      errorMsgForUsernameFormat.style.visibility = "visible";
      usernameInput.style.borderBottomColor = "red";
      return; 
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long, include 1 uppercase letter and 1 number.",
      );
      return; 
    }

    const exist = users.find((u) => u.username === username); 
    if (exist) { 
      alert("Username already exists"); 
      return; 
    }

    const newUser = { 
      username, 
      email,
      password,
      memberSince: new Date().toLocaleDateString(), 
      profilePic: "", 
    };

    users.push(newUser);  
    localStorage.setItem("users", JSON.stringify(users)); 
    localStorage.setItem("currentUser", username); 

    goTo("index.html"); 
  });
}

if (currentPage === "login.html") { 
  const form = document.querySelector("form"); 
  const usernameInput = document.getElementById("username"); 
  const passwordInput = document.getElementById("password"); 
  const errorMsg = document.getElementById("incorrectusername"); 

  function showLoginError() {
    usernameInput.style.borderBottom = "1px solid red";
    passwordInput.style.borderBottom = "1px solid red";
    errorMsg.style.visibility = "visible";
  }

  function clearLoginError() { 
    usernameInput.style.borderBottom = "";
    passwordInput.style.borderBottom = "";
    errorMsg.style.visibility = "hidden";
  }

  usernameInput.addEventListener("input", clearLoginError); 
  passwordInput.addEventListener("input", clearLoginError);

  form.addEventListener("submit", function (e) { 
    e.preventDefault(); 

    const username = usernameInput.value.trim(); 
    const password = passwordInput.value.trim(); 

    const user = users.find((u) => u.username === username && u.password === password); 

    if (user) { 
      localStorage.setItem("currentUser", username); 
      goTo("index.html"); 
    } else {
      showLoginError(); 
    }
  });
}

const logoutIcon = document.querySelector(".fa-right-to-bracket"); 
if (logoutIcon) { 
  logoutIcon.addEventListener("click", function () { 
    localStorage.removeItem("currentUser"); 
    goTo("login.html"); 
  });
}

if (currentPage === "create-post.html") { 
  const form = document.querySelector("form"); 

  form.addEventListener("submit", function (e) { 
    e.preventDefault(); 

    const title = document.getElementById("title").value;  
    const description = document.getElementById("description").value; 
    const file = document.getElementById("image").files[0]; 
    const category = document.getElementById("categories").value;

    if (!currentUser) { 
      alert("Please login first"); 
      goTo("login.html"); 
      return; 
    }

    const datePosted = new Date(); 
    const formattedDate = datePosted.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = datePosted.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const createPost = (image) => { 
      const newPost = { 
        id: Date.now(), 
        title, 
        category, 
        comments: [], 
        description, 
        image: image || "", 
        author: currentUser, 
        date: formattedDate, 
        time: formattedTime, 
      };

      
      posts.push(newPost); 
      localStorage.setItem("posts", JSON.stringify(posts)); 
      
      const user = users.find((u) => u.username === currentUser); 
      if (user) {
        if (!user.posts) user.posts = []; 
        user.posts.push(newPost); 
        localStorage.setItem("users", JSON.stringify(users)); 
      }
      goTo("index.html"); 
    };

    if (file) {
      const reader = new FileReader(); 
      reader.onload = function () {
        createPost(reader.result); 
      };
      reader.readAsDataURL(file); 
    } else {
      createPost(""); 
    }
  });
  
  function setupCharCounter(inputId, counterId) { 
    const input = document.getElementById(inputId); 
    const counter = document.getElementById(counterId);
    const max = input.getAttribute("maxlength"); 

    counter.textContent = `0 / ${max}`; 

    input.addEventListener("input", () => { 
      const currentLength = input.value.length; 
      counter.textContent = `${currentLength} / ${max}`; 
    });
  }

  setupCharCounter("title", "post-title-count"); 
  setupCharCounter("description", "post-description-count");
}

const noPost = document.querySelector(".no-posts"); 
const myPosts = posts.filter((p) => p.author === currentUser); 
if (posts.length > 0) { 
  if (noPost) { 
    noPost.style.display = "none";
  }
} else {
  noPost.style.display = "block"; 
}


if (currentPage === "index.html") { 
  const cardsContainer = document.querySelector(".cards"); 

  function renderPosts(filteredPosts) { 
    cardsContainer.innerHTML = "";  

    filteredPosts.forEach((post) => { 
      const card = document.createElement("div"); 
      card.classList.add("cardhome");  

      const imageSrc = getPostImage(post); 

      card.innerHTML = `
            <div class="post-header">
                <div class="post-meta">
                    <i class="fa-solid fa-circle-user"></i>
                    <div class="post-info">
                        <h3>${post.author}</h3>
                        <p>${post.date} at ${post.time}</p>
                    </div>
                </div>
                <img src="${imageSrc}" alt="Post image">
            </div>
                <div class="insidecards">
                    <p>${post.title}</p>
                    <div class="msgviewicon">
                        <i class="fa-regular fa-eye"></i><p>2</p>
                        <i class="fa-regular fa-message" title="comments"></i></i><p class="comments-count-icon">3</p>
                    </div>
                </div>
                <p class="comment-text">${post.description}</p>
            `;
      const commentIcon = card.querySelector(".comments-count-icon"); 
      const postComments = getPostComments(post.id); 
      commentIcon.textContent = `${postComments.length}`;

      const messageLogo = card.querySelector(".fa-message");
      messageLogo.addEventListener("click", (e) => {
        
        e.stopPropagation();
        localStorage.setItem("selectedPost", post.id); 
        goTo("post.html");
      });
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".fa-message")) {
          localStorage.removeItem("selectedPost");
        }
      });

      cardsContainer.appendChild(card); 
    });
  }

  const create = document.getElementById("createPostBtn"); 
  create.addEventListener("click", function () {
    
    goTo("create-post.html"); 
  });

  renderPosts(posts); 

 
  const searchInput = document.querySelector(".searchbar-search input"); 
  searchInput.addEventListener("input", function () {
    
    const query = this.value.toLowerCase(); 
    const filtered = posts.filter(
      (
        p, 
      ) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query), 
    );
    renderPosts(filtered); 
  });

 
  const myPostsBtn = document.querySelector(
    ".searchbar-categories ul li:nth-child(3) a",
  ); 
  myPostsBtn.addEventListener("click", function (e) {
    
    e.preventDefault(); 
    const postCategories = document.getElementById("post-categories");
    postCategories.innerHTML = "My Posts";
    const myPosts = posts.filter((p) => p.author === currentUser); 
    renderPosts(myPosts); 
  });

 
  const allPostsBtn = document.querySelector(
    ".searchbar-categories ul li:nth-child(2) a",
  ); 
  allPostsBtn.addEventListener("click", function (e) {
    
    e.preventDefault(); 
    const postCategories = document.getElementById("post-categories");
    postCategories.innerHTML = "All Posts";
    renderPosts(posts); 
  });
 
  const links = document.querySelectorAll(".dropdown-content a");
  const cards = document.querySelectorAll(".cardpost");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); 

      const category = this.dataset.category; 

      const categories = posts.filter((p) => p.category === category); 
      const postCategories = document.getElementById("post-categories");
      postCategories.innerHTML = `${category}`;
      renderPosts(categories);
    });
  });
  renderLastThreeComments();
  document.addEventListener("DOMContentLoaded", () => {
    renderLastThreeComments();
  });
}


if (currentPage === "profile.html") {

  if (myPosts.length > 0) {
    noPost.style.display = "none";
  } else {
    noPost.style.display = "block";
  }
  
  if (!currentUser) {
    const guestProfile = document.querySelector(".profile-content");
    guestProfile.innerHTML = `<div class="guest-box">
                                    <p class="guest-message">You’re currently browsing as a guest. Please log in to view your profile.</p>
                                    <button class="login-btn" type="click">Login</button>
                                </div>
                                `;

    const loginBtn = document.querySelector(".login-btn");
    loginBtn.addEventListener("click", function () {
        goTo("login.html");
    });
  }

  if (currentUser) {
    const cardsContainer = document.querySelector(".cards-profile"); 
    const myPosts = users.find((u) => u.username === currentUser)?.posts || []; 
    cardsContainer.innerHTML = ""; 

    myPosts.forEach((post, index) => {
      
      const card = document.createElement("div"); 
      card.classList.add("cardpost-profile"); 

      const imageSrc = getPostImage(post);

      card.innerHTML = `
                <div class="cardpost-profile">
                    <div class="editcardpost">
                        <div class="edit-delte-btns"> 
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        </div>
                        <img src="${imageSrc}" alt="Post image">
                    </div>
                    <div class="insidecards">
                        <p>${post.title}</p>
                    <div class="msgviewicon">
                        <i class="fa-regular fa-eye"></i><p>2</p>
                        <i class="fa-regular fa-message" title="comments"></i><p class="comments-count-icon">3</p>
                    </div>
                    </div>
                    <p class="comment-text">${post.description}</p>
                </div>
                
            `;
      cardsContainer.appendChild(card); 

      const postComments = getPostComments(post.id)
      const commentIcon = card.querySelector(".comments-count-icon");
      commentIcon.textContent = `${postComments.length}`;

     
      const deleteBtn = card.querySelector(".delete-btn"); 
      deleteBtn.addEventListener("click", () => {
        
        if (confirm("Are you sure you want to delete this post?")) {
          myPosts.splice(index, 1); 

          const globalIndex = posts.findIndex((p) => p.id === post.id); 
          if (globalIndex !== -1) posts.splice(globalIndex, 1); 

          localStorage.setItem("users", JSON.stringify(users)); 
          localStorage.setItem("posts", JSON.stringify(posts));

          card.remove(); 

          const postsCommentsEl = document.getElementById("posts-comments"); 
          if (postsCommentsEl)
            postsCommentsEl.innerText = `${myPosts.length} Posts | 0 Comments`; 
        }
      });

     
      const editBtn = card.querySelector(".edit-btn"); 
      editBtn.addEventListener("click", () => {
        
        const newTitle = prompt("Edit title:", post.title); 
        const newDescription = prompt("Edit description:", post.description); 

        if (newTitle !== null) post.title = newTitle; 
        if (newDescription !== null) post.description = newDescription; 

        card.querySelector(".insidecards p").innerText = post.title; 
        card.querySelector(".comment-text").innerText = post.description;

        const globalPost = posts.find((p) => p.id === post.id); 
        if (globalPost) {
          
          globalPost.title = post.title; 
          globalPost.description = post.description; 
        }

        localStorage.setItem("users", JSON.stringify(users)); 
        localStorage.setItem("posts", JSON.stringify(posts));
      });
    });
    const create = document.getElementById("createPostBtn");
    create.addEventListener("click", function () {
      goTo("create-post.html");
    });
  }

 
  const usernameEl = document.getElementById("profile-username"); 
  const memberEl = document.getElementById("member-since"); 
  const postsCommentsEl = document.getElementById("posts-comments"); 
  const profilePicEl = document.getElementById("profile-pic"); 
  const totalComments = myPosts.reduce((acc, p) => acc + p.comments.length, 0);

  if (currentUser) {
    
    const myPosts = users.find((u) => u.username === currentUser)?.posts || [];
    const user = users.find((u) => u.username === currentUser); 
    usernameEl.innerText = user.username; 
    memberEl.innerText = `Member since ${user.memberSince || "July 2025"}`; 

    postsCommentsEl.innerText = `${myPosts.length} Posts | ${totalComments} Comments`; 

    if (user.profilePic) profilePicEl.src = user.profilePic; 
  }
}

const textElement = document.getElementById("typing-text"); 

if (textElement) {
  
  const username = localStorage.getItem("username") || "Guest"; 
  const text = `Hi, Welcome ${currentUser}`; 

  textElement.innerText = ""; 

  let index = 0; 

  function type() {
    if (index < text.length) {
      
      textElement.innerText += text[index]; 
      index++;
      setTimeout(type, 150); 
    }
  }

  window.addEventListener("load", type); 
}

const profilePostsBy = document.getElementById("profilePostsBy");
if (profilePostsBy) {
  
  profilePostsBy.innerText = `Posts By ${currentUser}`; 
}


if (currentPage === "post.html") {

  const cardsContainer = document.querySelector(".cards-post");

 
  posts.forEach(p => {
    if (!Array.isArray(p.comments)) {
      p.comments = []; 
    }
  });

  localStorage.setItem("posts", JSON.stringify(posts));

 
  function getPostComments(postId) {
    const post = posts.find(p => Number(p.id) === Number(postId));
    return post ? post.comments : [];
  }

 
  function renderPosts(filteredPosts) {

    cardsContainer.innerHTML = "";

    filteredPosts.forEach(post => {

      const card = document.createElement("div");
      card.classList.add("cardpost");

      const imageSrc = getPostImage(post);

      card.innerHTML = `
        <div class="post-content">
            <div class="post-header">
                <div class="post-meta">
                    <i class="fa-solid fa-circle-user"></i>
                    <div class="post-info">
                        <h3>${post.author}</h3>
                        <p>${post.date} at ${post.time}</p>
                    </div>
                </div>
                <img src="${imageSrc}" alt="Post image">
            </div>

            <div class="insidecards">
                <p>${post.title}</p>
                <div class="msgviewicon">
                    <i class="fa-regular fa-eye"></i><p>2</p>
                    <i class="fa-regular fa-message"></i>
                    <p class="comments-count-icon">0</p>
                </div>
            </div>

            <p class="comment-text">${post.description}</p>
        </div>

        <div class="comment-section">
            <h2>Comments <span class="comments-count">(0)</span></h2>
            <div class="comments-container"></div>

            <div class="comments-form">
                <h2>Add a comment</h2>
                <form>
                    <textarea class="comment-input no-clear"
                     placeholder="Write your comment here..."></textarea>
                    <button type="submit" class="no-clear">
                        Post Comment
                    </button>
                </form>
            </div>
        </div>
      `;

      cardsContainer.appendChild(card);

      const commentsContainer = card.querySelector(".comments-container");
      const commentsCount = card.querySelector(".comments-count");
      const commentIcon = card.querySelector(".comments-count-icon");
      const form = card.querySelector("form");
      const textarea = card.querySelector(".comment-input");

     

      const postComments = getPostComments(post.id);

      postComments.forEach(comment => {

        const div = document.createElement("div");
        div.classList.add("single-comment");

        div.innerHTML = `
          <i class="fa-solid fa-circle-user"></i>
          <span class="profile-header-name">${comment.author}</span>
          <p class="comment-date">${comment.date} at ${comment.time}</p>
          <p>${comment.comment}</p>
        `;

       

        if (currentUser === post.author || currentUser === comment.author) {

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.style.marginLeft = "10px";

          deleteBtn.addEventListener("click", () => {

            const postIndex = posts.findIndex(p => p.id === post.id);

            
            if (currentUser === post.author) {

              comments = comments.filter(c => c.postId !== post.id);
              posts[postIndex].comments = [];

            }
            
            else {

              comments = comments.filter(c => c.id !== comment.id);
              posts[postIndex].comments =
                posts[postIndex].comments.filter(c => c.id !== comment.id);
            }

            localStorage.setItem("comments", JSON.stringify(comments));
            localStorage.setItem("posts", JSON.stringify(posts));

            renderPosts(posts); 
          });

          div.appendChild(deleteBtn);
        }

        commentsContainer.appendChild(div);
      });

      commentsCount.textContent = `(${postComments.length})`;
      commentIcon.textContent = `${postComments.length}`;

      const postContent = card.querySelector(".post-content");

      postContent.addEventListener("click", (e) => {
        e.stopPropagation();
        localStorage.setItem("selectedPost", post.id);
      });

     
      form.addEventListener("submit", function (e) {

        e.preventDefault();

        const commentText = textarea.value.trim();

        if (!currentUser) {
          alert("Please login first");
          goTo("login.html");
          return;
        }

        if (!commentText) return;

        const now = new Date();

        const newComment = {
          id: Date.now(),
          comment: commentText,
          author: currentUser,
          postId: post.id,
          date: now.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time: now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };

       
        comments.push(newComment);

       
        const postIndex = posts.findIndex(p => p.id === post.id);

        if (postIndex !== -1) {
          posts[postIndex].comments.push(newComment);
        }

       
        const userIndex = users.findIndex(user =>
          user.posts && user.posts.some(p => Number(p.id) === Number(post.id))
        );

        if (userIndex !== -1) {

          const userPostIndex = users[userIndex].posts.findIndex(
            p => Number(p.id) === Number(post.id)
          );

          if (userPostIndex !== -1) {
            if (!Array.isArray(users[userIndex].posts[userPostIndex].comments)) {
              users[userIndex].posts[userPostIndex].comments = [];
            }

            users[userIndex].posts[userPostIndex].comments.push(newComment);
          }
        }

        localStorage.setItem("comments", JSON.stringify(comments));
        localStorage.setItem("posts", JSON.stringify(posts));
        localStorage.setItem("users", JSON.stringify(users));

        renderPosts(posts); 
      });

    });
  }

  renderPosts(posts);

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".no-clear")) {
      localStorage.removeItem("selectedPost");
    }
  });
}

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const close = document.getElementById("close");
const overlay = document.getElementById("overlay");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    menu.style.right = "0";
    overlay.style.display = "block";
    document.querySelectorAll(".profile-header-name").forEach((el) => {
      el.innerHTML = currentUser || "Guest";
    });
  });
}

if (close) {
  close.addEventListener("click", () => {
    menu.style.right = "-100%";
    overlay.style.display = "none";
  });
}
if (overlay) {
  overlay.addEventListener("click", () => {
    menu.style.right = "-100%";
    overlay.style.display = "none";
  });
}

if (currentPage === "post.html") {

  const commentLogos = document.querySelectorAll(".fa-message");

  commentLogos.forEach((logo) => {
    logo.addEventListener("click", () => {

      const card = logo.closest(".cardpost"); 
      const commentSection = card.querySelector(".comment-section"); 

      
      commentSection.classList.toggle("open");

    });
  });

}

const activePage = window.location.pathname.split("/").pop(); 
const navLinks = document.querySelectorAll(".navigation a"); 

navLinks.forEach(link => {
  
  const hrefPage = link.getAttribute("href");

  if (hrefPage === activePage) {
    
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutIcon = document.querySelector(".hamburger-logout");
  if(logoutIcon){
    logoutIcon.addEventListener("click", (e) => {
      e.preventDefault(); 
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  }
});

