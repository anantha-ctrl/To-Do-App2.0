var app = angular.module('todoApp', []);

app.controller('TodoController', function($scope) {

  // Load saved tasks from localStorage
  $scope.tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Add a new task
  $scope.addTask = function() {
    if ($scope.newTask && $scope.newTask.trim() !== "") {
      $scope.tasks.push({ name: $scope.newTask.trim(), completed: false });
      $scope.newTask = '';
      $scope.saveTasks();
    }
  };

  // Press Enter to add
  $scope.checkEnter = function(event) {
    if (event.which === 13) { // Enter key
      $scope.addTask();
    }
  };

  // Remove a specific task
  $scope.removeTask = function(index) {
    $scope.tasks.splice(index, 1);
    $scope.saveTasks();
  };

  // Clear completed tasks
  $scope.clearCompleted = function() {
    $scope.tasks = $scope.tasks.filter(task => !task.completed);
    $scope.saveTasks();
  };

  // Clear all tasks
  $scope.clearAll = function() {
    if (confirm("Are you sure you want to clear all tasks?")) {
      $scope.tasks = [];
      $scope.saveTasks();
    }
  };

  // Count remaining tasks
  $scope.remaining = function() {
    return $scope.tasks.filter(task => !task.completed).length;
  };

  // Save tasks to localStorage
  $scope.saveTasks = function() {
    localStorage.setItem('tasks', JSON.stringify($scope.tasks));
  };

  // Watch for changes and auto-save
  $scope.$watch('tasks', function(newVal, oldVal) {
    if (newVal !== oldVal) $scope.saveTasks();
  }, true);
});
