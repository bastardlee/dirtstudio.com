$(document).ready(function () {

	/* Tabs Activiation
	================================================== */

	var tabs = $('ul.tabs');

	tabs.each(function(i) {

		//Get all tabs
		var tab = $(this).find('> li > a');
		tab.click(function(e) {

			//Get Location of tab's content
			var contentLocation = $(this).attr('href');

			//Let go if not a hashed one
			if(contentLocation.charAt(0)=="#") {
				e.preventDefault();

				//Make Tab Active
				tab.removeClass('active');
				$(this).addClass('active');

				//Show Tab Content & add active class
				//$(contentLocation).slideDown().addClass('active').siblings().hide().removeClass('active');
				$(contentLocation).slideDown().addClass('active').siblings().hide().removeClass('active');

			}
		});
	});

	var tabsTwo = $('ul.tabsTwo');

	tabsTwo.each(function(i) {
		
		//Get all tabsTwo
		var tabTwo = $(this).find('> li > a');
		tabTwo.click(function(e) {
			// Get location of tab's content
			var contentLocation = $(this).attr('href');

			//Let go if not a hashed one
			if (contentLocation.charAt(0)=="#") {

				if(contentLocation=="#all"){
					$("li#allToggle").show();
				} else {
					$("li#allToggle").hide();
				}
				
				e.preventDefault();

				//Make tab active
				tabTwo.removeClass('active');
				$(this).addClass('active');

				//Show Tab content & add active class
				//$(contentLocation).slideDown().addClass('active').siblings().slideUp().removeClass('active');

				$(contentLocation).siblings().slideUp('fast', function(){
					setTimeout(function(){
						$(contentLocation).fadeIn('slow');
					}, 200);
					//removeClass('active');
				//}).addClass('active');
				});
				/*
				$(contentLocation).slideDown('fast', function(){
					$(contentLocation).siblings().slideUp();
					//removeClass('active');
				//}).addClass('active');
				});*/
			}
		});
	});


	var tabsThree = $('ul.tabsThree');

	tabsThree.each(function(i) {
		
		//Get all tabsTwo
		var tabThree = $(this).find('> li > a');

		tabThree.hover(
			function(){
				var contentLocation = $(this).attr('href');
				if (contentLocation.charAt(0)=="#") {
					$(this).addClass('active');
					$(contentLocation).show().addClass('active').siblings().hide().removeClass('active');
				}
			},
			function(){
				var contentLocation = $(this).attr('href');
				$(this).removeClass('active');
				$(contentLocation).hide().removeClass('active').siblings().hide().removeClass('active');
			}

		);


		/*	function(e) {
			// Get location of tab's content
			var contentLocation = $(this).attr('href');

			//Let go if not a hashed one
			if (contentLocation.charAt(0)=="#") {
				
				e.preventDefault();

				//Make tab active
				tabThree.removeClass('active');
				$(this).addClass('active');

				//Show Tab content & add active class
				$(contentLocation).slideDown().addClass('active').siblings().slideUp().removeClass('active');
			}
		});*/
	});
});