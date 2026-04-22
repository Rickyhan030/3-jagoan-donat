<script>
let cart = [];

/* =========================
   TAMBAH KE KERANJANG
========================= */
function addCart(nama, harga) {
    let item = cart.find(i => i.nama === nama);

    if (item) {
        item.jumlah += 1;
    } else {
        cart.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    renderCart();
}

/* =========================
   UPDATE JUMLAH
========================= */
function updateQty(index, type) {
    if (type === "plus") {
        cart[index].jumlah++;
    } else {
        cart[index].jumlah--;
        if (cart[index].jumlah <= 0) {
            cart.splice(index, 1);
        }
    }

    renderCart();
}

/* =========================
   HAPUS ITEM
========================= */
function deleteItem(index) {
    cart.splice(index, 1);
    renderCart();
}

/* =========================
   RENDER KERANJANG
========================= */
function renderCart() {
    let list = document.getElementById("cartList");
    list.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        list.innerHTML = "<li style='text-align:center;color:#888;'>Keranjang masih kosong 🛒</li>";
        document.getElementById("total").innerText = "Total: Rp 0";
        return;
    }

    cart.forEach((item, index) => {
        let subtotal = item.harga * item.jumlah;
        total += subtotal;

        list.innerHTML += `
            <li>
                <div>
                    <strong>${item.nama}</strong><br>
                    <small>Rp ${item.harga.toLocaleString()}</small>
                </div>

                <div class="cart-controls">
                    <button onclick="updateQty(${index}, 'minus')">-</button>
                    <span>${item.jumlah}</span>
                    <button onclick="updateQty(${index}, 'plus')">+</button>
                    <button onclick="deleteItem(${index})">❌</button>
                </div>
            </li>
        `;
    });

    document.getElementById("total").innerText =
        "Total: Rp " + total.toLocaleString();
}

/* =========================
   CHECKOUT WHATSAPP
========================= */
function checkout() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let nomor = "6281234567890"; // GANTI NOMOR WA KAMU
    let text = "*🛒 PESANAN BAKERY SHOP*\n\n";

    let total = 0;

    cart.forEach(item => {
        let sub = item.harga * item.jumlah;
        total += sub;

        text += `• ${item.nama} x${item.jumlah} = Rp ${sub.toLocaleString()}\n`;
    });

    text += `\n*TOTAL BAYAR: Rp ${total.toLocaleString()}*`;

    let url = "https://wa.me/" + nomor + "?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
}
</script>
