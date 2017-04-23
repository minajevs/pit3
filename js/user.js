$(function () {
    if (!localStorage.getItem('logins')) {
        let logins = [
            {
                username: 'minajevs',
                password: '123456', 
                email: 'dmtirijs.minajevs@outlook.com',
                phonenumber: '28888888'
            }
        ]
        localStorage.setItem("logins", JSON.stringify(logins));
    }

    let currentUser = JSON.parse(localStorage.getItem('loggedAs'));
    if (currentUser) {
        $('#login-page').hide();
        $('#user-menu').show();
        $('#user-current').html(`Sveiks, ${currentUser.username}`);
    }

    $("#user-logout").on('click', () => {
        localStorage.removeItem('loggedAs');
        location.reload();
    });
});