const url = "http://localhost:8080";
window.onload = async () => {
    let user = getUser();
    let articles = await getAllArticles();
    if (user) {
        document.getElementById("login").style.display = "none";
        document.getElementById("signup").style.display = "none";
        document.getElementById("logout").style.display = "block";
        document.getElementById("signup-form").style.display = "none";
        document.getElementById("login-form").style.display = "none";
    } else {
        document.getElementById("login").style.display = "block";
        document.getElementById("signup").style.display = "block";
        document.getElementById("logout").style.display = "none";
        document.getElementById("signup-form").style.display = "block";
        document.getElementById("login-form").style.display = "block";
    };
};
let loginForm = document.getElementById("login-form");
let signupForm = document.getElementById("signup-form");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    logIn(email, password);
});
signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(signupForm);
    console.log(formData);
    register(formData);
});
async function getAllArticles() {
    let response = await fetch(`${url}/api/articles/get-all`);
    let data = await response.json();
    return data;
};
async function getArticleById(id) {
    let response = await fetch(`${url}/api/articles/get-article-by-id/${id}`);
    let data = await response.json();
    return data;
};
async function getArticleByTitle(title) {
    let response = await fetch(`${url}/api/articles/get-article-by-title/${title}`);
    let data = await response.json();
    return data;
};
async function addArticle(formData) {
    let response = await fetch(`${url}/api/articles/add-article`, {
        method: "POST",
        body: formData
    });
    let data = await response.json();
    return data;
}
async function updateArticle(formData) {
    let response = await fetch(`${url}/api/articles/update-article`, {
        method: "PUT",
        body: formData
    });
    let data = await response.json();
    return data;
}

async function deleteArticle(id) {
    let response = await fetch(`${url}/api/articles/delete-article/${id}`, {
        method: "DELETE"
    });
    let data = await response.json();
    return data;
};
async function logIn(email, password) {
    let response = await fetch(`${url}/api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    let data = await response.json();
    if(data.status === "success") {
        window.location.href = "index.html";
        let token = data.token;
        localStorage.setItem("token", token);
    } else {
        alert(data.message);
    };
};
async function register(formData) {
    let response = await fetch(`${url}/api/users/register`, {
        method: "POST",
        body: formData
    });
    let data = await response.json();
    if(data.status === "success") {
        window.location.href = "index.html";
        let token = data.token;
        localStorage.setItem("token", token);
    } else {
        alert(data.message);
    };
};
function getUser() {
    let token = localStorage.getItem("token");
    if(token) {
        return token;
    } else {
        return null;
    };
};

document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let score = 0;

    if (document.querySelector('input[name="question1"]:checked').value === 'A') score++;
    if (document.querySelector('input[name="question2"]:checked').value === 'B') score++;
    if (document.querySelector('input[name="question3"]:checked').value === 'A') score++;
    if (document.querySelector('input[name="question4"]:checked').value === 'B') score++;

    alert(`Your score is ${score} out of 4.`);
});
