


var budgetController = (function(){
   // This module controls all the calculations
    var incCount = 0;
    var expCount = 0;

    var data = {
        inc : [],
        exp : []
    };
    return {
        addNewItem : function(d){
            if(d.type === 'inc'){
              d.id = incCount;
              incCount++;
            }else{
                d.id = expCount;
                expCount++;
            }
            data[d.type].push(d);
        },
        getTotalIncome : function(){
            var totalInc= 0;
            data['inc'].forEach(element => {
                totalInc += parseFloat(element.inputvalue);
            });
            return totalInc;
        },
        getTotalExpense : function(){
            var totalExp = 0;
            data['exp'].forEach(element => {
                totalExp += parseFloat(element.inputvalue);
            });
            return totalExp;
        },getPercentage : function(){
            var val = (this.getTotalExpense() / this.getTotalIncome()) * 100;
            val = Math.round(val);
            if(val > 0){
                return val ;
            }else{
                return 100;
            }
        }
    }
})();


var UIController = (function(){
  // This module controls all the UI stuff
    
    var DOMStrings = {
      Type : '.add__type',
      InputDescription : '.add__description',
      InputValue : '.add__value',
      EnterButton: '.add__btn',
      IncomeContainer : '.income__list',
      ExpenseContainer : '.expenses__list',
      BudgetValue : '.budget__value',
      BudgetIncomeValue : '.budget__income--value',
      BudgetIncomePercentage : '.budget__income--percentage',
      BudgetExpensesValue : '.budget__expenses--value',
      BudgetExpensesPercentage: '.budget__expenses--percentage'
  };

  return {

      getDOMStrings : function(){
          return DOMStrings;
      },

      getInput: function(){
          return {
              type: document.querySelector(DOMStrings.Type).value,
              description: document.querySelector(DOMStrings.InputDescription).value,
              inputvalue: document.querySelector(DOMStrings.InputValue).value
          }
      },
      clearInputValues : function(){
        document.querySelector(DOMStrings.InputDescription).value = "";
        document.querySelector(DOMStrings.InputValue).value = "";
      },

      addNewUI : function(d){
       
        if(d.type === 'inc'){
            var html = '<div class="item clearfix" id="income-0"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            html = html.replace('%DESCRIPTION%',d.description);
            html = html.replace('%VALUE%',d.inputvalue);
            document.querySelector(DOMStrings.IncomeContainer).insertAdjacentHTML("beforeend",html);
        }else{
            var html =   '<div class="item clearfix" id="expense-0"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__percentage">%PERCENTAGE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            html = html.replace('%DESCRIPTION%',d.description);
            html = html.replace('%VALUE%',d.inputvalue);
            html = html.replace('%PERCENTAGE%','');
            document.querySelector(DOMStrings.ExpenseContainer).insertAdjacentHTML("beforeend",html);
        }
      },
      setTotalIncome : function(d){
        document.querySelector(DOMStrings.BudgetIncomeValue).innerHTML = '+ '+d;
      },
      setTotalExpense : function(d){
        document.querySelector(DOMStrings.BudgetExpensesValue).innerHTML = '- '+d;
      },
      setBudgetValue: function(income,expense){
        var val = income - expense;
        var printable ;
        if(val > 0 ){
            val = Math.abs(val);
            printable = '+ ' +val; 
        }else if(val <0){
            val = Math.abs(val);
            printable = '- ' +val; 
        }else{
            val = Math.abs(val);
            printable = val;
        }
        document.querySelector(DOMStrings.BudgetValue).innerHTML = printable;
      },
      setBudgetPercentage : function(val){
        document.querySelector(DOMStrings.BudgetExpensesPercentage).innerHTML = val+'%';
      }
     
  }


})();


var mainController = (function(bgtc,uic){
    // This module is main controller of Application
    OnInputEnter = function(){
       bgtc.addNewItem(uic.getInput());
       uic.addNewUI(uic.getInput());
       uic.setTotalIncome(bgtc.getTotalIncome());
       uic.setTotalExpense(bgtc.getTotalExpense());
       uic.setBudgetValue(bgtc.getTotalIncome(),bgtc.getTotalExpense());
       uic.setBudgetPercentage(bgtc.getPercentage());
       uic.clearInputValues();
    }
    InitEventListners = function(){
        var DOM = uic.getDOMStrings();
        document.querySelector(DOM.EnterButton).addEventListener("click",function(){OnInputEnter();});
        document.addEventListener("keypress",function(){if(event.keyCode === 13 || event.which === 13){OnInputEnter();}});
    }
    return {
        init: function(){
            console.log("Application Started");
            InitEventListners();
            uic.setTotalIncome(bgtc.getTotalIncome());
            uic.setTotalExpense(bgtc.getTotalExpense());
            uic.setBudgetValue(bgtc.getTotalIncome(),bgtc.getTotalExpense());
            uic.setBudgetPercentage(bgtc.getPercentage());
        },
    }
})(budgetController,UIController);

//Way to define Singlton Class OR IFFY

/*
var obj = new function(){
    var data = 'hamza';
}*/

// Way to define simple data object
/*
var obj1 = {  // object like JSON object
    data1 : "hamza1"
}*/


// Ways to define classes
/*
var similar = function(){

}
function similar(){

}*/

//s.prototype.cal = function(){};
mainController.init();