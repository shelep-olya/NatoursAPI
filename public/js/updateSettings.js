/* eslint-disable */

const updateData = async (name, email) => {
  try {
    const res = await fetch('http://localhost:3000/api/v1/users/updateMe', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (data.status === 'success') {
      showAlert('success', 'Updated successfully!');
    } else {
      showAlert('error', 'Update failed. Please try again.');
    }
  } catch (err) {
    showAlert('error', 'Something went wrong.');
    console.error(err.message);
  }
};

const userDataForm = document.querySelector('.form-user-data');
if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;

    updateData(name, email);
  });
}
