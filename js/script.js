var pathname = window.location.pathname;
console.log(pathname);

$(document).ready(function () {

	var $Content = $("#content");
	var $ContentLoadArea = $("#contentLoadArea");
	var $ProjectLinks = $("a.projectLink");
	var $PressLinks = $("a.pressLink");
	var $NewsLinks = $("a.news");
	var $Nav = $("ul#nav");
	var $NavContent = $("ul#navContent");
	var $NavLinks = $Nav.find('li a');
	var $HoverArea = $("#projectHoverArea");

	function hideNavContent() {
		$NavContent.slideUp();
		$HoverArea.hide();
	}

	function showNavContent() {
		$NavContent.slideDown();
		$HoverArea.show();
		$('a#backToWork').hide();
	}

	function closeContentShowNav() {

		if ($NavContent.is(":hidden")){
			$('body, html').stop().animate({ scrollTop: 0 }, function(){
				$Content.fadeOut('slow', function(){
					showNavContent();
				});
			});

			if (!rotateImageID) {
				//rotateImageID = setInterval(rotateImage, 5000);
				console.log("rotateImageID doesn't exist. restarting, rotateimageid is "+rotateImageID);
			} else {
				rotateImageID = setInterval(rotateImage, 5000);
				console.log("rotateImage doesn't exist. restarting.");
			}
		}
	}

	var images = new Array ('img/header_ford.jpg', 'img/header_brewery.jpg', 'img/header_northshore.jpg');
	var index = 1;

	function rotateImage(){

		console.log('rotateImageID is set to '+rotateImageID);
		
		$('#rotate').fadeOut('slow', function(){
			$(this).attr('src', images[index]);
				$(this).fadeIn('slow', function(){
					if (index == images.length-1) {
						index = 0;
					}
					else {
						index++;
					}
				});
			});
	}

	// start rotating
	rotateImageID = setInterval(rotateImage, 5000);

	$NavLinks.click(function(){
		closeContentShowNav();
	});

	$('a#backToWork').click(function(c){
		c.preventDefault();
		closeContentShowNav();
	});

	// when a project link is clicked
	$ProjectLinks.click(function(c){
		
		c.preventDefault();

		// stop the rotate
		clearInterval(rotateImageID);
		console.log("stopping rotate. rotateImageID is now "+rotateImageID);

		var split = $(this).attr('href').split('#');
		var contentLocation = "content/"+split[1]+".html";

		// display the corresponding header image
		$('#rotate').attr('src', "img/header_"+split[1]+".jpg");

		// load requested content into #content
		$ContentLoadArea.load(contentLocation, function(){
			
			//hide nav
			// $HoverArea.fadeOut('slow', function(){});
			$HoverArea.css('display','none');
			
			//show back to work link
			$('a#backToWork').show();

			// $NavContent.fadeOut('slow', function(){
			//	$Content.fadeIn('slow', function(){

			$NavContent.slideUp(300, function(){
				$Content.slideDown('slow', function(){

					// $('body, html').stop().animate({
					// scrollTop: $Nav.offset().top
					// });
				});
			});
			//$Content.fadeIn('slow', hideNavContent());
		});

	});


	$PressLinks.click(function(){

		var split = $(this).attr('href').split('#');
		var pressLocation = "press/"+split[1]+".html";
		
		// load requested content into #content
		$ContentLoadArea.load(pressLocation, function(){
			
			//hide nav
			$HoverArea.fadeOut('slow', function(){});

			$NavContent.fadeOut('slow', function(){
				$Content.fadeIn('slow', function(){

					// $('body, html').stop().animate({
					// scrollTop: $Nav.offset().top
					// });
				});
			});
			//$Content.fadeIn('slow', hideNavContent());
		});

	});


	var aboveHeight = $('header').outerHeight();
	var dirtTagHeight = aboveHeight - 138;

	$(window).scroll(function(){
 
		// Once the top of the nav gets to the top of the page,
		if ($(window).scrollTop() >= aboveHeight){

			// fix the nav to top...
			$('#nav').css({
				'position' : 'fixed',
				'top' : '0'
			});

			// ... as well as the DIRT logo.
			$('#dirt-tag').css({
				'top' : '0'
			});

			$Content.css('padding-top','50px');

		} else {
			$('#nav').css('position', 'static');

			$('#dirt-tag').css({
				'top' : '300px'
			});

			$Content.css('padding-top','0');
		}
	});

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

				// .position() uses position relative to the offset parent,
				var pos = $(this).position();

				// .outerWidth() takes into account border and padding.
				var width = $(this).outerWidth();

				//show the menu directly over the placeholder
				$("div.project-hover").css({
					position: "absolute",
					top: pos.top + 11 + "px",
					// left: pos.left + "px"
					left: (pos.left + width) + "px"
					// left: (pos.left + width) + "px"
				}).show();

				var contentLocation = $(this).attr('href');
				var split = contentLocation.split('#');
				var thumbLocation = "thumb/thumb_"+split[1]+".html";

				if (contentLocation.charAt(0)=="#") {
					$(this).addClass('active');
					// $("div.project-hover").css('display', 'block');
					
					$("div.project-hover").load(thumbLocation, function(){});

					// $(contentLocation).show().addClass('active').siblings().hide().removeClass('active');
				}
			},
			function(){
				$(this).removeClass('active');
				// $("div.project-hover").css('display', 'none');
				$("div.project-hover").hide();
				// $(contentLocation).hide().removeClass('active').siblings().hide().removeClass('active');
			}

		);

	});


	
});


