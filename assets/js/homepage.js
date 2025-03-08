var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

function getUserRepos(user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  fetch(apiUrl)
    .then(function (response) {
      // successful request
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error: GitHub user not found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to github");
    });
}

function formSubmitHandler(event) {
  event.preventDefault();
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
}

function displayRepos(repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found";
    return;
  }
  //clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  for (let i = 0; i < repos.length; i++) {
    //format repo name from data
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create link to repo
    var repoLink = repos[i].html_url;

    //create container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create an anchor element to hold repo name with link
    var titleEl = document.createElement("a");
    titleEl.setAttribute("href", repoLink);
    titleEl.setAttribute("target", "_blank");
    titleEl.textContent = repoName;

    //append to container
    repoEl.appendChild(titleEl);

    //create status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    //check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    //append to container

    repoEl.appendChild(statusEl);

    //append container to DOM
    repoContainerEl.appendChild(repoEl);
  }
}

userFormEl.addEventListener("submit", formSubmitHandler);
