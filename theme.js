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


if (currentTheme == "dark") {
    setDark();
} else {
    setLight();
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
    setLight();
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

//COLOR SWITCHER

const currentColor = localStorage.getItem("colortheme");
let colorSwitcherExists = false;
let colorSwitcher = null;

if(document.body.getElementsByClassName("color-switcher").length < 1){
  colorSwitcherExists = false;
} else {
  colorSwitcherExists = true;
  colorSwitcher = document.body.getElementsByClassName("color-switcher")[0];
}


if (currentColor == "purple") {
    setPurple();
} else {
    setOrange();
}

function switchColor() {
  const currentColor = localStorage.getItem("colortheme");
  if (currentColor == "orange") {
    setPurple();
  } else if(currentColor == "purple") {
    setOrange();
  } else {
    setOrange();
  }
  // alert("switchcolor");
}

function setOrange(){
  document.body.classList.add("orange-mode");
  if(colorSwitcherExists == true){colorSwitcher.innerHTML = '[      |ORANGE]'}
  document.body.classList.remove("purple-mode");
  localStorage.setItem("colortheme", "orange");
  // alert("setorange");
}

function setPurple(){
  document.body.classList.add("purple-mode");
  if(colorSwitcherExists == true){colorSwitcher.innerHTML = '[PURPLE|      ]'}
  document.body.classList.remove("orange-mode");
  localStorage.setItem("colortheme", "purple");
  // alert("setpurple"); 
}