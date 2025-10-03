const toggle = document.getElementById('theme-toggle');
const dashboard = document.querySelector('.dashboard');

// Helper to update button text based on theme
function updateToggleText(theme) {
  toggle.textContent = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

// Toggle theme and update localStorage
function toggleTheme() {
  const newTheme = dashboard.dataset.theme === 'light' ? 'dark' : 'light';
  dashboard.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
  updateToggleText(newTheme);
}

toggle.addEventListener('click', toggleTheme);

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const theme = savedTheme ? savedTheme : 'light';
  dashboard.dataset.theme = theme;
  updateToggleText(theme);
});