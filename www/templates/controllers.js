starter.controller('lieuCtrl', function($rootScope, $scope, $stateParams, $state, safeApply) {//controleur qui permet de mettre a jour une donnee
	console.warn("je suis dans lieuCtrl");
	
	//instanciation des variables globales selon URL
	/*$rootScope.id = $stateParams.id;
	$rootScope.page = $stateParams.page;
	$rootScope.sousPage = $stateParams.sousPage;
	$rootScope.action = 'update';*/
	
	//retourne la base de données selon la page et la sous-page
	var starCountRef = firebase.database().ref('app');
	console.log("starCountRef:",starCountRef);
	$scope.label = [];
	$scope.data = [];
	starCountRef.on("value", function(snapshot){
		$scope.lieu = snapshot.val();
		console.warn("$scope.lieu:",$scope.lieu);
     	/*snapshot.forEach(function(childSnapshot) {
 			safeApply($scope, function(){
	 			if(childSnapshot.key == 0)
	 			{
	 				$scope.label = childSnapshot.val();						     		
				}
				else if(childSnapshot.key == $rootScope.id)
				{
	 				$scope.data = childSnapshot.val();				     		
				}
			});
		});*/
	});
})
.controller('homeCtrl', function($rootScope, $scope, $stateParams, $ionicSlideBoxDelegate, safeApply, $timeout, $ionicModal) {
	console.warn("je suis dans homeCtrl");
	
	/************code carousel debut************/
	var vm = this
	$scope.arr = [];
    vm.options = {
        unselectOthers:false
    };
    var options = {
    template      : null, // templateUrl in case you don't need to pass a directive but just a html view
    align         : 'left', // alignement of the carousel
    centerOnSelect: true, // center carousel when an item is selected
    trackBy       : '$index',  // indicate a track by property
    selectFirst   : true, // select first carousel item at start
    selectAtStart : {    // optional => Select at start the item with the property (string) with value passed
        property: null,
        value   : null
    },
    pullRefresh   : {  // optional => set active to true for pull refresh passing a callBack
        active  : false,
        callBack: angular.noop
    }
};
	vm.carouselOptions7 = {
            carouselId:'carousel-7',
            align:'left',
            selectFirst:true,
            centerOnSelect:false,
            template:'carousel-templates/demo-3.html'
    };
    
    vm.carouselOptionsForLoop = {
        align         : 'left',
        selectFirst   : true,
        centerOnSelect: true,
        template      : 'carousel-templates/demo-1.html'
    }
    vm.onSelectCarousel = onSelectCarousel;
    vm.addItemsCarousel = addItemsCarousel;
    vm.openModal        = openModal;
   
    function activate() {
		console.warn("activate est activé,lol!");
        // Mock data for carousel
        vm.carouselData7 = createArray(15, true);
        vm.loopItems = [
            {
                id:0,
                carouselId:'carousel-8',
                arrayData:createArray(6)
            },
            {
                id:1,
                carouselId:'carousel-9',
                arrayData:createArray(8)
            },
            {
                id:2,
                carouselId:'carousel-10',
                arrayData:createArray(4)
            }
        ];

        // To be able to use the carousel inside a modal we need to set the properties on the $scope object
        $scope.carouselOptions1 = vm.carouselOptions1;
        $scope.carouselData1    = vm.carouselData1;
        $scope.onSelectCarousel = vm.onSelectCarousel;
        $scope.closeModal       = closeModal;

        function createArray(total, randomImg) {
            randomImg = typeof randomImg === 'undefined' ? false : randomImg;
            
            console.warn("arr*******************:",$scope.arr);
            $scope.$broadcast('a-carousel.arrayupdated', 'carousel-7');
            return $scope.arr;
        }
    }

    function onSelectCarousel(item) {
        // console.log('Carousel item selected:', item);
        vm.itemSelected = item;

        // unselect all carousel with id that contains string except one
        if (vm.options.unselectOthers) {
            $scope.$broadcast('a-carousel.desactivateItem', {idContains:'carousel-', except:item.carouselId})
        }
    }

    // Example add 4 elements to carousel 7
    function addItemsCarousel(total) {
        var i, model
        var oldLength = vm.carouselData7.length;
        for(i = 0; i < total; i++) {
            model = getModelImageItem(oldLength + i);
            vm.carouselData7.push(model);
        }

        // Tell carousel 6 that its array has been updated
        $scope.$broadcast('a-carousel.arrayupdated', 'carousel-7');
    }
    
    function closeModal() {
    	}
    function openModal() {
            var templateModal = '<ion-modal-view><ion-header-bar><h2>Inside a Modal</h2></ion-header-bar>' +
                '<ion-content><button class="btn" ng-click="closeModal()">Close modal</button><br><a-carousel item-directive="carousel-text-item" ' +
                'carousel-options="carouselOptions1" array-provider="carouselData1" ' +
                'on-select="onSelectCarousel(item)"></a-carousel></ion-content></ion-modal-view>';
            modal             = $ionicModal.fromTemplate(templateModal, {
                scope: $scope
            });
            modal.show();
        }

	function getModelImageItem(id) {
            var imgId = Math.floor(Math.random() * 10000);
            return {
                id:id,
                src:'http://lorempixel.com/120/80/?' + imgId
            }
        }
    /************code carousel fin************/
	 /************************/
    bdd_marques = firebase.database().ref('/Modules/'+$rootScope.page+'/'+$rootScope.sousPage);//retourne la base de données
    bdd_marques.on("value", function(snapshot){
	    snapshot.forEach(function(childSnapshot) {
			safeApply($scope, function() {
	 			if(childSnapshot.key == 0)
	 			{
	 				$scope.label = childSnapshot.val();
				}
				else
				{
	 				$scope.data = childSnapshot.val();	
	 				model = {
	                    id     : $scope.data[0],
	                    display: $scope.data[0],
	                    src:'https://firebasestorage.googleapis.com/v0/b/shilocar-27f6f.appspot.com/o/logos_voitures%2F'+$scope.data[0].toLowerCase()+'.png?alt=media&token=0e23cffd-dca2-4fd0-aa1c-c9bdaeff5d10/'
	                };
	 				$scope.arr.push(model);
	 				console.warn("$scope.items:",$scope.items);					     		 
				}
			});
		});
		activate();//active tous les carousel de la page d'accueil
	});
    /************************/
	starCountRef = firebase.database().ref('/www/templates/'+$rootScope.page);//retourne la base de données
	starCountRef.on("value", function(snapshot){
		console.log("*****************snapshot_test********:", snapshot.key);
		$rootScope.cont = snapshot.val();
		console.warn("$rootScope.cont1 :",$rootScope.cont);
		
		snapshot.forEach(function(childSnapshot) {
 			safeApply($scope, function() {
	 			if(childSnapshot.key == 0)
	 			{
	 				$scope.label = childSnapshot.val();						     		
				}
				else
				{
	 				$scope.data = childSnapshot.val();	
	 				var test = 
					  {
					    src:'http://www.comendo.fr:1001/img/AUDI.png',
					    //src:'http://www.comendo.fr:1001/img/'+$scope.data[0]+'.png',
					    sub: $scope.data[0]
					  };
	 				$scope.items.push(test);
	 				//console.warn("details test "+$rootScope.id +":", $scope.data);					     		 
				}
			});
		});
		console.warn("$scope.label:",$scope.label);
		console.warn("/////////////$scope.data///////////////:",$scope.data);
	  	$scope.hydrate = function(data)
	  	{
			//console.log("cdc:", cdc);
			$scope.data = data;
		};
		$scope.lower = function(mot)
	  	{
	  		var texte = mot.toLowerCase();
			return texte;
		};
		$scope.menu = function(page)
	  	{
	  		console.warn("++++++++++++++++++++++++++++++++");
	  		$state.go('app.'+page);
	  		 
		};
		$ionicSlideBoxDelegate.update();
	 });
	
	

	//$scope.toutes_marques = function(sousPage)
	function toutes_marques(sousPage)
	{
	 	bdd_marques = firebase.database().ref('/www/templates/'+$rootScope.page+'/'+sousPage);//retourne la base de données
		bdd_marques.on("value", function(snapshot){
			console.log("*****************clé marque********:", snapshot.key);
			$scope.valeur = snapshot.val();
			console.warn("$rootScope.valeur :",$rootScope.valeur);
			 
			snapshot.forEach(function(childSnapshot) {
	 			safeApply($scope, function() {
		 			if(childSnapshot.key == 0)
		 			{
		 				$scope.label = childSnapshot.val();						     		
					}
					else
					{
		 				$scope.data = childSnapshot.val();	
		 				var test = 
						  {
						    //src:'http://www.comendo.fr:1001/img/AUDI.png',
						    src:'https://firebasestorage.googleapis.com/v0/b/shilocar-27f6f.appspot.com/o/logos_voitures%2F'+$scope.data[0].toLowerCase()+'.png?alt=media&token=0e23cffd-dca2-4fd0-aa1c-c9bdaeff5d10/',
						    //src:'http://www.comendo.fr:1001/img/'+$scope.data[0]+'.png',
						    sub: $scope.data[0]
						  };
		 				$scope.items.push(test);
		 				console.warn("$scope.items:",$scope.items);					     		 
					}
				});
			});
		});
	 };
	 
    console.warn("$rootScope.cont2 :",$rootScope.cont);
})
.controller('footCtrl', function($rootScope, $scope, $stateParams, $state, safeApply, NgTableParams) {
	console.warn("je suis dans footCtrl");
})
.controller('actuCtrl', function($rootScope, $scope, $stateParams, $state, safeApply, NgTableParams) {
	console.warn("je suis dans actuCtrl");
})
.controller('conseilCtrl', function($rootScope, $scope, $stateParams, $state, safeApply, NgTableParams) {
	console.warn("je suis dans conseilCtrl");
})
.controller('footerCtrl', function($rootScope, $scope, $stateParams, $state, safeApply, NgTableParams) {
	console.warn("je suis dans footerCtrl");
})
.controller('testCtrl', function($rootScope, $scope, $stateParams, $state, safeApply, NgTableParams) {
	console.warn("je suis dans testCtrl");
})
.controller('informationsCtrl', function($rootScope, $scope, $stateParams, $state, safeApply, NgTableParams) {
	console.warn("je suis dans informationsCtrl");
})
.controller('menuCtrl', function($rootScope, $scope, $stateParams, $state, safeApply, NgTableParams) {//conroleur qui gère les menus
	console.warn("je suis dans menuCtrl");
	//declaration des variables
	if($stateParams.page != null)
	$rootScope.page = $stateParams.page;
	if($stateParams.sousPage != null)
	$rootScope.sousPage = $stateParams.sousPage;
	$rootScope.site = [];
 	var starCountRef = firebase.database().ref('app');//retourne la base de données
 	
 	//retourne toutes les données du site et instancie la variable global $rootScope.site
	starCountRef.on("value", function(snapshot){
		console.log("*****************snapshot_test********:", snapshot.key);
		$rootScope.site = snapshot.val();
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
.controller('accueilCtrl', function($rootScope, $scope, $stateParams, $state, safeApply, NgTableParams) {//conroleur qui gère les menus
	console.warn("je suis dans accueilCtrl");
	//declaration des variables
	if($stateParams.page != null)
	$rootScope.page = $stateParams.page;
	if($stateParams.sousPage != null)
	$rootScope.sousPage = $stateParams.sousPage;
	$rootScope.site = [];
 	var starCountRef = firebase.database().ref('app');//retourne la base de données
 	
 	//retourne toutes les données du site et instancie la variable global $rootScope.site
	starCountRef.on("value", function(snapshot){
		console.log("*****************snapshot_test********:", snapshot.key);
		$rootScope.site = snapshot.val();
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
.controller('donsCtrl', function($rootScope, $scope, $stateParams, $state, safeApply, NgTableParams) {//conroleur qui gère les menus
	console.warn("je suis dans donsCtrl");
	//declaration des variables
	if($stateParams.page != null)
	$rootScope.page = $stateParams.page;
	if($stateParams.sousPage != null)
	$rootScope.sousPage = $stateParams.sousPage;
	$rootScope.site = [];
 	var starCountRef = firebase.database().ref('app');//retourne la base de données
 	
 	//retourne toutes les données du site et instancie la variable global $rootScope.site
	starCountRef.on("value", function(snapshot){
		console.log("*****************snapshot_test********:", snapshot.key);
		$rootScope.site = snapshot.val();
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
.controller('MapCtrl', function ($scope, $ionicLoading) {
	console.warn("je suis dans MapCtrl");
  function initialize() {
    var mapOptions = {
      //center: new google.maps.LatLng(43.07493, -89.381388),
      center: new google.maps.LatLng(16.24351, -61.5133),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

    // Stop the side bar from dragging when mousedown/tapdown on the map
    google.maps.event.addDomListener(document.getElementById('map'), 'mousedown', function (e) {
      e.preventDefault();
      return false;
    });

    $scope.map = map;
  }
  google.maps.event.addDomListener(window, 'load', initialize);

  $scope.centerOnMe = function () {
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'localisation en cour...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
})
.controller('mainCtrl', function($rootScope, $scope, $stateParams, $state, safeApply, NgTableParams) {//conroleur qui gère les menus
	console.warn("je suis dans mainCtrl");
	//declaration des variables
	if($stateParams.page != null)
	$rootScope.page = $stateParams.page;
	if($stateParams.sousPage != null)
	$rootScope.sousPage = $stateParams.sousPage;
	$rootScope.site = [];
 	var starCountRef = firebase.database().ref('app');//retourne la base de données
 	
 	//retourne toutes les données du site et instancie la variable global $rootScope.site
	starCountRef.on("value", function(snapshot){
		console.log("*****************snapshot_test********:", snapshot.key);
		$rootScope.site = snapshot.val();
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
.controller('allCtrl', function($rootScope, $scope, $state, $stateParams, $ionicSlideBoxDelegate, safeApply, NgTableParams)  {//controleur qui permet de lister tout d'une meme categorie
	console.warn("je suis dans allCtrl");
	
	//instanciation des variables globales selon URL
	$rootScope.page = $stateParams.page;
	$rootScope.sousPage = $stateParams.sousPage;
	
	if($rootScope.sousPage == "Vestimentaires")alert("on est bon");
	
	//declaration de variables
	$scope.simpleList = [];
	$scope.cont = [];
	$scope.items = [];
	//$scope.vue = 'ligne';
	$scope.vue = 'tableau';
    var self = this;
	$scope.items = [];
	
	//retourne la base de données selon la page et la sous-page
	starCountRef = firebase.database().ref('/app/'+$rootScope.page+'/'+$rootScope.sousPage);
	starCountRef.on("value", function(snapshot){
		var i = 0;
        snapshot.forEach(function(childSnapshot){
        	safeApply($scope, function() {
                    if (childSnapshot.key != 0) //si les donnees ne correspondent pas aux noms des colonnes du tableau
                    {
                        //console.warn("dans le childSnapshot");
                        $scope.simpleList[i] = childSnapshot.val();
                        $scope.simpleList[i].id = childSnapshot.key;
                        $scope.cont = childSnapshot.val();
                        console.warn("------------------$scope.simpleList---------------------:",$scope.simpleList);
                        i++;
                        $scope.data = childSnapshot.val();	
	 				    var test = 
					    {
					      src:'http://www.comendo.fr:1001/img/AUDI.png',
					      //src:'http://www.comendo.fr:1001/img/'+$scope.data[0]+'.png',
					      sub: $scope.data
					    };
	 				$scope.items.push(test);
	 				//console.warn("$scope.items:",$scope.items);	
                    } 
                    else 
                    {
                        titre = childSnapshot.val();
                        //alert(titre.length);
                        var test = [];
                        for (var j = 0; j < titre.length; j++) {
                            if (j < titre.length -1) test[j] = {
                                field: j,
                                title: titre[j],
                                sortable: titre[j],
                                show: true
                            };
                            else test[j] = {
                                field: j,
                                title: titre[j],
                                sortable: titre[j],
                                show: false
                            };
                        }
                        self.cols = test;
                    }
                    self.tableParams = new NgTableParams({
                            page: 1, // show first page
                            total: $scope.simpleList.length, // length of data
                            count: 10, // count per page
                            sorting: {
                                nom: "desc"
                            }
                        }, {
                            dataset: $scope.simpleList
                        });
                });
            });
        });
    
    //code pour le tableau
    self.move = move;
	//function qui modifie l'ordre des colonnes
    function move(column, currentIdx, value) {
        var newPosition = currentIdx + value;
        if (newPosition >= self.cols.length || newPosition < 0) return;
        self.cols[currentIdx] = self.cols[newPosition];
        self.cols[newPosition] = column;
    };
    
    //fonction qui au clic, redirige sur la page de details
    $scope.details = function(id)
	{
    	//console.warn("ID:",id);
    	$rootScope.id = id;
    	/*console.warn("$rootScope.catId:",$rootScope.catId);*/
    	$state.go('app.cnd/:page/:sousPage/:id/details',{page:$rootScope.page,sousPage:$rootScope.sousPage,id:$rootScope.id});
	};
	
	//fontion de test pour le retour personnalisee de la vue
	$scope.test = function(type)
	{
		$scope.vue = type;
	};
	
	//fonction qui imprime les differentes parties imprimables de la page
    $scope.cndPrint = function (div) {
    	console.log("je suis dans cndPrint");
	  	var docHead = document.head.outerHTML;
	  	var printContents = document.getElementById(div).outerHTML;
	  	var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";
		console.warn("printContents:",printContents);
	  	var newWin = window.open("", "_blank", winAttr);
	  	var writeDoc = newWin.document;
	  	writeDoc.open();
	  	writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()">' + printContents + '</body></html>');
	  	writeDoc.close();
	  	newWin.focus();
	}
	
    
})
.controller('addCtrl', function($rootScope, $scope, $stateParams, $state, safeApply, NgTableParams) {//controleur qui permet d'ajouter une donnee
	console.warn("je suis dans addCtrl");
	
	//instanciation des variables globales selon URL
	$rootScope.id = $stateParams.id;
	$rootScope.page = $stateParams.page;
	$rootScope.sousPage = $stateParams.sousPage;
	$rootScope.action = 'add';
	
	//retourne la base de données selon la page et la sous-page
	var starCountRef = firebase.database().ref('/app/'+$rootScope.page+'/'+$rootScope.sousPage);
	console.log("starCountRef:",starCountRef);
	$scope.label = [];
	starCountRef.on("value", function(snapshot){
     	snapshot.forEach(function(childSnapshot) {
 			safeApply($scope, function() {
	 			if(childSnapshot.key == 0)
	 			{
	 				$scope.label = childSnapshot.val();	
	 				console.warn("$scope.label:",$scope.label);					     		
				}
			});
		});
	});
	
	//fonction qui hydrate le formulaire
  	$scope.hydrate = function(data)
  	{
		$scope.data = data;
	};
	//fonction qui valide le formulaire
	$scope.submitForm = function(data)
	{
		var record = firebase.database().ref('/Modules/'+$rootScope.page+'/'+$rootScope.sousPage).push();
		var unique =  record.key;
		console.warn("unique:",unique);
		data[0] = unique;
		console.warn("data:",data);
		record.set(data, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			$state.go('app.cnd/:page/:sousPage/all',{page:$rootScope.page,sousPage:$rootScope.sousPage});
		});
	};
})
.controller('updateCtrl', function($rootScope, $scope, $stateParams, $state, safeApply, NgTableParams) {//controleur qui permet de mettre a jour une donnee
	console.warn("je suis dans updateCtrl");
	
	//instanciation des variables globales selon URL
	$rootScope.id = $stateParams.id;
	$rootScope.page = $stateParams.page;
	$rootScope.sousPage = $stateParams.sousPage;
	$rootScope.action = 'update';
	
	//retourne la base de données selon la page et la sous-page
	var starCountRef = firebase.database().ref('/app/'+$rootScope.page+'/'+$rootScope.sousPage);
	console.log("starCountRef:",starCountRef);
	$scope.label = [];
	$scope.data = [];
	starCountRef.on("value", function(snapshot){
     	snapshot.forEach(function(childSnapshot) {
 			safeApply($scope, function(){
	 			if(childSnapshot.key == 0)
	 			{
	 				$scope.label = childSnapshot.val();						     		
				}
				else if(childSnapshot.key == $rootScope.id)
				{
	 				$scope.data = childSnapshot.val();				     		
				}
			});
		});
	});
	
	//fonction qui hydrate le formulaire
  	$scope.hydrate = function(data)
  	{
		$scope.data = data;
	};

  	//fonction qui valide le formulaire
	$scope.submitForm = function(data)
	{
		console.log("je suis dans le submit de updateCtrl");
		console.log("data:",data);
		firebase.database().ref('/Modules/'+$rootScope.page+'/'+$rootScope.sousPage+'/'+$rootScope.id).set(data, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			$state.go('app.cnd/:page/:sousPage/:id/details',{page:$rootScope.page,sousPage:$rootScope.sousPage,id:$rootScope.id});
		});
	};
})
.controller('detailsCtrl', function($rootScope, $scope, $stateParams, $state, safeApply, NgTableParams) {//controleur qui permet d'afficher les details d'une donnee
	console.warn("je suis dans detailsCtrl");
	
	//instanciation des variables globales selon URL
	$rootScope.id = $stateParams.id;
	$rootScope.page = $stateParams.page;
	$rootScope.sousPage = $stateParams.sousPage;
	
	//declaration des variables
	$scope.label = [];
	$scope.data = [];
	$scope.typeVue = "Mobile";
	
	//retourne la base de données selon la page et la sous-page
	var starCountRef = firebase.database().ref('/app/'+$rootScope.page+'/'+$rootScope.sousPage);
	starCountRef.on("value", function(snapshot){
		snapshot.forEach(function(childSnapshot) {
 			safeApply($scope, function() {
	 			if(childSnapshot.key == 0)
	 			{
	 				$scope.label = childSnapshot.val();						     						     		
				}
				else if(childSnapshot.key == $rootScope.id)
				{
	 				$scope.data = childSnapshot.val();					     		
				}
			});
		});
	});
	
	//change la vue de l'appercu
	$scope.appercu = function(data)
  	{
  		if($scope.typeVue == "Mobile")
  		{
  			$scope.typeVue = "Classique";
  			if(data != null)$scope.affiche = data+'.html';
  			console.log("$scope.affiche:", $scope.affiche);
  		}
  		else if($scope.typeVue == "Classique")$scope.typeVue = "Mobile";
	};
})
;