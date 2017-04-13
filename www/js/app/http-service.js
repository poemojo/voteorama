var httpService = angular.module('httpService', []);

httpService.service('httpRequest', function($http)
{
   this.fetch = function()
   {
      return $http.get("http://35.185.38.132:8080/candidates");
   };

   this.vote = function(candidate)
   {
      return $http.get("http://35.185.38.132:8080/vote?candidate=" + encodeURI(candidate));
   };
});