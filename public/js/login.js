/* eslint-disable */

const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/auth/login',
      data: {
        email,
        password
      }
    });
    console.log(res.data);
  } catch (err) {
    console.error(err.message);
  }
};
document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
