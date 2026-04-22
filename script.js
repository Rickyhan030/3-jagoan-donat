function checkoutWA(){
  let nomor = "6282110677862";

  let text = "Halo, saya ingin pesan:\n";
  cart.forEach(item=>{
    text += "- "+item.nama+" Rp "+item.harga+"\n";
  });

  let url = "https://wa.me/"+nomor+"?text="+encodeURIComponent(text);
  window.open(url, "_blank");
}

function checkoutFB(){
  let text = "Halo, saya ingin pesan produk bakery";
  let url = "https://m.me/USERNAME_FACEBOOK?ref=" + encodeURIComponent(text);
  window.open(url, "_blank");
}
