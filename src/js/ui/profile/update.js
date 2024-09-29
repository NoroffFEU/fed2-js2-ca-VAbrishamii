import { profileAPI } from '../../api/instance';

export function createUpdateProfileForm() {
  const formContainer = document.createElement('div');
  formContainer.classList.add('update-profile-container');

  const header = document.createElement('h2');
  header.textContent = 'Update Profile';
  formContainer.appendChild(header);


  const form = document.createElement('form');
  form.id = 'update-profile-form';

  const bioLabel = document.createElement('label');
  bioLabel.setAttribute('for', 'bio');
  bioLabel.textContent = 'Bio:';
  form.appendChild(bioLabel);

  const bioInput = document.createElement('textarea');
  bioInput.id = 'bio';
  bioInput.placeholder = 'Enter your bio...';
  form.appendChild(bioInput);

  const bannerLabel = document.createElement('label');
  bannerLabel.setAttribute('for', 'banner');
  bannerLabel.textContent = 'Banner URL:';
  form.appendChild(bannerLabel);

  const bannerInput = document.createElement('input');
  bannerInput.type = 'text';
  bannerInput.id = 'banner';
  bannerInput.placeholder = 'Enter banner image URL...';
  form.appendChild(bannerInput);

  const avatarLabel = document.createElement('label');
  avatarLabel.setAttribute('for', 'avatar');
  avatarLabel.textContent = 'Avatar URL:';
  form.appendChild(avatarLabel);

  const avatarInput = document.createElement('input');
  avatarInput.type = 'text';
  avatarInput.id = 'avatar';
  avatarInput.placeholder = 'Enter avatar image URL...';
  form.appendChild(avatarInput);


  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Update Profile';
  form.appendChild(submitButton);

  formContainer.appendChild(form);

  form.addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const bio = bioInput.value.trim();
    const bannerUrl = bannerInput.value.trim();
    const avatarUrl = avatarInput.value.trim();

   
    const updateData = {
      bio,
        banner: { url: bannerUrl || null},
        avatar: { url: avatarUrl || null}
    };

    try {
      await profileAPI.profile.update(updateData); 
      alert('Your profile has been updated successfully!');
      window.location.href = '/post/feed/'; 
    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert('Failed to update profile. Please try again.');
    }
  });

  return formContainer; 
}

export function displayUpdateProfileForm(containerSelector) {
  const container = document.querySelector(containerSelector);

  if (container) {
    const formElement = createUpdateProfileForm();
    container.innerHTML = ''; 
    container.appendChild(formElement); 
  } 
}
displayUpdateProfileForm('.profile-update-section');

