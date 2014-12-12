$(document).ready(function(){
$('#display').val(0);

var initial = true;
var n1 = '';
var f = '';
var n2 = '';
var display = '';


// Add number
$("button.n").click(function(){
// If display is in initial state, clear display and add number
		if(initial){
			$('#display').val('');
			$('#display').val($(this).val());
			initial = false;
	}
	else{
// Check the length of number entered
		if($('#display').val().length > 7){
			alert("You may only enter a number with 8 digits or less.");
		}
		else{
			display = $('#display').val() + $(this).val();
			$('#display').val(display);
		}
	}
});


// Add function
$("button.f").click(function(){
// If no number in display, error message
	if(!n1 && initial){
		alert("Please enter a number before entering a function.");
	}
	else if(!n1 && !initial){
		n1 = $('#display').val();
		f = $(this).val();
		$('#display2').val(n1+f);
		$('display').val(n1);
		initial = true;

	}
	else{
		n2 = $('#display').val();
		if(f == '/' && n2 == '0'){
			initial = true; 	n1 = '';	f = '';		n2 = '';	display = '';
			$('#display').val('Infinity');
			$('#display2').val('');
		}
		else{
		alert("Calculate: " + n1 + f + n2);

		}
		
	}
});

function calculate(){
    $.post("server.php",
		{int1: "2", opp: "+", int2: "2"},
		function(data){
			alert("Response from server: " + data);
        });
	}
	

// Clear last entry
$("button.ce").click(function(){
// If function is not yet set
	if(!initial && f.length <1){
		display = display.substring(0, display.length-1);
		$('#display').val(display);
			if(display.length < 1){
				$('#display').val(0);
				initial = true;
		}
	}
// If function is set
	else if(f.length > 0 && n2.length < 1 && initial){
		f = '';
		initial = false;
		$('#display').val(n1);
		$('#display2').val('');
		n1 = '';
	}
// If n1 and f set and number in display
	else{
		display = display.substring(0, display.length-1);
		$('#display').val(display);
			if(display.length < 1){
				$('#display').val(n1);
				initial = true;
			}
	}
});

// Clear all
$("button.c").click(function(){
	initial = true; 	n1 = '';	f = '';		n2 = '';	display = '';
	$('#display').val(0);
	$('#display2').val('');
});

// End document ready function
});
