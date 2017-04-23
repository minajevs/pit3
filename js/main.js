$('.datepicker').datepicker({
    orientation: 'bottom'
});


let carriers = [
    "lufthansa",
    "wizzair",
    "airbaltic",
    "ryanair",
    "aeroflot"
]


let latestHash = 0;
let latestResults = [];

$('#dosearch').on('click', () => {
    if (!$('#from').val() || !$('#to').val()) {
        alert("Lūdzu ievadiet pilsētas!")
        return;
    }

    $('#results').slideUp();
    $('#spinner').slideDown();

    setTimeout(() => {
        let request = {
            from: $('#from').val(),
            to: $('#to').val(),
            depart: $('#depart').val(),
            return: $('#return').val(),
            maxprice: $('#maxprice').val() || 1200,
            persons: $('#persons').val()
        }

        let results = getResults(request);
        results.sort((a, b) => { return a.available - b.available })

        let resultBody = $('#results-body');
        resultBody.html('');
        let id = 0;
        for (let res of results) {
            let element =
                `<tr class='result-row' data-id="${id}" style=" cursor: pointer; ">
                    <td>${res.from} - ${res.to}</td>
                    <td>${res.depart} ${res.return ? "- " + res.return : ""}</td>
                    <td>${res.price}€</td>
                    <td><img src="./img/${res.carrier}.png" alt="${res.carrier}" height="25" width="100"></td>
                    <td>${res.available}</td>
                </tr>`
            resultBody.append(element);
            id++;
        }
        $('.result-row').click((e) => {
            let id = $(e.currentTarget).data('id');
            let query = $.param(latestResults[id]);
            window.location = 'reservation.html?'+query
        });
        $('#spinner').hide();
        $('#results').slideDown();
    }, rand(2, 5) * 1000)
})


function getResults(request) {
    let hash = getHash(JSON.stringify(request)).toString();

    if (latestHash == hash)
        return latestResults;

    let resultCount = rand(2, 10);

    latestResults = [];
    for (let i = 0; i < resultCount; i++) {
        let today = new Date();
        latestResults.push({
            from: request.from,
            to: request.to,
            depart: request.depart || formatDate(today),
            return: request.return,
            price: rand(100, parseInt(request.maxprice)),
            carrier: carriers[rand(0, carriers.length - 1)],
            available: rand(parseInt(request.persons), 11)
        });
    }

    latestHash = hash;
    return latestResults;
}

function formatDate(date) {
    let mm = date.getMonth();
    let dd = date.getDate();
    let yy = date.getFullYear();

    return `${mm + 1}/${dd}/${yy}`;
}

function getHash(s) {
    return Math.abs(s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0));
}

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function encodeQueryData(data) {
    let ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}