/* When someone clicks on Use 1 Sugar, decrement 1 from the sugar in ingredients, and increment 1 from the sugar count in the pot
Replicate the same for flour
When someone clicks Cook a Cookie, deplete 6 units of flour and 3 units of sugar. Add 1 cookie as well.
When you click on buy Sugar, add 1 unit of sugar for $10.
1 unit of flour costs $20
Make sure you spend time cleaning up your code. Keeping your code flexible and DRY is very important. 
This is your chance to showcase your ability to write excellent code. */

/* Right now, anyone can just jump into the developer console for the HTML page and change how many 
cookies are available. This is unacceptable! We cannot have people counterfeiting cookies! 
Instead of keeping track of cookies inside of the HTML, we want to keep track of cookies inside of our 
JavaScript code - the HTML code will simply reflect what the JavaScript says.

For example you can keep track of an object called inventory which keeps track of how much money you have, how many cookies you have, etc:

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
This object will hold the "truth" about what you actually have, and anytime you update this object, 
you will want to also update the HTML page regarding how much you have. */
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
