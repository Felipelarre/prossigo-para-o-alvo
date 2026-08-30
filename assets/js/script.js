/* =====================================================================
   PROSSIGO PARA O ALVO — interações
   JS puro; GSAP (assets/js/vendor/gsap.min.js) usado só no preloader,
   com degradação graciosa caso não carregue.
   ===================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var docEl = document.documentElement;

  /* ---------- Preloader ---------- */
  var preloader = document.querySelector("[data-preloader]");

  function endPreload() {
    docEl.classList.remove("is-preloading");
    if (preloader && preloader.parentNode) preloader.parentNode.removeChild(preloader);
    // Se a pessoa entrou por um link com âncora, reposiciona depois de destravar o scroll
    if (location.hash && location.hash.length > 1) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  }

  if (preloader) {
    if (reduceMotion || !window.gsap) {
      // Sem animação: mostra por um instante e some suave (ou na hora, se movimento reduzido)
      preloader.classList.add("is-leaving");
      window.setTimeout(endPreload, reduceMotion ? 0 : 450);
    } else {
      var gsap = window.gsap;
      gsap.set(".preloader__ring", { scale: 0.25, opacity: 0 });
      gsap.set(".preloader__dot", { scale: 0, opacity: 0 });
      gsap.set(".preloader__word", { opacity: 0, y: 8 });

      gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: endPreload })
        .to(".preloader__ring", { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1 })
        .to(".preloader__dot", { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, "-=0.25")
        .to(".preloader__word", { opacity: 1, y: 0, duration: 0.35 }, "-=0.2")
        .to(preloader, { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" }, "+=0.25");
    }
  }

  /* ---------- Ano no rodapé ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header + botão flutuante: estado ao rolar ---------- */
  var header = document.querySelector("[data-header]");
  var waFloat = document.querySelector("[data-wa-float]");
  var onScroll = function () {
    var y = window.scrollY;
    if (header) header.toggleAttribute("data-scrolled", y > 8);
    if (waFloat) waFloat.classList.toggle("is-tucked", y < 560);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var navList = document.querySelector("[data-nav-list]");

  if (toggle && navList) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      if (open) navList.setAttribute("data-open", "");
      else navList.removeAttribute("data-open");
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    navList.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (
        toggle.getAttribute("aria-expanded") === "true" &&
        !e.target.closest("[data-nav-list]") &&
        !e.target.closest("[data-nav-toggle]")
      ) {
        setOpen(false);
      }
    });

    // Fecha o menu ao voltar para o desktop
    window.matchMedia("(min-width: 861px)").addEventListener("change", function (m) {
      if (m.matches) setOpen(false);
    });
  }

  /* ---------- Revelação ao rolar ---------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          // Escalona irmãos próximos para um efeito em cascata suave
          var siblings = Array.prototype.slice.call(
            el.parentElement.querySelectorAll(":scope > [data-reveal]")
          );
          var idx = siblings.indexOf(el);
          el.style.setProperty("--reveal-delay", (idx > 0 ? Math.min(idx, 5) * 0.07 : 0) + "s");
          el.classList.add("is-visible");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    revealItems.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Scrollspy: destaque do item de menu ativo ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav-list a[href^="#"]')
  );
  var sections = navLinks
    .map(function (a) {
      var id = a.getAttribute("href").slice(1);
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (a) {
            var active = a.getAttribute("href") === "#" + entry.target.id;
            if (active) a.setAttribute("aria-current", "true");
            else a.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Formulário → WhatsApp ---------- */
  var WA_NUMBER = "5581986949528";
  var form = document.querySelector("[data-wa-form]");

  if (form) {
    form.setAttribute("novalidate", "");

    var showNote = function (msg) {
      var note = form.querySelector(".form-note");
      if (!note) {
        note = document.createElement("p");
        note.className = "form-note";
        note.setAttribute("role", "status");
        form.appendChild(note);
      }
      note.textContent = msg;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim();
      var tel = form.telefone.value.trim();
      var msg = form.mensagem.value.trim();

      var invalid = null;
      [form.nome, form.telefone].forEach(function (field) {
        var empty = !field.value.trim();
        field.classList.toggle("field-error", empty);
        field.setAttribute("aria-invalid", String(empty));
        if (empty && !invalid) invalid = field;
      });

      if (invalid) {
        showNote("Preencha seu nome e WhatsApp para continuar.");
        invalid.focus();
        return;
      }

      var texto =
        "Olá! Vim pelo site.\n\n" +
        "Nome: " + nome + "\n" +
        "WhatsApp: " + tel +
        (msg ? "\n\nMensagem: " + msg : "");

      var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(texto);
      window.open(url, "_blank", "noopener");
      showNote("Abrimos o WhatsApp em outra aba. Se não abrir, chame direto: (81) 98694-9528.");
      form.reset();
    });

    form.addEventListener("input", function (e) {
      if (e.target.classList.contains("field-error") && e.target.value.trim()) {
        e.target.classList.remove("field-error");
        e.target.setAttribute("aria-invalid", "false");
      }
    });
  }
})();
