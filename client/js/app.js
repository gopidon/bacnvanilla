angular.module('bacnvanilla',
                ['ngCookies', 'ngResource', 'ngAnimate',
                 'ui.router', 'ngGrid' , 'ui.bootstrap',
                 'ui.route','pascalprecht.translate',
                 'bacnvanilla.system','bacnvanilla.users',
                 'google-maps'])

.config(['$translateProvider','$logProvider',function($translateProvider, $logProvider) {

        $logProvider.debugEnabled(true);
        $translateProvider.preferredLanguage('en');
        $translateProvider.useStaticFilesLoader({
            prefix: '/languages/',
            suffix: '.json'
        });
}])
.run(function ($rootScope, $state, Global) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            if ((toState.name != "home") && !(Global.authenticated)){
                // User isn’t authenticated
                $state.transitionTo("home");
                event.preventDefault();
            }
        });
});

angular.module('bacnvanilla.system', []);
angular.module('bacnvanilla.users', []);
