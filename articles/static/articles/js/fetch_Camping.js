const BASE_URL = "http://127.0.0.1:8000/";

async function fetchCampingArticles() {
    const accessToken = localStorage.getItem('access_token');
    const response = await fetch(`${BASE_URL}api/articles/Camping/`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }
    const data = await response.text();
    return data;
}

function handleNewPostClick() {
    window.location.href = `${BASE_URL}api/articles/newlist/`;
}

document.getElementById("new-post-btn").addEventListener("click", handleNewPostClick);

async function initialize() {
    try {
        const articlesHTML = await fetchCampingArticles();
        const container = document.getElementById("articles-container");
        container.innerHTML = articlesHTML;
    } catch (error) {
        console.error('Error initializing articles:', error);
    }
}

initialize();
