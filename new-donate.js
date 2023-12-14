$(document).ready(function() {
    var flag =true,
        $fname,$lnam,$email,$address,$city,$state,$postcode,$pCategory,$pName,$pSku,$revenue,$monthly_exist,$flag_designation_show = false;
        
        
    $('#bbox-root').on("DOMNodeInserted", function (ev) {
        $('#mongo-form').on("DOMNodeInserted", function (ev) {
            if(flag == true){
                flag = false;

                /* set designation visibility */

                flag_url = window.location.href;

                $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo').show();
                
                window.flag_designation_show = true;


                
                /* set preset values based on utm parameters */
                console.log(document.getElementById('bboxdonation_designation_ddDesignations').childElementCount);
                let donateParams = new URLSearchParams(window.location.search);
                if(donateParams.has('disableDesignation') || document.getElementById('bboxdonation_designation_ddDesignations').childElementCount < 2){

                    window.flag_designation_show = false;

                }
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
                
                updateDonationValues(donateParams);


            

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

            

                $('.donate-form__steps,.contents .button-wrapper').css({'opacity':1});
                
              
                if(donateParams.has('disableTribute')){
                    $('.BBDFormSectionBillingInfo fieldset').before('<p class="donation-highlight-text"><p>');
                }
                else{
                    $('.BBDFormSectionTributeInfo fieldset').before('<p class="donation-highlight-text"><p>');
                }
            


                //designation
                if( !window.flag_designation_show ){
                    $('#bboxdonation_designation_divSection').hide();
                }

                // tribute box
                if(donateParams.has('disableTribute')){
                    $('.BBDFormSectionTributeInfo').addClass('hidden');
                }

                

                /* Utm parameter intialize */

                if(donateParams.has('type')){

                    let donateparamVal = donateParams.get('type')

                    if (donateparamVal == "monthly"){
                        
                        $("#bboxdonation_recurrence_lblRecurringGift").trigger("click");
                    }
            
                }
            }
           else if(document.getElementById('bboxdonation_divThanks') && !window.purchaseSentToAnalytics){
                window.purchaseSentToAnalytics = true;
                sendPurchaseDataToAnalytics();
            }
        });
    });
    
    

    $('body').on('click','#bboxdonation_recurrence_lblRecurringGift',function(){
        
        if($('#bboxdonation_recurrence_chkMonthlyGift').is( ":checked" )){
            $('#mongo-form').addClass('monthly-donation');
            $('#bboxdonation_designation_divSection').slideUp(225);
        }
        else{
            // single donation
            $('#mongo-form').removeClass('monthly-donation');
            if(window.flag_designation_show){
                $('#bboxdonation_designation_divSection').slideDown(225);
            }
        }
        /*
        if(($('.single-donation-btn').hasClass('monthly-not-active'))){
            $('.single-donation-btn').removeClass('monthly-not-active');
            $('#mongo-form').addClass('monthly-donation');
            $('#bboxdonation_designation_divSection').slideUp(225);
            
            } */ 


    });

    // add edit button
    // $('.donation-highlight-text').append('. <button type="button" onclick=goBackToFirstStep>Edit</button>')

    function goBackToFirstStep(){
        const form = $('#mongo-form');
        if(form.hasClass('step-2')){
            form.removeClass('step-2');
        }
    }
    
    $('.contents .button-wrapper .button--orange').on('click', function(){

        $('#mongo-form').addClass('step-2');
        
        window.isMonthly = document.getElementById('bboxdonation_recurrence_chkMonthlyGift').checked ? 'monthly' : 'one-off';
        console.log(window.isMonthly);

        if(document.querySelector('.BBFormRadioGivingLevel:checked').classList.contains('BBFormRadioGivingLevelOther')){
                window.selectedAmount = document.querySelector('.BBFormTextbox.BBFormGiftOtherAmount').value.replace('$', '');
                window.selectedAmount = parseFloat(window.selectedAmount.replace(',',''));
                window.itemId = 'other';
        }
        else {
            window.selectedAmount = document.querySelector('.BBFormRadioGivingLevel:checked').value;
            window.itemId = 'dollar' + window.selectedAmount;
        }

        sendStepDataToAnalytics('firstDonationStepCompleted');
        //sendPurchaseDataToAnalytics();

        
        var current = $('.donate-form__steps').find('.donate-form__step--current');

                $pCategory = "Single Donation";

                

                if($('#bboxdonation_recurrence_chkMonthlyGift').is(':checked')){

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

                if($pCategory == "Single Donation"){

                $('.donation-highlight-text').html('You are making a one-off donation of ' + $pSku);

                }

                if($pCategory == "Monthly Donation"){

                $('.donation-highlight-text').html('You are making a monthly donation of ' + $pSku);

                }

                else{

                $('.donation-highlight-text').html('You are making a one-off donation of ' + $pSku);

                }

        
        //console.log(current.index());
        
        if( current.index() == 0 ) {
            $('.donate-form__step').removeClass('donate-form__step--current');
            $('.donate-form__steps').find('.donate-form__step:eq(1)').addClass('donate-form__step--current');
            
            $('.BBDFormSectionBillingInfo,.contents .button-wrapper .button--orange').show();
            $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo,#bboxdonation_designation_divSection,.BBFormProgressContainer').hide();
            $('.BBDFormSectionBillingInfo,.contents .button-wrapper .button--orange').show();

            let donateParams = new URLSearchParams(window.location.search)
            if(donateParams.has('amount') || donateParams.has('donate')){

                
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
            $('.BBFormButtonRow,.BBDFormSectionPaymentInfo').show();
            $('.contents .button-wrapper .button--orange').hide();
                
            
        }
        else if( current.index() == 1 ) {

            var n = [],
            step = true;
            
            n.push(validationForm($fname));
            n.push(validationForm($lname));
            n.push(validationForm($email));
            n.push(validationForm($address));
            n.push(validationForm($city));
            n.push(validationForm($postcode));
            
            step = n.every(Boolean);
            
            //console.log(n,step);
            if( step == true ) {
                
                /*$pCategory = $('#bboxdonation_recurrence_divRecurrenceCheckbox input[type="radio"]:checked').val();*/
                $pName = window.location.href;
                $pSku = $('#bboxdonation_gift_rdlstGivingLevels input[type="radio"]:checked').val();
                $revenue = $('#bboxdonation_gift_rdlstGivingLevels input[type="radio"]:checked').val();

                
                if($pSku == '25') {
                    $pSku = 'DONATE25';
                }
                else if($pSku == '50') {
                    $pSku = 'DONATE50';
                }
                else if($pSku == '75') {
                    $pSku = 'DONATE75';
                }
                else if($pSku == '100') {
                    $pSku = 'DONATE100';
                }
                else if($pSku.includes('rdGivingLevel')) {
                    $pSku = 'OTHER';
                    $revenue = $('.BBFormGiftOtherAmount').val();
                }
                
                
                $('.donate-form__step').removeClass('donate-form__step--current');
                $('.donate-form__steps').find('.donate-form__step:eq(2)').addClass('donate-form__step--current');
            
                $('body').addClass('show-payment-step');
                $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo,.BBDFormSectionBillingInfo,.BBFormProgressContainer').hide();
                $('.BBFormButtonRow,.BBDFormSectionPaymentInfo').show();
                $('.contents .button-wrapper .button--orange').hide();
                
                if( $('.BBFormErrorBlock').find('.BBFormErrorItem').length > 0 ) {
                    $('.BBFormErrorBlock').show();
                }
                else {
                    $('.BBFormErrorBlock').hide();
                }
                
                //console.log($pCategory,$pName,$pSku,$revenue);
            }
        }
        document.querySelector('#floating-button-container a').click();
    });
    document.addEventListener( "click", handleSecurePaymentButtonClick );

    function handleSecurePaymentButtonClick(event){
        if(event.target.id === 'bboxdonation_btnSecurePayment'){
            let preventRunning = false;
            $('#mongo-form').on("DOMNodeInserted", function (ev) {
                if(!preventRunning){
                    console.log('run');
                    preventRunning = true;
                    updateDonationValues();
                    
                    // by default, when the form reloads it has the "other amount" selected with the previously selected amount
                    // so we select the previously selected radio button so it looks the same for the user as when they sent the form
                    if(document.querySelector('input.BBFormRadioGivingLevelOther').checked){
                        let otherAmount = document.querySelector('.BBFormTextbox.BBFormGiftOtherAmount').value;
                        otherAmount = otherAmount.replace('$','');
                        otherAmount = otherAmount.replace(',','');
                        otherAmount = parseInt(otherAmount);
                        const radioSelector = document.querySelector('input.BBFormRadioGivingLevel[value="' + otherAmount + '"]');
                        if(radioSelector){
                            radioSelector.nextElementSibling.click();
                        }
                    }
                }
            });
        }
    }
    
    
    $('.donate-form__step').on('click', function(){
        
        var current = $('.donate-form__steps').find('.donate-form__step--current'),
            prev = $(this);
        
        if( current.index() > prev.index() ) {
            $('.donate-form__step').removeClass('donate-form__step--current');
            $(this).addClass('donate-form__step--current');
            $('body').removeClass('show-payment-step');
        
            if( prev.index() == 0 ) {
                $('.contents .button-wrapper .button--orange,.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo,.BBFormProgressContainer').show();
                $('.BBDFormSectionBillingInfo,.BBFormButtonRow,.BBDFormSectionPaymentInfo,.BBFormErrorBlock').hide();
                if (window.flag_designation_show == true && ($('.single-donation-btn').hasClass('monthly-not-active'))){

                
                    $('#bboxdonation_designation_divSection').show();
                

                }
            }
            else if( prev.index() == 1 ) {

                $('.BBDFormSectionGiftInfo,.BBFormSectionRecurrenceInfo,.BBFormButtonRow,.BBDFormSectionPaymentInfo,.BBFormErrorBlock,.BBFormProgressContainer').hide();
                $('.contents .button-wrapper .button--orange,.BBDFormSectionBillingInfo').show();
            }
        }
        
    });
    
    
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
    //const form = document.getElementById('submissionForm') ? document.getElementById('submissionForm') : document.getElementById('mongo-form');
    //form.addEventListener("submit", sendPurchaseDataToAnalytics);


    function sendPurchaseDataToAnalytics(){
        let currentDate = new Date(); 
        let transactionId = "" + currentDate.getDate() + currentDate.getMonth() + currentDate.getFullYear() + currentDate.getHours() + currentDate.getMinutes() + '_' + (Math.random() + 1).toString(36).substring(2);
        dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
            event: 'purchase',
            ecommerce: {
                transaction_id: transactionId,
                value: parseFloat(window.selectedAmount),
                currency: 'AUD',
                items: [
                    {
                        item_id: window.itemId,
                        item_name: window.location.pathname,
                        index: 0,
                        item_category: window.isMonthly + ' donation',
                        item_category2: "OLX donation form",
                        price: parseFloat(window.selectedAmount),
                        quantity: 1

                    }
                ]
            }
        });
        console.log({
            event: eventName,
            value: parseFloat(window.selectedAmount),
            item_id: window.itemId,
            item_name: window.location.pathname,
            item_category: window.isMonthly
        });
    }

    function sendStepDataToAnalytics(eventName){
        window.dataLayer.push({
            event: eventName,
            value: parseFloat(window.selectedAmount),
            item_id: window.itemId,
            item_name: window.location.pathname,
            item_category: window.isMonthly + ' donation'
        });
    }

    function updateDonationValues(donateParams = new URLSearchParams(window.location.search)){
        console.log('updated');
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
    }
});
