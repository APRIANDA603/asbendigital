function updateClock() {
  const now = new Date();
  const jam = now.getHours().toString().padStart(2, '0');
  const menit = now.getMinutes().toString().padStart(2, '0');
  const detik = now.getSeconds().toString().padStart(2, '0');
  const tanggal = now.toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  document.getElementById('clock').textContent = `${jam}:${menit}:${detik}`;
  document.getElementById('date').textContent = tanggal;
}
setInterval(updateClock, 1000);
updateClock();

document.getElementById("user-name").textContent = localStorage.getItem("user") || "-";

const video = document.getElementById('camera');
const canvas = document.getElementById('snapshot');
const preview = document.getElementById('preview');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.error("Kamera gagal dimuat:", error);
    video.outerHTML = "<p style='color: #ffccbc;'>Kamera tidak tersedia</p>";
  });

function ambilFoto() {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL('image/png');
  preview.src = dataURL;
  preview.style.display = "block";
  return dataURL;
}

document.querySelector('.masuk').addEventListener('click', () => {
  const foto = ambilFoto();
  const jam = document.getElementById('clock').textContent;
  alert(`Absen MASUK berhasil pada ${jam}`);
  // Simpan foto + jam ke server atau localStorage jika diperlukan
});

document.querySelector('.pulang').addEventListener('click', () => {
  const foto = ambilFoto();
  const jam = document.getElementById('clock').textContent;
  alert(`Absen PULANG berhasil pada ${jam}`);
});

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
