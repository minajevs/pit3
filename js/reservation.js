$(function () {
    var object = JSON.parse('{"' + decodeURI(window.location.href.slice(window.location.href.indexOf('?') + 1).replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/%2F/g, '/')) + '"}')

    $('#from').val(object.from);
    $('#to').val(object.to);
    $('#price').val(object.price + ".00 EUR");
    $('#date').val(object.depart + (object.return ? " - " + object.return : ""));

    let user = JSON.parse(localStorage.getItem('loggedAs'));

    if(user){
        $('#name').val(user.username);
        $('#email').val(user.email);
        $('#number').val(user.phonenumber);
    }



    $('.finish').click(() => {
        if (!$('#name').val() ||
            !$('#surname').val() ||
            !$('#email').val() ||
            !$('#number').val()) {
            alert('Lūdzu, ievadiet visus datus!')
            return;
        }
        window.location = 'complete.html';
    });

});
