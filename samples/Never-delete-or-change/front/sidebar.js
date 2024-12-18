// Initialize the map and set its view to a specific location
// var map = L.map('map').setView([51.505, -0.09], 13);
//
// // Load and display the tile layer on the map
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// maxZoom: 19,
// attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// JavaScript to control sidebar behavior
const sidebar = document.querySelector('.sidebar');
const halfCircleButton = document.querySelector('.half-circle-button');

// Function to show the sidebar
function showSidebar() {
sidebar.style.left = '0';
}

// Function to hide the sidebar
function hideSidebar() {
sidebar.style.left = '-350px';
}

// Event listener for hovering over the button
halfCircleButton.addEventListener('mouseover', showSidebar);

// Event listener for leaving the sidebar area
sidebar.addEventListener('mouseleave', hideSidebar);