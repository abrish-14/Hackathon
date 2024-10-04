

document
  .getElementById("resume-form")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form elements
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById("education") as HTMLTextAreaElement;
    const experienceElement = document.getElementById("experience") as HTMLTextAreaElement;
    const skillsElement = document.getElementById("skills") as HTMLTextAreaElement;

    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
      
      // Get values from form
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;

      // Handle profile picture
      const profilePictureFile = profilePictureInput.files?.[0];
      const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

      // Generate the resume HTML content
      const resumeOutput = `
        <h2>Resume</h2>
        ${
          profilePictureURL
            ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">`
            : ""
        }
        <p><strong>Name:</strong><span id="edit-name" class="editable">${name}</span></p>
        <p><strong>Email:</strong><span id="edit-email" class="editable">${email}</span></p>
        <p><strong>Phone Number:</strong><span id="edit-phone" class="editable">${phone}</span></p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Experience</h3>
        <p>${experience}</p>
        <h3>Skills</h3>
        <p>${skills}</p>
      `;

      // Display the resume in the output container
      const resumeOutputElement = document.getElementById("ResumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        resumeOutputElement.classList.remove("hidden");

        // Clear previous buttons if they exist
        const existingButtonsContainer = document.getElementById("buttonsContainer");
        if (existingButtonsContainer) {
          existingButtonsContainer.remove();
        }

        // Create container for buttons
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);

        // Add download PDF button
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", () => {
          const resumeContent = resumeOutputElement.innerHTML || "";
          const originalContent = document.body.innerHTML;

          // Temporarily replace the body's content with the resume content
          document.body.innerHTML = `
            <div id="ResumeOutput">
              ${resumeContent}
            </div>
          `;

          // Print the resume
          window.print();

          // Restore the original content after printing
          document.body.innerHTML = originalContent;

          // Remove the buttons after downloading
          buttonsContainer.remove();
        });
        buttonsContainer.appendChild(downloadButton);

        // Add shareable link button
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Shareable Link";
        shareLinkButton.addEventListener("click", async () => {
          try {
            // Create a unique shareable link (simulate it in this case)
            const shareableLink = `https://yourdomain.com/resume/${name.replace(/\s+/g, "_")}_resume.html`;
            // Use clipboard API to copy the shareable link
            await navigator.clipboard.writeText(shareableLink);
            alert("Sharable link copied to clipboard");
          } catch (err) {
            console.error("Failed to copy link:", err);
            alert("Failed to copy link to clipboard. Please try again");
          }
        });
        buttonsContainer.appendChild(shareLinkButton);
      } else {
        console.error("Resume output container not found");
      }
    } else {
      console.log("Form elements are missing");
    }
  });

function makeEditable() {
  const editableElements = document.querySelectorAll(".editable");
  editableElements.forEach((element) => {
    element.addEventListener("click", function () {
      const currentElement = element as HTMLElement;
      const currentValue = currentElement.textContent || "";

      // Replace content
      if (currentElement.tagName === "p" || currentElement.tagName === "span") {
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentValue;
        input.classList.add("editing-input");

        input.addEventListener("blur", function () {
          currentElement.textContent = input.value;
          currentElement.style.display = "inline";
          input.remove();
        });
        currentElement.style.display = "none";
        currentElement.parentNode?.insertBefore(input, currentElement);
        input.focus();
      }
    });
  });
}
