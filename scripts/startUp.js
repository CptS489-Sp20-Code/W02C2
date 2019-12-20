//Start-up functions run when page is loaded.
//1. Include the HTML snippets:
includeHTML();
//2. Define global vars and function bindings
//Set up UI state
var menuOpen = false; //Boolean variable to capture the state of the side menu.
var mode = "loginMode"; //Variable captures current UI mode

//Associative array maps modes to page titles
var modeToTitle = {"feedMode": "Activity Feed",
                   "roundsMode": "My Rounds",
                   "coursesMode": "Speedgolf Courses",
                   "loginMode": "Welcome to Speedgolf App"};

//Bind bottomBarBtnClick function to all elements of class bottomBarBtn
var bottomBtns = document.getElementsByClassName("bottomBarBtn");
for (var i = 0; i < bottomBtns.length; ++i) {
    bottomBtns[i].addEventListener("click",bottomBarBtnClick);
}

//Hide all pages except for Activity Feed, which is the start page.
document.getElementById("feedModeDiv").style.display = "none";
document.getElementById("followedUsersDiv").style.display = "none";
document.getElementById("roundsModeDiv").style.display = "none";
document.getElementById("logRoundDiv").style.display = "none";
document.getElementById("coursesModeDiv").style.display = "none";
document.getElementById("searchCourseDiv").style.display = "none";

//Hide bottom bar
document.getElementById("bottomBar").style.display = "none";

//On startup, set current app mode to "login mode"
var mode = "loginMode"; //Variable captures current UI mode\
//Disable menu button:
document.getElementById("menuBtn").disabled = true;