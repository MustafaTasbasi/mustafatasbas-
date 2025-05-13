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

        document.getElementById("aa").innerHTML = mesaj;
