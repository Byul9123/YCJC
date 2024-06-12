function logout() {
    // 로그아웃 요청을 서버로 전송
    fetch('/users/logout/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')  // CSRF 토큰 포함
        }
    }).then(response => {
        if (response.ok) {
            // 로그아웃 후 페이지를 리디렉션
            window.location.href = '/';
        } else {
            console.error('Logout failed');
        }
    });
}

document.getElementById('logout-button').addEventListener('click', logout);

// CSRF 토큰을 가져오는 함수
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
