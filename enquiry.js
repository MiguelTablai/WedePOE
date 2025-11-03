// enquiry.js — AJAX-based form submission 

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enquiryForm");
  const responseMessage = document.getElementById("responseMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // Show a loading message
    responseMessage.style.color = "#215F9A";
    responseMessage.textContent = "Processing your enquiry...";

    try {
      // Simulate sending data to a server using fetch
      const res = await fetch("process_enquiry.php", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        responseMessage.style.color = "green";
        responseMessage.textContent = data.message;
        form.reset();
      } else {
        responseMessage.style.color = "red";
        responseMessage.textContent = data.message;
      }
    } catch (error) {
      responseMessage.style.color = "red";
      responseMessage.textContent = "Error processing your enquiry. Please try again later."; // Will always show error because no server is set up
    }
  });
});
