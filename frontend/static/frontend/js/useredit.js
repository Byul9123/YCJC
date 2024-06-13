
document.getElementById('edit-button').addEventListener('click', function () {
    var currentUrl = window.location.href;
    window.location.href = currentUrl + 'edit/';
});


document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const username = pathParts[pathParts.length - 2];
    const accessToken = localStorage.getItem('access_token');

    console.log("Username:", username);
    console.log("Access Token:", accessToken);

    document.getElementById('user-edit-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const firstName = document.getElementById('first_name').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;


        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/users/${username}/`, {
                first_name: firstName,
                password,
                password2
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            alert('User updated successfully');
            window.location.href = '/';
        } catch (error) {
            console.error('Error updating user details:', error);
            alert('사용자 정보 업데이트에 실패했습니다.');
        }
    });
});