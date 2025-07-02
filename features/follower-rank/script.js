export default async function ({ feature, console }) {
    const path = window.location.pathname;
    const match = path.match(/^\/users\/([^/]+)\/followers\/?$/);
    if (!match) return;
  
    const username = match[1];
  
    const response = await fetch(`https://scratchdata.vercel.app/api/user-ranking/${username}`);
    if (!response.ok) return;
  
    const data = await response.json();
  
    ScratchTools.waitForElements(`h2 a[href='/users/${username}/']`, (a) => {
      const header = a?.parentElement;
      if (!header || header.nextSibling?.classList?.contains("ste-rank-info")) return;
  
      const rankDiv = document.createElement("div");
      rankDiv.className = "ste-rank-info";
      rankDiv.dataset.stFeature = "profile-rank-followers";
      rankDiv.textContent = `Global Rank: #${data.globalRank.toLocaleString()} | Country Rank: #${data.countryRank.toLocaleString()} (${data.country})`;
  
      header.insertAdjacentElement("afterend", rankDiv);
    }, "profile-rank-followers", false);
  }
  