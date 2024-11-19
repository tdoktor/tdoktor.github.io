const currentTheme = localStorage.getItem("theme");
const currentCurseMode = localStorage.getItem("curseMode");
let themeSwitcherExists = false;
let themeSwitcher = null;

if(document.body.getElementsByClassName("theme-switcher").length < 1){
  themeSwitcherExists = false;
} else {
  themeSwitcherExists = true;
  themeSwitcher = document.body.getElementsByClassName("theme-switcher")[0];
}


if (currentTheme == "light") {
    setLight();
} else {
    setDark();
}

if(currentCurseMode === 'curseOn'){
  document.body.classList.add("cursed");
}

function switchMode() {
  const currentTheme = localStorage.getItem("theme");
  document.body.classList.remove("cursed");
  localStorage.setItem("curseMode", "curseOff");

  if (currentTheme == "light") {
    setDark();
  } else if(currentTheme == "dark") {
    setLight();
  } else {
    setDark();
  }
}

function setLight(){
  document.body.classList.add("lightmode");
  if(themeSwitcherExists == true){themeSwitcher.innerHTML = '[    |LIGHT]'}
  document.body.classList.remove("darkmode");
  localStorage.setItem("theme", "light");
}

function setDark(){
  document.body.classList.add("darkmode");
  if(themeSwitcherExists == true){themeSwitcher.innerHTML = '[DARK|     ]'}
  document.body.classList.remove("lightmode");
  localStorage.setItem("theme", "dark"); 
}