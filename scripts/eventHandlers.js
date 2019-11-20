//
//eventHandlers.js -- This file defines the JavaScript functions necessary to
//update the app in response to user interaction.
//


  //startUp -- This function sets up the initial state of the app: Login page is
  //visible, bottom bar is invisible, all menu items invisible except feed items,
  //menu bottom disabled, UI mode = login
  function startUp() {
    //Hide all pages except for Login Page, which is the start page.
    document.getElementById("feedModeDiv").style.display = "none";
    document.getElementById("followedUsersDiv").style.display = "none";
    document.getElementById("roundsModeDiv").style.display = "none";
    document.getElementById("logRoundDiv").style.display = "none";
    document.getElementById("coursesModeDiv").style.display = "none";
    document.getElementById("searchCourseDiv").style.display = "none";
    document.getElementById("loginModeDiv").style.display = "block";

    //Clear all text from email and password fields
    document.getElementById("emailInput").value = "";
    document.getElementById("passwordInput").value = "";

    //Set top bar text
    document.getElementById("topBarTitle").textContent = "Welcome to Speedgolf App";

    //Hide the bottom bar initially
    document.getElementById("bottomBar").style.visibility = "hidden";

    //Hide all menu items except for Activity Feed items:
    var feedItems = document.getElementsByClassName("feedModeItem");
    var roundItems = document.getElementsByClassName("roundsModeItem");
    var courseItems = document.getElementsByClassName("coursesModeItem");

    for (var i = 0; i < feedItems.length; ++i) {
        feedItems[i].style.display = "block";
      }
    for (var i = 0; i < roundItems.length; ++i) {
      roundItems[i].style.display = "none";
    }

    for (var i = 0; i < courseItems.length; ++i) {
        courseItems[i].style.display = "none";
    }

    //Disable menu button:
    document.getElementById("menuBtn").disabled = true;

    mode = "loginMode";

    //set the inptu focus to the email field
    document.getElementById("emailInput").focus();
  }

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

//login -- This function sets the initial app state after login. It is called
//from setTimeout after the button spinner has commenced.bottombar
function login() {
  //Stop spinner
  document.getElementById("loginBtnIcon").classList.remove("fas","fa-spinner","fa-spin");
  
  //Enable menu button:
  document.getElementById("menuBtn").disabled = false;

  //Show bottom bar buttons and highlight feed mode button
  document.getElementById("bottomBar").style.visibility = "visible";
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
}

//loginInterface submit: When the login button is clicked, we rely on form
//pattern matching to ensure validity of username and password. To log in, we
//switch the mode to "feedMode" and make the necessary UI and state changes.

document.getElementById("loginInterface").onsubmit = function(e) {

  //Start spinner:
  document.getElementById("loginBtnIcon").classList.add("fas","fa-spinner","fa-spin");
  setTimeout(login,3000);
  e.preventDefault(); //Prevents form refresh -- the default behavior
};
  
//logOutBtn click: When the user logs out, we need to reset the app to its start
//state, with the login page visible
document.getElementById("logOutBtn").onclick = function(e) {
  //Restore starting app state
  startUp();
};