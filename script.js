// =====================================
// LOAD PORTFOLIO DATA USING FETCH API
// =====================================

let portfolioData = null;

document.addEventListener("DOMContentLoaded", loadPortfolio);

async function loadPortfolio() {

    const loading = document.getElementById("loading");
    const portfolio = document.getElementById("portfolioContent");

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Unable to load portfolio data.");
        }

        portfolioData = await response.json();

        // Display all portfolio sections
        displayHero();
        displayAbout();
        displaySkills();
        displayProjects();
        displayEducation();
        displayCertifications();
        displayContact();
        displayFooter();

        // Show website
        loading.style.display = "none";
        portfolio.hidden = false;

    } catch (error) {

        loading.innerHTML = `
            <h3 style="color:#ff7777;">Oops! Something went wrong.</h3>
            <p>${escapeHTML(error.message)}</p>
            <p>Please check your data.json file and run the website
            using a local server.</p>
        `;

        console.error("Portfolio loading error:", error);

    }

}


// =====================================
// SAFE HTML HELPER
// =====================================

function escapeHTML(value = "") {

    return String(value).replace(/[&<>"']/g, function (character) {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];

    });

}


// Only allow normal HTTP/HTTPS and relative links.
function safeURL(url) {

    const value = String(url || "").trim();

    if (/^(https?:\/\/|\/|\.\/|\.\.\/)/i.test(value)) {
        return escapeHTML(value);
    }

    return "#";

}


// =====================================
// DISPLAY HERO SECTION
// =====================================

function displayHero() {

    const personal = portfolioData.personal;

    document.getElementById("logo").innerHTML =
        `${escapeHTML(personal.name)}<span>.</span>`;

    document.getElementById("heroGreeting").textContent =
        personal.greeting;

    document.getElementById("heroName").textContent =
        personal.name;

    document.getElementById("heroRole").textContent =
        personal.role;

    document.getElementById("heroIntroduction").textContent =
        personal.introduction;

    document.getElementById("careerGoal").textContent =
        "Career Goal: " + personal.careerGoal;

    document.getElementById("profileImage").src =
        personal.profileImage;

    document.getElementById("resumeButton").href =
        safeURL(personal.resume);

    displaySocialLinks("heroSocials");

}


// =====================================
// DISPLAY ABOUT SECTION
// =====================================

function displayAbout() {

    const personal = portfolioData.personal;

    document.getElementById("aboutImage").src =
        personal.profileImage;

    document.getElementById("aboutName").textContent =
        personal.name;

    document.getElementById("aboutDescription").textContent =
        portfolioData.about.description;

    document.getElementById("personalDetails").innerHTML = `

        <div>
            <i class="bi bi-envelope"></i>
            ${escapeHTML(personal.email)}
        </div>

        <div>
            <i class="bi bi-telephone"></i>
            ${escapeHTML(personal.phone)}
        </div>

        <div>
            <i class="bi bi-mortarboard"></i>
            ${escapeHTML(portfolioData.education.course)}
        </div>

        <div>
            <i class="bi bi-geo-alt"></i>
            ${escapeHTML(personal.location)}
        </div>

    `;

}


// =====================================
// DISPLAY SKILLS
// =====================================

function displaySkills() {

    const skills = portfolioData.skills;

    const container = document.getElementById("skillsContainer");

    container.innerHTML = skills.map(skill => {

        const percentage = Math.min(
            100,
            Math.max(0, Number(skill.level) || 0)
        );

        return `

            <div class="col-sm-6 col-lg-4">

                <div class="skill-card">

                    <div class="skill-icon">
                        <i class="${escapeHTML(skill.icon)}"></i>
                    </div>

                    <h4>${escapeHTML(skill.name)}</h4>

                    <p>${escapeHTML(skill.description)}</p>

                    <div class="progress">

                        <div
                            class="progress-bar"
                            role="progressbar"
                            style="width:${percentage}%"
                            aria-valuenow="${percentage}"
                            aria-valuemin="0"
                            aria-valuemax="100">
                        </div>

                    </div>

                    <p class="mt-2 mb-0">
                        ${percentage}% Learning Progress
                    </p>

                </div>

            </div>

        `;

    }).join("");

}


// =====================================
// DISPLAY PROJECTS
// =====================================

function displayProjects() {

    const projects = portfolioData.projects;

    const container = document.getElementById("projectsContainer");

    container.innerHTML = projects.map(project => {

        const technologies = project.technologies.map(tech => {

            return `
                <span class="tech-badge">
                    ${escapeHTML(tech)}
                </span>
            `;

        }).join("");

        return `

            <div class="col-md-6 col-lg-4">

                <div class="project-card">

                    <img
                        src="${safeURL(project.image)}"
                        alt="${escapeHTML(project.name)}"
                        class="project-image"
                        loading="lazy">

                    <div class="project-content">

                        <h4>${escapeHTML(project.name)}</h4>

                        <p>${escapeHTML(project.description)}</p>

                        <div>
                            ${technologies}
                        </div>

                        <a
                            href="${safeURL(project.link)}"
                            class="project-link"
                            target="_blank"
                            rel="noopener noreferrer">

                            View Project
                            <i class="bi bi-arrow-up-right"></i>

                        </a>

                    </div>

                </div>

            </div>

        `;

    }).join("");

}


// =====================================
// DISPLAY EDUCATION
// =====================================

function displayEducation() {

    const education = portfolioData.education;

    document.getElementById("educationContainer").innerHTML = `

        <div class="education-card">

            <h3>
                <i class="bi bi-mortarboard"></i>
                ${escapeHTML(education.course)}
            </h3>

            <h5>${escapeHTML(education.college)}</h5>

            <p>
                <i class="bi bi-calendar"></i>
                ${escapeHTML(education.duration)}
            </p>

            <p>
                <i class="bi bi-book"></i>
                ${escapeHTML(education.semester)}
            </p>

            <p>
                <i class="bi bi-award"></i>
                ${escapeHTML(education.academicDetails)}
            </p>

            <p>
                <strong>Status:</strong>
                ${escapeHTML(education.status)}
            </p>

        </div>

    `;

}


// =====================================
// DISPLAY CERTIFICATIONS
// =====================================

function displayCertifications() {

    const certifications = portfolioData.certifications;

    const container =
        document.getElementById("certificationsContainer");

    container.innerHTML = certifications.map(certificate => {

        return `

            <div class="col-md-6 col-lg-4">

                <div class="certificate-card">

                    <i class="bi bi-patch-check-fill"></i>

                    <h4>${escapeHTML(certificate.name)}</h4>

                    <p>
                        ${escapeHTML(certificate.provider)}
                    </p>

                    <p>
                        ${escapeHTML(certificate.year)}
                    </p>

                    ${
                        certificate.link
                        ? `
                            <a
                                href="${safeURL(certificate.link)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="project-link">
                                View Certificate
                            </a>
                        `
                        : ""
                    }

                </div>

            </div>

        `;

    }).join("");

}


// =====================================
// DISPLAY CONTACT SECTION
// =====================================

function displayContact() {

    const personal = portfolioData.personal;

    document.getElementById("contactDetails").innerHTML = `

        <div class="contact-item">

            <i class="bi bi-envelope"></i>

            <div>
                <strong>Email</strong>
                <p>${escapeHTML(personal.email)}</p>
            </div>

        </div>

        <div class="contact-item">

            <i class="bi bi-telephone"></i>

            <div>
                <strong>Phone</strong>
                <p>${escapeHTML(personal.phone)}</p>
            </div>

        </div>

        <div class="contact-item">

            <i class="bi bi-geo-alt"></i>

            <div>
                <strong>Location</strong>
                <p>${escapeHTML(personal.location)}</p>
            </div>

        </div>

    `;

    displaySocialLinks("contactSocials");

}


// =====================================
// DISPLAY SOCIAL MEDIA LINKS
// =====================================

function displaySocialLinks(elementId) {

    const socials = portfolioData.socialLinks;

    const container = document.getElementById(elementId);

    container.innerHTML = socials.map(social => {

        return `

            <a
                href="${safeURL(social.url)}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="${escapeHTML(social.name)}"
                title="${escapeHTML(social.name)}">

                <i class="${escapeHTML(social.icon)}"></i>

            </a>

        `;

    }).join("");

}


// =====================================
// DISPLAY FOOTER
// =====================================

function displayFooter() {

    const name = portfolioData.personal.name;

    document.getElementById("footerName").textContent = name;

    document.getElementById("copyright").textContent =
        `© ${new Date().getFullYear()} ${name}. All Rights Reserved.`;

    displaySocialLinks("footerSocials");

}


// =====================================
// CONTACT FORM VALIDATION
// =====================================

document.getElementById("contactForm").addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        // Get form values
        const name = document.getElementById("contactName").value.trim();

        const email = document.getElementById("contactEmail").value.trim();

        const subject = document.getElementById("contactSubject").value.trim();

        const message = document.getElementById("contactMessage").value.trim();

        // Clear previous errors
        document.querySelectorAll(".error-message").forEach(error => {
            error.textContent = "";
        });

        document.getElementById("formSuccess").textContent = "";

        let isValid = true;

        // Name validation
        if (name.length < 2) {

            document.getElementById("nameError").textContent =
                "Please enter a valid name.";

            isValid = false;

        }

        // Email validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            document.getElementById("emailError").textContent =
                "Please enter a valid email address.";

            isValid = false;

        }

        // Subject validation
        if (subject.length < 3) {

            document.getElementById("subjectError").textContent =
                "Subject must contain at least 3 characters.";

            isValid = false;

        }

        // Message validation
        if (message.length < 10) {

            document.getElementById("messageError").textContent =
                "Message must contain at least 10 characters.";

            isValid = false;

        }

        // If validation fails
        if (!isValid) {
            return;
        }

        // Prepare contact details
        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        console.log("Contact Form Data:", formData);

        // Display success message
        document.getElementById("formSuccess").textContent =
            "Your message has been validated successfully! " +
            "Please note that this demo form does not send messages yet.";

        // Reset form
        this.reset();

    }

);