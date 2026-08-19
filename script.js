// ===============================
// 1. Select HTML elements
// ===============================

const jobForm = document.getElementById("jobForm");

const companyInput = document.getElementById("company");
const roleInput = document.getElementById("role");
const locationInput = document.getElementById("location");
const avail=document.getElementById("availability");
const statusInput = document.getElementById("status");

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

let jobs = [
    {
        id: 1,
        company: "Google",
        role: "Frontend Developer",
        location: "Hyderabad",
        availability:"Immediate",
        status: "Applied"
    },

    {
        id: 2,
        company: "Microsoft",
        role: "React Developer",
        location: "Bangalore",
        availability:"15 days to join",
        status: "Interview"
    },

    {
        id: 3,
        company: "Amazon",
        role: "Software Engineer",
        location: "Hyderabad",
        availability:"more than 15 days to join",
        status: "Selected"
    }
];


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