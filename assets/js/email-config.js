// EmailJS Configuration
// Untuk menggunakan fitur ini, Anda perlu:
// 1. Daftar di https://www.emailjs.com/
// 2. Buat service email (Gmail recommended)
// 3. Buat template email
// 4. Ganti konfigurasi di bawah ini

const EMAIL_CONFIG = {
  // Ganti dengan Public Key dari EmailJS Dashboard
  PUBLIC_KEY: "pKpggcAlSuXOlBNE_",

  // Ganti dengan Service ID dari EmailJS Dashboard
  SERVICE_ID: "service_vhx3ylo",

  // Ganti dengan Template ID dari EmailJS Dashboard
  TEMPLATE_ID: "template_tous54o",
};

// Initialize EmailJS
(function () {
  emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
})();

// Handle form submission
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const submitBtn = document.querySelector("[data-form-btn]");
      const submitBtnText = submitBtn.querySelector("span");
      const originalText = submitBtnText.textContent;

      // Validate form
      const formData = new FormData(this);
      const fromName = formData.get("from_name");
      const fromEmail = formData.get("from_email");
      const phone = formData.get("phone");
      const message = formData.get("message");

      if (!fromName || !fromEmail || !phone || !message) {
        alert("Mohon lengkapi semua field yang diperlukan.");
        return;
      }

      // Change button state to loading
      submitBtn.disabled = true;
      submitBtnText.textContent = "Mengirim...";

      // Send email using EmailJS
      emailjs
        .sendForm(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, this)
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);

            // Show success message
            showNotification(
              "Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.",
              "success"
            );

            // Reset form
            contactForm.reset();
          },
          function (error) {
            console.log("FAILED...", error);

            // Show error message
            showNotification(
              "Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi langsung melalui email.",
              "error"
            );
          }
        )
        .finally(function () {
          // Reset button state
          submitBtn.disabled = false;
          submitBtnText.textContent = originalText;
        });
    });
  }
}

// Show notification function
function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Auto hide after 5 seconds
  setTimeout(() => {
    hideNotification(notification);
  }, 5000);

  // Close button functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      hideNotification(notification);
    });
}

// Hide notification function
function hideNotification(notification) {
  notification.classList.remove("show");
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initContactForm();
});
