function getUserRepos(user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
}

function userNameInput(callback) {
  var userName = window.prompt("Enter your GitHub username");
  callback(userName);
}

userNameInput(getUserRepos);
