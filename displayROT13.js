document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const rot13Text = params.get("rot13text");
  document.getElementById("rot13Text").innerHTML = rot13Text;

  const closeButton = document.getElementById("closeButton");
  closeButton.addEventListener("click", () => {
    window.close();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key == "Enter" || event.key == "Escape") {
    window.close();
  }
});
