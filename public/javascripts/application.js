$(document).ready(function() {
	$("input.add").live("click", function() {
		$("#cropify-table-body").append($(this).parent().parent().clone());
		return false;
	});
	$("input.remove").live("click", function() {
		$(this).parent().parent().remove();
		return false;
	});
	
	var total_height = 253;
	var total_space = 1000 * 1000; // 1MB (1000 bytes * 1000) file uploads per person?
	var bar = $("#progress-bar");
	bar.hide();
	
	$('input[type=file]').change(function(e){
		var amount = this.files.length;
		var total = 0;
		var i = 0;
		for (i; i < amount; i++) {
			total += this.files[i].fileSize;
		}
		// resize
		var ratio = total/total_space
		if (ratio > 1)
			return alert("Can't process more than 1MB at a time, sorry.");
		
		var new_top = 50;
		var new_height = total_height * ratio;
		var percent = ratio * 100;
		bar.height(new_height + "px");
		bar.css('top', total_height - new_height + 'px');
		$("#file-percent").html(percent + "<span>%</span>");
		bar.show();
		
		amount += (amount == 1) ? " File" : " Files"
		$("#file-percent").html((Math.round(total/1000)).toString() + "k");
		$("#files .label").html("<p class='file'>" + amount + "</p>");
	});
})