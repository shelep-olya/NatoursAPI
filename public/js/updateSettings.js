/* eslint-disable */

const updateData = async (name, email, photo) => {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (photo) {
      formData.append('photo', photo);
    }

    const res = await fetch('http://localhost:3000/api/v1/users/updateMe', {
      method: 'PATCH',
      body: formData
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
    const photo = document.getElementById('photo').files[0];

    updateData(name, email, photo);
  });
}
