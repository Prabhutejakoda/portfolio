document.addEventListener("DOMContentLoaded", function () {
  

  function initializeDynamicContent() {
    const userProfile = JSON.parse(sessionStorage.getItem('userPortfolio'));
    if (userProfile) {
      document.getElementById('portfolio-name').textContent = userProfile.name;
      document.getElementById('portfolio-role').textContent = userProfile.role;
      const typingText = document.querySelector(".typing");
      if (typingText) typingText.textContent = userProfile.role;
      
      document.getElementById('portfolio-bio').textContent = userProfile.bio;
      document.getElementById('portfolio-about').innerHTML = userProfile.about;

      const heroImg = document.querySelector('.hero-img');
      if(heroImg) {
          heroImg.innerHTML = `<div class="img-placeholder"></div>`;
          heroImg.style.display = 'flex';
          heroImg.style.alignItems = 'center';
          heroImg.style.justifyContent = 'center';
          heroImg.style.textAlign = 'center';
          heroImg.style.fontSize = '1.2rem';
          heroImg.style.color = '#004a99';
      }

      const skillsGrid = document.getElementById('portfolio-skills-grid');
      skillsGrid.innerHTML = '';
      userProfile.skills.forEach((skill, index) => {
        const skillBox = document.createElement('div');
        skillBox.className = 'skill-box';
        skillBox.setAttribute('data-aos', 'fade-up');
        skillBox.setAttribute('data-aos-delay', `${50 * index}`);
        skillBox.innerHTML = `<div class="skill-name">${skill.trim()}</div>`;
        skillsGrid.appendChild(skillBox);
      });

      document.getElementById('experienceUiBtn').style.display = 'none';
      document.getElementById('backToOriginalBtn').style.display = 'inline-block';
    } else {
        document.getElementById('experienceUiBtn').style.display = 'inline-block';
        document.getElementById('backToOriginalBtn').style.display = 'none';
    }
  }
  
  initializeDynamicContent();


 
  function showToast(message, isError = false) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'error' : 'success'}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 5000);
  }


  
  const logo = document.querySelector(".logo a");
  if(logo) {
      logo.addEventListener("click", function(e) {
        e.preventDefault();
        sessionStorage.removeItem('userPortfolio');
        window.location.href = "portfolio.html";
      });
  }


 
  const typingText = document.querySelector(".typing");
  if (typingText) {
    const words = ["Full Stack Developer", "Innovative", "Problem Solver"];
    let i = 0, j = 0, isDeleting = false;

    function typeEffect() {
        if (sessionStorage.getItem('userPortfolio')) return;
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
  }


  document.querySelectorAll(".circle").forEach(circle => {
    const percent = circle.getAttribute("data-percent");
    const small = circle.querySelector("small");
    let count = 0;
    const interval = setInterval(() => {
      if (count < percent) {
        count++;
        small.textContent = count + "%";
      } else { clearInterval(interval); }
    }, 20);
  });


  
  if (typeof emailjs !== "undefined") {
    emailjs.init("5MXKD6u_Iv_GrKnqO");
  } else { console.warn("EmailJS SDK not loaded."); }
  
  let emailTarget = 'prabhuteja';


  
  const contactPopup = document.getElementById("popupForm");
  const recipientChoicePopup = document.getElementById("recipientChoicePopup");
  const uiGeneratorPopup = document.getElementById("uiGeneratorPopup");

  window.openRecipientChoicePopup = () => { if(recipientChoicePopup) recipientChoicePopup.style.display = "flex"; }
  window.closeRecipientChoicePopup = () => { if(recipientChoicePopup) recipientChoicePopup.style.display = "none"; }
  window.openPopup = () => { if (contactPopup) contactPopup.style.display = "flex"; };
  window.closePopup = () => { if (contactPopup) contactPopup.style.display = "none"; };
  window.openUiGeneratorPopup = () => { if(uiGeneratorPopup) uiGeneratorPopup.style.display = "flex"; }
  window.closeUiGeneratorPopup = () => { if(uiGeneratorPopup) uiGeneratorPopup.style.display = "none"; }
  
  document.getElementById('emailPrabhuBtn')?.addEventListener('click', () => {
      emailTarget = 'prabhuteja';
      document.getElementById('contact-form-title').textContent = 'Contact Prabhuteja';
      closeRecipientChoicePopup();
      openPopup();
  });
  document.getElementById('emailTeamBtn')?.addEventListener('click', () => {
      emailTarget = 'team';
      document.getElementById('contact-form-title').textContent = 'Contact The Team';
      closeRecipientChoicePopup();
      openPopup();
  });


  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = form.querySelector("button[type='submit']");
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        showToast("Please fill all fields.", true);
        return;
      }
      
      if (btn) { btn.disabled = true; btn.textContent = "Sending..."; }

      const serviceID = "service_7675a55";
      const prabhuTemplateID = "template_53h1szk";

      // team teamplete id
      const teamTemplateID = "template_au0zarr"; 

      
      if (emailTarget === 'team' && teamTemplateID === "PASTE_YOUR_NEW_TEAM_ID_HERE") {
          showToast("Developer: Team template ID is missing in prabhu.js.", true);
          if (btn) { btn.disabled = false; btn.textContent = "Send"; }
          return;
      }

      const templateID = emailTarget === 'team' ? teamTemplateID : prabhuTemplateID;
      const recipientName = emailTarget === 'team' ? 'the DigiCByte team' : 'Prabhuteja';
      
      console.log("Attempting to send email with Service ID:", serviceID, "and Template ID:", templateID);

      emailjs.send(serviceID, templateID, { from_name: name, from_email: email, message: message })
      .then(() => {
        showToast(`Message sent successfully to ${recipientName}!`);
        form.reset();
        closePopup();
      }, (err) => {
        console.error("EmailJS Error:", err);
        showToast(`Failed to send. Error: ${err.text || 'Unknown issue'}.`, true);
      })
      .finally(() => {
        if (btn) { btn.disabled = false; btn.textContent = "Send"; }
      });
    });
  }
  
  // --- UI Generator Logic ---
  document.getElementById('experienceUiBtn')?.addEventListener('click', openUiGeneratorPopup);
  document.getElementById('backToOriginalBtn')?.addEventListener('click', () => {
      sessionStorage.removeItem('userPortfolio');
      window.location.reload();
  });

  const uiForm = document.getElementById('uiGeneratorForm');
  if (uiForm) {
      uiForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const userProfile = {
              name: document.getElementById('gen-name').value,
              role: document.getElementById('gen-role').value,
              bio: document.getElementById('gen-bio').value,
              about: document.getElementById('gen-about').value,
              skills: document.getElementById('gen-skills').value.split(','),
          };
          sessionStorage.setItem('userPortfolio', JSON.stringify(userProfile));
          window.location.reload();
      });
  }


  // --- FAQ Accordion ---
  document.querySelectorAll(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
      const a = btn.nextElementSibling;
      const isOpen = a.style.display === "block";
      document.querySelectorAll(".faq-a").forEach(el => el.style.display = "none");
      if (!isOpen) a.style.display = "block";
    });
  });


  // --- Chat Widget ---
  const chatToggle = document.getElementById("chatToggle");
  const chatBox = document.getElementById("chatBox");
  const chatLog = document.getElementById("chatLog");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");

  if(chatToggle) {
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
        } else {
            chatBox.style.display = "block";
            if (chatLog.children.length === 0) {
                 botReply("Hi! I'm DigiC Bot — ask about demos, skills, or contact.");
            }
        }
    });

    chatSend.addEventListener("click", () => {
        const text = (chatInput.value || "").trim();
        if (!text) return;
        userMsg(text);
        chatInput.value = "";

        const t = text.toLowerCase();
        if (t.includes("demo") || t.includes("live")) {
            botReply("You can find Live Demo links under Projects — I'll scroll you there.");
            document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
        } else if (t.includes("contact") || t.includes("email")) {
            botReply("Click the 'Get in Touch' button or just let me know your message.");
            document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
        } else if (t.includes("skills") || t.includes("tech")) {
            botReply("My creator specializes in Node.js, Angular, NestJS, Firebase, and Python.");
            document.querySelector("#skills").scrollIntoView({ behavior: "smooth" });
        } else {
            botReply("Thanks! I'll pass that along. You can also try asking about 'demo', 'contact', or 'skills'.");
        }
    });

    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); chatSend.click(); }
    });
  }
});
