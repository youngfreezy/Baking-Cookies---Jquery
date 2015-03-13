
var inventory = {
  product: {
    money: 1000,
    cookies: 0
  },
  ingredients: {
    sugar: 10,
    flour: 10
  },
  pot: {
    sugar: 0,
    flour: 0
  }
};

//functional approach
$(document).ready(function() {
    var inventory = {
      product: {
        money: 1000,
        cookies: 0
      },
      ingredients: {
        sugar: 10,
        flour: 10
      },
      pot: {
        sugar: 0,
        flour: 0
      }
    };
    
  // these variables tell you where to look things up instead of having to keep repeating the jQuery .find() and others over and over again.
    
    var $pot = $("#pot"),
        $potSugar = $pot.find(".sugar"),
        $potFlour = $pot.find(".flour");
    
    var $ing = $('#ingredients'),
        $ingSugar = $ing.find(".sugar"),
        $ingFlour = $ing.find(".flour");
    
    var $product = $('#product'),
        $productMoney = $product.find(".money"),
        $productCookies = $product.find(".cookies");
    
    function useIngredient(ingredient) {
        if (inventory.ingredients[ingredient] <= 0){
            console.log("Not enough ingredients");
            return;
        }
        
        --inventory.ingredients[ingredient];
        ++inventory.pot[ingredient];
        
        ingredientUsed(ingredient);
        // This is just a call to the ingredientUsed function, on line 104 
        // We tell that function to update the html and pass in which ingredient has been used
        
    }
    
    function bakeCookie(){
        if (inventory.pot.flour < 6 || inventory.pot.sugar < 3) {
            console.log("Not enough ingredients to bake cookie");
            return;
        }
          
        inventory.pot.sugar = inventory.pot.sugar - 3;
        inventory.pot.flour = inventory.pot.flour - 6;
        ++inventory.product.cookies;
        
        cookieBaked();
    }
    
    function buyIngredient(ingredient, cost) {
        var currentBalance = inventory.product.money;
        
        if (currentBalance < 10) {
            console.log("Not enough Balance");
            return;
        }
        
        inventory.product.money = currentBalance - cost;
        ++inventory.ingredients[ingredient];
        ingredientPurchased(ingredient);
    }
    
    function ingredientUsed(ingredient) {
        // here we just check which ingredient has been used
        // so if we have used sugar we need to update the pot and ingredient value of sugar- this just determines which html elements to update. 
        //Once we have the html elements based on the ingredient we jump to 84/5, where the updated value of the ingredient gets inserted into the html.
        if (ingredient == "sugar") {
            var $potToUpdate = $potSugar, 
                $ingToUpdate = $ingSugar;
        } else if (ingredient == "flour") {
            var $potToUpdate = $potFlour,
                $ingToUpdate = $ingFlour;
        }
               
        $potToUpdate.html(inventory.pot[ingredient]);                     
        $ingToUpdate.html(inventory.ingredients[ingredient]);
    }
    
    function cookieBaked() {
        $potSugar.html(inventory.pot.sugar);                     
        $potFlour.html(inventory.pot.flour);
        $productCookies.html(inventory.product.cookies);
    }
    
    function ingredientPurchased(ingredient) {
        if (ingredient == "sugar")
            var $ingToUpdate = $ingSugar;
        else if (ingredient == "flour")
            var $ingToUpdate = $ingFlour;
        
        $ingToUpdate.html(inventory.ingredients[ingredient]);
        $productMoney.html(inventory.product.money);
    }
    
    $('.buy-sugar').on('click', function(){
        buyIngredient("sugar", 10);
    });
    
    $('.buy-flour').on('click', function(){
       buyIngredient("flour", 20);
    });

    
    $('.use-sugar').on('click', function(){
       useIngredient("sugar");
    });

    $('.use-flour').on('click', function(){
       useIngredient("flour");
    });    
    
    $('#pot button').on('click', function(){
        bakeCookie();
    });
  
    
});
