function stuff() {
el = document.querySelector('#tabs > li:nth-child(5)')
var clone = el.cloneNode(true);
document.querySelector('#tabs').appendChild(clone);
document.querySelector('#tabs > li:nth-child(6) > a').textContent = 'Statistics'
document.querySelector('#tabs > li:nth-child(6)').className = 'last'
document.querySelector('#tabs > li:nth-child(6)').dataTab = 'stats'
document.querySelector('#tabs > li:nth-child(6) > a').href = `https://scratchstats.com/${document.querySelector('#topnav > div > div > ul.account-nav.logged-in > li.logged-in-user.dropdown > span').textContent}`
}
setTimeout(() => { stuff() }, 2000);