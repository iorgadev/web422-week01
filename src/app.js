const users = require('./users');
const ProfileCard = require('./components/profile-card');

//api settings
let currentPage = 1;

//create profile card to be used in both functions
function createProfileCard(user) {
  const main = document.querySelector('main');
  // Extract and prepare the user properties we care about
  const id = user.id;
  const name = `${user.first_name} ${user.last_name}`;
  const email = user.email;
  const avatarUrl = user.avatar;

  // Create a ProfileCard of DOM nodes for each user
  const profileCard = new ProfileCard(id, name, email, avatarUrl);

  // Append the user's ProfileCard DOM nodes to our document's main element
  main.appendChild(profileCard.render());
}

function init() {
  const main = document.querySelector('main');
  users.load()
    .then(users => {
      // If we couldn't load any users, indicate that
      if(!(users && users.length)) {
        main.innerHTML = 'Unable to load user data at this time.';
        return;
      }

      // Otherwise, iterate across all the users
      users.forEach(user => {
        createProfileCard(user);
      })
    });
}

//click event for the "Load More" button
document.getElementById('more').addEventListener("click", loadMore, false);

//load the next page of results
function loadMore(){
  const main = document.querySelector('main');
  const more = document.getElementById('more');
  currentPage++;
  users.load(currentPage)
  .then(users => {
    // hide load more if there are no more users to show
    if(!(users && users.length)) {
      more.style.display = 'none';
      return;
    }

    users.forEach(user => {
      createProfileCard(user);
    })
  });
  
}

window.onload = init;
