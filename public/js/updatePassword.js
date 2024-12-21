/* eslint-disable */

const updatePassword = async (passwordCurrent, password, passwordConfirm) => {
  try {
    const res = await fetch(
      'http://localhost:3000/api/v1/auth/updateMyPassword',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ passwordCurrent, password, passwordConfirm })
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (data.status === 'success') {
      showAlert('success', 'Password updated successfully!');
      window.setTimeout(() => {
        location.assign('/me');
      }, 1500);
    } else {
      showAlert('error', 'Update failed. Please try again.');
    }
  } catch (err) {
    showAlert('error', err.message || 'Something went wrong.');
    console.error(err.message);
  }
};

const userPasswordForm = document.querySelector('.form-user-settings');
if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updatePassword(passwordCurrent, password, passwordConfirm);
    document.querySelector('.btn--save-password').textContent = 'SAVE PASSWORD';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}
