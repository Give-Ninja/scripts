jQuery(document).ready(function( $ ) {
        var flag =true,
            $fname,$lnam,$email,$address,$city,$state,$postcode,$pCategory,$pName,$pSku,$revenue,$monthly_exist,$flag_designation_show = false,$pSkudata,$pAmtdata,$pCategorydata,top_element = document.getElementById("bbox-container");

         var single_payment_var = [], single_payment_html_var = [];
                    
            
 
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
   
   window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({            
          "event": "purchase",
          "ecommerce": {
             "ProductCategory": $pCategorydata,
             "ProductName": window.location.pathname.toLowerCase(),
             "ProductSKU": $pSku.toLowerCase(),
             "Revenue": $revenue.replace("$","")

          }
        });


  });

 


        $('#bbox-root').on("DOMNodeInserted", function (ev) {
            $('#bboxdonation_divForm').on("DOMNodeInserted", function (ev) {
                if(flag == true){
                    flag = false;

                    /* set designation visibility */

                    flag_url = window.location.href;

                    $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo,.BBDFormSectionTributeInfo').show();

                    setSinglPaymentonLoad();

                    $('body').addClass('form-first-step');
                        
                        

                    $("#bboxdonation_recurrence_lblRecurringGift").html("Monthly Donation");
                 
                   
                    
                    
                    if(flag_url == "" || flag_url.indexOf("") >= 0 ){

                    //$flag_designation_show = true;

                    }
                    
                    /* set preset values based on utm parameters */
                    
                    let donateParams = new URLSearchParams(window.location.search)
                    if(donateParams.has('donate')){

                    let donateparamVal = donateParams.get('donate')
                    if(donateparamVal == "l"){
                    

                        $('#bboxdonation_gift_rdGivingLevel1').val('50');
                        $('#bboxdonation_gift_rdGivingLevel1').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$50');

                        $('#bboxdonation_gift_rdGivingLevel2').val('90');
                        $('#bboxdonation_gift_rdGivingLevel2').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$90');

                        $('#bboxdonation_gift_rdGivingLevel3').val('150');
                        $('#bboxdonation_gift_rdGivingLevel3').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$150');
                    }
                    else if(donateparamVal == "m"){
                        $('#bboxdonation_gift_rdGivingLevel1').val('90');
                        $('#bboxdonation_gift_rdGivingLevel1').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$90');

                        $('#bboxdonation_gift_rdGivingLevel2').val('120');
                        $('#bboxdonation_gift_rdGivingLevel2').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$120');

                        $('#bboxdonation_gift_rdGivingLevel3').val('180');
                         $('#bboxdonation_gift_rdGivingLevel3').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$180');
                    }
                    else if(donateparamVal == "h"){
                        $('#bboxdonation_gift_rdGivingLevel1').val('120');
                        $('#bboxdonation_gift_rdGivingLevel1').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$120');

                        $('#bboxdonation_gift_rdGivingLevel2').val('160');
                        $('#bboxdonation_gift_rdGivingLevel2').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$160');

                        $('#bboxdonation_gift_rdGivingLevel3').val('220');
                         $('#bboxdonation_gift_rdGivingLevel3').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$220');

                    }
                    }
                     if(donateParams.has('amount')){

                    let donateparamVal = donateParams.get('amount')
                    
                        var amount = donateparamVal.split(",");

                        $('#bboxdonation_gift_rdGivingLevel1').val(amount[0]);
                        $('#bboxdonation_gift_rdGivingLevel1').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html("$"+amount[0]);

                        $('#bboxdonation_gift_rdGivingLevel2').val(amount[1]);
                        $('#bboxdonation_gift_rdGivingLevel2').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html("$"+amount[1]);

                        $('#bboxdonation_gift_rdGivingLevel3').val(amount[2]);
                        $('#bboxdonation_gift_rdGivingLevel3').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html("$"+amount[2]);
                   
                   
                    }



                      if(donateParams.has('title')){

                        let donateparamVal = donateParams.get('title');
                    

                        var titleValue = donateparamVal;
                       


                        $('.BBFormIndivFields .BBFormSelectList').find('option[value="'+ titleValue +'"]').prop('selected', 'selected');

                    
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

                    

                    /* end set values based on utm parameters */

                    /* general code with for validation */

                     $monthly_exists = $('.BBFormSectionRecurrenceInfo #bboxdonation_recurrence_divRecurrenceCheckbox').length;

                   

                    $('.form-container > h6,.donate-form__steps,.form-container .button-wrapper').css({'opacity':1});
                    $('.BBDFormSectionBillingInfo fieldset,.BBDFormSectionPaymentInfo fieldset').before('<p class="donation-highlight-text"><p>');
                  
                    if($monthly_exists){
                    $('#bboxdonation_recurrence_chkMonthlyGift').before('<span class="monthly-not-active single-donation-btn">Single Donation</span>')
                   
                  

                   // var c = $('.BBFormSection.BBFormSectionRecurrenceInfo').clone();
                     //   $('.BBFormSection.BBFormSectionRecurrenceInfo').remove();
                       // $('.BBFormSection.BBDFormSectionGiftInfo').before(c);
                        //$('.BBFormSection.BBFormSectionRecurrenceInfo').show();


                            if ($flag_designation_show){
                  var designation = $('#bboxdonation_designation_divSection').clone();
                     $('#bboxdonation_designation_divSection').remove();
                     $('.BBFormSection.BBDFormSectionGiftInfo').before(designation);
                     $('#bboxdonation_designation_divSection').show();
                    
                    }

                    var tribute =  $('.BBDFormSectionTributeInfo,.BBDFormSectionComments').clone();
                     $('.BBDFormSectionTributeInfo,.BBDFormSectionComments').remove();
                     $('.BBFormSection.BBDFormSectionGiftInfo').before(tribute);
                     
                       /* Utm parameter intialize */

                         if(donateParams.has('type')){

                    let donateparamVal = donateParams.get('type')

                    if (donateparamVal == "monthly"){
                        
                        $("#bboxdonation_recurrence_lblRecurringGift").trigger("click");
                   }
                   
                    }
                      

                         }

               
                  

                    $fname = $('#bboxdonation_billing_txtFirstName'),
                    $lname = $('#bboxdonation_billing_txtLastName'),
                    $email = $('#bboxdonation_billing_txtEmail'),
                    $address = $('#bboxdonation_billing_billingAddress_txtAddress'),
                    $city = $('#bboxdonation_billing_billingAddress_txtAUCity'),
                    $state = $('#bboxdonation_billing_billingAddress_ddAUState'),
                    $postcode = $('#bboxdonation_billing_billingAddress_txtAUPostCode');
                    
                    $fname.after('<span class="error-text inline-error">Please enter your first name</span>');
                    $lname.after('<span class="error-text last-error inline-error">Please enter your last name</span>');
                    $email.after('<span class="error-text">Please enter a valid email</span>');
                    $address.after('<span class="error-text">Please enter your address</span>');
                    $city.after('<span class="error-text">Please select your suburb</span>');
                    $state.after('<span class="error-text inline-error">Please select your state</span>');
                    $postcode.after('<span class="error-text postcode-error inline-error">Please select your postcode</span>');
                    
                    
                    $fname.on('focusout blur', function(){
                        validationForm($(this));
                    });
                    $lname.on('focusout blur', function(){
                        validationForm($(this));
                    });
                    $email.on('focusout blur', function(){
                        validationForm($(this));
                    });
                    $address.on('focusout blur', function(){
                        validationForm($(this));
                    });
                    $city.on('focusout blur', function(){
                        validationForm($(this));
                    });
                    $state.on('focusout blur', function(){
                        validationForm($(this));
                    });
                    $postcode.on('focusout blur', function(){
                        validationForm($(this));
                    });
                }
            });
        });
        
        

        $('body').on('click','#bboxdonation_recurrence_lblRecurringGift',function(){
       

           
           if(($('.single-donation-btn').hasClass('monthly-not-active'))){

           monthlyUpdateInfo();
            $('.single-donation-btn').removeClass('monthly-not-active');

             $('#bboxdonation_designation_divSection').hide();
               $('#lblRecurrenceNextGiftDate').hide();
               setTimeout(
                    function() 
                        {
                           
                             $('#lblRecurrenceNextGiftDate').html(function(index,html){
                            return html.replace("gift","monthly donation");
                            });
                  
                            $('#lblRecurrenceNextGiftDate').show();
                    }, 500);
            
            }

            else{

             singleUpdateInfo();
            
             $('.single-donation-btn').addClass('monthly-not-active');
              if($flag_designation_show){
             $('#bboxdonation_designation_divSection').show();
            }
              
            }

           
        });

          $('body').on('click','.single-donation-btn',function(){

        

       if(!($('.single-donation-btn').hasClass('monthly-not-active'))){
            $("#bboxdonation_recurrence_lblRecurringGift").trigger("click");


            }
            
            
    
        });

             $('body').on('click','#bboxdonation_tribute_chkTributeGift',function(){

       if($('#bboxdonation_tribute_chkTributeGift')[0].checked){
            $(".BBDFormSectionComments").show();


            }

            else{
                $(".BBDFormSectionComments").hide();

            }
            
            
    
        });
       
       
          
        
        
        $('.form-container .button-wrapper .button--orange').on('click', function(){
            
            var current = $('.donate-form__steps').find('.donate-form__step--current');

                     $pCategory = "Single Donation";

                    

                    if(!($('.single-donation-btn').hasClass('monthly-not-active')) && $monthly_exists ){

                    	

                        $pCategory = "Monthly Donation";

                    }

                    
                    $pName = window.location.href;
                    $pSku = $('#bboxdonation_gift_rdlstGivingLevels input[type="radio"]:checked').val();
                    $revenue = $('#bboxdonation_gift_rdlstGivingLevels input[type="radio"]:checked').val();
                    //console.log($pCategory);
                    //console.log($pName);
                    //console.log($revenue);
                    //console.log($pSku);

                    if($pSku.includes('rdGivingLevel')) {

                     $pSku = $('.BBFormGiftOtherAmount').val();

                        if(!($pSku.includes('$'))) {
                        
                            $pSku = "$" + $pSku;
                        }
                       
                    }
                    else{

                        $pSku = "$" + $pSku;
                    }

                    if($pCategory == "Single Donation" && $monthly_exists){

                    $('.donation-highlight-text').html('You are making a one-off donation of ' + $pSku);

                    }

                    if($pCategory == "Monthly Donation" && $monthly_exists){

                    $('.donation-highlight-text').html('You are making a monthly donation of ' + $pSku);

                    }

                    if(!($monthly_exists)) {

                    $('.donation-highlight-text').html('You are making a one-off donation of ' + $pSku);

                    }

            
            //console.log(current.index());
            
            if( current.index() == 0 ) {
                $('.donate-form__step').removeClass('donate-form__step--current');
                $('.donate-form__steps').find('.donate-form__step:eq(1)').addClass('donate-form__step--current');
                $('.form-container .go-back').show();
                $('body').removeClass('form-first-step');
                
                top_element.scrollIntoView();
                $('.BBDFormSectionBillingInfo,.form-container .button-wrapper .button--orange').show();
                $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo,#bboxdonation_designation_divSection,.BBFormProgressContainer,.BBDFormSectionTributeInfo,.BBDFormSectionComments').hide();
                $('.BBDFormSectionBillingInfo,.form-container .button-wrapper .button--orange').show();

                 let donateParams = new URLSearchParams(window.location.search)
                if(donateParams.has('amount') || donateParams.has('donate') || $('body').hasClass('monthly-info-upd')){

                    if(!($pSku.includes('rdGivingLevel'))) {
                        $pSku = $pSku;

                        $('.BBFormRadioGivingLevelOther').prop("checked", true);
                    $('.BBFormGiftOtherAmount').val($pSku);
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
            else if( current.index() == 1 ) {



                var n = [],
                step = true;
                
                n.push(validationForm($fname));
                n.push(validationForm($lname));
                n.push(validationForm($email));
                n.push(validationForm($address));
                n.push(validationForm($city));
                n.push(validationForm($state));
                n.push(validationForm($postcode));
                
                step = n.every(Boolean);

                $('.main-error').show();
                
                //console.log(n,step);
                if( step == true ) {
                    
                    /*$pCategory = $('#bboxdonation_recurrence_divRecurrenceCheckbox input[type="radio"]:checked').val();*/
                    $pName = window.location.href;
                    $pSku = $('#bboxdonation_gift_rdlstGivingLevels input[type="radio"]:checked').val();
                    $revenue = $('#bboxdonation_gift_rdlstGivingLevels input[type="radio"]:checked').val();

                    
                   if($pSku.includes('rdGivingLevel')) {
                        $pSku = 'OTHER';
                        $revenue = $('.BBFormGiftOtherAmount').val();
                    }
                    else{

                        $pSku = "dollar_"+$pSku;
                    }

                    if($pCategory == "Single Donation"){

                        $pCategorydata = "one-off donation";

                    }

                    else if($pCategory == "Monthly Donation"){

                         $pCategorydata = "monthly donation";

                    }

                    else{
                        
                        $pCategorydata = $pCategory;

                    }

            
                    
                    
                    $('.donate-form__step').removeClass('donate-form__step--current');
                    $('.donate-form__steps').find('.donate-form__step:eq(2)').addClass('donate-form__step--current');
                
                   
                    var element = document.getElementById("bbox-container");
                    element.scrollIntoView();

                    $('.main-error').hide();
                    $('body').addClass('show-payment-step');
                    $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo,.BBDFormSectionBillingInfo,.BBFormProgressContainer,.BBDFormSectionTributeInfo,.BBDFormSectionComments').hide();
                    $('.BBFormButtonRow,.BBDFormSectionPaymentInfo').show();
                    $('.form-container .button-wrapper .button--orange').hide();
                    
                    if( $('.BBFormErrorBlock').find('.BBFormErrorItem').length > 0 ) {
                        $('.BBFormErrorBlock').show();
                    }
                    else {
                        $('.BBFormErrorBlock').hide();
                    }

                    

                  
                    
                    console.log($pCategorydata,window.location.pathname.toLowerCase(),$pSku.toLowerCase(),$revenue);
                    console.log($pCategorydata,window.location.pathname.toLowerCase(),$pSku.toLowerCase(),$revenue.replace("$",""));
                }
            }
            
        });
        
        
        
        
        $('.donate-form__step,.form-container .go-back .go-back-text').on('click', function(){
            
            var current = $('.donate-form__steps').find('.donate-form__step--current'),prev;
               
            if($(this).hasClass("go-back-text")){

                prev = $(".donate-form__step--current").prev();

            }
            else{

                prev = $(this);
            }
            
            if( current.index() > prev.index() ) {
                $('.donate-form__step').removeClass('donate-form__step--current');
                prev.addClass('donate-form__step--current');
                $('body').removeClass('show-payment-step');
            
                if( prev.index() == 0 ) {

                $('.form-container .go-back').hide();
                $('body').addClass('form-first-step');
                    $('.form-container .button-wrapper .button--orange,.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo,.BBFormProgressContainer,.BBDFormSectionTributeInfo').show();
                    $('.BBDFormSectionBillingInfo,.BBFormButtonRow,.BBDFormSectionPaymentInfo,.BBFormErrorBlock').hide();
                       
                         if($('#bboxdonation_tribute_chkTributeGift').length){
                       if($('#bboxdonation_tribute_chkTributeGift')[0].checked){
                            $(".BBDFormSectionComments").show();


                        }}
                    
                    if ($flag_designation_show == true && ($('.single-donation-btn').hasClass('monthly-not-active'))){

                      
                         $('#bboxdonation_designation_divSection').show();
                    

                    }
                }
                else if( prev.index() == 1 ) {

                    $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo,.BBFormButtonRow,.BBDFormSectionPaymentInfo,.BBFormErrorBlock,.BBFormProgressContainer,.BBDFormSectionTributeInfo,.BBDFormSectionComments').hide();
                    $('.form-container .button-wrapper .button--orange,.BBDFormSectionBillingInfo').show();
                }
            }
            
        });

       function monthlyUpdateInfo() {

       					$('body').addClass('monthly-info-upd');
        				$('#bboxdonation_gift_rdGivingLevel1').val('22');
                        $('#bboxdonation_gift_rdGivingLevel1').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$22');
                        $('#bboxdonation_gift_rdGivingLevel1').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html('Provides a woman with handicraft skills training')

                        $('#bboxdonation_gift_rdGivingLevel2').val('30');
                        $('#bboxdonation_gift_rdGivingLevel2').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$30');
                        $('#bboxdonation_gift_rdGivingLevel2').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html('Will provide two women a month with nutritious food')

                        

                          $('#bboxdonation_gift_rdGivingLevel3').val('56');
                         $('#bboxdonation_gift_rdGivingLevel3').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$56');
                         $('#bboxdonation_gift_rdGivingLevel3').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html('Provides a nightgown, slippers, blanket and dress every month');


						$('#bboxdonation_gift_rdGivingLevel4').val('100');
                         $('#bboxdonation_gift_rdGivingLevel4').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$100'); $('#bboxdonation_gift_rdGivingLevel4').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html('Fund one standard fistula repair surgery every year');


                          $('#bboxdonation_gift_rdGivingLevel5').val('290');
                         $('#bboxdonation_gift_rdGivingLevel5').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$290');
                         $('#bboxdonation_gift_rdGivingLevel5').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html('Fund one complex fistula operation every year that will restore a woman’s life');

        }


function setSinglPaymentonLoad(){

single_payment_var[0] = $('#bboxdonation_gift_rdGivingLevel1').val();
single_payment_var[1] = $('#bboxdonation_gift_rdGivingLevel2').val();
single_payment_var[2] = $('#bboxdonation_gift_rdGivingLevel3').val();
single_payment_var[3] = $('#bboxdonation_gift_rdGivingLevel4').val();
single_payment_var[4] = $('#bboxdonation_gift_rdGivingLevel5').val();


single_payment_html_var[0] = $('#bboxdonation_gift_rdGivingLevel1').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html();
single_payment_html_var[1] = $('#bboxdonation_gift_rdGivingLevel2').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html();
single_payment_html_var[2] = $('#bboxdonation_gift_rdGivingLevel3').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html();
single_payment_html_var[3] = $('#bboxdonation_gift_rdGivingLevel4').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html();
single_payment_html_var[4] = $('#bboxdonation_gift_rdGivingLevel5').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html();


//console.log(single_payment_var[0],single_payment_var[1],single_payment_var[2],single_payment_var[3],single_payment_var[4],single_payment_html_var[0],single_payment_html_var[1],single_payment_html_var[2],single_payment_html_var[3],single_payment_html_var[4]);


}


            function singleUpdateInfo() {

					$('body').removeClass('monthly-info-upd');
        				$('#bboxdonation_gift_rdGivingLevel1').val(single_payment_var[0]);
                        $('#bboxdonation_gift_rdGivingLevel1').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$'+single_payment_var[0]);
                        $('#bboxdonation_gift_rdGivingLevel1').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html(single_payment_html_var[0])

                        $('#bboxdonation_gift_rdGivingLevel2').val(single_payment_var[1]);
                        $('#bboxdonation_gift_rdGivingLevel2').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$'+single_payment_var[1]);
                        $('#bboxdonation_gift_rdGivingLevel2').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html(single_payment_html_var[1])

                        

                          $('#bboxdonation_gift_rdGivingLevel3').val(single_payment_var[2]);
                         $('#bboxdonation_gift_rdGivingLevel3').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$'+single_payment_var[2]);
                         $('#bboxdonation_gift_rdGivingLevel3').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html(single_payment_html_var[2]);


						$('#bboxdonation_gift_rdGivingLevel4').val(single_payment_var[3]);
                         $('#bboxdonation_gift_rdGivingLevel4').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$'+single_payment_var[3]); $('#bboxdonation_gift_rdGivingLevel4').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html(single_payment_html_var[3]);


                          $('#bboxdonation_gift_rdGivingLevel5').val(single_payment_var[4]);
                         $('#bboxdonation_gift_rdGivingLevel5').siblings('.BBFormRadioLabel').find('.BBFormRadioAmount').html('$'+single_payment_var[4]);
                         $('#bboxdonation_gift_rdGivingLevel5').siblings('.BBFormRadioLabel').find('.BBFormRadioDescription').html(single_payment_html_var[4]);

        }
        
        
        function validationForm(id){
            if( id.val() == '') {
                id.addClass('has-error');
                id.next('.error-text').show();
                id.next('.error-text').addClass('error-shown');
                return false;
            }
            else {

                if(id.attr('type') == "email"){

                    

                    if(!validateEmail(id.val())){

                  
                        id.addClass('has-error');
                        id.next('.error-text').show();
                        id.next('.error-text').addClass('error-shown');
                        return false;
                    } 
                }

                id.removeClass('has-error');
                id.next('.error-text').hide();
                id.next('.error-text').removeClass('error-shown');
                return true;
            }
        }

        function validateEmail(email) 
        {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
        }
        
      
    });
    

