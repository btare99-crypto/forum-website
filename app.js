
// ===============================
// 0. Përcakto faqen aktuale dhe user-in
// ===============================
const currentPage = window.location.pathname.split("/").pop(); // merr emrin e file-it aktual
let currentUser = localStorage.getItem("currentUser"); // merr user-in e loguar
let users = JSON.parse(localStorage.getItem("users")) || []; // array me user-at
let posts = JSON.parse(localStorage.getItem("posts")) || []; // array me postimet
let comments = JSON.parse(localStorage.getItem("comments")) || []; //array me komentet

function profileHeaderName(){
    const profileHeaderName = document.querySelector(".profile-header-name"); //marrim elementin nga DOM
    const iconGuest = document.querySelector(".icon-guest");
    const iconLoggedIn = document.querySelector('.icon-logged-in');
    if(!profileHeaderName) return;
    if(profileHeaderName) {
        if(currentUser){
            profileHeaderName.innerText = currentUser; //zevendesojme tekstin e brendshem me current user
        } else {
            profileHeaderName.innerText = `Guest`;
            iconGuest.style.display = 'block';
            iconLoggedIn.style.display = 'none'
        };
    }
};
document.addEventListener('DOMContentLoaded', profileHeaderName); //kur te behet reload faqja te ekzekutohet ky kod

    if(currentUser){
        const loginLink = document.getElementById('login-link');
        if(loginLink){
        loginLink.style.display = 'none';
        }
    }

    function updateMenuUI() {
    if (!currentUser) {
        const logoutLink = document.querySelector('.logout-link');
        if (logoutLink) logoutLink.style.display = 'none';
    }
    }

// ===============================
// 1. REGISTER PAGE
// ===============================
if (currentPage === "register.html") { //kontrollojme nese ndodhemi ne registe.html page
    const form = document.querySelector("form"); //marrim elementet form nga kjo faqe

    form.addEventListener("submit", function(e){ //pasi te bejme submit te ekzekutohet ky funksioni me poshte
        e.preventDefault();

        const usernameInput = document.getElementById('username');
        const username = usernameInput.value; 
        
        const email = document.getElementById("email").value; 

        const passwordInput = document.getElementById("password");
        const password = passwordInput.value.trim(); //marrim vleren e password nga inputi

        const confirmPasswordInput = document.getElementById("confirm-password");
        const confirmPassword = confirmPasswordInput.value.trim();

        const errorMsgForMatchingPass = document.getElementById("password-match");
        const errorMsgForUsernameFormat = document.getElementById('username-requirements')
        
        //kontrolli nese te passwordet perputhen
        if (password !== confirmPassword) {
            errorMsgForMatchingPass.style.visibility = 'visible';
            confirmPasswordInput.style.borderBottomColor = 'red'; 
        return;
        };

        //kushti per username
        const usernameRegex = /^[A-Z][A-Za-z0-9._\- ]{2,}$/;
        if (!usernameRegex.test(username)) {
            errorMsgForUsernameFormat.style.visibility = 'visible'
            usernameInput.style.borderBottomColor = 'red';
            return;
        }
        
        //kushti per password
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            showError("Password must be at least 8 characters long, include 1 uppercase letter and 1 number.");
            return;
        };

        const exist = users.find(u => u.username === username); //kerkojme nje username nga DB dhe e krahasojme me vleren e inputit qe morem mesiper
        if(exist){ //nqs gjejme ndonje elemente dhe ploteson kushtin
            alert("Username already exists"); //printojme "username already exists"
            return; //nqs nuk gjejme atehere e shtojme ne DB vleren e marre
        }

        const newUser = { //krijojme nje obejct te ri me emrin newUser me keto properties
            username,
            email,
            password,
            memberSince: new Date().toLocaleDateString(), // ruaj daten e regjistrimit
            profilePic: "" // foto e profilit qe mund te vendoset me vone
        };

        users.push(newUser); //shtojme userin e ri ne DB users
        localStorage.setItem("users", JSON.stringify(users)); // kthen users ne string JSON per ta ruajtur ne localStorage
        localStorage.setItem("currentUser", username); //ruan vleren username me emrin currentUser

        window.location.href = "index.html"; //te dergon te faqja kryesore
    });
}


// ===============================
// 2. LOGIN PAGE
// ===============================
if (currentPage === "login.html") { //kerkojme nese jemi ne login.html page

    const form = document.querySelector("form"); //marrim elementin form nga DOM i kesaj faqeje
    const usernameInput = document.getElementById("username"); //marrim elementin me id username 
    const passwordInput = document.getElementById("password"); //marrim elementin me id password
    const errorMsg = document.getElementById("incorrectusername"); //marrim elementin me id incorrectusername

    function showLoginError() { //nqs kemi error te ekzekutohen keto CSS
        usernameInput.style.borderBottom = '1px solid red';
        passwordInput.style.borderBottom = '1px solid red';
        errorMsg.style.visibility = 'visible';
    }

    function clearLoginError() { //kur fillojme te shkruajme te ekzekutohen keto CSS
        usernameInput.style.borderBottom = '';
        passwordInput.style.borderBottom = '';
        errorMsg.style.visibility = 'hidden';
    }

    usernameInput.addEventListener('input', clearLoginError); //sa fillojme te shkruajme ekzekutohet funksioni i ndertuar mesiper clearLoginError
    passwordInput.addEventListener('input', clearLoginError);

    form.addEventListener("submit", function(e){
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        const user = users.find(u => u.username === username && u.password === password);

        if(user){
            localStorage.setItem("currentUser", username);
            window.location.href = "index.html";
        } else {
            showLoginError();
        }
    });
}



// ===============================
// 3. LOGOUT ICON (për të gjitha faqet)
// ===============================
const logoutIcon = document.querySelector(".fa-right-to-bracket"); //marrim ikonen nga DOM
if(logoutIcon){ 
    logoutIcon.addEventListener("click", function(){ //nqs klikojme ikonen (click => eventi , funksioni qe do kryhet)
        localStorage.removeItem("currentUser"); //heqim currentUser nga localStorage
        window.location.href = "login.html"; //te dergon tek faqja e LOGIN
    });
}

// ===============================
// 4. CREATE POST PAGE
// ===============================
if (currentPage === "create-post.html") { //kontrollojme nese jemi tek create-post.html file
    const form = document.querySelector("form"); //marrim form nga DOM

    form.addEventListener("submit", function(e){ //kur bejme submit tek form te ekzekutohet kodi me poshte
        e.preventDefault(); //i ndalojme qe beri refresh faqes

        const title = document.getElementById("title").value; //marrim vleren e titullit
        const description = document.getElementById("description").value; //marrim vleren e komentit ose pershkrimit
        const file = document.getElementById("image").files[0]; //marrim file-n e zgjedhur (ne kete rast foton)
        const category = document.getElementById("categories").value;

        if(!currentUser){ //nqs nuk eshte nje user
            alert("Please login first"); //shfaqim tabele qe duhet qe logohemi
            window.location.href = "login.html"; //te dergon tek login page
            return; //nese svendosim RETURN kodi me poshte do te ekzekutohet edhe pse ne vendosem nje kusht
        }

        const datePosted = new Date();
        const formattedDate = datePosted.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        const formattedTime = datePosted.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });

        const createPost = (image) => { //krijojme nje function me parameter image
            const newPost = { // krijojme nje object te ri me emrini newPost
            id: Date.now(), // id e postit eshte koha kur ajo eshte postuar
            title, //titulli i cili do ruaj vleren e inputit me id="title"
            category, //kategoria qe zgjedhim nga select
            comments,
            description, //description i cili do ruaj vleren e inputit me id="descriptiom"
            image: image || "", //image merret nga file i uploduar , nese skemi uploduar gje e lejme bosh
            author: currentUser, //autori eshte currentUser pra useri i cili po perdor faqen ne keto momente
            date: formattedDate, //data ne te cilen eshte postuar posti
            time: formattedTime //ora kur eshte krijuar posti
        };

    // Shto postin ne posts global
    posts.push(newPost); //shtojme postin e ri ne databaze
    localStorage.setItem("posts", JSON.stringify(posts)); //e kthejme ne JSON string per ta ruajtur ne local storage

    // Shto postin edhe ne array-n e user-it
    const user = users.find(u => u.username === currentUser); //tek array users kerkojme username qe perputhet me currentUser
    if (user) { //nese ekziston ky username
        if (!user.posts) user.posts = []; //kontrollojme nese nuk ka poste te meparshme krijojme nje array bosh per te vendosur kete post
        user.posts.push(newPost); //vendosim postim ne array
        localStorage.setItem("users", JSON.stringify(users)); //ruajme postin ne localStorage
    }
        window.location.href = "index.html"; // kthehemi tek homepage nese ky kod eshte ekzekutuar me sukses
    }


        if(file){ //kontrollon nese kemi zgjedhur nje file
            const reader = new FileReader(); // FileReader() eshte nje objekt i cili lexon file ne menyre asinkrone
            reader.onload = function(){ // thirret kur leximi i file-t perfundon
                createPost(reader.result); //(reader.result) => permban te dhenat e file ne forme string base64 //createPost(reader.result) => i dergon funksionit createPost imazhin qe lexuam
            }
            reader.readAsDataURL(file); // e kthen file ne DataURL
        } else {
            createPost(""); // nese skemi zgjedhur foto atere hedh postin pa foto
        }
    });

    //LIMIT LENGTH OF POST
    function setupCharCounter(inputId, counterId) {
    const input = document.getElementById(inputId);
    const counter = document.getElementById(counterId);
    const max = input.getAttribute('maxlength');

    counter.textContent = `0 / ${max}`;

    input.addEventListener('input', () => {
        const currentLength = input.value.length;
        counter.textContent = `${currentLength} / ${max}`;
    });
    }

    // Përdor funksionin për çdo input/textarea
    setupCharCounter('title', 'post-title-count');
    setupCharCounter('description', 'post-description-count');
}

  

    const noPost = document.querySelector('.no-posts');
    const myPosts = posts.filter(p => p.author === currentUser);
    if(posts.length > 0){
        if(noPost){
            noPost.style.display = 'none';
        }
    } else {
        noPost.style.display = 'block'
    }
    if(currentPage === 'profile.html'){
        if(myPosts.length > 0){  
            noPost.style.display = 'none';
        } else {
            noPost.style.display = 'block'
        };
    };


// ===============================
// 5. HOME PAGE (index.html) - Shfaqja e postimeve
// ===============================
if (currentPage === "index.html") { //kontrollon nese jemi ne index.html page
    const cardsContainer = document.querySelector(".cards"); //marrim cards(postimet) nga DOM

    function renderPosts(filteredPosts){ //krijojme nje funksion me parameter filteredPosts
        cardsContainer.innerHTML = ""; //boshatisim permbajtjen e vendit te postimeve

        filteredPosts.forEach(post => { //cdo element ruhet ne filteredPost dhe ekzekuton kete kod per secilin post
            const card = document.createElement("div"); //krijojme nje element te ri div
            card.classList.add("cardpost"); //i shtojme classen cardpost qe e kemi edituar ne CSS

            // 🔹 Nese nuk ka foto, vendosim nje default
            const imageSrc = post.image && post.image.trim() !== "" //kontrollon nese kemi zgjedhur post , trim() heq hapesirat brenda stringut
                ? post.image //nese kemi post atehere vendosim postin
                : "images/nophotoimage.avif"; //nese skemi post vendosim kete foto si default

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
                        <i class="fa-regular fa-message"></i><p>3</p>
                    </div>
                </div>
                <p id="comment-text">${post.description}</p>
            `;

            card.addEventListener("click", () => { //kur klikojme mbi post
                localStorage.setItem("selectedPost", post.id); //ne localStorage ruhet id e ketij posti me emrin(key) selectedPost
            });

            cardsContainer.appendChild(card); //elementin div qe krijuam e shtojme tek elementi i DOM qe e kemi marr ne fillim te funkstionit
        });

    }
        
    const create = document.getElementById('createPostBtn') //marrim nga DOM elementin me id="createPostBtn"
    create.addEventListener('click' , function() { //kur ta klikojme kete buton te ekzekutohet kodi me poshte
    window.location.href = 'create-post.html' //pra kur te klikojme kete buton te na dergoje ne kete faqe
    })

    renderPosts(posts); //therrasim kete kod per te shfaqur postimet ne DOM

    // ===============================
    // 5a. SEARCH
    // ===============================
    const searchInput = document.querySelector(".searchbar-search input"); //marrim iputin nga DOM
    searchInput.addEventListener("input", function(){ //i shtojme nje event qe te kryeje funksionin me poshte
        const query = this.value.toLowerCase(); //merr vleren e inputit dhe e kthen ne lower case
        const filtered = posts.filter(p => // filter() => kalon neper cdo element dhe krijon nje array te ri me ato qe plotesojne kushtin
            p.title.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query)  // nese title ose description perban fjalen e kerkuar , futet te filter
        );
        renderPosts(filtered); //merr listen e kerkuar dhe e shfaq ne ekran
    });

    // ===============================
    // 5b. FILTER "My Posts"
    // ===============================
    const myPostsBtn = document.querySelector(".searchbar-categories ul li:nth-child(3) a"); //merr vleren e 3 te listes nga DOM
    myPostsBtn.addEventListener("click", function(e){ //i shtojme eventin click kesaj vlere per te kryere funksionin me poshte
        e.preventDefault(); // ndalojme se beri refresh
        const postCategories = document.getElementById('post-categories')
        postCategories.innerHTML = 'My Posts';
        const myPosts = posts.filter(p => p.author === currentUser); //filtrojme postet kur plotesohet ky kusht (autori = userin)
        renderPosts(myPosts); //shfaqim postet ne ekran 
    });

    // ===============================
    // 5c. FILTER "All Posts"
    // ===============================
    const allPostsBtn = document.querySelector(".searchbar-categories ul li:nth-child(2) a");//merr vleren e 2 te lsites nga DOM
    allPostsBtn.addEventListener("click", function(e){ //i shtojme eventin click per te kryer kete funksion kur e klikojme
        e.preventDefault(); //ndalojme se beri refresh
        const postCategories = document.getElementById('post-categories')
        postCategories.innerHTML = 'All Posts';
        renderPosts(posts); //thjeshte shfaqim te gjitha postimet
    });
    // ===============================
    // 5c. FILTER "CATEGORIES"
    // ===============================
    const links = document.querySelectorAll('.dropdown-content a');
    const cards = document.querySelectorAll('.cardpost');

    links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // mos e ndjek linkun

        const category = this.dataset.category; // merr kategorinë e linkut

        const categories = posts.filter(p => p.category === category); //filtrojme postet kur plotesohet ky kusht (autori = userin)
        const postCategories = document.getElementById('post-categories')
        postCategories.innerHTML = `${category}`;
        renderPosts(categories); 
    });
    });
}

// ===============================
// 6. PROFILE PAGE
// ===============================
if(currentPage === "profile.html") { //kontrollojme nese jemi ne kete faqe
    if(!currentUser){
        const guestProfile = document.querySelector('.profile-content');
        guestProfile.innerHTML = `<div class="guest-box">
                                    <p class="guest-message">You’re currently browsing as a guest. Please log in to view your profile.</p>
                                    <button class="login-btn" type="click">Login</button>
                                </div>
                                `

        const loginBtn = document.querySelector('.login-btn');
        loginBtn.addEventListener('click' , function() {
        window.location.href = 'login.html'
        });
    };
    
    if(currentUser){
        const cardsContainer = document.querySelector(".cards-profile"); //marrim elementin cards-profile nga DOM
        const myPosts = users.find(u => u.username === currentUser)?.posts || []; //kotrnollon nese useri aktual ka postime
        cardsContainer.innerHTML = ""; //boshatis elementin sepse kemi pasur elemente default si shembull

        myPosts.forEach((post, index) => { // per cdo element ekzekutojme kodin me poshte
            const card = document.createElement("div"); //krijojme nje element te ri 
            card.classList.add("cardpost-profile"); // i shtojme kete class te cilen e kemi edituar me pare ne CSS

            const imageSrc = post.image && post.image.trim() !== "" // e njejta gje kontrollojme nese kemi foto apo jo
                        ? post.image
                        : "images/nophotoimage.avif"; 

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
                        <i class="fa-regular fa-message" title="comments"></i><p>3</p>
                    </div>
                    </div>
                    <p id="comment-text">${post.description}</p>
                </div>
                
            `;
        cardsContainer.appendChild(card); //shtojme elementin ne DOM

        // ===============================
        // DELETE POST
        // ===============================
        const deleteBtn = card.querySelector(".delete-btn"); //marrim elementin nga DOM
        deleteBtn.addEventListener("click", () => { //pasi te klikojme butonin te ekzekutohet ky kod
            if(confirm("Are you sure you want to delete this post?")){ //nese konfirmojme kete atehere te ekzekutohet ky kod
                
                myPosts.splice(index, 1); //fshin posts nga user.posts

                const globalIndex = posts.findIndex(p => p.id === post.id); //gjejme indexin e postimin me kushtin e dhene
                if(globalIndex !== -1) posts.splice(globalIndex, 1); //nqs e kemi gjetur e fshijme nga array

                localStorage.setItem("users", JSON.stringify(users)); //ruajme ndryshimet ne localStorage
                localStorage.setItem("posts", JSON.stringify(posts));

                card.remove(); //fshijme card nga DOM

                const postsCommentsEl = document.getElementById("posts-comments"); //marrim nga DOM elemtin me id="posts-comment"
                if(postsCommentsEl) postsCommentsEl.innerText = `${myPosts.length} Posts | 0 Comments`; //ndryshojme numrin e postimeve ne profil
            }
        });

        // ===============================
        // EDIT POST
        // ===============================
        const editBtn = card.querySelector(".edit-btn"); //marrim nga DOM buttonin edit
        editBtn.addEventListener("click", () => { // kur te klikojme butonin te ekzekutohet kodi meposhte
            const newTitle = prompt("Edit title:", post.title); //nxjerr nje prompt dhe vendos titullin e postit si default
            const newDescription = prompt("Edit description:", post.description); //nxjerr nje prompt dhe vendos pershkrimin si default

            if(newTitle !== null) post.title = newTitle; //nqs titulli i ri qe do vendoset eshte i ndryshem nga null , atehere e ndryshojme titullin me vleren e inputit prompt
            if(newDescription !== null) post.description = newDescription; //nqs pershkrimi i ri qe do vendoset eshte i ndryshem nga null , atehere e ndryshojme pershkrimin me vleren e inputit prompt

            card.querySelector(".insidecards p").innerText = post.title; //vlerat e ruajtura mesiper jane ne localStorage keshtu qe i vendosim vlerat e reja ne DOM
            card.querySelector("#comment-text").innerText = post.description;

            const globalPost = posts.find(p => p.id === post.id); //gjejme postin me kete id
            if(globalPost){ //nese e gjejme
                globalPost.title = post.title; //i ndryshojme titullin
                globalPost.description = post.description; //i ndryshojme pershkrimin
            }

            localStorage.setItem("users", JSON.stringify(users)); //ruajme ndryshimet ne localStorage
            localStorage.setItem("posts", JSON.stringify(posts));
        });
        
    });
    const create = document.getElementById('createPostBtn')
    create.addEventListener('click' , function() {
    window.location.href = 'create-post.html'
    })

}

    

    // ===============================
    // Profile info
    // ===============================
    const usernameEl = document.getElementById("profile-username"); //marrim elementin nga DOM me ID #profile-username
    const memberEl = document.getElementById("member-since"); //marrim elementin nga DOM me ID #member-since
    const postsCommentsEl = document.getElementById("posts-comments"); //marrim elementin nga DOM me ID #posts-comments
    const profilePicEl = document.getElementById("profile-pic"); //marrim elementin nga DOM me ID #profile-pic

    if(currentUser){ //ne qofte kemi userin konkret ekzekutojme kete kod
        const myPosts = users.find(u => u.username === currentUser)?.posts || [];
        const user = users.find(u => u.username === currentUser); //marrim nja username nga DB dhe e krahasojme me currentUser
        usernameEl.innerText = user.username; //vendsoim vleren ne elemetin me ID #profile-username
        memberEl.innerText = `Member since ${user.memberSince || "July 2025"}`; //marrim vleren memberSince nga DB

        postsCommentsEl.innerText = `${myPosts.length} Posts | ${user.comments.length} Comments`; //myPosts.length tregon se sa postime ka 

        if(user.profilePic) profilePicEl.src = user.profilePic; //kontrollon nese ka nje profilePic te ruajtur ,nese po e vendos
    }
}

const textElement = document.getElementById("typing-text"); //marrim nga DOM elemtin me id="typing-text"

if (textElement) { //nqs e gjejme elemntin ekzekutojme kodin me poshte
const username = localStorage.getItem("username") || "Guest"; //marrim nga localStorage usernamin , nese ska vendosim Guest
const text = `Hi, Welcome ${currentUser}`; //teksti qe do shfaqet

textElement.innerText = ""; //boshatisim elementin nqs kemi vlera brenda

let index = 0; // krijojme nje variabel te ndryshueshme me default 0

function type() { 
    if (index < text.length) { //nqs 0 eshte me e vogel se gjatesia e tekstit qe do shfaqet
    textElement.innerText += text[index]; //shton shtronjen e rradhes
    index++;
    setTimeout(type, 150); //shton cdo shtonje cdo 150ms
    }
}

window.addEventListener("load", type); //te ekzekutohet cdo here kur bejme refresh
}


const profilePostsBy = document.getElementById('profilePostsBy')
if(profilePostsBy){                                      //perdorim if state sepse kur jemi ne ndonje faqe tjeter qe se ka kete element
    profilePostsBy.innerText = `Posts By ${currentUser}` //atehere do te na shfaqi error sepse nuk e gjen kete element
}                                                        

// ===============================
// 7. POST DETAIL PAGE (post.html)
// ===============================
if (currentPage === "post.html") { //kontrollojme nese jemi ne kete faqe
    const cardsContainer = document.querySelector(".cards"); //marrim kete element nga DOM

    if (cardsContainer) { //nqs ky elemnt ekziston te kryhet funksioni i meposhtem
        function renderPosts(filteredPosts) {
            cardsContainer.innerHTML = "";
            filteredPosts.forEach(post => {
                const card = document.createElement("div");
                card.classList.add("cardpost");

                const imageSrc = post.image && post.image.trim() !== ""
                    ? post.image
                    : "images/nophotoimage.avif";

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
                                <i class="fa-regular fa-message"></i><p>3</p>
                            </div>
                        </div>
                        <p id="comment-text">${post.description}</p>
                `;

                cardsContainer.appendChild(card);  //vendosim postet ne DOM njesoj si ne HOME PAGE
            });
        }
        renderPosts(posts);
    }
}
// ===============================
// 8. COMMENTS (post.html)
// ===============================

if (currentPage === "post.html") { //kontrollojme nese jemi ne keto dy faqe
    const form = document.querySelector("form"); // marrim elementin form nga keto faqe
    const commentsContainer = document.querySelector('.comments-container'); //marrim elementin me class comments-container i cili do mbaje komentet
    const commentsCount = document.getElementById('comments-count'); //marrim elementin comments-count qe tregon numrin e komenteve

    // Ngarko komentet nga storage në DOM kur faqja ngarkohet
    document.addEventListener('DOMContentLoaded', function() { //kur faqja behet reload (pra i bejme refresh)

        // Filtrimi për postin aktual
        const postId = localStorage.getItem('selectedPost'); //marrim postin qe kemi klikuar
        const postComments = comments.filter(c => c.postId === postId); //filtrojme komentet me keto id

        commentsContainer.innerHTML = ''; //gjenerojme komentin me java script
        postComments.forEach(comment => { //per secilin nga komentet qe kemi filtruar te gjeneroje kete html
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('single-comment');
            commentDiv.innerHTML = `
                <i class="fa-solid fa-circle-user"></i>
                <span class="profile-header-name">${comment.author}</span>
                <p class="comment-date">${comment.date} at ${comment.time}</p>
                <p>${comment.comment}</p>
            `;
            commentsContainer.appendChild(commentDiv); //shtojme elementin e krijuar ne DOM
        });

        commentsCount.innerHTML = `(${postComments.length})`; //perditesojme numerimin e komenteve
    });

    // Kontrolli dhe shtimi i komentit të ri
    if (form) { //nqs kemi form 
        form.addEventListener("submit", function(e) { //i shtojme nje event submit qe kur te ekzekutojme kete event te ekzekutohet funksioni me poshte
            e.preventDefault(); //ndalojme se rifreskuari faqen

            const commentText = document.getElementById("comment-input").value.trim(); //marrim vleren e inputit te komentit
            if (!currentUser) { //nqs nuk jemi nje user 
                alert("Please login first"); //jep alert qe ne duhet te logohemi 
                window.location.href = "login.html"; //dhe te dergon tek faqja per tu loguar
                return; //nese jemi user thjeshte vazhdojme normalisht
            }
            if (!commentText) return; //kontroll nese inputi ka vlere apo eshte bosh

            const datePosted = new Date();
            const formattedDate = datePosted.toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" });
            const formattedTime = datePosted.toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit", hour12:true });
            const postId = Number(localStorage.getItem("selectedPost"));

            const newComment = { //krijojme nje koment te ri 
                id: Date.now(), //id eshte data ne cilen eshte bere komenti
                comment: commentText, //vlera e inputit
                author: currentUser, //autori eshte useri i loguar momentalisht
                postId: postId, //postId eshte posti qe kemi selektuar per te cilin po bejme komentin
                date: formattedDate, // data e komentit
                time: formattedTime //koha e komentit
            };

            comments.push(newComment); //shtojme komentin e ri ne array Comments 
            localStorage.setItem('comments', JSON.stringify(comments)); //ruajme ndryshimet ne localStorage

            const userIndex = users.findIndex(u => u.username === currentUser); 
            if (userIndex !== -1) {
                if (!users[userIndex].comments) users[userIndex].comments = [];
                users[userIndex].comments.push(newComment);
                localStorage.setItem('users', JSON.stringify(users));
            }

            const commentDiv = document.createElement('div');
            commentDiv.classList.add('single-comment');
            commentDiv.innerHTML = `
                <i class="fa-solid fa-circle-user"></i>
                <span class="profile-header-name">${newComment.author}</span>
                <p class="comment-date">${newComment.date} at ${newComment.time}</p>
                <p>${newComment.comment}</p>
            `;
            commentsContainer.appendChild(commentDiv);

            const postCommentsCount = comments.filter(c => c.postId === postId).length;
            commentsCount.innerHTML = `(${postCommentsCount})`;

            document.getElementById("comment-input").value = "";
        });
    }
}


//MOBILE VERSION HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const close = document.getElementById('close');
const overlay = document.getElementById('overlay');

if(hamburger){
hamburger.addEventListener('click', () => {
menu.style.right = '0';
overlay.style.display = 'block';
updateMenuUI();
document.querySelectorAll('.profile-header-name').forEach(el => {
    el.innerHTML = currentUser || 'Guest';
})
});
}

if(close){
close.addEventListener('click', () => {
menu.style.right = '-100%';
overlay.style.display = 'none';
});
}
if(overlay){
overlay.addEventListener('click', () => {
menu.style.right = '-100%';
overlay.style.display = 'none';
});
}


if(currentPage === 'index.html'){
    function renderLastThreeComments() {

    const postId = Number(localStorage.getItem('selectedPost'));
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const comments = JSON.parse(localStorage.getItem("comments")) || [];

    const post = posts.find(p => p.id === postId);
    const postAuthor = post ? post.author : null;

    console.log(postAuthor)

    const sortedComments = comments.sort((a, b) => b.id - a.id);

    // 3️⃣ Marrim vetëm 3 komentet më të fundit
    const lastThreeComments = sortedComments.slice(0, 3);

    // 4️⃣ Marrim container nga DOM
    const commentsContainer = document.querySelector(".comments-container");

    // pastrojmë container
    commentsContainer.innerHTML = "";

    // 5️⃣ Gjenerojmë HTML
    lastThreeComments.forEach(comment => {

        const commentDiv = document.createElement("div");
        commentDiv.classList.add("single-comment");

        commentDiv.innerHTML = `
            <i class="fa-solid fa-circle-user"></i>
            <span class="profile-header-name">${comment.author} to ${postAuthor}</span>
            <p class="comment-date">${comment.date} at ${comment.time}</p>
            <p>${comment.comment}</p>
        `;

        commentsContainer.appendChild(commentDiv);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    renderLastThreeComments();
});

}