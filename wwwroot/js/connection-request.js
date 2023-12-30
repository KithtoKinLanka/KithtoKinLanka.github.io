$(document).ready(function () {
    
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;

    // profile page input vars
    var name;
    var email;
    var whatsapp;
    var country_of_residence;
    var city_of_residence;
    var residece_type;
    var resident_type_other_text=null;
    var years_abroad;


    //serviceInfo page inputs
    var languages;
    var comMethods;
    var timeForCall;
    var serviceTypes;

    

    //*******Getting started Modal function************/
    $('#disclaimerModal').modal({ backdrop: 'static', keyboard: false });//make the grey area around the modal unclickable
    $('#disclaimerModal').modal('show');
    $('#alertModalError').hide();

    $('#confirmButton').click(function () {
        $('#disclaimerModal').modal('show');
        var isChecked = $('#agreeCheckbox').is(':checked');
        if (isChecked) {
            $('#alertModalError').hide();
            $('#disclaimerModal').modal('hide');
        } else {
            $('#alertModalError').show();
        }
    });

    $('#agreeCheckbox').change(function () {
        var t = $("#otherResTypeInputText");
        if ($('#agreeCheckbox').is(':checked')) {
            $('#alertModalError').hide();
        }
    });

    


    /*****Modal function END ****/

    /*** Phone number input controls****/
    const input = document.querySelector("#phone");
    const output = document.querySelector("#output");

    const iti = window.intlTelInput(input, {
        nationalMode: true,
        separateDialCode: true,
        utilsScript: "js/phn_number/utils.js"
    });

    const handleChange = () => {
        let text;
        if (input.value) {
            text = iti.isValidNumber()
                ? "Valid number! Full international format: " + iti.getNumber()
                : "Invalid number - please try again";

        } else {
            text = "Please enter a valid number below";
        }
        const textNode = document.createTextNode(text);
        text.startsWith("Invalid") ? output.style.color = "red" : output.style.color = "";
        output.innerHTML = "";
        output.appendChild(textNode);
    };

    // listen to "keyup", but also "change" to update when the user selects a country
    //input.addEventListener('change', handleChange);
    //input.addEventListener('keyup', handleChange);
    input.addEventListener('blur', handleChange);

    /****Phone number controls END*/

    //*********Resident Type 'Other' checkbox behavior
    $('input[type=radio][name=crestype]').change(function () {
        if (this.value == 'Other') {
            $("#otherRestypeDiv").fadeIn();
        } else {
            $("#otherRestypeDiv").fadeOut();
        }
    });
    //********** */

    /*****Service info field functions  */

    /****** */
    $('input[name="comMethodInput"]').on("change", function () {
        var checkedValues = $.map($('input[name="comMethodInput"]:checked'), function (c) { return c.value; });
        if (checkedValues.includes('WhatsApp_Call') || checkedValues.includes('WhatsApp_Text')) {
            $('#timePickFieldsDiv').fadeIn();
        } else {
            $('#timePickFieldsDiv').fadeOut();
        }
    });

    /*** Profile form field Validation **********************/

    $("#cname").on("blur", function () {
        validateNameField();
    });
    $("#cemail").on("blur", function () {
        validateEmailField();
    });

    $("#crescountry").on("blur", function () {
        validateCountryofResField();
    });

    $("#crescity").on("blur", function () {
        validateCityofResField();
    });

    $("#otherResTypeInputText").on("blur", function () {
        validateOtherResTypeField();
    });

    $('input[name="crestype"]').on("change", function () {
        validateResTypeRadio();
    });

    $('input[name="durationOption"]').on("change", function () {
        validateYearsAbroadRadio();
    });

    function validateNameField() {
        element = $("#cname");
        if ($(element).val() === "") {
            applyValidationErrorStyles(element);
            $('#cnamevalidationError').show();
            return false;
        } else {
            removeValidationErrorStyles(element);
            $('#cnamevalidationError').hide();
            return true;
        }
    }

    function validateEmailField() {
        element = $("#cemail");
        if (($(element).val() !== "" && !document.getElementById("cemail").checkValidity()) || $(element).val() === "") {
            applyValidationErrorStyles(element);
            $('#cemailvalidationError').show();
            return false;
        } else {
            removeValidationErrorStyles(element);
            $('#cemailvalidationError').hide();
            return true;
        }
    }

    function validateCountryofResField() {
        element = $("#crescountry");
        var value = $(element).find(":selected").val()
        if (value === "") {
            applyValidationErrorStyles(element);
            $('#resCountryvalidationError').show();
            return false;
        } else {
            removeValidationErrorStyles(element);
            $('#resCountryvalidationError').hide();
            return true;
        }
    }

    function validateCityofResField() {
        element = $("#crescity");
        if ($(element).val() === "") {
            applyValidationErrorStyles(element);
            $('#resCityvalidationError').show();
            return false;
        } else {
            removeValidationErrorStyles(element);
            $('#resCityvalidationError').hide();
            return true;
        }
    }

    function validateOtherResTypeField() {
        if ($('input[name="crestype"]:checked').val() === 'Other') {
            element = $("#otherResTypeInputText");
            if ($(element).val() === "") {
                applyValidationErrorStyles(element);
                $('#otherResTypeValidationError').show();
                return false;
            } else {
                removeValidationErrorStyles(element);
                $('#otherResTypeValidationError').hide();
                return true;
            }
        }

        return true;
    }
    function validateResTypeRadio() {
        var input = $('input[name="crestype"]:checked').val();
        if (input == undefined) {
            $('#resTypeValidationError').show();
            return false;
        } else {
            $('#resTypeValidationError').hide();
            return true;
        }
    }

    function validateYearsAbroadRadio() {
        var input = $('input[name="durationOption"]:checked').val();
        if (input == undefined) {
            $('#rearsAbroadValidationError').show();
            return false;
        } else {
            $('#rearsAbroadValidationError').hide();
            return true;
        }
    }

    function validatePhoneNumber() {
        var text = $('#output').html();
        if (!text.startsWith("Valid number!")) {
            document.querySelector("#output").style.color = "red";
            return false;
        }
        document.querySelector("#output").style.color = "";
        return true;
    }

    function applyValidationErrorStyles(element) {
        $(element).css("border-color", "#e06f7e");
        $(element).css("margin-bottom", "3px");
    }

    function removeValidationErrorStyles(elemet) {
        $(elemet).css("border-color", "");
        $(elemet).css("margin-bottom", "");
    }
    function validateProfilePageFields()
    {

        return validateNameField() &&
            validateEmailField() &&
            validatePhoneNumber() &&
            validateCountryofResField() &&
            validateCityofResField() &&
            validateResTypeRadio() &&
            validateOtherResTypeField() &&
            validateYearsAbroadRadio();

    }
    /******* */

    /***** service infor field validations*/

    function readAndValidateSvcInfoFields() {
        readServiceInfoPageInputs();

        if (serviceTypes.length === 0 || languages.length === 0 || comMethods.length === 0 ) {
            svcInfoValidationErrorMsgShow();
            return false;
        }

        if (comMethods.length !== 0 && (comMethods.includes('WhatsApp_Call') || comMethods.includes('WhatsApp_Text'))) {
            if (timeForCall.length === 0) {
                svcInfoValidationErrorMsgShow();
                return false;
            }
        }
        svcInfoValidationErrorMsgHide();
        return true;
    }

    function svcInfoValidationErrorMsgHide() {
        $("#svcInfoValidationErrorMsg").hide();
    }
    function svcInfoValidationErrorMsgShow() {
        $("#svcInfoValidationErrorMsg").show();
    }
    /***** */

    /***Input value reads*******/
    function readProfilePageInputs() {
        name = $("#cname").val();
        email = $("#cemail").val();
        whatsapp = iti.getNumber();
        country_of_residence = $('#crescountry').find(":selected").val();
        city_of_residence = $("#crescity").val();
        residece_type = $('input[name="crestype"]:checked').val();
        years_abroad = $('input[name="durationOption"]:checked').val();
        if (residece_type === "Other") {
            resident_type_other_text = $('#otherResTypeInputText').val();
        }
    }

    function readServiceInfoPageInputs() {
        languages = $.map($('input[name="languageInput"]:checked'), function (c) { return c.value; });
        comMethods = $.map($('input[name="comMethodInput"]:checked'), function (c) { return c.value; });
        timeForCall = $.map($('input[name="comTimeInput"]:checked'), function (c) { return c.value; });
        serviceTypes = $.map($('input[name="serviceTypeInput"]:checked'), function (c) { return c.value; });
        //alert(timeForCall);
    }
    /********************** */
    

    /***** button functions******/
    $("#on_profile_next").click(function () {

        //validate fields on the page
        readProfilePageInputs();
        var isValid = validateProfilePageFields();

        if (!isValid) {
            return false;
        }
        
        showNextFormPage(this);

    });

    $(".previous").click(function () {

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({ 'opacity': opacity });
            },
            duration: 600
        });
    });

    $("#save_details").click(function () {
        var isValid = readAndValidateSvcInfoFields();

        if (!isValid) {
            return false;
        }

        formData = createRequestJson();
        inputData = JSON.stringify(formData);
        $.ajax({
            url: "/ConnectionRequest/SaveFormData",
            type: "POST",
            data: inputData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.success) {
                    $('#confirmationNumber').text(result.confirmationId);
                    $('#failConfirmDiv').hide();
                    $('#successConfirmDiv').show();
                } else {
                    $('#failConfirmDiv').show();
                    $('#successConfirmDiv').hide();
                    console.log(result.stack);
                }
            }
        });

        showNextFormPage(this);
    });
    

    $('.radio-group .radio').click(function(){
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });

    /*** UTILITY functions*/
    function createRequestJson() {
        var formData = {
            Name: name,
            Email: email,
            WhatsAppNumber: whatsapp,
            ContryOfResidence: country_of_residence,
            CityOfResidence: city_of_residence,
            ResidenceType: residece_type,
            ResidentTypeOtherText: resident_type_other_text,
            YearsAbroad: years_abroad,
            Languages: JSON.parse(JSON.stringify(languages)),
            CommunicationMethods: JSON.parse(JSON.stringify(comMethods)),
            CallTime: JSON.parse(JSON.stringify(timeForCall)),
            ServiceTypes: JSON.parse(JSON.stringify(serviceTypes))
        };

        return formData;
    }

    function showNextFormPage(currentPage) {
        current_fs = $(currentPage).parent();
        next_fs = $(currentPage).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({ 'opacity': opacity });
            },
            duration: 600
        });
    }
    /***** */
    
});