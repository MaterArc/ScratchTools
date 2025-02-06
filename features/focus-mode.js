if (window.location.href.includes("https://scratch.mit.edu/projects/")) {
  checkSubactions();

  let isFocusMode = false;
  let removedElements = {};

  function checkSubactions() {
    if (
      document.querySelector(
        "#view > div > div.inner > div:nth-child(3) > div.flex-row.subactions"
      ) === null
    ) {
      window.setTimeout(checkSubactions, 100);
    } else {
      focusMode();
    }
  }

  function focusMode() {
    var btn = document.createElement("button");
    btn.className = "button focusMode";
    btn.textContent = "Focus Mode";
    btn.onclick = function () {
      toggleFocusMode();
    };

    if (document.querySelector("button.focusMode") === null) {
      document
        .querySelector(
          "#view > div > div.inner > div:nth-child(3) > div.flex-row.subactions"
        )
        .appendChild(btn);
    }
  }

  function toggleFocusMode() {
    if (!isFocusMode) {
      removedElements.footer = document.querySelector("#footer");
      removedElements.navigation = document.querySelector("#navigation");
      removedElements.projectLowerContainer = document.querySelector(
        "#view > div > div.project-lower-container"
      );

      removedElements.footer?.remove();
      removedElements.navigation?.remove();
      removedElements.projectLowerContainer?.remove();

      document.querySelector(".focusMode").textContent = "Exit Focus Mode";
    } else {
      if (removedElements.footer) {
        document.body.appendChild(removedElements.footer);
      }
      if (removedElements.navigation) {
        document.body.insertBefore(removedElements.navigation, document.body.firstChild);
      }
      if (removedElements.projectLowerContainer) {
        document
          .querySelector("#view > div > div.inner")
          .appendChild(removedElements.projectLowerContainer);
      }

      document.querySelector(".focusMode").textContent = "Focus Mode";
    }

    isFocusMode = !isFocusMode;
  }
}
