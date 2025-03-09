var issueConatinerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

function getRepoIssues(repo) {
  console.log(repo);
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);
        console.log(data);
        //check if api has paginated issues
        if (response.headers.get("link")) {
          displayWarning(repo);
        }
      });
    } else {
      alert("There was a problem with your request!");
    }
  });
}

function displayIssues(issues) {
  if (issues.length === 0) {
    issueConatinerEl.textContent = "This repo has no open issues!";
    return;
  }
  for (var i = 0; i < issues.length; i++) {
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    // create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    // appen to container
    issueEl.appendChild(titleEl);

    // create a type element
    var typeEl = document.createElement("span");

    // checking if issue is an actual issue or pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    // append to container
    issueEl.appendChild(typeEl);
    issueConatinerEl.appendChild(issueEl);
  }
}

function displayWarning(repo) {
  // add text to warning container
  limitWarningEl.textContent = "To see more than 30 issues, visit ";
  var linkEl = document.createElement("a");
  linkEl.textContent = "here";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "blank");

  limitWarningEl.appendChild(linkEl);
}

getRepoIssues("facebook/react");
