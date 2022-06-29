let btnModal = document.querySelector("#short");
let modalShortLink = document.querySelector(".link_shorted");
let link = document.getElementById("link");
let inputShortLink = document.getElementById("shorted_link");
let QRCodeDiv = document.getElementById("QRCode");
let shortLink;
let qrcode;

btnModal.addEventListener("click", () => {
    modalShortLink.classList.add("link_shorted--active");
    QRCodeDiv.innerHTML = "";
    try {
        let url = new URL(link.value);
        let jdrs = new JDRS("script/script.php");

        jdrs.pushValue("need", "makeid");
        jdrs.pushValue("url", url);

        jdrs.sendRequest((answer) => {
            if (answer) {
                shortLink = `https://short.aroz.be/${answer}`;
                inputShortLink.value = shortLink;
                CountLink();
                qrcode = new QRCode(QRCodeDiv, {
                    width: 128,
                    height: 128,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H,
                });
                QRCodeDiv.classList.remove("active-QRCode");
            } else {
                inputShortLink.value = `Your link is not valid`;
            }
        });
    } catch (error) {
        inputShortLink.value = `Your link is not valid`;
    }
});

let copyLink = document.getElementById("copyLink");
copyLink.addEventListener("click", () => {
    inputShortLink.select();
    inputShortLink.setSelectionRange(0, 99999);

    document.execCommand("copy");
});

let createQRCode = document.getElementById("createQRCode");

createQRCode.addEventListener("click", () => {
    try {
        let url = new URL(shortLink);
        qrcode.makeCode(shortLink);
        QRCodeDiv.classList.add("active-QRCode");
    } catch (error) {}
});

let clearLink = document.getElementById("clearLink");
clearLink.addEventListener("click", () => {
    inputShortLink.value = "";
    link.value = "";
    modalShortLink.classList.remove("link_shorted--active");

    QRCodeDiv.classList.remove("active-QRCode");
});

function CountLink() {
    let count = document.getElementById("countLink");
    let jdrs = new JDRS("script/script.php");

    jdrs.pushValue("need", "count");

    jdrs.sendRequest((answer) => {
        count.innerHTML = answer;
    });
}

CountLink();
