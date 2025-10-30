document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  let currentIndex = 0;

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  function resizeSlides() {
    const trackWidth = document.querySelector(".carousel").offsetWidth;
    slides.forEach(slide => {
      slide.style.width = `${trackWidth}px`;
    });
    updateCarousel();
  }

  window.addEventListener("resize", resizeSlides);
  resizeSlides();
});


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Obtener los valores del formulario
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const telefono = document.getElementById("telefono").value;
      const mensaje = document.getElementById("mensaje").value;

      // Envío con EmailJS
      emailjs
        .send("service_dv96lx8", "template_xxe5nv3", {
          nombre: nombre,
          email: email,
          telefono: telefono,
          mensaje: mensaje,
        })
        .then(
          function () {
            mensajeConfirmacion.textContent =
              "✅ Gracias por tu mensaje. Te contactaremos pronto.";
            form.reset();
          },
          function (error) {
            mensajeConfirmacion.textContent =
              "❌ Ocurrió un error al enviar el mensaje. Intenta nuevamente.";
            console.error("Error:", error);
          }
        );
    });
  }
});

emailjs.init("vhtnsV9pzduMKLkmI");
emailjs.sendForm("service_dv96lx8", "template_xxe5nv3", this)


// ======== CARRITO / CHECKOUT ========
document.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll(".btn-comprar, .btn");
  const cantidadInput = document.getElementById("cantidad");
  const subtotalEl = document.getElementById("subtotal");
  const precioEl = document.getElementById("productoPrecio");
  const btnFinalizar = document.getElementById("btnFinalizar");

  // Actualiza el subtotal en checkout
  if (cantidadInput && subtotalEl && precioEl) {
    cantidadInput.addEventListener("input", () => {
      const precio = parseFloat(precioEl.textContent.replace(/[^0-9.]/g, ""));
      const cantidad = parseInt(cantidadInput.value);
      const subtotal = precio * cantidad;
      subtotalEl.textContent = `$${subtotal.toLocaleString("es-AR")}`;
    });
  }

  // Botón "Finalizar compra"
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      alert("✅ ¡Gracias por tu compra! Te contactaremos para coordinar el envío.");
      window.location.href = "../index.html";
    });
  }

  // Redirección desde el producto
  const comprarAhora = document.querySelector(".btn");
  if (comprarAhora && comprarAhora.textContent.includes("Comprar")) {
    comprarAhora.addEventListener("click", () => {
      window.location.href = "./checkout.html";
    });
  }
});

// ======== BOTÓN COMPRAR AHORA ========
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona el botón de compra
  const comprarAhora = document.querySelector(".btn-comprar");

  // Verifica si el botón existe antes de agregarle el evento
  if (comprarAhora) {
    comprarAhora.addEventListener("click", () => {
      // Redirige a la página de checkout
      window.location.href = "checkout.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const comprarAhora = document.querySelector(".btn-comprar");
  
  if (comprarAhora) {
    comprarAhora.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  }
});


// Animación suave del botón de WhatsApp
document.addEventListener("DOMContentLoaded", () => {
  const whatsappBtn = document.getElementById("whatsappBtn");
  if (whatsappBtn) {
    whatsappBtn.style.opacity = "0";
    whatsappBtn.style.transition = "opacity 0.8s ease";
    setTimeout(() => whatsappBtn.style.opacity = "1", 300);
  }
});