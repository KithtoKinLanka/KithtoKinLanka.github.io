$(document).ready(function(){
    
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
        output.innerHTML = "";
        output.appendChild(textNode);
    };

    // listen to "keyup", but also "change" to update when the user selects a country
    input.addEventListener('change', handleChange);
    input.addEventListener('keyup', handleChange);

    /****Phone number controls END*/

    //Resident Type 'Other' checkbox behavior
    $('input[type=radio][name=crestype]').change(function () {
        if (this.value == 'Other') {
            $("#otherRestypeDiv").show();
        } else {
            $("#otherRestypeDiv").hide();
        }
    });
    $(".next").click(function () {
               
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        
        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    
        //show the next fieldset
        next_fs.show(); 
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({'opacity': opacity});
            }, 
            duration: 600
        });
        
    });

    $("#on_profile_next").click(function () {
        readProfilePageInputs();
        validateProfilePageFields();
    });

    $("#save_details").click(function () {
        //readProfilePageInputs();
        readServiceInfoPageInputs();
        formData = createRequestJson();
        $.ajax({
            url: "/ConnectionRequest/SaveFormData",
            type: "POST",
            data: JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.success) {
                    alert(result.message);
                } else {
                    alert("An error occurred.");
                }
            }
        });
    });
    function validateProfilePageFields()
    {
        if (name === "") {
            $("#cname").css("border-color", "#e06f7e");
        } else {
            $("#cname").css("border-color", "#ccc");
        }
        if (email === "") {
            $("#cname").css("border-color", "#e06f7e");
        } else {
            $("#cname").css("border-color", "#ccc");
        }
        
        //alert("name:" + name + " email:" + email + " whatsapp:" + whatsapp + " cres:" + country_of_residence + " cityres:" + city_of_residence + " restype:" + residece_type + " yabr:" + years_abroad);
    }

    function profileErrorMessageHide() {
        $("#profileErrorMsg").hide();
    }
    function profileErrorMessageShow() {
        $("#profileErrorMsg").show();
    }
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

    function createRequestJson() {
        var formData = {
            Name: name,
            Email: email,
            WhatsAppNumber: whatsapp,
            ContryOfResidence: country_of_residence,
            CityOfResidence: city_of_residence,
            ResidenceType: residece_type,
            ResdentTypeOtherText: resident_type_other_text,
            YearsAbroad: years_abroad,
            Languages: JSON.parse(JSON.stringify(languages)),
            CommunicationMethods: JSON.parse(JSON.stringify(comMethods)),
            CallTime: JSON.parse(JSON.stringify(timeForCall)),
            ServiceTypes: JSON.parse(JSON.stringify(serviceTypes))
        };

        return formData;
    }
    $(".previous").click(function(){
    
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();
    
        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({'opacity': opacity});
            }, 
            duration: 600
        });
    });

    $('.radio-group .radio').click(function(){
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });

    $(".submit").click(function(){
        return false;
    })
    
});