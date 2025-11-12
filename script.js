// === CARRUSEL ===
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = track ? Array.from(track.children) : [];
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  let currentIndex = 0;

  if (track && slides.length > 0) {
    function updateCarousel() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    nextButton?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    prevButton?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    function resizeSlides() {
      const trackWidth = document.querySelector(".carousel").offsetWidth;
      slides.forEach(slide => (slide.style.width = `${trackWidth}px`));
      updateCarousel();
    }

    window.addEventListener("resize", resizeSlides);
    resizeSlides();
  }
});


// === FORMULARIO DE CONTACTO (EmailJS) ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");

  if (form && mensajeConfirmacion) {
    emailjs.init("vhtnsV9pzduMKLkmI");

    form.addEventListener("submit", e => {
      e.preventDefault();

      const datos = {
        nombre: form.nombre.value,
        email: form.email.value,
        telefono: form.telefono.value,
        mensaje: form.mensaje.value,
      };

      emailjs
        .send("service_dv96lx8", "template_xxe5nv3", datos)
        .then(() => {
          mensajeConfirmacion.textContent = "✅ Gracias por tu mensaje. Te contactaremos pronto.";
          form.reset();
        })
        .catch(() => {
          mensajeConfirmacion.textContent = "❌ Ocurrió un error al enviar el mensaje. Intenta nuevamente.";
        });
    });
  }
});


// === ANIMACIÓN DEL BOTÓN WHATSAPP ===
document.addEventListener("DOMContentLoaded", () => {
  const whatsappBtn = document.getElementById("whatsappBtn");
  if (whatsappBtn) {
    whatsappBtn.style.opacity = "0";
    whatsappBtn.style.transition = "opacity 0.8s ease";
    setTimeout(() => (whatsappBtn.style.opacity = "1"), 300);
  }
});


// === FILTRO DE PRODUCTOS ===
document.addEventListener("DOMContentLoaded", () => {
  const botonesFiltro = document.querySelectorAll(".filtro-btn");
  const tarjetas = document.querySelectorAll(".card");

  if (botonesFiltro.length && tarjetas.length) {
    botonesFiltro.forEach(btn => {
      btn.addEventListener("click", () => {
        botonesFiltro.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const categoria = btn.dataset.categoria;

        tarjetas.forEach(card => {
          card.style.display =
            categoria === "todos" || card.dataset.categoria === categoria
              ? "flex"
              : "none";
        });
      });
    });
  }
});


// === CARRITO EN PRODUCTO (botones +, -, continuar, finalizar) ===
document.addEventListener("DOMContentLoaded", () => {
  const btnSumar = document.getElementById("sumar");
  const btnRestar = document.getElementById("restar");
  const cantidadEl = document.getElementById("cantidad");
  const precioUnitarioEl = document.getElementById("precio-unitario");
  const subtotalEl = document.getElementById("subtotal");
  const btnContinuar = document.getElementById("continuar");
  const btnFinalizar = document.getElementById("finalizar");

  if (btnSumar && btnRestar && cantidadEl && precioUnitarioEl && subtotalEl) {
    let cantidad = parseInt(cantidadEl.textContent) || 1;
    const precioUnitario = parseFloat(precioUnitarioEl.textContent);

    function actualizarSubtotal() {
      subtotalEl.textContent = (precioUnitario * cantidad).toFixed(0);
    }

    btnSumar.addEventListener("click", () => {
      cantidad++;
      cantidadEl.textContent = cantidad;
      actualizarSubtotal();
    });

    btnRestar.addEventListener("click", () => {
      if (cantidad > 1) {
        cantidad--;
        cantidadEl.textContent = cantidad;
        actualizarSubtotal();
      }
    });

    const guardarEnCarrito = (destino) => {
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const nombreProductoEl = document.getElementById("nombre-producto");
const nombreProducto = nombreProductoEl ? nombreProductoEl.textContent.trim() : "Producto sin nombre";

carrito.push({
  nombre: nombreProducto,
  precio: precioUnitario,
  cantidad: cantidad,
});

      localStorage.setItem("carrito", JSON.stringify(carrito));
      window.location.href = destino;
    };

    btnContinuar?.addEventListener("click", () =>
      guardarEnCarrito("../paginas/productos.html")
    );
    btnFinalizar?.addEventListener("click", () =>
      guardarEnCarrito("../paginas/checkout.html")
    );

    console.log("✅ Control de cantidad activo");
  }
});


// === CHECKOUT: LISTA DE PRODUCTOS ===
document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-carrito");
  const totalSpan = document.getElementById("total");

  if (lista && totalSpan) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;

    carrito.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.nombre} x${p.cantidad} - $${(p.precio * p.cantidad).toFixed(0)}`;
      lista.appendChild(li);
      total += p.precio * p.cantidad;
    });

    totalSpan.textContent = total.toFixed(0);
  }
});


    // boton flotante para el checkout


document.addEventListener("DOMContentLoaded", () => {
  const btnCarrito = document.getElementById("btnCarritoFlotante");
  if (btnCarrito) {
    // Si hay productos en el carrito, destacar el botón
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length > 0) {
      btnCarrito.classList.add("destacado");
    }
  }
});


// === 🗑️ ELIMINAR PRODUCTOS DEL CHECKOUT ===
window.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-carrito");
  const totalSpan = document.getElementById("total");

  if (!lista || !totalSpan) return;

  // Cargar carrito desde localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function renderCarrito() {
    lista.innerHTML = "";
    let total = 0;

    carrito.forEach((p, index) => {
      const li = document.createElement("li");
      li.classList.add("item-carrito");
      li.innerHTML = `
        <span>${p.nombre} x${p.cantidad} - $${(p.precio * p.cantidad).toFixed(2)}</span>
        <button class="btn-eliminar" data-index="${index}" title="Eliminar">
          🗑️
        </button>
      `;
      lista.appendChild(li);
      total += p.precio * p.cantidad;
    });

    totalSpan.textContent = total.toFixed(2);

    // Asignar evento a cada tachito
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = e.currentTarget.getAttribute("data-index");
        carrito.splice(i, 1); // Eliminar producto
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito(); // Volver a mostrar lista actualizada
      });
    });
  }

  renderCarrito();
});

// === SISTEMA DE COMENTARIOS ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formComentario");
  const lista = document.getElementById("listaComentarios");

  if (!form || !lista) return;

  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

  const renderComentarios = () => {
    lista.innerHTML = "";
    comentarios.forEach(c => {
      const div = document.createElement("div");
      div.classList.add("comentario-item");
      div.innerHTML = `
        <h3>${c.nombre}</h3>
        <p>${c.texto}</p>
        ${c.imagen ? `<img src="${c.imagen}" alt="Imagen del comentario">` : ""}
      `;
      lista.appendChild(div);
    });
  };

  renderComentarios();

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const texto = document.getElementById("comentario").value.trim();
    const archivo = document.getElementById("imagen").files[0];

    if (!nombre || !texto) return alert("Por favor, completá todos los campos.");

    let imagenBase64 = "";
    if (archivo) {
      const lector = new FileReader();
      lector.onload = function(event) {
        imagenBase64 = event.target.result;
        comentarios.push({ nombre, texto, imagen: imagenBase64 });
        localStorage.setItem("comentarios", JSON.stringify(comentarios));
        renderComentarios();
        form.reset();
      };
      lector.readAsDataURL(archivo);
    } else {
      comentarios.push({ nombre, texto, imagen: "" });
      localStorage.setItem("comentarios", JSON.stringify(comentarios));
      renderComentarios();
      form.reset();
    }
  });
});
