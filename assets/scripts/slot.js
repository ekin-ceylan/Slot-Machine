var timer = 0;
var cizimAlani = [];
var diskler = [];
var a = 0;
var resimler = ["kiraz.jpg", "portakal.jpg", "erik.jpg",
                "limon.jpg", "bar.jpg", "7.jpg" //,"karpuz.jpg","muz.jpg", "win.jpg"
];
var imagePath = 'assets/images/';
var prob = [
    [3, 2, 8, 5, 6, 1],
    [6, 9, 5, 1, 3, 1],
    [7, 6, 2, 8, 1, 1]
];
var bhs, krd, win
var sayac = -1;
var tOut = 0;
var adet = 25;

function rulet(probs) {
    let total = 0;

    for (let i in probs) {
        total += probs[i];
    }

    let r = Math.random() * total;
    let i = 0;

    for (; probs[i] < r; i++) {
        probs[i + 1] = probs[i + 1] + probs[i];
    }

    return i
}

function hazirla() {
    cizimAlani = [document.getElementById("tual").getContext("2d"),
                  document.getElementById("tual2").getContext("2d"),
                  document.getElementById("tual3").getContext("2d")];

    for (let i = 0; i < 3; i++) {
        diskler[i] = new disk();
        diskler[i].olustur(adet, prob[i], i);
    }

    diskler[2].ikon[adet - 1].onload = ciz;
}

function disk() {
    this.ikon = [];
    this.hiz = 20;
    this.y = 0;
    this.j = 0;
    this.yon = 1;

    this.olustur = function (sayi, probs, z) {
        for (let i = 0; i < sayi; i++) {
            let img = document.createElement("img");
            this.ikon[i] = img;
            let a = rulet(probs.slice());
            probs[a] = probs[a] - 1;
            img.src = imagePath + resimler[a];
        }
    }
}

function baslat() {
    if (timer) {
        return;
    }

    krd -= bhs;
    win = 0;
    yaz(win, "Paid");
    yaz(krd, "Krd");

    for (var i = 0; i < 3; i++) {
        diskler[i].hiz = 15;
        diskler[i].yon = 1;
        diskler[i].j = adet * 1000 + diskler[i].j % adet;
    }

    sayac = -1;
    timer = setInterval(don, 10)
}

function don() {
    if (!tOut) {
        tOut = setTimeout(function () {
            clearTimeout(tOut);
            tOut = 0;
            sayac++;
        }, Math.round(Math.random() * 3000) + 100) ;
    }

    for (var i = 0; i < 3; i++) {
        diskler[i].y = (diskler[i].y + diskler[i].hiz) % 120
        if (diskler[i].y == 0) { diskler[i].j += diskler[i].yon; }
        if (sayac == i && diskler[i].y == 0) { diskler[i].hiz = 0; diskler[i].yon = 0; }
    }

    ciz();

    if (!(diskler[0].hiz + diskler[1].hiz + diskler[2].hiz)) {
        clearInterval(timer);
        clearTimeout(tOut);
        tOut = 0;
        hesapla()
    }
}

function hesapla() {
    var dsk1 = diskler[0].ikon[(diskler[0].j + 1) % adet].src.split(imagePath)[1];
    var dsk2 = diskler[1].ikon[(diskler[1].j + 1) % adet].src.split(imagePath)[1];
    var dsk3 = diskler[2].ikon[(diskler[2].j + 1) % adet].src.split(imagePath)[1];
    

    if (dsk1 == resimler[5] && dsk2 == resimler[5] && dsk3 == resimler[5] ) {
        win = 1000;
    }
    else if (dsk1 == resimler[4] && dsk2 == resimler[4] && dsk3 == resimler[4]) {
        win = 150;
    }
    else if (dsk1 == resimler[3] && dsk2 == resimler[3] && (dsk3 == resimler[3] || dsk3 == resimler[4])) {
        win = 18;
    }
    else if (dsk1 == resimler[2] && dsk2 == resimler[2] && (dsk3 == resimler[2] || dsk3 == resimler[4])) {
        win = 14;
    }
    else if (dsk1 == resimler[1] && dsk2 == resimler[1] && (dsk3 == resimler[1] || dsk3 == resimler[4])) {
        win = 10;
    }
    else if (dsk1 == resimler[0] && dsk2 == resimler[0] && dsk3 == resimler[0]) {
        win = 10;
    }
    else if (dsk1 == resimler[0] && dsk2 == resimler[0] || dsk1 == resimler[0] && dsk3 == resimler[0] || dsk3 == resimler[0] && dsk2 == resimler[0]) {
        win = 5;
    }
    else if (dsk1 == resimler[0]) {
        win = 3;
    }

    krd += win * bhs;

    yaz(win, "Paid");
    yaz(krd, "Krd");

    if (bhs > krd) {
        bhs = krd;
        yaz(bhs, "Bet");
    }

    timer = 0;
}

function ciz() {
    for (var m = 0; m < 3; m++) {
        var a = diskler[m];

        for (var i = 0; i < 4; i++) {
            cizimAlani[m].drawImage(a.ikon[(i + a.j) % adet], 0, 0, 133, 133, 0, - a.yon * a.y + i * 120, 120, 120);
        }
    }
}

function betMax() {
    if (timer) {
        return;
    }

    if (krd < 9) {
        bhs = krd;
    }
    else {
        bhs = 9;
    }

    yaz(bhs, "Bet");
}

function betOne() {
    if (timer) {
        return;
    }

    if (bhs < krd && bhs < 9) {
        bhs++;
        yaz(bhs, "Bet");
    }
}

function reset() {
    if (timer) {
        return;
    }

    bhs = 0;
    yaz(bhs, 'Bet');
}