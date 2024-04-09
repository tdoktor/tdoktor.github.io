const currentTheme = localStorage.getItem("theme");
const currentCurseMode = localStorage.getItem("curseMode");

if (currentTheme == "light") {
    document.body.classList.add("lightmode");
} else {
    document.body.classList.add("darkmode");
}

if(currentCurseMode === 'curseOn'){
  document.body.classList.add("cursed");
}

function switchMode() {
  const currentTheme = localStorage.getItem("theme");
  document.body.classList.remove("cursed");
  localStorage.setItem("curseMode", "curseOff");

  if (currentTheme == "light") {
    document.body.classList.remove("lightmode");
    document.body.classList.add("darkmode");
    localStorage.setItem("theme", "dark");
  } else if(currentTheme == "dark") {
    document.body.classList.add("lightmode");
    document.body.classList.remove("darkmode");
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "light");
    document.body.classList.add("lightmode");
    document.body.classList.remove("darkmode");
  }
}