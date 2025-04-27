const authForm = document.getElementById('authForm');

authForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  if (!username || !email || !password || !confirmPassword) {
    Swal.fire({
      icon: 'warning',
      title: 'All fields are required!',
      confirmButtonText: 'Okay'
    });
    return;
  }

  if (password !== confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Passwords do not match!',
      confirmButtonText: 'Retry'
    });
    return;
  }

  const newUser = {
    username,
    email,
    password
  };

  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  // Halkan Success + Redirect
  Swal.fire({
    icon: 'success',
    title: 'Sign Up Successful!',
    text: 'You will be redirected to login.',
    timer: 2000, // 2 seconds kadib baa redirect dhacayaa
    showConfirmButton: false
  }).then(() => {
    window.location.href = '/html/login.html'; // halkan login page ku qor
  });
});
