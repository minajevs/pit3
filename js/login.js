$(function () {
    $('#login').on('click', () => {
        let u = $('#login-username').val();
        let p = $('#login-password').val();
        if (!u && !p) {
            alert('Lūdzu, ievadiet visus datus!');
            return;
        }

        let usernames = JSON.parse(localStorage.getItem('logins'));
        for (let user of usernames) {
            console.log(123);
            if (user.username == u){
                if(user.password == p){
                    localStorage.setItem('loggedAs', JSON.stringify(user));
                    window.location = 'index.html';
                }
                else{
                    alert('Nepareiza parole!')
                }
                return;
            }
        }
        alert('Nepareizs lietotajvārds!')
    })

    $('#register').on('click', () => {
        let u = $('#register-user').val();
        let e = $('#register-email').val();
        let p = $('#register-password').val();
        let p2 = $('#register-password2').val();
        let ph = $('#register-phone').val();

        if(!u || !e || !p || !p2 || !ph){
            alert('Lūdzu, ievadiet visus datus!');
            return
        }

        if(p != p2){
            alert('Paroles nesakrīt!');
            return;
        }

        let logins = JSON.parse(localStorage.getItem('logins'));
        let user = {
            username: u,
            password: p2,
            email: e,
            phonenumber: ph
        };
        logins.push(user);
        localStorage.setItem("logins", JSON.stringify(logins)); 
        localStorage.setItem('loggedAs', JSON.stringify(user));
    });
});