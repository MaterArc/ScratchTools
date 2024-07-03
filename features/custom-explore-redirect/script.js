export default async function ({ feature, console }) {
    let name = await feature.settings.get("customtab");

    function formatTabName(name) {
        return name.trim().toLowerCase();
    }

    function getRedirectPath(name) {
        const formattedName = formatTabName(name);
        return formattedName ? `/explore/projects/${formattedName}/` : "/explore/projects/all/";
    }

    function redirectToTab() {
        if (!name) return;
        const targetPath = getRedirectPath(name);
        if (window.location.pathname === "/explore/projects/all/") {
            window.location.href = targetPath;
        }
    }

    function handleExploreClick(event) {
        event.preventDefault();
        const exploreLink = event.currentTarget;
        const targetUrl = exploreLink.getAttribute('href');
        if (targetUrl === "/explore/projects/all/") {
            const redirectUrl = getRedirectPath(name);
            window.location.href = redirectUrl || targetUrl;
        } else {
            window.location.href = targetUrl;
        }
    }

    redirectToTab();

    ScratchTools.waitForElements('li.link.explore > a', (elements) => {
        const exploreLink = elements[0];
        if (exploreLink) {
            exploreLink.addEventListener('click', handleExploreClick);
        }
    });

    feature.settings.addEventListener("changed", async function ({ key, value }) {
        if (key === "customtab") {
            name = await feature.settings.get("customtab");
            redirectToTab();
        }
    });
}
