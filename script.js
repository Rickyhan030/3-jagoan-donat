<script>
    let cart = [];

    // Fungsi menambah ke keranjang
    function addCart(nama, harga) {
        // Cek apakah produk sudah ada di keranjang
        let itemIndex = cart.findIndex(item => item.nama === nama);

        if (itemIndex > -1) {
            // Jika sudah ada, tambah jumlahnya
            cart[itemIndex].jumlah += 1;
        } else {
            // Jika belum ada, masukkan sebagai item baru
            cart.push({ nama, harga, jumlah: 1 });
        }
        renderCart();
    }

    // Fungsi mengubah jumlah (tambah/kurang)
    function updateQty(index, aksi) {
        if (aksi === 'tambah') {
            cart[index].jumlah += 1;
        } else if (aksi === 'kurang') {
            cart[index].jumlah -= 1;
            // Jika jumlah 0, otomatis hapus dari list
            if (cart[index].jumlah < 1) {
                cart.splice(index, 1);
            }
        }
        renderCart();
    }

    // Fungsi membatalkan/menghapus satu jenis produk
    function deleteItem(index) {
        if (confirm("Hapus pesanan ini?")) {
            cart.splice(index, 1);
            renderCart();
        }
    }

    function renderCart() {
        let list = document.getElementById("cartList");
        let total = 0;
        list.innerHTML = "";

        if (cart.length === 0) {
            list.innerHTML = "<li style='color: #888; justify-content: center; padding: 20px;'>Keranjang kosong</li>";
        }

        cart.forEach((item, index) => {
            let subtotal = item.harga * item.jumlah;
            total += subtotal;
            
            list.innerHTML += `
                <li>
                    <div style="flex: 1;">
                        <strong style="display:block; font-size: 1rem;">${item.nama}</strong>
                        <small style="color: #ff7b54; font-weight: 600;">Rp ${item.harga.toLocaleString()}</small>
                    </div>
                    <div class="cart-controls">
                        <button class="qty-btn" onclick="updateQty(${index}, 'kurang')">-</button>
                        <span class="qty-num">${item.jumlah}</span>
                        <button class="qty-btn" onclick="updateQty(${index}, 'tambah')">+</button>
                        <button class="del-btn" onclick="deleteItem(${index})" title="Hapus Semua">×</button>
                    </div>
                </li>
            `;
        });

        document.getElementById("total").innerText = "Total: Rp " + total.toLocaleString();
    }

    function checkout() {
        if (cart.length === 0) {
            alert("Keranjang masih kosong!");
            return;
        }
        let nomor = "628XXXXXXXXXX"; // GANTI DENGAN NOMOR WA KAMU
        let text = "*Halo Sweet Bakery, Saya ingin pesan:*\n\n";
        
        cart.forEach(item => {
            let sub = item.harga * item.jumlah;
            text += `• ${item.nama} (x${item.jumlah}) = Rp ${sub.toLocaleString()}\n`;
        });
        
        let totalHarga = cart.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);
        text += `\n*Total Tagihan: Rp ${totalHarga.toLocaleString()}*`;

        let url = "https://wa.me/" + nomor + "?text=" + encodeURIComponent(text);
        window.open(url, "_blank");
    }
</script>
