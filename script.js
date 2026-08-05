(function () {
  var overlay = document.getElementById("imageModal");
  var modalImg = document.getElementById("imageModalImg");
  var backToTop = document.getElementById("backToTop");
  var navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  var revealItems = Array.from(document.querySelectorAll(".reveal"));

  function openOverlay(src) {
    if (!overlay || !modalImg) return;
    modalImg.src = src;
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
  }

  function closeOverlay() {
    if (!overlay || !modalImg) return;
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    modalImg.removeAttribute("src");
  }

  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeOverlay();
    });
  }

  var closeBtn = overlay ? overlay.querySelector(".image-modal-close") : null;
  if (closeBtn) closeBtn.addEventListener("click", closeOverlay);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeOverlay();
  });

  var buttons = document.querySelectorAll(".project-card .view-image-btn");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var card = btn.closest(".project-card");
      var img = card ? card.querySelector("img") : null;
      if (!img || !img.src) return;
      openOverlay(img.src);
    });
  });

  var galleryImages = document.querySelectorAll(".project-gallery-item img");
  galleryImages.forEach(function (img) {
    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
      if (!img.src) return;
      openOverlay(img.src);
    });
  });

  var form = document.getElementById("contactForm");
  var messagesEl = document.getElementById("messages");

  function addMessage(text) {
    if (!messagesEl) return;
    var li = document.createElement("li");
    li.textContent = text;
    messagesEl.innerHTML = "";
    messagesEl.appendChild(li);
  }

  function encodeMailto(str) {
    return encodeURIComponent(str).replace(/%20/g, "+");
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("contact_name").value.trim();
      var email = document.getElementById("contact_email").value.trim();
      var message = document.getElementById("contact_message").value.trim();
      if (!name || !email || !message) {
        addMessage("Please fill out all fields.");
        return;
      }
      var subject = "Portfolio Contact from " + name;
      var body = "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message;
      var mailto = "mailto:kleocayrel0821@gmail.com"
        + "?subject=" + encodeMailto(subject)
        + "&body=" + encodeMailto(body);
      var gmail = "https://mail.google.com/mail/?view=cm&fs=1"
        + "&to=" + encodeURIComponent("kleocayrel0821@gmail.com")
        + "&su=" + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(body);
      var win = window.open(gmail, "_blank");
      if (!win) window.location.href = mailto;
      addMessage("Message prepared in Gmail (new tab) or your email client.");
      form.reset();
    });
  }

  function updateActiveLink() {
    var currentId = "";
    var sections = document.querySelectorAll("section[id]");
    sections.forEach(function (section) {
      var top = section.offsetTop - 120;
      var bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      var isActive = href === "#" + currentId;
      link.classList.toggle("active", isActive);
    });
  }

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function toggleBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("visible", window.scrollY > 500);
  }

  if (typeof IntersectionObserver !== "undefined") {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("reveal-visible");
    });
  }

  window.addEventListener("scroll", function () {
    updateActiveLink();
    toggleBackToTop();
  }, { passive: true });

  updateActiveLink();
  toggleBackToTop();
})();
