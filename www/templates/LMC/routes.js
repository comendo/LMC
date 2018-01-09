starter.config(function($stateProvider, $urlRouterProvider) 
{
	var module = "app";
	$stateProvider
	/**************debut lmc*****************/
	.state('app.details', { 
      url: '/:page/:sousPage/:action',
      name: "appDetails",
      views: {
        /*'subheader': {
          templateUrl: 'templates/'+module+'/header'+module+'.html'/*,
	      controller: 'header'+module+'Ctrl'* /
        },*/
        'content': {
          templateUrl: function (toParams) {
          	if(toParams.page == "mot" || toParams.page == "Mot de la Présidente")
          	{
          		toParams.page = "mot";
          		console.warn("on est dans mot de la présidente!!");
          	}
          	else console.warn("on est dans le ELSE!!");
	        return 'templates/'+toParams.page+'/'+ toParams.sousPage + '.html';
	      },
		    controller: 'content'+module+'Ctrl'
        },
        'subfooter': {
          templateUrl: function (toParams) {
          	console.warn("la page est :",toParams.page);
          	return 'templates/'+module+'/footer'+ toParams.page + '.html';
	      }/*,
		    controller: 'footer'+module+'Ctrl'*/
        }
      }
    })
	.state(module+'.details/details', { 
      url: '/:page/:id/:details',
      name: module+"Details",
      views: {
        /*'subheader': {
          templateUrl: 'templates/'+module+'/header'+module+'.html'/*,
	      controller: 'header'+module+'Ctrl'* /
        },*/
        'content': {
          	templateUrl: 'templates/'+module+'/detailsMembre.html',
		    controller: 'details'+module+'Ctrl'
        },
        'subfooter': {
          templateUrl: 'templates/'+module+'/footerAccueil.html'/*,
		    controller: 'footer'+module+'Ctrl'*/
        }
        /*,
        'subfooter': {
          templateUrl: 'templates/'+module+'/footer'+module+'.html'/*,
		    controller: 'footer'+module+'Ctrl'* /
        }*/
      }
    })
	/***************fin lmc******************/
	;
});