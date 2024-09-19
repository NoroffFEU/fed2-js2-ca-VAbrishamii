
function handleProfileClick() {
    const profileBtn = document.querySelector('.profile-btn');
    profileBtn.addEventListener('click', function (event) {
        if (!localStorage.getItem('accessToken')) {
            event.preventDefault(); 
            alert("You must be logged in to view your profile.");
          }
    });
  }

  function handleLogoutClick() {
    const logoutBtn = document.querySelector('.logout-btn');
  
    logoutBtn.addEventListener('click', function () {
      if (!localStorage.getItem('accessToken')) {
        alert("You are not logged in.");
      } else {
        localStorage.removeItem('accessToken'); 
        alert("You have been logged out.");
        window.location.href = "/auth/login/"; 
    }
    });
  }
  handleProfileClick();
  handleLogoutClick();

