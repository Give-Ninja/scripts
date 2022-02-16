$(document).ready(function() {
            var flag =true;
            var current = 0,
                $fname,$lnam,$email,$address,$city,$state,$postcode,$pCategory,$pName,$pSku,$revenue;
                 let donateParams = new URLSearchParams(window.location.search);
                let windowurl = window.location.href;

    var modal = document.getElementById("formModal");
    
    $(".donate-now").on('click', function() {

    
     modal.style.display = "flex";
     $('body').addClass('modal-open');
    
});


     $(document).on("click", '#formModal .close', function(e) {
      modal.style.display = "none";
      $('body').removeClass('modal-open');
    });
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
         $('body').removeClass('modal-open');
      }
    }


    $(document).on("click", function(e) {
      var currentTargetBox = $(e.target).closest('#formModal .tool-tip-wrapper .tool-tip-list');
      $('#formModal .tool-tip-wrapper .tool-tip-list').not(currentTargetBox).addClass('is-collapsed');
    });

    $(document).on("click", '#formModal .tool-tip-wrapper .tool-tip-heading', function(e) {
      $(this).closest('#formModal .tool-tip-list').toggleClass('is-collapsed');
    });

      
                        
      $(document).on("blur","#formModal #bboxdonation_billing_txtFirstName,#bboxdonation_billing_txtLastName,#formModal #bboxdonation_billing_txtEmail,#formModal #bboxdonation_billing_billingAddress_txtAddress,#formModal #bboxdonation_billing_billingAddress_txtAUCity,#formModal #bboxdonation_billing_billingAddress_ddAUState,#formModal #bboxdonation_billing_billingAddress_txtAUPostCode",function() {
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

  elementLoaded('#formModal #bboxdonation_divThanks', function(el) {
   
   $('#formModal .prev-icon').hide();
   $('#formModal .stepper-wrapper').hide();
    $('#formModal .secure-donation').hide();
    $('body').addClass('thankyou-shown');

                    var content_cloned_final = $('#formModal #bboxdonation_divThanks').children().clone();

              $('#formModal .card-main-content').html(content_cloned_final);
    $('#formModal  #bboxdonation_divThanks').append('<div class="thank-you-new"><div class="circle-outer"> <div class="circle-container"> <div class="circle one"></div> <div class="circle two"></div> <div class="circle three"></div> <div class="circle four"></div> <div class="circle five"></div> <div class="circle six"></div> </div> </div> <span class="heart-flying-result"> <span class="hearts-shape-wrapper hearts"> <span class="heart-shape"></span> </span> <span class="hearts-shape-wrapper hearts one"> <span class="heart-shape"></span> </span> <span class="hearts-shape-wrapper hearts two"> <span class="heart-shape"></span> </span> <span class="hearts-shape-wrapper hearts three"> <span class="heart-shape"></span> </span> </span> <div class="cards-content"> <div class="donate-text text-center"> <h2>Help spread the word!</h2> <p>1 out of 4 people you share this with will also donate</p> </div> <div class="social-links"> <ul> <li><img class="icon" src="https://v.fastcdn.co/u/06e81d16/58531382-0-facebook.svg" alt="facebook"/><a href="https://www.facebook.com/sharer/sharer.php?u='+windowurl+'">Share on Facebook</a></li> <li><img class="icon" src="https://v.fastcdn.co/u/06e81d16/58531392-0-twitter.svg" alt="twitter"/><a href="https://twitter.com/intent/tweet?url='+windowurl+'&text=Become+a+Life+Changer&hashtags=donation">Share on Twitter</a></li> <li><img class="icon" src="https://v.fastcdn.co/u/06e81d16/58531387-0-linkedin.svg" alt="linkedin"/><a href="https://www.linkedin.com/cws/share?url='+windowurl+'">Share on Linkedin</a></li> <li><img class="icon" src="https://v.fastcdn.co/u/06e81d16/58531397-0-email.svg" alt="email"/><a href="mailto:?subject=Donate Now&amp;amp;body='+windowurl+'" target="_blank">Share via Email</a></li> </ul> </div>');

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

  elementLoadedMain('#formModal #mongo-form', function(el) {


   
        

        if(!(donateParams.has('amount') || donateParams.has('donate'))){
            setDonateAmount(80,130,158);
        }
        $('#formModal .BBDFormSectionGiftInfo,#formModal .BBFormSectionRecurrenceInfo').show();
        $('#formModal .BBDFormSectionGiftInfo,#formModal .BBFormSectionRecurrenceInfo').addClass('payment-step-reloaded');
                        
        urlParamSet();
        setfirstScreen();
        setUpSellScreen();

        

                  

  });


                

                  

                    

                
            
            /* first step updates */  

            $('body').on('click','#formModal #bboxdonation_recurrence_lblRecurringGift',function(){
           

               
               if(($('#formModal .single-donation-btn').hasClass('monthly-not-active'))){
                $('#formModal .single-donation-btn').removeClass('monthly-not-active');
                
                if(!(donateParams.has('amount') || donateParams.has('donate'))){
                     setDonateAmount(24,36,49);
                 }
                 
                }

                else{

                 $('#formModal .single-donation-btn').addClass('monthly-not-active');
                 if(!(donateParams.has('amount') || donateParams.has('donate'))){
                    setDonateAmount(80,130,158);
                 }
                }

               
            });

              $('body').on('click','#formModal .single-donation-btn',function(){

           if(!($('#formModal .single-donation-btn').hasClass('monthly-not-active'))){
                $("#formModal #bboxdonation_recurrence_lblRecurringGift").trigger("click");


                }

                
                
        
            });

            /* end step 1 updates */

            /* monthly add on  */

            $('body').on('click','#formModal #bboxdonation_divForm .step-monthly-section button',function(){

        
                if($(this).hasClass('single-to-monthly')){

                var single_value = $(this).find('.single-payment-info').html();

                $('#formModal .button-monthly-info').removeClass('single-to-monthly');
                $('#formModal #bboxdonation_recurrence_lblRecurringGift').trigger("click");
                $('#formModal .BBFormGiftOtherAmount').val(single_value);


                }


                if($(this).hasClass('button-monthly-first') || $(this).hasClass('button-monthly-second')){

                 var monthly_value = $(this).find('.monthly-payment-value').html();
                
                 $('#formModal .button-monthly-info').addClass('single-to-monthly');

                $('#formModal #bboxdonation_recurrence_chkMonthlyGift').trigger("click");
                $('#formModal .single-donation-btn').removeClass('monthly-not-active');
                

                $('#formModal .BBFormRadioGivingLevelOther').prop("checked", true);
                $('#formModal .BBFormGiftOtherAmount').val(monthly_value);

               
               

                //$('#bboxdonation_gift_txtOtherAmountButtons').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html(monthly_value);
                
                
                $('#formModal .BBFormRadioLabelGivingLevel').removeClass('BBFormRadioLabelGivingLevelSelected');
                 $('#formModal .BBFormRadioLabelGivingLevel').addClass('BBFormRadioLabelGivingNotLevelSelected');

                  $('#formModal .BBFormRadioGivingLevel').removeClass('BBFormRadioGivingLevelSelected');
                 $('#formModal .BBFormRadioGivingLevel').addClass('BBFormRadioGivingLevelNotSelected');


                $('#formModal .BBFormRadioLabelGivingLevelOther').removeClass('BBFormRadioLabelGivingLevelNotSelected');
                 $('#formModal .BBFormRadioLabelGivingLevelOther').addClass('BBFormRadioLabelGivingLevelSelected');
                 
                 $('#formModal .BBFormRadioGivingLevelOther').removeClass('BBFormRadioGivingLevelNotSelected');
                 $('#formModal .BBFormRadioGivingLevelOther').addClass('BBFormRadioGivingLevelSelected');
                }


                $("#formModal .button-wrapper .button--orange").trigger("click");  

        
            });

         /* end monthly add on */
           

            
            
            $('#formModal .button-wrapper .button--orange').on('click', function(){
                

                       

                         $pCategory = "Single Donation";

                        if(!($('#formModal .single-donation-btn').hasClass('monthly-not-active'))){

                            $pCategory = "Monthly Donation";

                        }

                        
                        $pName = window.location.href;
                        $pSku = $('#formModal #bboxdonation_gift_rdlstGivingLevels input[type="radio"]:checked').val();
                        $revenue = $('#formModal #bboxdonation_gift_rdlstGivingLevels input[type="radio"]:checked').val();
                 

                        if($pSku.includes('rdGivingLevel')) {
                        //console.log("hi");
                            $pSku = $('#formModal .BBFormGiftOtherAmount').val();

                             if(!($pSku.includes('$'))) {
                        
                            $pSku = "$" + $pSku;
                        }
                           
                        }
                        else{

                            $pSku = "$" + $pSku;
                        }

                        if($pCategory == "Single Donation"){

                        $('#formModal .donation-highlight-text').html('You are making a one-off donation of ' + $pSku);

                        }

                        if($pCategory == "Monthly Donation"){

                        $('#formModal .donation-highlight-text').html('You are making a monthly donation of ' + $pSku);

                        }

                
                //console.log(current.index());
                
                if( $('#formModal .button-wrapper .button--orange').hasClass('step-one') ) {
                    



                        $('#formModal .BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo').hide();
                         $('#formModal .button-wrapper .button--orange').removeClass('step-one');
                          $('#formModal #bboxdonation_divForm  .button-monthly-second').show();
                         $('#formModal .prev-icon').show();

                         //console.log($pSku);

                         var pSku_withoutdollar = parseInt($pSku.replace('$',''));
                    

                        if($pCategory == "Single Donation" && pSku_withoutdollar < 201){
                      
                        var info_val;

                         if(!($pSku.includes('$'))) { info_val = "$" + $pSku; } else { info_val = $pSku }

                       $('#formModal .step-monthly-section .single-payment-info').html(info_val);
                        $('#formModal .button-wrapper .button--orange').addClass('step-monthly');
                        $('#formModal #bboxdonation_divForm .step-monthly-section').show();
                         $('#formModal .prev-icon').addClass("step-monthly-prev");
                         $('#formModal .prev-icon').addClass("single-donation-prev");
                         $('#formModal .button-wrapper .button--orange').hide();

                         if(pSku_withoutdollar >= 1 && pSku_withoutdollar <= 25){
                        
                         $('#formModal #bboxdonation_divForm  .button-monthly-first .monthly-payment-first').html('$10');
                         $('#formModal #bboxdonation_divForm  .button-monthly-second').hide();
                         

                         }

                         else if(pSku_withoutdollar >= 26 && pSku_withoutdollar <= 35){
                         
                         $('#formModal #bboxdonation_divForm  .button-monthly-first .monthly-payment-first').html('$10');
                          $('#formModal #bboxdonation_divForm  .button-monthly-second .monthly-payment-second').html('$15');

                         }

                         else if(pSku_withoutdollar >= 36 && pSku_withoutdollar <= 55){
                         
                         $('#formModal #bboxdonation_divForm  .button-monthly-first .monthly-payment-first').html('$15');
                          $('#formModal #bboxdonation_divForm  .button-monthly-second .monthly-payment-second').html('$20');

                         }

                          else if(pSku_withoutdollar >= 56 && pSku_withoutdollar <= 100){
                         
                         $('#formModal #bboxdonation_divForm  .button-monthly-first .monthly-payment-first').html('$20');
                          $('#formModal #bboxdonation_divForm  .button-monthly-second .monthly-payment-second').html('$25');

                         }

                          else if(pSku_withoutdollar >= 101 && pSku_withoutdollar <= 150){
                         
                         $('#formModal #bboxdonation_divForm  .button-monthly-first .monthly-payment-first').html('$25');
                          $('#formModal #bboxdonation_divForm  .button-monthly-second .monthly-payment-second').html('$30');

                         }

                          else if(pSku_withoutdollar >= 151 && pSku_withoutdollar <= 200){
                         
                         $('#formModal #bboxdonation_divForm  .button-monthly-first .monthly-payment-first').html('$30');
                          $('#formModal #bboxdonation_divForm  .button-monthly-second .monthly-payment-second').html('$40');

                         }


                        }
                        else{
                         $('#formModal .button-wrapper .button--orange').addClass('step-address-one');
                        $('#formModal .BBDFormSectionBillingInfo').show();
                         $('#formModal .BBDFormSectionBillingInfo .BBFormAddress').hide();

                         $('#formModal .prev-icon').addClass("step-address-one-prev");
                         $('#formModal .prev-icon').removeClass("single-donation-prev");

                        $("#formModal .stepper-item").removeClass('active completed');
                           $("#formModal .stepper-item.step-item-first").addClass('completed');
                        $("#formModal .stepper-item.step-item-second").addClass('active');

                        }

                }
                else if($('#formModal .button-wrapper .button--orange').hasClass('step-monthly')) {

                $('#formModal #bboxdonation_divForm .step-monthly-section').hide();
                $('#formModal .BBDFormSectionBillingInfo').show();
                 $('#formModal .BBDFormSectionBillingInfo .BBFormAddress').hide();

                 $('#formModal .button-wrapper .button--orange').removeClass('step-monthly');
                 $('#formModal .prev-icon').removeClass('step-monthly-prev');
                $('#formModal .button-wrapper .button--orange').addClass('step-address-one');
                $('#formModal .prev-icon').addClass('step-address-one-prev');
                $('#formModal .button-wrapper .button--orange').show();


                 $("#formModal .stepper-item").removeClass('active completed');
                  $("#formModal .stepper-item.step-item-first").addClass('completed');
                        $("#formModal .stepper-item.step-item-second").addClass('active');

                }

                else if( $('#formModal .button-wrapper .button--orange').hasClass('step-address-one') ) {

                
                    var n = [],
                    step = true;

                    $fname = $('#formModal #bboxdonation_billing_txtFirstName'),
                        $lname = $('#formModal #bboxdonation_billing_txtLastName'),
                        $email = $('#formModal #bboxdonation_billing_txtEmail'),
                        
                    
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
                        
                        
                    
                        $('#formModal .BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo').hide();

                        $('#formModal .BBDFormSectionBillingInfo #fldIndivInfo,#formModal .BBDFormSectionBillingInfo #bboxdonation_billing_divEmail,#formModal .BBDFormSectionBillingInfo #bboxdonation_billing_divPhone').hide();

                         $('#formModal .BBDFormSectionBillingInfo .BBFormAddress').show();


                        $('#formModal .button-wrapper .button--orange').removeClass('step-address-one');
                        $('#formModal .button-wrapper .button--orange').addClass('step-address-two');
                         $('#formModal .prev-icon').removeClass('step-address-one-prev');
                        $('#formModal .prev-icon').addClass('step-address-two-prev');
                       
                        
                        if( $('#formModal .BBFormErrorBlock').find('.BBFormErrorItem').length > 0 ) {
                            $('#formModal .BBFormErrorBlock').show();
                        }
                        else {
                            $('#formModal .BBFormErrorBlock').hide();
                        }
                        
                        //console.log($pCategory,$pName,$pSku,$revenue);
                    }
                }

                 else if( $('#formModal .button-wrapper .button--orange').hasClass('step-address-two') ) {

                    $address = $('#formModal #bboxdonation_billing_billingAddress_txtAddress'),
                        $city = $('#formModal #bboxdonation_billing_billingAddress_txtAUCity'),
                        $state = $('#formModal #bboxdonation_billing_billingAddress_ddAUState'),
                        $postcode = $('#formModal #bboxdonation_billing_billingAddress_txtAUPostCode');

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
                        
                        /*$pCategory = $('#formModal #bboxdonation_recurrence_divRecurrenceCheckbox input[type="radio"]:checked').val();*/
                        $pName = window.location.href;
                        $revenue = $('#formModal #bboxdonation_gift_rdlstGivingLevels input[type="radio"]:checked').val();

                    

                        setOtherValueAmount();
                        $('#formModal .BBDFormSectionGiftInfo,#formModal .BBFormSectionRecurrenceInfo,#formModal .BBDFormSectionBillingInfo').hide();
                        $('#formModal .button-wrapper .button--orange').removeClass('step-address-two');
                        $('#formModal .button-wrapper .button--orange').addClass('step-payment');
                         $('#formModal .prev-icon').removeClass('step-address-two-prev');
                        $('#formModal .prev-icon').addClass('step-payment-prev');
                        $('#formModal .BBFormButtonRow,#formModal .BBDFormSectionPaymentInfo').show();
                        $('body').addClass('show-payment-step');
                        $('#formModal .button-wrapper .button--orange').hide();

                        $("#formModal .stepper-item").removeClass('active completed');
                         $("#formModal .stepper-item.step-item-first").addClass('completed');
                          $("#formModal .stepper-item.step-item-two").addClass('completed');
                        $("#formModal .stepper-item.step-item-third").addClass('active');
                        
                        if( $('#formModal .BBFormErrorBlock').find('.BBFormErrorItem').length > 0 ) {
                            $('#formModal .BBFormErrorBlock').show();
                        }
                        else {
                            $('#formModal .BBFormErrorBlock').hide();
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
                        else if($pSku.includes('rdGivingLevel')) {
                            $pSku = 'OTHER';
                            $revenue = $('#formModal .BBFormGiftOtherAmount').val();
                        }
                        
                        //console.log($pCategory,$pName,$pSku,$revenue);
                    }
                }
                
            });
            
            
                  $('#formModal .prev-icon').on('click', function(){
                
                 
              if($(this).hasClass('step-monthly-prev')) {


               $('#formModal .BBDFormSectionGiftInfo,#formModal .BBFormSectionRecurrenceInfo').show();
                         $('#formModal .button-wrapper .button--orange').addClass('step-one');
                         $('#formModal .button-wrapper .button--orange').removeClass('step-monthly');
                         $('#formModal .button-monthly-info').removeClass('single-to-monthly');
                  $('#formModal #bboxdonation_divForm .step-monthly-section').hide();
                         $('#formModal .prev-icon').removeClass("step-monthly-prev"); 
                          $('#formModal .prev-icon').hide();
                            $('#formModal .button-wrapper .button--orange').show();

                               $("#formModal .stepper-item").removeClass('active completed');
                           $("#formModal .stepper-item.step-item-first").addClass('active');
                        

                }

                else if( $(this).hasClass('step-address-one-prev') ) {

                    

                      $('#formModal .prev-icon').removeClass('step-address-one-prev');
                        $('#formModal .BBDFormSectionBillingInfo').hide();
                         $('#formModal .button-wrapper .button--orange').removeClass('step-address-one');

                            $("#formModal .stepper-item").removeClass('active completed');
                           $("#formModal .stepper-item.step-item-first").addClass('active');
                       

                      if($(this).hasClass('single-donation-prev')){

                       $('#formModal #bboxdonation_divForm .step-monthly-section').show();
                        $('#formModal .button-wrapper .button--orange').addClass('step-monthly');
                       $('#formModal .prev-icon').addClass('step-monthly-prev');

                      $('#formModal .button-wrapper .button--orange').hide();

                      }

                      else {

                       $('#formModal .BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo').show();
                         $('#formModal .button-wrapper .button--orange').addClass('step-one');
                          $('#formModal .prev-icon').hide();
                      

                      }
                  

                
                       
                   
                   }

                   else if( $(this).hasClass('step-address-two-prev') ) {



                      $('#formModal .prev-icon').removeClass('step-address-two-prev');
                        $('#formModal .prev-icon').addClass('step-address-one-prev');
                          $('#formModal .BBDFormSectionBillingInfo #fldIndivInfo,#formModal .BBDFormSectionBillingInfo #bboxdonation_billing_divEmail,#formModal .BBDFormSectionBillingInfo #bboxdonation_billing_divPhone').show();
                           $('#formModal .BBDFormSectionBillingInfo .BBFormAddress').hide();
                         $('#formModal .button-wrapper .button--orange').removeClass('step-address-two');
                          $('#formModal .button-wrapper .button--orange').addClass('step-address-one');

                             $("#formModal .stepper-item").removeClass('active completed');
                           $("#formModal .stepper-item.step-item-first").addClass('completed');
                        $("#formModal .stepper-item.step-item-second").addClass('active');

                          if(!($('#formModal .BBDFormSectionGiftInfo,#formModal .BBFormSectionRecurrenceInfo').hasClass('payment-step-reloaded'))){

                            $('#formModal .prev-icon').hide();

                          }

                          
                   
                   }



                      else if( $(this).hasClass('step-payment-prev') ) {
        
                    
                         $('#formModal .BBDFormSectionBillingInfo').show();
                         $('#formModal .BBDFormSectionBillingInfo .BBFormAddress').show();
                           $('#formModal .BBDFormSectionBillingInfo #fldIndivInfo,#formModal .BBDFormSectionBillingInfo #bboxdonation_billing_divEmail,#formModal .BBDFormSectionBillingInfo #bboxdonation_billing_divPhone').hide();
                        $('#formModal .button-wrapper .button--orange').addClass('step-address-two');
                        $('#formModal .button-wrapper .button--orange').removeClass('step-payment');
                        $(this).addClass('step-address-two-prev');
                        $(this).removeClass('step-payment-prev');
                        $('#formModal .BBFormButtonRow,.BBDFormSectionPaymentInfo').hide();
                        $('#formModal .button-wrapper .button--orange').show();
                        $('body').removeClass('show-payment-step');

                           $("#formModal .stepper-item").removeClass('active completed');
                           $("#formModal .stepper-item.step-item-first").addClass('completed');
                     
                       
                        
                   
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

                            $('#formModal #bboxdonation_billing_txtFirstName').val(donateparamVal);

                        }

                            if(donateParams.has('lname')){

                            let donateparamVal = donateParams.get('lname')

                            $('#formModal #bboxdonation_billing_txtLastName').val(donateparamVal);

                        }

                         if(donateParams.has('email')){

                            let donateparamVal = donateParams.get('email')

                            $('#formModal #bboxdonation_billing_txtEmail').val(donateparamVal);

                        }


                         if(donateParams.has('phone')){

                            let donateparamVal = donateParams.get('phone')

                            $('#formModal #bboxdonation_billing_txtPhone').val(donateparamVal);

                        }

                          if(donateParams.has('address')){

                            let donateparamVal = donateParams.get('address')

                            $('#formModal #bboxdonation_billing_billingAddress_txtAddress').val(donateparamVal);

                        }

                        if(donateParams.has('suburb')){

                            let donateparamVal = donateParams.get('suburb')

                            $('#formModal #bboxdonation_billing_billingAddress_txtAUCity').val(donateparamVal);

                        }

                        if(donateParams.has('state')){

                            let donateparamVal = donateParams.get('state');
                        

                            var myValue = donateparamVal;
                           


                            $('#formModal .BBFieldBillingStateZip .BBFormSelectList').find('option[value="'+ myValue +'"]').prop('selected', 'selected');

                        
                        }

                        if(donateParams.has('postcode')){

                            let donateparamVal = donateParams.get('postcode')

                            $('#formModal #bboxdonation_billing_billingAddress_txtAUPostCode').val(donateparamVal);

                        }

            }

            function setDonateAmount(amount1,amount2,amount3){



                            $('#formModal #bboxdonation_gift_rdGivingLevel1').val(amount1);
                            $('#formModal #bboxdonation_gift_rdGivingLevel1').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$'+amount1);

                            $('#formModal #bboxdonation_gift_rdGivingLevel2').val(amount2);
                            $('#bboxdonation_gift_rdGivingLevel2').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$'+amount2);

                            $('#formModal #bboxdonation_gift_rdGivingLevel3').val(amount3);
                             $('#formModal #bboxdonation_gift_rdGivingLevel3').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$'+amount3);
            }

            function setOtherValueAmount(){

             if(!($pSku.includes('rdGivingLevel'))) {

              if(donateParams.has('amount') || donateParams.has('donate') || $pCategory == "Single Donation" ){
                        $pSku = $pSku;

                        $('#formModal .BBFormRadioGivingLevelOther').prop("checked", true);
                    $('#formModal .BBFormGiftOtherAmount').val($pSku);
                    $('#formModal .BBFormRadioLabelGivingLevel').removeClass('BBFormRadioLabelGivingLevelSelected');
                 $('#formModal .BBFormRadioLabelGivingLevel').addClass('BBFormRadioLabelGivingNotLevelSelected');

                  $('#formModal .BBFormRadioGivingLevel').removeClass('BBFormRadioGivingLevelSelected');
                 $('#formModal .BBFormRadioGivingLevel').addClass('BBFormRadioGivingLevelNotSelected');


                $('#formModal .BBFormRadioLabelGivingLevelOther').removeClass('BBFormRadioLabelGivingLevelNotSelected');
                 $('#formModal .BBFormRadioLabelGivingLevelOther').addClass('BBFormRadioLabelGivingLevelSelected');
                 
                 $('#formModal .BBFormRadioGivingLevelOther').removeClass('BBFormRadioGivingLevelNotSelected');
                 $('#formModal .BBFormRadioGivingLevelOther').addClass('BBFormRadioGivingLevelSelected');
                 }
                }

            }

            function setfirstScreen(){

                  $('#formModal .BBDFormSectionBillingInfo fieldset,#formModal .BBDFormSectionPaymentInfo fieldset').before('<p class="donation-highlight-text"><p>');

                  $('#formModal .donate-form__steps,.button-wrapper').css({'opacity':1});
                      
                        $('#formModal .BBFormRadioButtonContainer .BBFormRadioDescription').remove();

                        $('#formModal #bboxdonation_recurrence_chkMonthlyGift').before('<span class="monthly-not-active single-donation-btn">Single Donation</span>')
                        
                         $('#formModal #bboxdonation_recurrence_chkMonthlyGift').before('<button  type="button" class="heart-flying btn btn-primary"><div id="hearts-wrapper" class="hearts"><div class="heart"></div></div></button>');
                      
                        var c = $('#formModal .BBFormSection.BBFormSectionRecurrenceInfo').clone();
                            $('#formModal .BBFormSection.BBFormSectionRecurrenceInfo').remove();
                            $('#formModal .BBFormSection.BBDFormSectionGiftInfo').before(c);
                            $('#formModal .BBFormSection.BBFormSectionRecurrenceInfo').show();

                           
                        $('#formModal #bboxdonation_billing_txtFirstName').after('<span class="error-text inline-error">Please enter your first name</span>');
                        $('#formModal #bboxdonation_billing_txtLastName').after('<span class="error-text last-error inline-error">Please enter your last name</span>');
                        $('#formModal #bboxdonation_billing_txtEmail').after('<span class="error-text">Please enter your email</span>');
                        $('#formModal #bboxdonation_billing_billingAddress_txtAddress').after('<span class="error-text">Please enter your address</span>');
                        $('#formModal #bboxdonation_billing_billingAddress_txtAUCity').after('<span class="error-text">Please select your suburb</span>');
                        $('#formModal #bboxdonation_billing_billingAddress_ddAUState').after('<span class="error-text inline-error">Please select your state</span>');
                        $('#formModal #bboxdonation_billing_billingAddress_txtAUPostCode').after('<span class="error-text postcode-error inline-error">Please select your postcode</span>');

                 

                    
            }

             function setUpSellScreen(){

                    var monthly_section = $('#formModal .step-monthly-section').clone();
                        $('#formModal #bboxdonation_divForm #bboxdonation_billing_divBillingSection').before(monthly_section);
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
        
