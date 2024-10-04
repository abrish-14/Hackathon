// listing element
document
  .getElementById("resume-form")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    //type assertion
    const profilePictureInput = document.getElementById(
      "profilePicture"
    ) as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById(
      "education"
    ) as HTMLInputElement;
    const experienceElement = document.getElementById(
      "experience"
    ) as HTMLInputElement;
    const skillsElement = document.getElementById("skills") as HTMLInputElement;

    if (
      profilePictureInput &&
      nameElement &&
      emailElement &&
      phoneElement &&
      educationElement &&
      experienceElement &&
      skillsElement
    ) {
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;

      // picture elements
      const profilePictureFile = profilePictureInput.files?.[0];
      const profilePictureURL = profilePictureFile
        ? URL.createObjectURL(profilePictureFile)
        : "";

      //Create resume output
      const resumeOutput = `
         <h2>Resume</h2>
         ${
           profilePictureURL
             ? `<img src="${profilePictureURL}" alt="profile Picture" class="profilePicture">`
             : ""
         }
         <p><strong>Name:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Phone Number:</strong> ${phone}</p>
         <h3> Education </h3>
         <p>${education}</p>
         <h3> Experience </h3>
         <p>${experience}</p>
         <h3> Skills</h3>
         <p>${skills}</p>
       `;

      const resumeOutputElement = document.getElementById("ResumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
      } else {
        console.error("The resume output elements are missinng");
      }
    } else {
      console.error("One more output elements are missing");
    }
    [[]];
  });