


var budgetController = (function(){
   return {

       budgetControllerPublic : function(){
         
       }

   }
   
})();


var UIController = (function(){
    return {
        UIpublic : function(){

        }
    }
})()


var mainController = (function(bgtc,uic){
    return {
        data : "hamza",
        somePublic : function(){

        }
    }
})(budgetController,UIController);

console.log(mainController.data);