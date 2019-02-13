function CodeOffsetsViewModel() {

    var self = this;


    self.domestic = ko.observable(true);
   
    //Windows

    self.listingVisible = ko.observable(true);
    self.cartVisible = ko.observable(true);
    self.shippingInfoVisible = ko.observable(false);



    // Quantities
    self.qtyOptions = [0, 1, 2, 3, 4, 5];
    self.packOfOnesQuant = ko.observable(0);
    self.packOfTwosQuant = ko.observable(0);
    self.packOfFivesQuant = ko.observable(0);
    self.mixedFiftyQuant = ko.observable(0);
    self.packOfTensQuant = ko.observable(0);
    self.mixedHundredQuant = ko.observable(0);
    self.packOfTwentiesQuant = ko.observable(0);
    self.mixedFiveHundredQuant = ko.observable(0);
    self.mixedCollectQuant = ko.observable(0);
    self.bookQuant = ko.observable(0);
    
    self.bonusHundredsQuant = ko.observable(0);
    self.bonusFiveHundredsQuant = ko.observable(0);
    self.bonusThousandsQuant = ko.observable(0);

  


    self.totalDenominationQuant = ko.computed(function () {
        return self.packOfOnesQuant() + self.packOfTwosQuant() + self.packOfFivesQuant() + self.mixedFiftyQuant() + self.packOfTensQuant() + self.mixedHundredQuant() + self.packOfTwentiesQuant() + self.mixedFiveHundredQuant() + self.mixedCollectQuant();
    }, this);

    self.internationalShipping= ko.computed(function() {
        return self.totalDenominationQuant() * 4 + self.bookQuant() * 8;
    }, this);


    self.totalPrice = ko.computed(function () {
        if (self.domestic() == false) {
            return self.internationalShipping() + (self.packOfOnesQuant() * 10) + (self.packOfTwosQuant() * 15) + (self.mixedFiftyQuant() * 20) + (self.packOfFivesQuant() * 25) + (self.packOfTensQuant() * 30) + (self.mixedHundredQuant() * 35) + (self.packOfTwentiesQuant() * 50) + (self.mixedFiveHundredQuant() * 65) + (self.mixedCollectQuant() * 75);

               }
        else {
            return (self.packOfOnesQuant() * 10) + (self.packOfTwosQuant() * 15) + (self.mixedFiftyQuant() * 20) + (self.packOfFivesQuant() * 25) + (self.packOfTensQuant() * 30) + (self.mixedHundredQuant() * 35) + (self.packOfTwentiesQuant() * 50) + (self.mixedFiveHundredQuant() * 65) + (self.mixedCollectQuant() * 75);

        }
    }, this);

    //Add to Cart Quant adjustments

    self.addOnesClick = function () {
        self.packOfOnesQuant(self.packOfOnesQuant() + 1);
    }

    self.addTwosClick = function () {
        self.packOfTwosQuant(self.packOfTwosQuant() + 1);
    }

    self.addFivesClick = function () {
        self.packOfFivesQuant(self.packOfFivesQuant() + 1);
    }
    self.addTensClick = function () {
        self.packOfTensQuant(self.packOfTensQuant() + 1);
    }
    self.addTwentiesClick = function () {
        self.packOfTwentiesQuant(self.packOfTwentiesQuant() + 1);
    }

    self.addMixedFiftyClick = function () {
        self.mixedFiftyQuant(self.mixedFiftyQuant() + 1);
    }
    self.addMixedHundredClick = function () {
        self.mixedHundredQuant(self.mixedHundredQuant() + 1);
    }
    self.addMixedFiveHundredClick = function () {
        self.mixedFiveHundredQuant(self.mixedFiveHundredQuant() + 1);
    }
    self.addMixedCollectClick = function () {
        self.mixedCollectQuant(self.mixedCollectQuant() + 1);
    }


    //Trash Item from Cart
 

    self.removeOnesClick = function () {
        self.packOfOnesQuant(0);
    }

    self.removeTwosClick = function () {
        self.packOfTwosQuant(0);
    }

    self.removeFivesClick = function () {
        self.packOfFivesQuant(0);
    }
    self.removeTensClick = function () {
        self.packOfTensQuant(0);
    }
    self.removeTwentiesClick = function () {
        self.packOfTwentiesQuant(0);
    }

    self.removeMixedFiftyClick = function () {
        self.mixedFiftyQuant(0);
    }
    self.removeMixedHundredClick = function () {
        self.mixedHundredQuant(0);
    }
    self.removeMixedFiveHundredClick = function () {
        self.mixedFiveHundredQuant(0);
    }
    self.removeMixedCollectClick = function () {
        self.mixedCollectQuant(0);
    }

        

    //Bonus Quants
    self.bonusHundredsQuant = ko.computed(function () {

        return self.totalPrice() / 50 | 0;

    }, this);

    self.bonusFiveHundredsQuant = ko.computed(function () {

        return self.totalPrice() / 75 | 0;

    }, this);

    self.bonusThousandsQuant = ko.computed(function () {

        return self.totalPrice() / 100 | 0;

    }, this);

    self.orderWeight = ko.computed(function () {

        return (
            (self.packOfOnesQuant() * .7) + (self.packOfTwosQuant() * .9) + (self.mixedFiftyQuant() * .6) + (self.packOfFivesQuant() * .7) + (self.packOfTensQuant() * .9) + (self.mixedHundredQuant() * 1) + (self.packOfTwentiesQuant() * .9) + (self.mixedFiveHundredQuant() * 3) + (self.mixedCollectQuant() * 3)
            ).toFixed(2);
        

    }, this);

    console.log(self.orderWeight);

    self.start = ko.observable(true);
    self.bumper = ko.observable(false);
    self.orderItems = ko.observable(false);
    self.shippingInfo = ko.observable(false);


    //Plural Notifiers

    self.onePackPlural = ko.computed(function () {
        if (self.packOfOnesQuant() < 2) {
            return false;
        }
        else {
            return true;
        }
    }, this);

    self.twoPackPlural = ko.computed(function () {
        if (self.packOfTwosQuant() < 2) {
            return false;
        }
        else {
            return true;
        }
    }, this);


    self.fivePackPlural = ko.computed(function () {
        if (self.packOfFivesQuant() < 2) {
            return false;
        }
        else {
            return true;
        }
    }, this);


    self.tenPackPlural = ko.computed(function () {
        if (self.packOfTensQuant() < 2) {
            return false;
        }
        else {
            return true;
        }
    }, this);

    self.twentyPackPlural = ko.computed(function () {
        if (self.packOfTwentiesQuant() < 2) {
            return false;
        }
        else {
            return true;
        }
    }, this);

    self.mixedFiftyPackPlural = ko.computed(function () {
        if (self.mixedFiftyQuant() < 2) {
            return false;
        }
        else {
            return true;
        }
    }, this);
    self.mixedHundredPackPlural = ko.computed(function () {
        if (self.mixedHundredQuant() < 2) {
            return false;
        }
        else {
            return true;
        }
    }, this);
    self.mixedFiveHundredPackPlural = ko.computed(function () {
        if (self.mixedFiveHundredQuant() < 2) {
            return false;
        }
        else {
            return true;
        }
    }, this);
    self.mixedCollectPackPlural = ko.computed(function () {
        if (self.mixedCollectQuant() < 2) {
            return false;
        }
        else {
            return true;
        }
    }, this);


    self.bonusHundredsPlural = ko.computed(function () {
        if (self.bonusHundredsQuant() < 2) {
            return false;
        }
        else {
            return true;
        }
    }, this);

    self.bonusFiveHundredsPlural = ko.computed(function () {
        if (self.bonusFiveHundredsQuant() < 2) {
            return false;
        }
        else {
            return true;
        }
    }, this);

    self.bonusThousandsPlural = ko.computed(function () {
        if (self.bonusThousandsQuant() < 2) {
            return false;
        }
        else {
            return true;
        }
    }, this);

    

    // visibility operations

     self.openCartClick = function () {
        self.cartVisible(true);
        return true;
    }

    self.closeCartClick = function () {
        self.cartVisible(false);
        return true;

    }


    self.setDomesticClick = function () {
        self.domestic(true);
        $(".active").removeClass("active");
        $("#domestic-dial").addClass("active");
        return true;


    }
    self.setInternationalClick = function () {
        self.domestic(false);
        $(".active").removeClass("active");
        $("#international-dial").addClass("active");
        return true;
    }
   
    self.toShippingInfoClick = function () {
        self.shippingInfoVisible(true);
        self.listingVisible(false);
        return true;
    }
    self.backToListing = function () {
        self.shippingInfoVisible(false);
        self.listingVisible(true);
        return true;
    }

    self.description = ko.computed(function () {

        var items = [];
        if (self.packOfOnesQuant())
            items.push(self.packOfOnesQuant() + 'x Ones');
        if (self.packOfTwosQuant())
            items.push(self.packOfTwosQuant() + 'x Twos');
        if (self.packOfFivesQuant())
            items.push(self.packOfFivesQuant() + 'x Fives');
        if (self.packOfTensQuant())
            items.push(self.packOfTensQuant() + 'x Tens');
        if (self.packOfTwentiesQuant())
            items.push(self.packOfTwentiesQuant() + 'x Twenties');
        if (self.mixedFiftyQuant())
            items.push(self.mixedFiftyQuant() + 'x 50 LOCs');
        if (self.mixedHundredQuant())
            items.push(self.mixedHundredQuant() + 'x 100 LOCs');
        if (self.mixedFiveHundredQuant())
            items.push(self.mixedFiveHundredQuant() + 'x 500 LOCs');
        if (self.mixedCollectQuant())
            items.push(self.mixedCollectQuant() + 'x Collector Packs');
        if (self.bookQuant())
            items.push(self.bookQuant() + 'x Collector Books');
        if (self.bonusHundredsQuant())
            items.push(self.bonusHundredsQuant() + 'x bonus 100s!');
        if (self.bonusFiveHundredsQuant())
            items.push(self.bonusFiveHundredsQuant() + 'x bonus 500s!');
        if (self.bonusThousandsQuant())
            items.push(self.bonusThousandsQuant() + 'x bonus 1000s!');
        return items.join(', ');
     

    });

    //shipping box
    self.shippingBox = ko.computed(function () {

        /*
        Allowed values for "shippingBox" are:
        * USPS_RegionalRateBoxA1 (10.13 x 7.13 x 5.00 in)
        * USPS_LargeFlatRateBoardGameBox (24.06 x 11.88 x 3.13 in) 
        * USPS_SmallFlatRateBox (8.69 x 5.44 x 1.75 in)
        * USPS_MediumFlatRateBox2 (14.00 x 12.00 x 3.50 in)
        * USPS_Letter (this is a first-class envelope)
        * Envelope9x7
        * Box9x6x4
        

        Note - the dimensions are for reference, only send "USPS_RegionalRateBoxA1"
        */

        if (self.domestic()> 0) {
            console.log("test 2");
            if (self.bookQuant() > 4) {
                return "USPS_LargeFlatRateBoardGameBox";
            } else if (self.bookQuant() > 2) {
                return "USPS_RegionalRateBoxA1";

            } else if (self.bookQuant() == 1) {
                if (self.totalDenominationQuant() > 9) {
                    return "USPS_LargeFlatRateBoardGameBox";
                } else if (self.totalDenominationQuant() == 4) {
                    return "USPS_MediumFlatRateBox2";
                } else if (self.totalDenominationQuant() > 5) {
                    return "USPS_RegionalRateBoxA1";
                } else {
                    return "USPS_SmallFlatRateBox";
                }
            } else if (self.totalDenominationQuant() > 9) {
               
                return "USPS_LargeFlatRateBoardGameBox";
            } else if (self.totalDenominationQuant() <= 3) {
                return "Envelope9x7";
            } else if (self.totalDenominationQuant() > 3) {
               
                return "USPS_SmallFlatRateBox";
            } else {
                return "undefined container, please print custom label";
            }
        
        } else {
           
            if (self.bookQuant() > 4) {
                return "USPS_LargeFlatRateBoardGameBox";

            } else if (self.bookQuant() > 2) {
                return "Box9x6x4";
                
            } else if (self.bookQuant() == 1) {
                if (self.totalDenominationQuant() > 9) {
                    return "USPS_LargeFlatRateBoardGameBox";
                } else {
                    return "Box9x6x4";
                }
            } else if (self.totalDenominationQuant() > 15) {
                return "USPS_LargeFlatRateBoardGameBox";
            } else if (self.totalDenominationQuant() > 3) {
                return "Box9x6x4";

            } else if (self.totalDenominationQuant() <= 3) {
                return "Envelope9x7";
          
            } else {
                return "undefined container, please print custom label";
            }
      }
    
    }, this);

}