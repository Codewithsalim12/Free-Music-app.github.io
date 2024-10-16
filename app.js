const mysong = document.getElementById("mysong");
const icon = document.getElementById("icon");
const nextButton = document.getElementById("next-button");
const playingGif = document.getElementById("playing-Gif");
const progressBar = document.getElementById("progress"); // Progress bar element
const durationElement = document.querySelector(".Duration"); // Duration element

let songSources = [
  "assets/song-1.mp3",
  "assets/song-2.mp3",
  "assets/song-3.mp3",
  "assets/song-4.mp3",
  "assets/song-5.mp3",
  "assets/song-6.mp3",
  "assets/song-7.mp3",
  // Add more song sources here
];

let currentSongIndex = 0;
let isDragging = false; // Flag to track drag state

icon.addEventListener("click", () => {
  if (mysong.paused) {
    mysong.play();
    icon.src = "covers/pause.png";
    playingGif.style.display = "block";
  } else {
    mysong.pause();
    icon.src = "covers/play.png";
    playingGif.style.display = "none";
  }
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songSources.length;
  mysong.src = songSources[currentSongIndex];
  mysong.play();
  icon.src = "covers/pause.png";
});

mysong.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songSources.length;
  mysong.src = songSources[currentSongIndex];
  mysong.play();
  icon.src = "covers/pause.png";
});

// Update progress bar as the song plays
mysong.addEventListener("timeupdate", () => {
  const progress = (mysong.currentTime / mysong.duration) * 100;
  progressBar.value = progress;

  // Update duration element
  const minutes = Math.floor(mysong.currentTime / 60);
  const seconds = Math.floor(mysong.currentTime % 60);
  durationElement.textContent = `Duration 🕒: ${minutes}:${seconds.toString().padStart(2, "0")}`;
});

// Drag functionality
progressBar.addEventListener("mousedown", () => {
  isDragging = true;
});

progressBar.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const rect = progressBar.getBoundingClientRect(); // Get the position of the progress bar
    const offsetX = e.clientX - rect.left; // Calculate the mouse position relative to the progress bar
    const newValue = (offsetX / rect.width) * 100; // Calculate the new value as a percentage
    progressBar.value = newValue; // Update the progress bar value

    // Update the current time of the song
    mysong.currentTime = (newValue / 100) * mysong.duration;
  }
});

progressBar.addEventListener("mouseup", () => {
  isDragging = false;
});

progressBar.addEventListener("mouseleave", () => {
  isDragging = false; // Stop dragging if the mouse leaves the progress bar
});

// Add event listener to update volume control
const volumeControl = document.getElementById("volume");

volumeControl.addEventListener("input", () => {
  mysong.volume = volumeControl.value / 100;
});