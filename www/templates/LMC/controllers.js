var module = "LMC";
starter.controller('header'+module+'Ctrl', function($rootScope, $scope, $state, $stateParams, $ionicSlideBoxDelegate, safeApply)  {
	console.warn("on est dans le header"+module+"Ctrl");
})
.controller('content'+module+'Ctrl', function($rootScope, $scope, $state, $stateParams, $ionicSlideBoxDelegate, safeApply, snSkrollr)  {
	console.warn("on est dans le content"+module+"Ctrl");
	
	if($stateParams.page != null && $stateParams.page != "mot") $rootScope.page = $stateParams.page;
	else if($stateParams.page == "mot") $rootScope.page = "Mot de la Présidente";
	else $rootScope.page = "Mot de la Présidente";
	$scope.data = [];
	$scope.data1 = [];
	var test = '/app/'+module+'/'+$rootScope.page;
	console.warn("test:",test);
 	var starCountRef = firebase.database().ref(test);
	console.log("starCountRef:",starCountRef);
	
	starCountRef.on("value", function(snapshot){
	    snapshot.forEach(function(childSnapshot) {
			safeApply($scope, function() {
	 			if(childSnapshot.key == 0)
	 			{
	 				$scope.label = childSnapshot.val();
	 				console.warn("$scope.label:",$scope.label);	
				}
				else
				{
					$scope.data1.push(childSnapshot.key);
	 				//$scope.data = childSnapshot.val();
	 				//console.warn("$scope.data00000:",$scope.data);
	 				$scope.data.push(childSnapshot.val());
	 				console.warn("$scope.data:",$scope.data);					     		 
	 				console.warn("$scope.data111111111111111:",$scope.data1);					     		 
				}
			});
		});
	});
})
.controller('details'+module+'Ctrl', function($rootScope, $scope, $state, $stateParams, $ionicSlideBoxDelegate, safeApply, snSkrollr)  {
	console.warn("on est dans le details"+module+"Ctrl");
	
	if($stateParams.page != null && $stateParams.page != "mot") $rootScope.page = $stateParams.page;
	else if($stateParams.page == "mot") $rootScope.page = "Mot de la Présidente";
	else $rootScope.page = "Mot de la Présidente";
	if($stateParams.id != null) $rootScope.id = $stateParams.id;
	else $rootScope.id = 1;
	
	$scope.data = [];
	$scope.data1 = [];
	var test = '/app/'+module+'/'+$rootScope.page;//+'/'+$rootScope.id;
	console.warn("test:",test);
 	var starCountRef = firebase.database().ref(test);
	console.log("starCountRef:",starCountRef);
	
	starCountRef.on("value", function(snapshot){
	    snapshot.forEach(function(childSnapshot) {
			safeApply($scope, function() {
	 			if(childSnapshot.key == 0)
	 			{
	 				$scope.label = childSnapshot.val();
	 				console.warn("$scope.label:",$scope.label);	
				}
				else if(childSnapshot.key == $rootScope.id)
				{
	 				$scope.data1 = childSnapshot.key;
	 				$scope.data = childSnapshot.val();
	 				console.warn("$scope.data00000:",$scope.data);				
	 				console.log("$scope.data111111:",$scope.data1);
				}
			});
		});
	});
	
	//met a jour la base de donnees avec les nouvelles valeurs de donnees
  	$scope.submitForm = function(data)
	{
		firebase.database().ref(test).push().set(data, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			console.warn("okok Stelly");
			$state.go(module+'.details');
		});
	};
})
.controller('footer'+module+'Ctrl', function($rootScope, $scope, $state, $stateParams, $ionicSlideBoxDelegate, safeApply)  {
	console.warn("on est dans le footer"+module+"Ctrl");
})
.controller('menuCtrl', function($rootScope, $scope, $state, $stateParams, $ionicSlideBoxDelegate, safeApply)  {
	console.warn("on est dans le menuCtrl");
	
	$rootScope.module = "Membres";
	$rootScope.site = [];
	var menuRef = firebase.database().ref("/app/");
	console.log("menuRef:",menuRef);
	
	
 	//retourne toutes les données du site et instancie la variable global $rootScope.site
	menuRef.on("value", function(snapshot){
		//console.log("*****************snapshot_test********:", snapshot.key);
		safeApply($scope, function() {
			$rootScope.site = snapshot.val();
		});   	
	 });   	
	 
	 //fonction qui modifie le nom des menus (ex: 1-accueil en accueil)
	$scope.modifier_nom = function(page)
	{
		var mot = page.split("-");
		if(mot[1] === "undefined" || mot[1] === undefined)mot[1] = page;
		if(mot[2] !== undefined)mot[1] = mot[1]+'-'+mot[2];
		//console.warn("mot:",mot[1]);
		return mot[1];
	};
	
	//fonction qui met a jour la page
	$scope.change_page = function(page)
	{
		//$rootScope.page = page;	
		$rootScope.enCours = page;	
		console.warn("page:",page);
		console.warn("$rootScope.page:",$rootScope.page);
	};
	
 	//fonction qui met a jour la sous-page
	$scope.change_sous = function(sous, contenu)
	{
		$scope.testo = "templates/cnd/Joueurs.html";
		safeApply($scope, function() {
			$rootScope.sous_cat = sous;	
			$rootScope.cont = contenu;		
		});	
	};
	
	//fonction qui change l'état de la variable group, pour l'affichage du sidemenu
	$scope.toggleGroup = function(group) {
	    if ($scope.isGroupShown(group)) {
	      $scope.shownGroup = null;
	    } else {
	      $scope.shownGroup = group;
	    }
	};
	
	//verifie si le groupe est bien actif
	$scope.isGroupShown = function(group) {
	    return $scope.shownGroup === group;
	};	   
	
})
;