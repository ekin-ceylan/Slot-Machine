function panelEkle(ata, adet, pid) {

    var panel = $("<div></div>");
    panel.addClass("panel");
    panel.appendTo(ata);
    panel.attr("id", pid)

    for (var i = 1; i <= adet; i++) {
        var digit = $("<div></div>");
        digit.addClass("digit");
        digit.appendTo(panel);

        for (var j = 1; j <= 7; j++) {
            var segment = $("<div></div>");
            segment.appendTo(digit);
            var dvTop = $("<div></div>");
            var dvBottom = $("<div></div>");
            var golgeHor = $("<div></div>");

            if (j == 1 || j == 4 || j == 7) {
                segment.addClass("segmentHor")
                dvTop.addClass("dvTop");
                dvBottom.addClass("dvBottom");
                golgeHor.addClass("golgeHor");
            }
            else {
                segment.addClass("segmentVer")
                dvTop.addClass("dvLeft");
                dvBottom.addClass("dvRight");
                golgeHor.addClass("golgeVer");
            }
            segment.append(dvTop, dvBottom, golgeHor);
        }
    }
}

function load(w, a) {
    var seg;
    var h = w / a;
    var l = w - 9 * h;
    var H = 2 * l + 12 * h;
    var g = Math.round(0.5 * h);

    $(".digit").css({ "width": w + "px", "height": H + "px" })
    $(".segmentHor").css({ "width": w + "px", "height": 6 * h + "px" });
    $(".segmentVer").css({ "width": 6 * h + "px", "height": H / 2 + 3 * h + "px" })
    $(".dvLeft").css({ "border-top-width": h + "px", "border-bottom-width": h + "px", "border-left-width": h + "px", "height": H / 2 - 6 * h + "px" })
    $(".dvRight").css({ "border-top-width": h + "px", "border-bottom-width": h + "px", "border-right-width": h + "px", "height": H / 2 - 6 * h + "px" })
    $(".dvTop").css({ "border-top-width": h + "px", "border-left-width": h + "px", "border-right-width": h + "px", "width": w - 9 * h + "px" })
    $(".dvBottom").css({ "border-bottom-width": h + "px", "border-left-width": h + "px", "border-right-width": h + "px", "width": w - 9 * h + "px" })
    $(".golgeVer").css({ "border-radius": h + "px", "box-shadow": "red 0px 0px " + 5 * g + "px " + g + "px", "height": l + h + "px", "width": 1.6 * h + "px" })
    $(".golgeHor").css({ "border-radius": h + "px", "box-shadow": "red 0px 0px " + 5 * g + "px " + g + "px", "width": l + h + "px", "height": 1.6 * h + "px" })

}

function yaz(sayi, alan) {
    var b;
    var d;
    var dgt = document.getElementById(alan);

    for (var i = dgt.children.length - 1 ; i >= 0; i--) {
        b = sayi % 10;
        d = dgt.children[i];
        digitYaz(d, b, "red", "#700000");
        sayi = (sayi - b) / 10;
    }
}

function digitYaz(digit, i, l, d) {

    if (!(i >= 0 && i < 10)) {
        return;
    }
    var A = [l, d, l, l, d, l, l, l, l, l];
    var B = [l, l, l, l, l, d, d, l, l, l];
    var C = [l, l, d, l, l, l, l, l, l, l];
    var D = [l, d, l, l, d, l, l, d, l, l];
    var E = [l, d, l, d, d, d, l, d, l, d];
    var F = [l, d, d, d, l, l, l, d, l, l];
    var G = [d, d, l, l, l, l, l, d, l, l];

    digit.children[0].children[0].style.borderTopColor = A[i];
    digit.children[0].children[1].style.borderBottomColor = A[i];
    digit.children[0].children[2].style.display = A[i] == l ? "initial" : "none";
    digit.children[1].children[0].style.borderLeftColor = B[i];
    digit.children[1].children[1].style.borderRightColor = B[i];
    digit.children[1].children[2].style.display = B[i] == l ? "initial" : "none";
    digit.children[2].children[0].style.borderLeftColor = C[i];
    digit.children[2].children[1].style.borderRightColor = C[i];
    digit.children[2].children[2].style.display = C[i] == l ? "initial" : "none";
    digit.children[3].children[0].style.borderTopColor = D[i];
    digit.children[3].children[1].style.borderBottomColor = D[i];
    digit.children[3].children[2].style.display = D[i] == l ? "initial" : "none";
    digit.children[4].children[0].style.borderLeftColor = E[i];
    digit.children[4].children[1].style.borderRightColor = E[i];
    digit.children[4].children[2].style.display = E[i] == l ? "initial" : "none";
    digit.children[5].children[0].style.borderLeftColor = F[i];
    digit.children[5].children[1].style.borderRightColor = F[i];
    digit.children[5].children[2].style.display = F[i] == l ? "initial" : "none";
    digit.children[6].children[0].style.borderTopColor = G[i];
    digit.children[6].children[1].style.borderBottomColor = G[i];
    digit.children[6].children[2].style.display = G[i] == l ? "initial" : "none";
}