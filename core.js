/*
* core.js
* Written by Brandon Milton
* http://brandonio21.com
* August 25, 2014
*/
var taskModule = angular.module('taskModule', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// When loading page, do a get
	$http.get('/api/tasks')
		.success(function(data) {
			$scope.tasks = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
	// When submitting add form, send to node API
	$scope.createTask = function() {
		$http.post('/api/tasks', $scope.formData,
			{
				params: {'creator':$scope.creatorData.text}
			})
			.success(function(data) {
				$scope.formData = {};
				$scope.creatorData = {};
				$scope.tasks = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		};

	// Delete a task
	$scope.deleteTask = function() {
	}

	$scope.deleteTask = function(id) {
		$http.delete('/api/tasks/' + id)
			.success(function(data) {
				$scope.tasks = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		};
	}
