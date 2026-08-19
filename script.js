// ===============================
// 1. Select HTML elements
// ===============================

const jobForm = document.getElementById("jobForm");

const companyInput = document.getElementById("company");
const roleInput = document.getElementById("role");
const locationInput = document.getElementById("location");
const avail=document.getElementById("availability");
const statusInput = document.getElementById("status");
const technology=document.getElementById("techs");
const jobList = document.getElementById("jobList");

const searchInput = document.getElementById("search");
const filterInput = document.getElementById("filter");

const totalJobs = document.getElementById("totalJobs");
const appliedJobs = document.getElementById("appliedJobs");
const interviewJobs = document.getElementById("interviewJobs");
const selectedJobs = document.getElementById("selectedJobs");

const themeBtn = document.getElementById("themeBtn");


// ===============================
// 2. Array to store applications
// ===============================

fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {

        jobs = data.map(job => {

            return {
                id: job.id,
                company: job.company.name,
                role: job.name,
                location: "Remote",
                skills:["java","python"],
                availability: "Immediate",
                status: "Applied"
            };

        });

        displayJobs(jobs);

    })
    .catch(error => {

        console.error("Error:", error);

    });
// ===============================
// 3. Display jobs
// ===============================

function displayJobs(jobArray) {

    jobList.innerHTML = "";

    jobArray.forEach((job) => {

        const card = document.createElement("div");

        card.classList.add("job-card");

        card.innerHTML = `
            <div class="job-header">

                <h3>${job.company}</h3>

                <span class="status ${job.status.toLowerCase()}">
                    ${job.status}
                </span>

            </div>

            <p class="job-role">
                💼 ${job.role}
            </p>

            <p class="job-location">
                📍 ${job.location}
            </p>
            <p class="tech">${job.skills}</p>
            <p class="availability">⏱️ Available:${job.availability}</p>

            <div class="card-buttons">

                <button
                    class="delete-btn"
                    onclick="deleteJob(${job.id})"
                >
                    Delete
                </button>

            </div>
        `;

        jobList.appendChild(card);
    });

    updateStats();
}


// ===============================
// 4. Add new application
// ===============================

jobForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const newJob = {

        id: Date.now(),

        company: companyInput.value,

        role: roleInput.value,

        location: locationInput.value,
        techs:technology.value,
        availability:avail.value,

        status: statusInput.value

    };

    jobs.push(newJob);

    displayJobs(jobs);

    jobForm.reset();

    showMessage("Application added successfully!");
});


// ===============================
// 5. Delete job
// ===============================

function deleteJob(id) {

    jobs = jobs.filter((job) => {
        return job.id !== id;
    });

    displayJobs(jobs);

    showMessage("Application deleted!");
}


// ===============================
// 6. Search
// ===============================

searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase();

    const filteredJobs = jobs.filter((job) => {

        return (
            job.company.toLowerCase().includes(searchText) ||
            job.role.toLowerCase().includes(searchText)
        );

    });

    displayJobs(filteredJobs);
});


// ===============================
// 7. Filter by status
// ===============================

filterInput.addEventListener("change", () => {

    const selectedStatus = filterInput.value;

    if (selectedStatus === "All") {

        displayJobs(jobs);

        return;
    }

    const filteredJobs = jobs.filter((job) => {

        return job.status === selectedStatus;

    });

    displayJobs(filteredJobs);
});


// ===============================
// 8. Update statistics
// ===============================

function updateStats() {

    totalJobs.textContent = jobs.length;

    appliedJobs.textContent =
        jobs.filter((job) => job.status === "Applied").length;

    interviewJobs.textContent =
        jobs.filter((job) => job.status === "Interview").length;

    selectedJobs.textContent =
        jobs.filter((job) => job.status === "Selected").length;
}


// ===============================
// 9. Temporary message
// ===============================

function showMessage(message) {

    console.log(message);

}


// ===============================
// 10. Dark mode
// ===============================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

});