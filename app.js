document.addEventListener("DOMContentLoaded", () => {
  const sampleVideos = [
    { id: "v1", title: "Curiosidades - Nivel 1", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", desc: "Video de muestra 1" },
    { id: "v2", title: "Curiosidades - Nivel 2", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", desc: "Video de muestra 2" }
  ];

  let videos = [];
  let currentVideo = null;

  const grid = document.getElementById("videoGrid");
  const player = document.getElementById("player");
  const modal = document.getElementById("playerModal");
  const title = document.getElementById("playerTitle");
  const desc = document.getElementById("playerDesc");
  const likeBtn = document.getElementById("likeBtn");
  const likeCount = document.getElementById("likeCount");
  const closeBtn = document.getElementById("closeModal");
  const uploadBtn = document.getElementById("uploadBtn");
  const fileInput = document.getElementById("fileInput");
  const sampleBtn = document.getElementById("sampleBtn");

  function render() {
    grid.innerHTML = "";
    if (videos.length === 0) {
      grid.innerHTML = "<p>No hay videos. Sube uno o carga ejemplos.</p>";
      return;
    }
    videos.forEach(v => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<div class='thumb'>🎬</div><div class='info'><h5>${v.title}</h5><p>${v.desc}</p></div>`;
      card.onclick = () => open(v);
      grid.appendChild(card);
    });
  }

  function open(v) {
    currentVideo = v;
    player.src = v.src;
    title.textContent = v.title;
    desc.textContent = v.desc;
    likeCount.textContent = v.likes || 0;
    modal.classList.remove("hidden");
  }

  function close() {
    player.pause();
    modal.classList.add("hidden");
  }

  uploadBtn.onclick = () => fileInput.click();
  fileInput.onchange = e => {
    const f = e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    videos.unshift({ id: Date.now(), title: f.name, src: url, desc: "Subido por ti", likes: 0 });
    render();
  };

  likeBtn.onclick = () => {
    if (!currentVideo) return;
    currentVideo.likes = (currentVideo.likes || 0) + 1;
    likeCount.textContent = currentVideo.likes;
  };

  sampleBtn.onclick = () => { videos = sampleVideos; render(); };
  closeBtn.onclick = close;
  modal.onclick = e => { if (e.target === modal) close(); };

  render();
});
