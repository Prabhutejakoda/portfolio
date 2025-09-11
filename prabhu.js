// Wait for DOM before using elements
document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Typing effect (safe) ---------- */
  const typingText = document.querySelector(".typing");
  const words = ["Full Stack Developer", "Innovative", "Problem Solver"];
  let i = 0, j = 0, isDeleting = false;

  // Animate percentages inside professional skills
document.querySelectorAll(".circle").forEach(circle => {
  const percent = circle.getAttribute("data-percent");
  const small = circle.querySelector("small");
  let count = 0;

  const interval = setInterval(() => {
    if (count < percent) {
      count++;
      small.textContent = count + "%";
    } else {
      clearInterval(interval);
    }
  }, 20);
});


  function typeEffect() {
    if (!typingText) return;
    const currentWord = words[i];
    typingText.textContent = currentWord.substring(0, j);

    if (!isDeleting && j < currentWord.length) {
      j++; setTimeout(typeEffect, 150);
    } else if (isDeleting && j > 0) {
      j--; setTimeout(typeEffect, 100);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) i = (i + 1) % words.length;
      setTimeout(typeEffect, 900);
    }
  }
  typeEffect();


  /* ---------- EmailJS init ---------- */
  if (typeof emailjs !== "undefined") {
    emailjs.init("5MXKD6u_Iv_GrKnqO");
  } else {
    console.warn("EmailJS SDK not loaded.");
  }

  /* ---------- Contact popup handlers ---------- */
  const popup = document.getElementById("popupForm");
  window.openPopup = function () {
    if (popup) {
      popup.style.display = "flex";
      popup.setAttribute("aria-hidden", "false");
    }
  };
  window.closePopup = function () {
    if (popup) {
      popup.style.display = "none";
      popup.setAttribute("aria-hidden", "true");
    }
  };

  /* ---------- EmailJS form submit ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = form.querySelector("button[type='submit']") || form.querySelector(".submit-btn");
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill all fields.");
        return;
      }

      if (btn) { btn.disabled = true; btn.textContent = "Sending..."; }

      emailjs.send("service_7675a55", "template_53h1szk", {
        from_name: name,
        from_email: email,
        message: message
      })
      .then(function () {
        alert(" Message Sent Successfully! to Prabhuteja . He will be in touch soon .. THANK YOU ");
        form.reset();
        closePopup();
      })
      .catch(function (err) {
        console.error("EmailJS Error:", err);
        alert(" Failed to send. Please try again.");
      })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = "Send"; }
      });
    });
  }


  
  const faqs = document.querySelectorAll(".faq-q");
  faqs.forEach(btn => {
    btn.addEventListener("click", () => {
      const a = btn.nextElementSibling;
      const open = a.style.display === "block";
      // close all answers
      document.querySelectorAll(".faq-a").forEach(el => el.style.display = "none");
      if (!open) a.style.display = "block";
    });
  });


  
  const chatToggle = document.getElementById("chatToggle");
  const chatBox = document.getElementById("chatBox");
  const chatLog = document.getElementById("chatLog");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");

  function botReply(text) {
    const msg = document.createElement("div");
    msg.className = "chat-msg chat-bot";
    msg.innerText = text;
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
  function userMsg(text) {
    const msg = document.createElement("div");
    msg.className = "chat-msg chat-user";
    msg.innerText = text;
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  chatToggle.addEventListener("click", () => {
    if (chatBox.style.display === "block") {
      chatBox.style.display = "none";
      chatToggle.innerText = "Chat";
    } else {
      chatBox.style.display = "block";
      chatToggle.innerText = "Close";
     
      botReply("Hi! I'm DigiC Bot — ask about demos, skills, or contact.");
    }
  });

  chatSend.addEventListener("click", () => {
    const text = (chatInput.value || "").trim();
    if (!text) return;
    userMsg(text);
    chatInput.value = "";

    
    const t = text.toLowerCase();
    if (t.includes("demo") || t.includes("live")) {
      botReply("You can find Live Demo links under Projects — I opened Projects for you.");
      // scroll to projects
      document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
    } else if (t.includes("contact") || t.includes("email")) {
      botReply("Click the 'Get in Touch' button in Contact or type your message here to send.");
      document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    } else if (t.includes("skills") || t.includes("tech")) {
      botReply("I work with Python, TensorFlow, PyTorch, JavaScript and web stack.");
      document.querySelector("#skills").scrollIntoView({ behavior: "smooth" });
    } else {
      botReply("Thanks! I will forward this — or try keywords: 'demo', 'contact', 'skills'.");
    }
  });

  // allow Enter key in chat input
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); chatSend.click(); }
  });

});
