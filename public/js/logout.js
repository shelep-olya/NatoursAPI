/* eslint-disable */
const logout = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/v1/auth/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (data.status === 'success') {
      showAlert('success', 'Logged out successfully!');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1500);
    } else {
      showAlert('error', 'Logout failed! Please try again.');
    }

    console.log(data);
  } catch (err) {
    showAlert('error', 'Error logging out. Please try again.');
    console.error(err.message);
  }
};

const logoutBtn = document.querySelector('.nav__el--logout');

if (logoutBtn) logoutBtn.addEventListener('click', logout);
