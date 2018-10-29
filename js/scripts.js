// Back-end Logic

// ToDoList logic

function ToDoList() {
  this.chores = []
  this.currentId = 0
}

ToDoList.prototype.addChore = function(chore) {
  chore.id = this.assignId();
  this.chores.push(chore);
}
ToDoList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

ToDoList.prototype.findChore = function(id) {
  for (var i=0; i< this.chores.length; i++) {
    if (this.chores[i]) {
      if (this.chores[i].id == id) {
        return this.chores[i];
      }
    }
  };
  return false;
}


ToDoList.prototype.deleteChore = function(id) {
  for (var i=0; i< this.chores.length; i++) {
    if (this.chores[i]) {
      if (this.chores[i].id == id) {
        delete this.chores[i];
        return true;
      }
    }
  };
  return false;
}

// chore logic

function Chore(task, time, day) {
  this.task = task,
  this.time = time,
  this.day = day
}

Chore.prototype.describeChore = function() {
  return (this.task + " needs to be completed by " + this.time + " on " + this.day + ".");
}

var Dishes = new Chore ("Dishes", "8pm", "Daily");
var Vacuum = new Chore ("Vacuum", "11am", "Sunday");
var Litter = new Chore ("Litter", "9am", "Tuesday");
var Trash = new Chore ("Trash", "8am", "Wednesday")

// User Interface
var toDoList = new ToDoList();

function displayChoreDetails(ToDoListToDisplay){
  var choresList = $("ul#chores");
  var htmlForChoreInfo = "";
  ToDoListToDisplay.chores.forEach(function(chore) {
    htmlForChoreInfo += "<div class='well'" + chore.id +">" + "<input type='checkbox' name='removeChore'>"+ " " + chore.task + " " + chore.time + " " + chore.day + "</div>";
  });
  choresList.html(htmlForChoreInfo);
}

$(document).ready(function() {
    $("form#new-chore").submit(function(event){
      event.preventDefault();
      var inputtedTask = $("input#new-task").val();
      var inputtedTime = $("input#new-time").val();
      var inputtedDay = $("input#new-day").val();
      var newChore = new Chore(inputtedTask, inputtedTime, inputtedDay);
      toDoList.addChore(newChore);
      displayChoreDetails(toDoList);
      console.log(ToDoList.chores);
    });
    $("#remove").click(function(){
      $("input:checkbox[name=removeChore]:checked").parent().remove();
      toDoList.deleteChore();

});
});
