// enquiry.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enquiryForm");
  const responseMessage = document.getElementById("responseMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent reload

    // Collect form data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const product = document.getElementById("product").value;
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !product) {
      responseMessage.style.color = "red";
      responseMessage.textContent = "Please complete all required fields.";
      return;
    }

    // Simulate processing logic
    let responseText = "";
    switch (product) {
      case "vanilla":
        responseText = "Our Vanilla Bean Cold Brew is currently in stock. A 6-pack costs R180.";
        break;
      case "mocha":
        responseText = "Mocha Hazelnut Cold Brew is limited — available for pre-order at R200 per 6-pack.";
        break;
      case "citrus":
        responseText = "Citrus Cold Brew will be restocked soon. Expect availability next week.";
        break;
      default:
        responseText = "Thank you for your enquiry! We'll get back to you shortly.";
    }

    // Simulate processing delay
    responseMessage.style.color = "#215F9A";
    responseMessage.textContent = "Processing your request...";
    setTimeout(() => {
      responseMessage.textContent = `${name}, ${responseText}`;
    }, 1000);

    // Reset form
    form.reset();
  });
});
