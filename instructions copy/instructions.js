(function(){
	'use strict';
	
	var app = angular.module('app', ['ui.router', 'ngAnimate', 'ngTouch']);
	
	app.config(function($stateProvider) {
		$stateProvider
			.state('main', {
				url: '',
				templateUrl: '/templates/home.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.state('rubric', {
				url: '/rubric',
				templateUrl: '/templates/rubric.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.state('steps', {
				 url: '/steps/:step',
				 templateUrl: function (stateParams){
					  return '/templates/step-' + stateParams.step + '.html';
				 },
				 controller: 'stepsCtrl',
				 controllerAs: 'step'
			});
	});
	
	app.run(['$rootScope', function($rootScope){
		$rootScope.config = {
			lab: {
				name: 'AJAX and APIs',
				number: 9,
				description: 'In this lab, you will work with YouTube\'s API and create a video-like site',
				points: 10,
				steps: 10
			},
			rubric: [
				
			]
		}
	}]);
	
	app.controller('homeCtrl', function($state, $stateParams){
		var vm = this;
		
		vm.viewRubric = function() {
			$state.transitionTo('rubric')
		};
		
		vm.beginLab = function(){
			$state.transitionTo('steps', {step:1})
		};
	})
	
	app.controller('stepsCtrl', function($stateParams, $state, $document){
		var vm = this;
		vm.firstStep = false;
		vm.step = $stateParams.step;
		vm.title = vm.step;
		
		vm.showImg = function($event){
			var $el = $event.currentTarget;
			$el.parentElement.classList.add('unhide');
		}
		
		$document.bind('keyup', function(e){
			if(e.keyCode === 37)
				vm.prevStep(vm.step);
			else if(e.keyCode === 39)
				vm.nextStep(vm.step);
		});
		
		vm.prevStep = function(current) {
			var step = parseInt(current) - 1;
			if(step > 0) {
				$state.transitionTo('steps', {step: step});
			} else {
				$state.transitionTo('main');
			}
		};
		vm.nextStep = function(current) {
			var step = parseInt(current) + 1;
			$state.transitionTo('steps', {step: step});
		};
		
	});
})();