// testimonials-carousel.js

// Testimonios dinámicos y auto-scroll vertical
(function(){
  const data = [
    { name: "Alejandro Pérez",   time: "10:12 am", text: "Entré por un video de Facebook, triplicaron mi carga y con eso pude sacar el triple de premio." },
    { name: "María Gómez",       time: "9:45 pm",  text: "Vi el anuncio en Facebook, pensé que era mentira pero me dieron el 200% extra y pude jugar más." },
    { name: "Lucas Rodríguez",   time: "2:30 pm",  text: "Los cajeros de WBRICH responden muy rápido y son bastante atentos." },
    { name: "Valentina Sánchez", time: "8:20 am",  text: "Tripliqué mi carga y con eso aumenté considerablemente mis chances de ganar." },
    { name: "Federico Martínez", time: "7:55 pm",  text: "Muy buena plataforma, todo fluye y es fácil de usar." },
    { name: "Camila López",      time: "6:10 pm",  text: "La atención fue excelente, me ayudaron con todo al momento." },
    { name: "Diego Fernández",   time: "11:05 am", text: "Con el bono del 200% pude probar más juegos y terminé ganando." },
    { name: "Florencia Torres",  time: "4:40 pm",  text: "Vi el anuncio, no lo creía, probé y pagaron al instante." },
    { name: "Ignacio Vázquez",   time: "9:15 pm",  text: "Tripliqué la carga por una promo y me fue genial: retiré rápido." },
    { name: "Martina Pacheco",   time: "3:50 pm",  text: "Los cajeros responden en seguida; la experiencia fue muy ágil." },
    { name: "Santiago Castro",   time: "8:00 am",  text: "Entré por un video y el bono me permitió jugar mucho más tiempo." },
    { name: "Julieta Navarro",   time: "1:20 pm",  text: "Pensé que era humo, pero probé y me acreditaron el 200% extra." },
    { name: "Gonzalo Romero",    time: "5:35 pm",  text: "Muy buena la atención de esta gente: súper cordiales y eficientes." },
    { name: "Lucía Álvarez",     time: "10:50 am", text: "Hice una carga pequeña y la promo la convirtió en un buen monto para jugar." },
    { name: "Facundo Díaz",      time: "7:25 pm",  text: "El retiro llegó en minutos, muy recomendable." },
    { name: "Camilo Bustos",     time: "11:55 am", text: "Vi la promo en Facebook, cargué y terminé sacando un gran premio." },
    { name: "Noelia Sosa",       time: "6:15 pm",  text: "La plataforma es intuitiva y el bono ayudó un montón." },
    { name: "Ramiro Tévez",      time: "2:05 pm",  text: "Tripliqué mi carga con la promo y subieron mucho mis chances." },
    { name: "Bianca Zapata",     time: "9:40 am",  text: "Los cajeros de WBRICH son rápidos y el soporte resolvió una duda al toque." },
    { name: "Ezequiel Duarte",   time: "4:55 pm",  text: "Entré por un anuncio y me dieron el 200% extra: pude jugar más y ganar." },
    { name: "Carolina Jiménez",  time: "7:59 am",  text: "Muy buena plataforma, sencilla y confiable." },
    { name: "Tomás Giordano",    time: "3:30 pm",  text: "Vi el anuncio, pensé que era mentira pero funcionó: pagaron rápido." },
    { name: "Micaela Arce",      time: "6:45 pm",  text: "Tripliqué mi carga y conseguí jugadas que terminaron bien." },
    { name: "Nicolás Estévez",   time: "8:25 am",  text: "La atención fue rápida y el retiro llegó en cuestión de minutos." },
    { name: "Renata Fuentes",    time: "5:10 pm",  text: "Entré por un video de Facebook y me sorprendió la rapidez en los pagos." },
    { name: "Lucas Tello",       time: "12:00 pm", text: "El bono del 200% realmente te da más oportunidades de juego." },
    { name: "Vanesa Roldán",     time: "10:05 am", text: "Muy buena la atención de esta gente, me asesoraron en todo." },
    { name: "Federico Urrutia",  time: "7:27 pm",  text: "Tripliqué la carga en una promo y salió redondo: pude retirar rápido." },
    { name: "Victoria Pereyra",  time: "6:22 pm",  text: "Los cajeros de WBRICH responden muy rápido." },
    { name: "Pablo Salinas",     time: "9:18 am",  text: "Vi el anuncio y probé: me dieron el 200% extra y gané algunas jugadas." },
    { name: "Mónica Kogan",      time: "8:00 pm",  text: "Muy buena plataforma, estable y sin contratiempos." },
    { name: "Hugo Luna",         time: "2:45 pm",  text: "Entré por un video, triplicaron mi carga y pude jugar al máximo." },
    { name: "Ana Blanco",        time: "8:55 am",  text: "No lo creía hasta que cobré, todo rápido y serio." },
    { name: "Germán Núñez",      time: "11:20 am", text: "Con el bono pude probar juegos nuevos y terminé ganando." },
    { name: "Sofía Cabrera",     time: "3:15 pm",  text: "Los cajeros son muy eficientes y el soporte contestó al instante." },
    { name: "Diego Rojas",       time: "2:15 pm",  text: "Tripliqué mi carga con la promo y aumentaron mis chances de premio." },
    { name: "Mariana Silva",     time: "11:50 am", text: "Vi el anuncio en Facebook y al final fue tal cual: me acreditaron todo." },
    { name: "Lucas Giannini",    time: "4:05 pm",  text: "Muy buena la atención de esta gente, me ayudaron a retirar sin problemas." },
    { name: "Patricia Morel",    time: "5:30 pm",  text: "Con el 200% extra pude jugar más y aprovechar una buena racha." },
    { name: "Esteban Yáñez",     time: "11:12 pm", text: "El retiro fue inmediato, excelente servicio." },
    { name: "Natalia Medina",    time: "8:18 pm",  text: "Vi el anuncio, no lo creía, probé y pagaron al instante." },
    { name: "Bruno Quiroga",     time: "10:25 am", text: "Tripliqué la carga y terminé sacando un premio grande." },
    { name: "Daniela Tedesco",   time: "6:50 pm",  text: "Muy buena plataforma, simple y rápida para jugar." },
    { name: "Rodrigo Ledesma",   time: "9:35 am",  text: "Los cajeros de WBRICH me dieron respuesta enseguida." },
    { name: "Inés Paredes",      time: "7:10 pm",  text: "Vi el anuncio en Facebook y dije 'probemos' — resultó mejor de lo que esperaba." },
    { name: "Sebastián Ameghino",time: "1:05 pm",  text: "Tripliqué mi carga por una promo y pude jugar muchas manos." },
    { name: "Carla Varela",      time: "5:55 pm",  text: "La atención fue muy buena, me guiaron paso a paso." },
    { name: "Mauro Zárate",      time: "3:40 pm",  text: "Entré por un video y me acreditaron el 200%: rudimentario pero efectivo." },
    { name: "Lorena Ríos",       time: "7:59 am",  text: "Muy buena la atención de esta gente, me dieron soporte rápido." }
  ];




  const container = document.getElementById('testimonialsCarousel');
  let idx = 0, timer;

  // Crear y anexar elementos al contenedor
  data.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'testimonial-item';
   div.innerHTML = `
  <p class="header">
    <img
      src="images/usuario.png"
      alt="Usuario"
      class="icon icon-user"
    />
    ${item.name.trim()}
    <span class="time">${item.time}</span>
  </p>
  <p class="message">
    "${item.text}"

`;

    container.appendChild(div);
  });

  const items = container.querySelectorAll('.testimonial-item');

  function show(index) {
    items.forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });
  }

  function next() {
    idx = (idx + 1) % items.length;
    show(idx);
  }

  // Mostrar el primero y lanzar auto-scroll
  show(0);
  timer = setInterval(next, 4000);

  // Pausar al hacer hover o touch
  container.addEventListener('mouseenter', () => clearInterval(timer));
  container.addEventListener('mouseleave', () => timer = setInterval(next, 4000));
  container.addEventListener('touchstart', () => clearInterval(timer));
  container.addEventListener('touchend', () => timer = setInterval(next, 4000));
})();


document.querySelectorAll('.carousel-item img').forEach(img => {
  img.addEventListener('load', () => {
    const skeleton = img.parentElement.querySelector('.skeleton');
    if (skeleton) skeleton.remove();
  });
});