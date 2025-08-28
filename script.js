document.getElementById("bookingForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const fromDate = new Date(document.getElementById("from").value);
  const now = new Date();

  // Validation: must be at least 3 hours before booking
  const diffHours = (fromDate - now) / (1000 * 60 * 60);
  if (diffHours < 3) {
    showNotification("⚠️ Booking must be made at least 3 hours in advance!", "error");
    return;
  }

  const formData = {
    name: document.getElementById("name").value,
    matric: document.getElementById("matric").value,
    phone: document.getElementById("phone").value,
    from: document.getElementById("from").value,
    to: document.getElementById("to").value
  };

  try {
    const response = await fetch("https://formspree.io/f/xvgbgenj", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      showNotification("✅ Booking submitted successfully!", "success");
      document.getElementById("bookingForm").reset();
    } else {
      showNotification("❌ Error submitting booking. Please try again.", "error");
    }
  } catch (error) {
    showNotification("❌ Network error. Please try again later.", "error");
  }
});

/* ===== Notification Function ===== */
function showNotification(message, type) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = "notification " + type;
  notification.style.display = "block";

  // Hide after 4 seconds
  setTimeout(() => {
    notification.style.display = "none";
  }, 4000);
}
