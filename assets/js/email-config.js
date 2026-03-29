const CONTACT_EMAIL = "muhammad.fajarjati@gmail.com";

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
      const subject = formData.get("subject");
      const message = formData.get("message");

      if (!fromName || !fromEmail || !phone || !subject || !message) {
        alert("Mohon lengkapi semua field yang diperlukan.");
        return;
      }

      // Change button state to loading
      submitBtn.disabled = true;
      submitBtnText.textContent = "Membuka email...";

      const safeSubject = String(subject).trim();
      const emailBody = [
        `Halo Fajar,`,
        "",
        `Nama: ${String(fromName).trim()}`,
        `Email Pengirim: ${String(fromEmail).trim()}`,
        `Telepon: ${String(phone).trim()}`,
        "",
        "Pesan:",
        String(message).trim(),
      ].join("\n");

      const mailtoURL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        safeSubject,
      )}&body=${encodeURIComponent(emailBody)}`;

      window.location.href = mailtoURL;

      showNotification(
        "Aplikasi email dibuka. Silakan cek kembali lalu kirim emailnya.",
        "success",
      );

      submitBtn.disabled = false;
      submitBtnText.textContent = originalText;
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
