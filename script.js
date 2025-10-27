function validarLogin() {
    const usuario = document.getElementById("username").value; 
    const contraseña = document.getElementById("password").value;
    const mensaje = document.getElementById("mensaje");
    const imagen = document.getElementById("imagen-container");
    const video = document.getElementById("video-container");

  if (usuario === "alumno" && contraseña === "2025") {
    mensaje.textContent = "Bienvenido a la plataforma de la Universidad Mariano Galvez (Super básica )";
    imagen.style.display = "block";
    video.style.display = "block";
  } else {
    mensaje.textContent ="Usuario o contraseña incorrectos.";
    imagen.style.display ="none";
    video.style.display ="none";
  }
}
