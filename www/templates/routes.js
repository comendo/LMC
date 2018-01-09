/*.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    /*.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  }); * /
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/users/add');
//  $urlRouterProvider.otherwise('/Dons/Mat%C3%A9riels/all');
  $urlRouterProvider.otherwise('/Accueil/Actualités');
})* /
starter.config(function($stateProvider, $urlRouterProvider) 
{//lieu/langue/page/sousPage/id/action
	$stateProvider
	/*******************debut abstract*********************** / 
	.state('Accueil', {
    url: '/Accueil',
    abstract: true,
    templateUrl: 'templates/header.html',
    controller: 'menuCtrl'
  })
	/******************fin abstract************************/
    
    /********************************************* /
    .state('app.map', { //gere la page d'accueil
      url: '/map',
      views: {
        'header': {
          templateUrl: 'templates/header.html',
          controller: 'menuCtrl'
        },
        'left': {
          templateUrl: 'templates/left.html',
          controller: 'MapCtrl'
        },
        'content': {
          templateUrl: 'templates/lieu.html',
          controller: 'lieuCtrl'
        },
        'footer': {
          templateUrl: 'templates/footer.html',
          controller: 'MapCtrl'
        }
      }
    })
    /********************************************* /
	.state('app.lieu', { //gere la page d'accueil
      url: '/lieu',
      //views: {
       // 'content': {
          templateUrl: 'templates/lieu.html',
          controller: 'lieuCtrl'
       // }
     // }
    })
	.state('app.cnd/:page/:sousPage/all', {//gere la page qui affiche tous sur une categorie 
		url: '/:page/:sousPage/all',
		//views: {
		 // 'content': {
		    templateUrl: 'templates/all.html',
		    controller: 'allCtrl'
	 // }
	//}
	})
	.state('app.cnd/:page/:sousPage/add', {//gere la page qui ajoute un contenu
		url: '/:page/:sousPage/add',
		//views: {
		  //'content': {
		    templateUrl: 'templates/form.html',//add.html',
		    controller: 'addCtrl'
	 // }
	//}
	})
	.state('app.cnd/:page/:sousPage/:id/update', {//gere la paga qui met a jour un contenu
		url: '/:page/:sousPage/:id/update',
		//views: {
		 // 'content': {
		    templateUrl: 'templates/form.html',//update.html',
		    controller: 'updateCtrl'
	 // }
	//}
	})
	.state('app.cnd/:page/:sousPage/:id/details', {//gere la page qui affiche les details d'un contenu
		url: '/:page/:sousPage/:id/details',
		views: {
		  'content': {
		    templateUrl: 'templates/details.html',
		    controller: 'detailsCtrl'
	  }
	}
	})
	/**************Fin ligues*************** /
	;
});*/