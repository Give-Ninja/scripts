$(document).ready(function() {
            var flag =true;
            var current = 0,
                $fname,$lnam,$email,$address,$city,$state,$postcode,$pCategory,$pName,$pSku,$revenue;
                 let donateParams = new URLSearchParams(window.location.search);
                let windowurl = window.location.href;

    var modal = document.getElementById("formModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0]; 
    
    $(".donate-now").on('click', function() {

    if($(this).attr("href") == "#formModal"){
     modal.style.display = "flex";
     $('body').addClass('modal-open');
    }
});


    span.onclick = function() {
      modal.style.display = "none";
      $('body').removeClass('modal-open');
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
         $('body').removeClass('modal-open');
      }
    }


    $(document).on("click", function(e) {
      var currentTargetBox = $(e.target).closest('.tool-tip-wrapper .tool-tip-list');
      $('.tool-tip-wrapper .tool-tip-list').not(currentTargetBox).addClass('is-collapsed');
    });

    $(document).on("click", '.tool-tip-wrapper .tool-tip-heading', function(e) {
      $(this).closest('.tool-tip-list').toggleClass('is-collapsed');
    });

      
                        
      $(document).on("blur","#bboxdonation_billing_txtFirstName,#bboxdonation_billing_txtLastName,#bboxdonation_billing_txtEmail,#bboxdonation_billing_billingAddress_txtAddress,#bboxdonation_billing_billingAddress_txtAUCity,#bboxdonation_billing_billingAddress_ddAUState,#bboxdonation_billing_billingAddress_txtAUPostCode",function() {
                            validationForm($(this));
                        });
     
           

               
function elementLoaded(el, cb) {
    
    if ($(el).length) {
      // Element is now loaded.
      cb($(el));
    } else {
      // Repeat every 500ms.
      setTimeout(function() {
        elementLoaded(el, cb)
      }, 1000);
    }
  };

  elementLoaded('#bboxdonation_divThanks', function(el) {
   
   $('.prev-icon').hide();
    $('.secure-donation').hide();
    $('body').addClass('thankyou-shown');

                    var content_cloned_final = $('#bboxdonation_divThanks').children().clone();

              $('.card-main-content').html(content_cloned_final);
    $('#bboxdonation_divThanks').append('<div class="thank-you-new"><div class="circle-outer"> <div class="circle-container"> <div class="circle one"></div> <div class="circle two"></div> <div class="circle three"></div> <div class="circle four"></div> <div class="circle five"></div> <div class="circle six"></div> </div> </div> <span class="heart-flying-result"> <span class="hearts-shape-wrapper hearts"> <span class="heart-shape"></span> </span> <span class="hearts-shape-wrapper hearts one"> <span class="heart-shape"></span> </span> <span class="hearts-shape-wrapper hearts two"> <span class="heart-shape"></span> </span> <span class="hearts-shape-wrapper hearts three"> <span class="heart-shape"></span> </span> </span> <div class="cards-content"> <div class="donate-text text-center"> <h2>Help spread the word!</h2> <p>1 out of 4 people you share this with will also donate</p> </div> <div class="social-links"> <ul> <li><img class="icon" src="https://v.fastcdn.co/u/06e81d16/58531382-0-facebook.svg" alt="facebook"/><a href="https://www.facebook.com/sharer/sharer.php?u='+windowurl+'">Share on Facebook</a></li> <li><img class="icon" src="https://v.fastcdn.co/u/06e81d16/58531392-0-twitter.svg" alt="twitter"/><a href="https://twitter.com/intent/tweet?url='+windowurl+'&text=Become+a+Life+Changer&hashtags=donation">Share on Twitter</a></li> <li><img class="icon" src="https://v.fastcdn.co/u/06e81d16/58531387-0-linkedin.svg" alt="linkedin"/><a href="https://www.linkedin.com/cws/share?url='+windowurl+'">Share on Linkedin</a></li> <li><img class="icon" src="https://v.fastcdn.co/u/06e81d16/58531397-0-email.svg" alt="email"/><a href="mailto:?subject=Donate Now&amp;amp;body='+windowurl+'" target="_blank">Share via Email</a></li> </ul> </div>');

  });




function elementLoadedMain(el, cb) {
    
    if ($(el).length) {
      // Element is now loaded.
      cb($(el));
    } else {
      
      setTimeout(function() {
        elementLoadedMain(el, cb)
      }, 500);
    }
  };

  elementLoadedMain('#mongo-form', function(el) {


   
        

        if(!(donateParams.has('amount') || donateParams.has('donate'))){
            setDonateAmount(80,130,158);
        }
        $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo').show();
        $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo').addClass('payment-step-reloaded');
                        
        urlParamSet();
        setfirstScreen();
        setUpSellScreen();

        

                  

  });


                

                  

                    

                
            
            /* first step updates */  

            $('body').on('click','#bboxdonation_recurrence_lblRecurringGift',function(){
           

               
               if(($('.single-donation-btn').hasClass('monthly-not-active'))){
                $('.single-donation-btn').removeClass('monthly-not-active');
                
                if(!(donateParams.has('amount') || donateParams.has('donate'))){
                     setDonateAmount(24,36,49);
                 }
                 
                }

                else{

                 $('.single-donation-btn').addClass('monthly-not-active');
                 if(!(donateParams.has('amount') || donateParams.has('donate'))){
                    setDonateAmount(80,130,158);
                 }
                }

               
            });

              $('body').on('click','.single-donation-btn',function(){

           if(!($('.single-donation-btn').hasClass('monthly-not-active'))){
                $("#bboxdonation_recurrence_lblRecurringGift").trigger("click");


                }

                
                
        
            });

            /* end step 1 updates */

            /* monthly add on  */

            $('body').on('click','#bboxdonation_divForm .step-monthly-section button',function(){

        
                if($(this).hasClass('single-to-monthly')){

                var single_value = $(this).find('.single-payment-info').html();

                $('.button-monthly-info').removeClass('single-to-monthly');
                $('#bboxdonation_recurrence_lblRecurringGift').trigger("click");
                $('#bboxdonation_gift_txtOtherAmountButtons').val(single_value);


                }


                if($(this).hasClass('button-monthly-first') || $(this).hasClass('button-monthly-second')){

                 var monthly_value = $(this).find('.monthly-payment-value').html();
                
                 $('.button-monthly-info').addClass('single-to-monthly');

                $('#bboxdonation_recurrence_chkMonthlyGift').trigger("click");
                $('.single-donation-btn').removeClass('monthly-not-active');
                

                $('#bboxdonation_gift_rdGivingLevel4').prop("checked", true);
                $('#bboxdonation_gift_txtOtherAmountButtons').val(monthly_value);

               
               

                //$('#bboxdonation_gift_txtOtherAmountButtons').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html(monthly_value);
                
                
                $('.BBFormRadioLabelGivingLevel').removeClass('BBFormRadioLabelGivingLevelSelected');
                 $('.BBFormRadioLabelGivingLevel').addClass('BBFormRadioLabelGivingNotLevelSelected');

                  $('.BBFormRadioGivingLevel').removeClass('BBFormRadioGivingLevelSelected');
                 $('.BBFormRadioGivingLevel').addClass('BBFormRadioGivingLevelNotSelected');


                $('.BBFormRadioLabelGivingLevelOther').removeClass('BBFormRadioLabelGivingLevelNotSelected');
                 $('.BBFormRadioLabelGivingLevelOther').addClass('BBFormRadioLabelGivingLevelSelected');
                 
                 $('.BBFormRadioGivingLevelOther').removeClass('BBFormRadioGivingLevelNotSelected');
                 $('.BBFormRadioGivingLevelOther').addClass('BBFormRadioGivingLevelSelected');
                }


                $(".contents .button-wrapper .button--orange").trigger("click");  

        
            });

         /* end monthly add on */
           

            
            
            $('.contents .button-wrapper .button--orange').on('click', function(){
                


                         $pCategory = "Single Donation";

                        if(!($('.single-donation-btn').hasClass('monthly-not-active'))){

                            $pCategory = "Monthly Donation";

                        }

                        
                        $pName = window.location.href;
                        $pSku = $('#bboxdonation_gift_rdlstGivingLevels input[type="radio"]:checked').val();
                        $revenue = $('#bboxdonation_gift_rdlstGivingLevels input[type="radio"]:checked').val();
                 

                        if($pSku == 'rdGivingLevel4') {
                            $pSku = $('#bboxdonation_gift_txtOtherAmountButtons').val();
                           
                        }
                        else{

                            $pSku = "$" + $pSku;
                        }

                        if($pCategory == "Single Donation"){

                        $('.donation-highlight-text').html('You are making a one-off donation of ' + $pSku);

                        }

                        if($pCategory == "Monthly Donation"){

                        $('.donation-highlight-text').html('You are making a monthly donation of ' + $pSku);

                        }

                
                //console.log(current.index());
                
                if( $('.contents .button-wrapper .button--orange').hasClass('step-one') ) {
                    

                        $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo').hide();
                         $('.contents .button-wrapper .button--orange').removeClass('step-one');
                          $('#bboxdonation_divForm  .button-monthly-second').show();
                         $('.prev-icon').show();

                         var pSku_withoutdollar = parseInt($pSku.replace('$',''));
                    

                        if($pCategory == "Single Donation" && pSku_withoutdollar < 201){
                      
                       $('.step-monthly-section .single-payment-info').html($pSku);
                        $('.contents .button-wrapper .button--orange').addClass('step-monthly');
                        $('#bboxdonation_divForm .step-monthly-section').show();
                         $('.prev-icon').addClass("step-monthly-prev");
                         $('.prev-icon').addClass("single-donation-prev");
                         $('.contents .button-wrapper .button--orange').hide();

                         if(pSku_withoutdollar >= 1 && pSku_withoutdollar <= 25){
                        
                         $('#bboxdonation_divForm  .button-monthly-first .monthly-payment-first').html('$10');
                         $('#bboxdonation_divForm  .button-monthly-second').hide();
                         

                         }

                         else if(pSku_withoutdollar >= 26 && pSku_withoutdollar <= 35){
                         
                         $('#bboxdonation_divForm  .button-monthly-first .monthly-payment-first').html('$10');
                          $('#bboxdonation_divForm  .button-monthly-second .monthly-payment-second').html('$15');

                         }

                         else if(pSku_withoutdollar >= 36 && pSku_withoutdollar <= 55){
                         
                         $('#bboxdonation_divForm  .button-monthly-first .monthly-payment-first').html('$15');
                          $('#bboxdonation_divForm  .button-monthly-second .monthly-payment-second').html('$20');

                         }

                          else if(pSku_withoutdollar >= 56 && pSku_withoutdollar <= 100){
                         
                         $('#bboxdonation_divForm  .button-monthly-first .monthly-payment-first').html('$20');
                          $('#bboxdonation_divForm  .button-monthly-second .monthly-payment-second').html('$25');

                         }

                          else if(pSku_withoutdollar >= 101 && pSku_withoutdollar <= 150){
                         
                         $('#bboxdonation_divForm  .button-monthly-first .monthly-payment-first').html('$25');
                          $('#bboxdonation_divForm  .button-monthly-second .monthly-payment-second').html('$30');

                         }

                          else if(pSku_withoutdollar >= 151 && pSku_withoutdollar <= 200){
                         
                         $('#bboxdonation_divForm  .button-monthly-first .monthly-payment-first').html('$30');
                          $('#bboxdonation_divForm  .button-monthly-second .monthly-payment-second').html('$40');

                         }


                        }
                        else{
                         $('.contents .button-wrapper .button--orange').addClass('step-address-one');
                        $('.BBDFormSectionBillingInfo').show();
                         $('.BBDFormSectionBillingInfo .BBFormAddress').hide();

                         $('.prev-icon').addClass("step-address-one-prev");
                         $('.prev-icon').removeClass("single-donation-prev");

                        }

                }
                else if($('.contents .button-wrapper .button--orange').hasClass('step-monthly')) {

                $('#bboxdonation_divForm .step-monthly-section').hide();
                $('.BBDFormSectionBillingInfo').show();
                 $('.BBDFormSectionBillingInfo .BBFormAddress').hide();

                 $('.contents .button-wrapper .button--orange').removeClass('step-monthly');
                 $('.prev-icon').removeClass('step-monthly-prev');
                $('.contents .button-wrapper .button--orange').addClass('step-address-one');
                $('.prev-icon').addClass('step-address-one-prev');
                $('.contents .button-wrapper .button--orange').show();
                }

                else if( $('.contents .button-wrapper .button--orange').hasClass('step-address-one') ) {

                
                    var n = [],
                    step = true;

                    $fname = $('#bboxdonation_billing_txtFirstName'),
                        $lname = $('#bboxdonation_billing_txtLastName'),
                        $email = $('#bboxdonation_billing_txtEmail'),
                        
                    
                    n.push(validationForm($fname));
                    n.push(validationForm($lname));
                    n.push(validationForm($email));
                    //n.push(validationForm($address));
                    //n.push(validationForm($city));
                    //n.push(validationForm($state));
                    //n.push(validationForm($postcode));
                    
                    step = n.every(Boolean);
                    
                    //console.log(n,step);
                    if( step == true ) {
                        
                        
                    
                        $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo').hide();

                        $('.BBDFormSectionBillingInfo #fldIndivInfo,.BBDFormSectionBillingInfo #bboxdonation_billing_divEmail,.BBDFormSectionBillingInfo #bboxdonation_billing_divPhone').hide();

                         $('.BBDFormSectionBillingInfo .BBFormAddress').show();


                        $('.contents .button-wrapper .button--orange').removeClass('step-address-one');
                        $('.contents .button-wrapper .button--orange').addClass('step-address-two');
                         $('.prev-icon').removeClass('step-address-one-prev');
                        $('.prev-icon').addClass('step-address-two-prev');
                       
                        
                        if( $('.BBFormErrorBlock').find('.BBFormErrorItem').length > 0 ) {
                            $('.BBFormErrorBlock').show();
                        }
                        else {
                            $('.BBFormErrorBlock').hide();
                        }
                        
                        //console.log($pCategory,$pName,$pSku,$revenue);
                    }
                }

                 else if( $('.contents .button-wrapper .button--orange').hasClass('step-address-two') ) {

                    $address = $('#bboxdonation_billing_billingAddress_txtAddress'),
                        $city = $('#bboxdonation_billing_billingAddress_txtAUCity'),
                        $state = $('#bboxdonation_billing_billingAddress_ddAUState'),
                        $postcode = $('#bboxdonation_billing_billingAddress_txtAUPostCode');

                    var n = [],
                    step = true;
                    
                    //n.push(validationForm($fname));
                    //n.push(validationForm($lname));
                    //n.push(validationForm($email));
                    n.push(validationForm($address));
                    n.push(validationForm($city));
                    n.push(validationForm($state));
                    n.push(validationForm($postcode));
                    
                    step = n.every(Boolean);
                    
                    //console.log(n,step);
                    if( step == true ) {
                        
                        /*$pCategory = $('#bboxdonation_recurrence_divRecurrenceCheckbox input[type="radio"]:checked').val();*/
                        $pName = window.location.href;
                        $revenue = $('#bboxdonation_gift_rdlstGivingLevels input[type="radio"]:checked').val();

                    

                        setOtherValueAmount();
                        $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo,.BBDFormSectionBillingInfo').hide();
                        $('.contents .button-wrapper .button--orange').removeClass('step-address-two');
                        $('.contents .button-wrapper .button--orange').addClass('step-payment');
                         $('.prev-icon').removeClass('step-address-two-prev');
                        $('.prev-icon').addClass('step-payment-prev');
                        $('.BBFormButtonRow,.BBDFormSectionPaymentInfo').show();
                        $('body').addClass('show-payment-step');
                        $('.contents .button-wrapper .button--orange').hide();
                        
                        if( $('.BBFormErrorBlock').find('.BBFormErrorItem').length > 0 ) {
                            $('.BBFormErrorBlock').show();
                        }
                        else {
                            $('.BBFormErrorBlock').hide();
                        }

                        if($pSku == '$25') {
                            $pSku = 'DONATE25';
                        }
                        else if($pSku == '$50') {
                            $pSku = 'DONATE50';
                        }
                        else if($pSku == '$75') {
                            $pSku = 'DONATE75';
                        }
                        else if($pSku == '$100') {
                            $pSku = 'DONATE100';
                        }
                        else if($pSku == 'rdGivingLevel5') {
                            $pSku = 'OTHER';
                            $revenue = $('#bboxdonation_gift_txtOtherAmountButtons').val();
                        }
                        
                        //console.log($pCategory,$pName,$pSku,$revenue);
                    }
                }
                
            });
            
            
                  $('.prev-icon').on('click', function(){
                
                 
              if($(this).hasClass('step-monthly-prev')) {


               $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo').show();
                         $('.contents .button-wrapper .button--orange').addClass('step-one');
                         $('.contents .button-wrapper .button--orange').removeClass('step-monthly');
                         $('.button-monthly-info').removeClass('single-to-monthly');
                  $('#bboxdonation_divForm .step-monthly-section').hide();
                         $('.prev-icon').removeClass("step-monthly-prev"); 
                          $('.prev-icon').hide();
                            $('.contents .button-wrapper .button--orange').show();

                }

                else if( $(this).hasClass('step-address-one-prev') ) {

                    

                      $('.prev-icon').removeClass('step-address-one-prev');
                        $('.BBDFormSectionBillingInfo').hide();
                         $('.contents .button-wrapper .button--orange').removeClass('step-address-one');

                      if($(this).hasClass('single-donation-prev')){

                       $('#bboxdonation_divForm .step-monthly-section').show();
                        $('.contents .button-wrapper .button--orange').addClass('step-monthly');
                       $('.prev-icon').addClass('step-monthly-prev');

                      $('.contents .button-wrapper .button--orange').hide();

                      }

                      else {

                       $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo').show();
                         $('.contents .button-wrapper .button--orange').addClass('step-one');
                          $('.prev-icon').hide();
                      

                      }
                  

                
                       
                   
                   }

                   else if( $(this).hasClass('step-address-two-prev') ) {



                      $('.prev-icon').removeClass('step-address-two-prev');
                        $('.prev-icon').addClass('step-address-one-prev');
                          $('.BBDFormSectionBillingInfo #fldIndivInfo,.BBDFormSectionBillingInfo #bboxdonation_billing_divEmail,.BBDFormSectionBillingInfo #bboxdonation_billing_divPhone').show();
                           $('.BBDFormSectionBillingInfo .BBFormAddress').hide();
                         $('.contents .button-wrapper .button--orange').removeClass('step-address-two');
                          $('.contents .button-wrapper .button--orange').addClass('step-address-one');

                          if(!($('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo').hasClass('payment-step-reloaded'))){

                            $('.prev-icon').hide();
                          }

                          
                   
                   }



                      else if( $(this).hasClass('step-payment-prev') ) {
        
                    
                         $('.BBDFormSectionBillingInfo').show();
                         $('.BBDFormSectionBillingInfo .BBFormAddress').show();
                           $('.BBDFormSectionBillingInfo #fldIndivInfo,.BBDFormSectionBillingInfo #bboxdonation_billing_divEmail,.BBDFormSectionBillingInfo #bboxdonation_billing_divPhone').hide();
                        $('.contents .button-wrapper .button--orange').addClass('step-address-two');
                        $('.contents .button-wrapper .button--orange').removeClass('step-payment');
                        $(this).addClass('step-address-two-prev');
                        $(this).removeClass('step-payment-prev');
                        $('.BBFormButtonRow,.BBDFormSectionPaymentInfo').hide();
                        $('.contents .button-wrapper .button--orange').show();
                        $('body').removeClass('show-payment-step');
                       
                        
                   
                }
                
            });
            
         
            
            function urlParamSet(){


                    
                        if(donateParams.has('donate')){

                        let donateparamVal = donateParams.get('donate')
                        if(donateparamVal == "l"){
                        

                            setDonateAmount(50,90,150);

                           
                        }
                        else if(donateparamVal == "m"){

                             setDonateAmount(90,120,180);

                           
                        }
                        else if(donateparamVal == "h"){


                             setDonateAmount(120,160,220);

                            

                        }
                        }
                         if(donateParams.has('amount')){

                        let donateparamVal = donateParams.get('amount')
                        
                            var amount = donateparamVal.split(",");

                            setDonateAmount(amount[0],amount[1],amount[2]);

                       
                        }

                        if(donateParams.has('fname')){

                            let donateparamVal = donateParams.get('fname')

                            $('#bboxdonation_billing_txtFirstName').val(donateparamVal);

                        }

                            if(donateParams.has('lname')){

                            let donateparamVal = donateParams.get('lname')

                            $('#bboxdonation_billing_txtLastName').val(donateparamVal);

                        }

                         if(donateParams.has('email')){

                            let donateparamVal = donateParams.get('email')

                            $('#bboxdonation_billing_txtEmail').val(donateparamVal);

                        }


                         if(donateParams.has('phone')){

                            let donateparamVal = donateParams.get('phone')

                            $('#bboxdonation_billing_txtPhone').val(donateparamVal);

                        }

                          if(donateParams.has('address')){

                            let donateparamVal = donateParams.get('address')

                            $('#bboxdonation_billing_billingAddress_txtAddress').val(donateparamVal);

                        }

                        if(donateParams.has('suburb')){

                            let donateparamVal = donateParams.get('suburb')

                            $('#bboxdonation_billing_billingAddress_txtAUCity').val(donateparamVal);

                        }

                        if(donateParams.has('state')){

                            let donateparamVal = donateParams.get('state');
                        

                            var myValue = donateparamVal;
                           


                            $('.BBFieldBillingStateZip .BBFormSelectList').find('option[value="'+ myValue +'"]').prop('selected', 'selected');

                        
                        }

                        if(donateParams.has('postcode')){

                            let donateparamVal = donateParams.get('postcode')

                            $('#bboxdonation_billing_billingAddress_txtAUPostCode').val(donateparamVal);

                        }

            }

            function setDonateAmount(amount1,amount2,amount3){



                            $('#bboxdonation_gift_rdGivingLevel1').val(amount1);
                            $('#bboxdonation_gift_rdGivingLevel1').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$'+amount1);

                            $('#bboxdonation_gift_rdGivingLevel2').val(amount2);
                            $('#bboxdonation_gift_rdGivingLevel2').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$'+amount2);

                            $('#bboxdonation_gift_rdGivingLevel3').val(amount3);
                             $('#bboxdonation_gift_rdGivingLevel3').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$'+amount3);
            }

            function setOtherValueAmount(){

             if($pSku != 'rdGivingLevel4') {

              if(donateParams.has('amount') || donateParams.has('donate') || $pCategory == "Single Donation" ){
                        $pSku = $pSku;

                        $('#bboxdonation_gift_rdGivingLevel4').prop("checked", true);
                    $('#bboxdonation_gift_txtOtherAmountButtons').val($pSku);
                    $('.BBFormRadioLabelGivingLevel').removeClass('BBFormRadioLabelGivingLevelSelected');
                 $('.BBFormRadioLabelGivingLevel').addClass('BBFormRadioLabelGivingNotLevelSelected');

                  $('.BBFormRadioGivingLevel').removeClass('BBFormRadioGivingLevelSelected');
                 $('.BBFormRadioGivingLevel').addClass('BBFormRadioGivingLevelNotSelected');


                $('.BBFormRadioLabelGivingLevelOther').removeClass('BBFormRadioLabelGivingLevelNotSelected');
                 $('.BBFormRadioLabelGivingLevelOther').addClass('BBFormRadioLabelGivingLevelSelected');
                 
                 $('.BBFormRadioGivingLevelOther').removeClass('BBFormRadioGivingLevelNotSelected');
                 $('.BBFormRadioGivingLevelOther').addClass('BBFormRadioGivingLevelSelected');
                 }
                }

            }

            function setfirstScreen(){

                  $('.BBDFormSectionBillingInfo fieldset,.BBDFormSectionPaymentInfo fieldset').before('<p class="donation-highlight-text"><p>');

                  $('.donate-form__steps,.contents .button-wrapper').css({'opacity':1});
                      
                        $('.BBFormRadioButtonContainer .BBFormRadioDescription').remove();

                        $('#bboxdonation_recurrence_chkMonthlyGift').before('<span class="monthly-not-active single-donation-btn">Single Donation</span>')
                        
                         $('#bboxdonation_recurrence_chkMonthlyGift').before('<button  type="button" class="heart-flying btn btn-primary"><div id="hearts-wrapper" class="hearts"><div class="heart"></div></div></button>');
                      
                        var c = $('.BBFormSection.BBFormSectionRecurrenceInfo').clone();
                            $('.BBFormSection.BBFormSectionRecurrenceInfo').remove();
                            $('.BBFormSection.BBDFormSectionGiftInfo').before(c);
                            $('.BBFormSection.BBFormSectionRecurrenceInfo').show();

                           
                        $('#bboxdonation_billing_txtFirstName').after('<span class="error-text inline-error">Please enter your first name</span>');
                        $('#bboxdonation_billing_txtLastName').after('<span class="error-text last-error inline-error">Please enter your last name</span>');
                        $('#bboxdonation_billing_txtEmail').after('<span class="error-text">Please enter your email</span>');
                        $('#bboxdonation_billing_billingAddress_txtAddress').after('<span class="error-text">Please enter your address</span>');
                        $('#bboxdonation_billing_billingAddress_txtAUCity').after('<span class="error-text">Please select your suburb</span>');
                        $('#bboxdonation_billing_billingAddress_ddAUState').after('<span class="error-text inline-error">Please select your state</span>');
                        $('#bboxdonation_billing_billingAddress_txtAUPostCode').after('<span class="error-text postcode-error inline-error">Please select your postcode</span>');

                 

                    
            }

             function setUpSellScreen(){

                    var monthly_section = $('.step-monthly-section').clone();
                        $('#bboxdonation_divForm #bboxdonation_billing_divBillingSection').before(monthly_section);
             }


            
            function validationForm(id){
                if( id.val() == '') {
                    id.addClass('has-error');
                    id.next('.error-text').show();
                    return false;
                }
                else {
                    id.removeClass('has-error');
                    id.next('.error-text').hide();
                    return true;
                }
            }
            
            /*console.log($pCategory,$pName,$pSku,$revenue);
            gtag('event', 'purchase', {
              "transaction_id": "24.031608523954162",
              "affiliation": $pName,
              "value": $revenue,
              "currency": "USD",
              "tax": 1.24,
              "shipping": 0
            });*/
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'registrationComplete',
                'ProductCategory': 'Premium'
            });
        
        });
        
