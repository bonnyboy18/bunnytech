// Smooth scroll for nav links
document.querySelectorAll("nav a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// Contact form submission
const form = document.querySelector("form[aria-label='contact form']");
if (form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = {
      name: form.querySelector("input[type='text']").value,
      email: form.querySelector("input[type='email']").value,
      company: form.querySelectorAll("input[type='text']")[1].value,
      message: form.querySelector("textarea").value
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      alert(json.success ? "Message sent successfully!" : "Failed to send message.");
      form.reset();
    } catch (err) {
      alert("Error: " + err.message);
    }
  });
}