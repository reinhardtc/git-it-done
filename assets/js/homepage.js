var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var langaugeButtonsEl = document.querySelector("#language-buttons");

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
        "<a href='./single-repo.html?repo=" +
        repoName +
        "'>" +
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)</a>";
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

function getFeaturedRepos(language) {
  var apiUrl =
    "https://api.github.com/search/repositories?q=" +
    language +
    "+is:featured&sort=help-wanted-issues";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert("Error: GitHub User Not Found");
    }
  });
}

function buttonClickHandler(event) {
  var language = event.target.getAttribute("data-language");
  if (language) {
    getFeaturedRepos(language);
    repoContainerEl.textContent = "";
  }
}

langaugeButtonsEl.addEventListener("click", buttonClickHandler);
userFormEl.addEventListener("submit", formSubmitHandler);
