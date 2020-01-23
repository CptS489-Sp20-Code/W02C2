//
//eventHandlers.js -- This file defines the JavaScript functions necessary to
//update the app in response to user interaction.
//


//document click: When the user clicks anywhere in the doc and the menu is open
//we need to close it and toggle menu state variable.
document.addEventListener("click",function(e) {
  if (menuOpen) {
    document.getElementById("menuBtnIcon").classList.remove("fa-times"); 
    //Change hamburger to X when menu open
    document.getElementById("menuBtnIcon").classList.add("fa-bars");
    document.getElementById("sideMenu").style.width = "0px"; //close menu
    menuOpen = false;
  }
});

//menuBtn click: When the top-left side menu button is clicked and the menu
//is closed, we need to open it and toggle menu state variable.
document.getElementById("menuBtn").addEventListener("click",function(e) {
if (!menuOpen) {
  document.getElementById("menuBtnIcon").classList.remove("fa-bars"); 
  //Change hamburger to X when menu open
  document.getElementById("menuBtnIcon").classList.add("fa-times");
  document.getElementById("sideMenu").style.width = "250px"; //open up menu
  menuOpen = true;
  //toggleInputDisabled(true);
  e.stopPropagation();
}
});   

//bottomBarBtnClick -- When a button in the bottom bar is clicked, we potentially
//need to toggle the mode.
var bottomBarBtnClick = function() {
if (mode != this.id) {
  var prevMode = mode;
  mode = this.id;
  //Change mode button:
  document.getElementById(prevMode).classList.remove("menuItemSelected");
  this.classList.add("menuItemSelected");
  //Change page title:
  document.getElementById("topBarTitle").textContent = modeToTitle[mode];
  //Change page content
  document.getElementById(prevMode + "Div").style.display = "none";
  document.getElementById(mode + "Div").style.display = "block";
  //Change menu items:
  var oldItems = document.getElementsByClassName(prevMode + "Item");
  var newItems = document.getElementsByClassName(mode + "Item");
  //Uses for loop:
  for (var i = 0; i < oldItems.length; ++i) {
    oldItems[i].style.display = "none";
  }
  for (var i = 0; i < newItems.length; ++i) {
    newItems[i].style.display = "block";
  }
}
}

//loginInterface submit: When the login button is clicked, we rely on form
//pattern matching to ensure validity of username and password. To log in, we
//switch the mode to "feedMode" and make the necessary UI and state changes.

document.getElementById("loginInterface").onsubmit = function(e) {
//Enable menu button:
document.getElementById("menuBtn").disabled = false;

//Show bottom bar buttons and highlight feed mode button
document.getElementById("bottomBar").style.display = "block";
document.getElementById("feedMode").classList.add("menuItemSelected");
document.getElementById("roundsMode").classList.remove("menuItemSelected");
document.getElementById("coursesMode").classList.remove("menuItemSelected");

//Change title bar to Activity Feed
document.getElementById("topBarTitle").textContent = "Activity Feed";
//Show only the feed mode menu items
var menuItems = document.getElementsByClassName("menuItem");
for (var i = 0; i < menuItems.length; ++i) {
  menuItems[i].style.display = "none";
}
var feedItems = document.getElementsByClassName("feedModeItem");
for (var i = 0; i < feedItems.length; ++i) {
  feedItems[i].style.display = "block";
}

//hide login screen and show feed screen
document.getElementById("loginModeDiv").style.display = "none";
document.getElementById("feedModeDiv").style.display = "block";

//Set mode to feedMode
mode = "feedMode";
e.preventDefault(); //Prevents form refresh -- the default behavior
};