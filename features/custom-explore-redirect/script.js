export default async function ({ feature, console }) {
    let name;
    try {
        name = await feature.settings.get("customtab");
        if (!name) {
            console.warn("Custom tab name is not set.");
            return;
        }
    } catch (error) {
        console.error("Error fetching custom tab name:", error);
        return;
    }

    function getRedirectPath(name) {
        try {
            return name ? `/explore/projects/${name}/` : "/explore/projects/all/";
        } catch (error) {
            console.error("Error constructing redirect path:", error);
            return "/explore/projects/all/";
        }
    }

    function redirectToTab() {
        try {
            if (!name) return;
            const targetPath = getRedirectPath(name);
            if (window.location.pathname === "/explore/projects/all/") {
                window.location.href = targetPath;
            }
        } catch (error) {
            console.error("Error during redirection:", error);
        }
    }

    function handleExploreClick(event) {
        event.preventDefault();
        try {
            const exploreLink = event.currentTarget;
            const targetUrl = exploreLink.getAttribute('href');
            if (targetUrl === "/explore/projects/all/") {
                const redirectUrl = getRedirectPath(name);
                window.location.href = redirectUrl || targetUrl;
            } else {
                window.location.href = targetUrl;
            }
        } catch (error) {
            console.error("Error handling Explore link click:", error);
        }
    }

    try {
        redirectToTab();
    } catch (error) {
        console.error("Error in initial redirection:", error);
    }

    try {
        ScratchTools.waitForElements('li.link.explore > a', (elements) => {
            const exploreLink = elements[0];
            if (exploreLink) {
                exploreLink.addEventListener('click', handleExploreClick);
            }
        });
    } catch (error) {
        console.error("Error setting up Explore link click handler:", error);
    }

    feature.settings.addEventListener("changed", function ({ key, value }) {
        console.log(key + " was set to " + value.toString());
        if (key === "customtab") {
            try {
                name = value;
                if (!name) {
                    console.warn("Custom tab name is not set after change.");
                    return;
                }
                redirectToTab();
            } catch (error) {
                console.error("Error updating custom tab name on setting change:", error);
            }
        }
    });
}
