<script setup>

</script>

<template>
  <div>
    <div class="content">
      <img src="../assets/foto_1.jpg" alt="Trainers Col" class="img-fluid full-screen-img">
    </div>
    <!-- Botones de redes sociales -->
    <div class="social-buttons">
      <a href="https://wa.me/3012756264" target="_blank" aria-label="whatsapp"><img src="../assets/whatsapp.png"
          alt="whatsapp"></a>
      <a href="https://www.facebook.com/Trainerscol/" target="_blank" aria-label="Facebook"><img
          src="../assets/facebook.png" alt="facebook"></a>
      <a href="https://www.instagram.com/trainerscolsoc?igshid=1tt2rd726w4dz" target="_blank"
        aria-label="Instagram"><img src="../assets/instagram.png" alt=""></a>
      <a href="https://www.youtube.com/channel/UCSlxXNEJxW1c1gtZ8Y-4QRA" target="_blank" aria-label="youtube"><img
          src="../assets/youtube.png" alt="youtube"></a>
    </div>
  </div>
</template>

<style scoped>
/* Estilo para los botones fijos */
.social-buttons {
  position: fixed;
  top: 50%;
  /* Centrado vertical */
  /*left: 50%; /* Centrado horizontal */
  right: 10px;
  /* Distancia desde el lado derecho */
  transform: translatey(-50%);
  /* Ajusta la posición para que quede centrado */
  z-index: 1050;
  /* Asegura que estén encima de otros elementos */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.social-buttons img {
  margin-bottom: 10px;
  /* Espaciado entre botones */
  color: white;
  text-align: center;
  width: 50px;
  height: 50px;
  line-height: 50px;
  /* Centra el ícono verticalmente */
  border-radius: 50%;
  /* Hace que el botón sea circular */
}

/* Colores personalizados */
.social-buttons .facebook {
  background-color: #3b5998;
  /* Color de Facebook */
}

.social-buttons .instagram {
  background-color: #e1306c;
  /* Color de Instagram */
}

.social-buttons .youtube {
  background-color: #943126;
  /* Color de youtube */
}

.social-buttons .whatsapp {
  background-color: #186a3b;
  /* Color de whatsapp */
}

.social-buttons a:hover {
  opacity: 0.8;
  /* Efecto hover */
}

/* Ajuste para pantallas pequeñas */
@media (max-width: 576px) {
  .social-buttons {
    top: auto;
    /* Mueve los botones al fondo */
    bottom: 10px;
    /* Posición desde la parte inferior */
    right: 10px;
    flex-direction: row;
    /* Coloca los botones en fila horizontal */
    justify-content: center;
  }

  .social-buttons a {
    margin: 0 5px;
    /* Espaciado horizontal entre botones */
  }
}

.full-screen-img {
  width: 100%;
  /* Ocupa todo el ancho */
  height: calc(1100px - 62px);
  /* Ocupa todo el alto del viewport */
  object-fit: cover;
  /* Ajusta la imagen sin distorsionar proporciones */
}

.content {
  margin-top: 62px;
  /* Igual a la altura de la barra */
}
</style>