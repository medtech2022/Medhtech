
/**
 * 
 */
const URL_POPULATE = "/org/ajax/populateOfficeForm";


/**
 * Populate the form of the given patient
 *
 * 
 */
var populateForm = function (data, url) {

	$.get(
		url, 
		data,
		function (result) {
			console.log(result);
			for (var key in result) {
				form.dynamicFormPopulate(key, result[key]);
				// updateBmi();

			}
		}
	).fail(function (result) {
		console.error("Population Error:", result);
	});

};

var onEditOfficeMainForm = function (formObj, fields, response) {
	if (response.status == 200) {
		$(".alert").show();
		$("#text").html('Office  Updated Successfully!');
		$("#edit_office_modal").modal('hide');
		getofficelisting();
		var scrollPos = $(".main-content").offset().top;
		$(window).scrollTop(scrollPos);
		setTimeout(function () { $('.alert-success').fadeOut();
		//goToNextStep("drug-icon-pill"); 
		}, 3000);
	}
};

var onOfficeMainForm = function (formObj, fields, response) {
	if (response.status == 200) {
		$("#main_office_form")[0].reset();
		$(".alert").show();
		$("#text").html('Office Added Successfully!');
		$("#add_office_modal").modal('hide');
		getofficelisting();
		var scrollPos = $(".main-content").offset().top;
		$(window).scrollTop(scrollPos);
		setTimeout(function () { $('.alert-success').fadeOut();
		//goToNextStep("drug-icon-pill"); 
		}, 3000);

	}
};


var onResult = function (form, fields, response, error) {
	if (error) {
	}
	else {
		window.location.href = response.data.redirect;
	}
};
var init = function () {
	// getofficelisting();
	form.ajaxForm("main_office_form", onOfficeMainForm, function () {
		return true;
	});
	
	form.ajaxForm("main_edit_office_form", onEditOfficeMainForm, function () {
		return true;
	});	
	

	$('body').on('click', '.addOffice', function () {
	    $("#main_office_form")[0].reset();
	    $('#add_office_modal').modal('show');
	    
	});
	

	$('body').on('click', '.editOffice', function () {
	    $("#main_edit_office_form")[0].reset();
	    $('#edit_office_modal').modal('show');
	    // var sPageURL = window.location.pathname;
	    // parts = sPageURL.split("/"),
	    // id = parts[parts.length - 1];
	    var id = $(this).data('id');;
	    var data = "";
	    var formpopulateurl = URL_POPULATE + "/" + id;
	    populateForm(data, formpopulateurl);
	});

		
	// var sPageURL = window.location.pathname;
	// parts = sPageURL.split("/"),
	// 	id = parts[parts.length - 1];
	// var patientId = id;

	// var data = "";
	// var formpopulateurl = URL_POPULATE + "/" + patientId;
	// populateForm(data, formpopulateurl);
	
};

window.office = {
	init: init,
	onResult: onResult
};

 