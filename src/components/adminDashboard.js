import { toggleAdminNav } from "../utils/pagination.js";
import { logoutAdmin } from '../utils/user.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import { firebaseConfig } from '../services/firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

const logoutButton = document.getElementById('logout-btn');
logoutAdmin(logoutButton, auth);

// Tickets sold and unsold chart
const chart1 = new Chart(document.getElementById("chart1"), {
    type: "doughnut",
    data: {
        labels: ["Tickets Sold", "Unsold Tickets"],
        datasets: [{
            data: [100, 50],
            backgroundColor: ["#3498db", "#ecf0f1"],
            hoverBackgroundColor: ["#2980b9", "#bdc3c7"]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});

// Operational vs Inactive buses chart
const chart2 = new Chart(document.getElementById("chart2"), {
    type: "doughnut",
    data: {
        labels: ["Operational Buses", "Inactive Buses"],
        datasets: [{
            data: [100, 20],
            backgroundColor: ["#1abc9c", "#ecf0f1"],
            hoverBackgroundColor: ["#16a085", "#bdc3c7"]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});

// Active vs Inactive routes chart
const chart3 = new Chart(document.getElementById("chart3"), {
    type: "doughnut",
    data: {
        labels: ["Active Routes", "Inactive Routes"],
        datasets: [{
            data: [40, 5],
            backgroundColor: ["#e67e22", "#ecf0f1"],
            hoverBackgroundColor: ["#d35400", "#bdc3c7"]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});

// Resolved vs Pending complaints chart
const chart4 = new Chart(document.getElementById("chart4"), {
    type: "doughnut",
    data: {
        labels: ["Resolved Complaints", "Pending Complaints"],
        datasets: [{
            data: [30, 5],
            backgroundColor: ["#9b59b6", "#ecf0f1"],
            hoverBackgroundColor: ["#8e44ad", "#bdc3c7"]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});

// Toggle the admin navigation bar
const dashboardButton = document.getElementById('dashboard-btn');
const ticketInventoryButton = document.getElementById('ticket-inventory-btn');
const busOperationsButton = document.getElementById('bus-operations-btn');
const customerSupportButton = document.getElementById('customer-support-btn');

const dashboardSection = document.getElementById('dashboard-section');
const ticketInventorySection = document.getElementById('ticket-inventory-section');
const busOperationsSection = document.getElementById('bus-operations-section');
const customerSupportSection = document.getElementById('customer-support-section');

toggleAdminNav(dashboardButton, ticketInventoryButton, busOperationsButton, customerSupportButton, dashboardSection, ticketInventorySection, busOperationsSection, customerSupportSection);

// bus operations admin
const scheduleModal = document.getElementById('schedule-modal');
scheduleModal.style.display = 'none';

document.getElementById('add-schedule-btn').addEventListener('click', function() {
    scheduleModal.style.display = 'flex';
  });

  // Close the modal
  document.getElementById('modal-cancel-btn').addEventListener('click', () => {
    scheduleModal.style.display = 'none';
  })

  // Handle form submission for adding/editing bus schedule
  document.getElementById('schedule-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form
    const busNumber = document.getElementById('bus-number').value;
    const departureTime = document.getElementById('departure-time').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const price = document.getElementById('price').value;
    const availableSeats = document.getElementById('available-seats').value;
    const status = document.getElementById('status').value;

    // Update the schedule table dynamically (here, we're just adding a new row as an example)
    const newRow = `
      <tr>
        <td class="px-4 py-2 border-b">${busNumber}</td>
        <td class="px-4 py-2 border-b">${departureTime}</td>
        <td class="px-4 py-2 border-b">${from}</td>
        <td class="px-4 py-2 border-b">${to}</td>
        <td class="px-4 py-2 border-b">$${price}</td>
        <td class="px-4 py-2 border-b">${availableSeats}</td>
        <td class="px-4 py-2 border-b ${status === 'active' ? 'text-green-600' : 'text-red-600'}">${status}</td>
        <td class="px-4 py-2 border-b text-blue-500 cursor-pointer">Edit</td>
      </tr>
    `;

    document.getElementById('schedule-table').insertAdjacentHTML('beforeend', newRow);

    // Close the modal after submission
    closeModal();
  });

