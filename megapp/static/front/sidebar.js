

// JavaScript to control sidebar behavior
const sidebar = document.querySelector('.sidebar');
const halfCircleButton = document.querySelector('.half-circle-button');
// Function to show the sidebar
function showSidebar() {
    if (sidebar.style.left == '3%') {
        sidebar.style.left = '-40%'; 
        halfCircleButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    } else {
        sidebar.style.left = '3%';
        halfCircleButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    }

}

// Event listener for hovering over the button
halfCircleButton.addEventListener('click', showSidebar);







// انمیشن باز شدن سایدبار موقع بود شدن صفحه
window.onload = function() {
    setTimeout(function() {
        document.querySelector('.sidebar').style.left = '3%';
        document.querySelector('.half-circle-button').style.left = '0%';
        document.getElementById('half-circle-button-searchResults').style.right = '0%';


        document.querySelector('.navbar').style.right = '1%';
    }, 300); /* تاخیر کوتاه برای اجرای انیمیشن */
};


















/////////////////////////////////////// Sidbar 2 (searchResults) //////////////////////////////////// 
// Function to show the sidebar
function showSidebar_searchResults() {
    if (document.getElementById('searchResults').style.right == '3%') {
        document.getElementById('searchResults').style.right = '-40%'; 
        document.getElementById('half-circle-button-searchResults').innerHTML = '<i class="fas fa-chevron-left"></i>';
    } else {
        document.getElementById('searchResults').style.right = '3%';
        document.getElementById('half-circle-button-searchResults').innerHTML = '<i class="fas fa-chevron-right"></i>';
    }
}

// Event listener for hovering over the button
document.getElementById('half-circle-button-searchResults').addEventListener('click', showSidebar_searchResults);

