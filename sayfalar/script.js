
        function saveDataToLocalStorage() {
            localStorage.setItem('fname', document.getElementById('fname').value);
            localStorage.setItem('lname', document.getElementById('lname').value);
            localStorage.setItem('user', document.getElementById('user').value);
            localStorage.setItem('yorum', document.getElementById('yorum').value);
            localStorage.setItem('parola', document.getElementById('parola').value);
            localStorage.setItem('tparola', document.getElementById('tparola').value);
        }

        function kontrol() {
            var h = document.getElementById("hata");
            var hata = "";
            var bayrak = true;

            var fname = document.getElementById("fname").value;
            if (fname == "") {
                bayrak = false;
                hata = "Adınızı boş geçemezsiniz";
            }

            var lname = document.getElementById("lname").value;
            if (lname == "") {
                bayrak = false;
                hata = "Soyadınızı boş geçemezsiniz";
            }

            var user = document.getElementById("user").value;
            if (user == "") {
                bayrak = false;
                hata = "Kullanıcı adınızı boş geçemezsiniz";
            }

            var parola = document.getElementById("parola").value;
            if (parola == "") {
                bayrak = false;
                hata = "Şifreyi boş geçemezsiniz";
            }

            var tparola = document.getElementById("tparola").value;
            if (tparola == "") {
                bayrak = false;
                hata = "Yenilenen şifreyi boş geçemezsiniz";
            }

            var yorum = document.getElementById("yorum").value;
            if (yorum == "") {
                bayrak = false;
                hata = "Yorumu boş geçemezsiniz";
            }

            if (parola != tparola) {
                bayrak = false;
                hata = "Parolalar uyumlu değil";
            }

            if (bayrak) {
                saveDataToLocalStorage(); // Veriyi kaydet
            }

            h.innerHTML = hata;
            return bayrak;
        }
        const fname = localStorage.getItem('fname');
        const lname = localStorage.getItem('lname');
        const user = localStorage.getItem('user');
        const yorum = localStorage.getItem('yorum');
        const parola = localStorage.getItem('parola');
        const tparola = localStorage.getItem('tparola');

        // Verileri sayfada göster
        const mesaj = `
            <p><strong>Ad:</strong> ${fname}</p>
            <p><strong>Soyad:</strong> ${lname}</p>
            <p><strong>Kullanıcı Adı:</strong> ${user}</p>
            <p><strong>Yorum:</strong> ${yorum}</p>
        `;