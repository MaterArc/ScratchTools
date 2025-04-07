export default async function ({ feature, console }) {
  await ScratchTools.waitForElement(".project-buttons");

  let auth = await feature.auth.fetch();
  let username = feature.redux.getState().preview.projectInfo.author.username;
  
  let response = await fetch(`https://scratch.mit.edu/users/${username}/?t=${Date.now()}`);
  let pageText = await response.text();
  let isFollowing = pageText.includes('data-control="unfollow"');

  if (!document.querySelector(".ste-follow-btn")) {
    let button = document.createElement("button");
    button.className = `ste-follow-btn button ${isFollowing ? "following" : "notfollowing"}`;
    let span = document.createElement("span");
    span.textContent = (isFollowing ? "Unfollow" : "Follow") + " " + username;
    button.appendChild(span);

    button.addEventListener("click", async function () {
      let csrfResponse = await fetch("https://scratch.mit.edu/csrf_token/");
      let csrfToken = (await csrfResponse.json()).token;

      let method = isFollowing ? "remove" : "add";
      let apiUrl = `https://scratch.mit.edu/site-api/users/followers/${username}/${method}/`;

      let followResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "x-csrftoken": csrfToken,
          "x-requested-with": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: username }),
      });

      if (followResponse.ok) {
        isFollowing = !isFollowing;
        button.className = `ste-follow-btn button ${isFollowing ? "following" : "notfollowing"}`;
        span.textContent = (isFollowing ? "Unfollow" : "Follow") + " " + username;
      }
    });

    ScratchTools.appendToSharedSpace({
      space: "beforeRemixButton",
      order: 0,
      element: button,
    });
  }
}
