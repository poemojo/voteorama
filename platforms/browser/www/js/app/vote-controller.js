var voteController = angular.module('voteController', []);

voteController.controller('MainController', ['httpRequest', function(httpRequest)
{
   var ctrl = this;

   ctrl.candidates = null;
   ctrl.errTitle = null;
   ctrl.errContent = null;
   ctrl.errCode = 0;
   ctrl.errShow = function()
   {
      angular.element("#err-card").show();
   };

   ctrl.toggleMenu = function()
   {
      angular.element("#sideMenu").toggleClass("w3-animate-left");
      angular.element("#sideMenu").toggleClass("w3-animate-left-rev");
      angular.element("#sideMenu").toggle(400);

   };
   ctrl.errHide = function()
   {
      angular.element("#err-card").hide();
   };


   ctrl.cc = null;

   ctrl.fetch = function()
   {
      httpRequest.fetch().success(function(response)
      {
         //alert("Fetch");
         ctrl.candidates = response;
         ctrl.errHide();
         ctrl.toggleMenu();
      })
      .error(function(err)
      {
         ctrl.errTitle = "Fetch Failed!"
         ctrl.errContent = "Failed to Retrieve Vote Counts from Server!";
         ctrl.errCode = 2;

         ctrl.errShow();
      });
   };

   ctrl.select = function(name)
   {
      ctrl.cc = name;
   };

   ctrl.vote = function(candidate)
   {
      httpRequest.vote(candidate).success(function(response)
      {
         ctrl.fetch();
      })
      .error(function(err)
      {
         ctrl.error.title = "Vote Failed!";
         ctrl.error.content = "Failed to Cast Vote for Candidate " + candidate + "!";
         ctrl.error.code = 4;

         ctrl.error.show();
      });
   };

   ctrl.total = function(name)
   {
      var candidates = ctrl.candidates.candidates;
      var l = candidates.length;
      var t = 0;
      var v = 0;
      for (var i = 0; i < l; ++i)
      {
         if (candidates[i].name == name)
            v = candidates[i].votes;
         t += candidates[i].votes;
      }

      return ""+(Math.round((v/t)*100))+"%";

   };

   

}]);