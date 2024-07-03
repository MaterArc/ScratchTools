export default async function ({ feature, console }) {
    let tabName = await ScratchTools.storage.get("tab-name");

    function formatTabName(name) {
        return name.trim().toLowerCase();
    }

    function getRedirectPath(name) {
        const formattedName = formatTabName(name);
        const tabPaths = {
            "animations": "animations",
            "art": "art",
            "games": "games",
            "music": "music",
            "stories": "stories"
            "tutorials": "tutorials"
        };
        return tabPaths[formattedName] ? `/explore/projects/${tabPaths[formattedName]}/` : "/explore/projects/all/";
    }

    function redirectToTab() {
        if (!tabName) return;
        const targetPath = getRedirectPath(tabName);
        if (window.location.pathname === "/explore/projects/all/") {
            window.location.href = targetPath;
        }
    }

    function handleExploreClick(event) {
        event.preventDefault();
        const exploreLink = event.currentTarget;
        const targetUrl = exploreLink.getAttribute('href');
        if (targetUrl === "/explore/projects/all/") {
            const redirectUrl = getRedirectPath(tabName);
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

    feature.settings.addEventListener("changed", function ({ key, value }) {
        if (key === "tab-name") {
            tabName = value;
            ScratchTools.storage.set("tab-name", value);
            redirectToTab();
        }
    });
}
