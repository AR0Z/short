let btnModal = document.querySelector("#short");
let modalShortLink = document.querySelector(".link_shorted");
let link = document.getElementById("link");
let inputShortLink = document.getElementById("shorted_link");
let QRCodeDiv = document.getElementById("QRCode");
let shortLink;
let qrcode;

const params = new URLSearchParams(window.location.search);
const redirectParam = params.get("redirect") || window.location.pathname.replace(/^\/|\/$/g, '');

if (redirectParam) {
    fetch(`https://api.short.aroz.be/link/${redirectParam}`).then((reponse) => {
        if (!reponse.ok) {
            window.location.href = "https://short.aroz.be";
        }
        return reponse.text();
    }).then((data) => {
        if (data === "Not Found") {
            window.location.href = "https://short.aroz.be";
        } else if (data) {
            window.location.href = data;
        }
    });
}

btnModal.addEventListener("click", () => {
    modalShortLink.classList.add("link_shorted--active");
    QRCodeDiv.innerHTML = "";
    try {
        let url = new URL(link.value);

        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: link.value }),
        };

        fetch("https://api.short.aroz.be/link", request)
            .then((reponse) => {
                if (!reponse.ok) {
                    throw new Error("Network response was not ok");
                }
                return reponse.text();
            }).then((data) => {
                if (data) {
                    shortlink = `https://short.aroz.be/${data}`;
                    inputShortLink.value = shortlink;
                    CountLink();
                    qrcode = new QRCode(QRCodeDiv, {
                        width: 128,
                        height: 128,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H,
                    });
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
        qrcode.makeCode(inputShortLink.value);
        QRCodeDiv.classList.add("active-QRCode");
    } catch (error) {
        console.log(error);
    }
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

    fetch("https://api.short.aroz.be/link/countLink").then((reponse) => {
        if (!reponse.ok) {
            throw new Error("Network response was not ok");
        }
        return reponse.text();
    }).then((data) => {
        if (data) {
            count.innerHTML = data;
        }
    });
}

CountLink();
