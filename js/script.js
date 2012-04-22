var pathname = window.location.pathname;
// console.log(pathname);

$(document).ready(function () {

	var $Content = $("#content");
	var $LoadArea = $(".load-area");
	var $ProjectLinks = $("a.project-link");
	var $PressLinks = $("a.pressLink");
	var $PressLink = $("a.press");
	var $NewsLink = $("a.news");
	var $WorkLink = $("a.work");
	var $StudioLink = $("a.studio");
	var $Nav = $("ul#nav");
	var $NavContent = $("ul#navContent");
	var $NavLinks = $Nav.find('li a');
	var $HoverArea = $("#projectHoverArea");
	var rotateImageID = null;


	function hideNavContent() {
		$NavContent.slideUp();
		$HoverArea.hide();
	}

	function showNavContent() {
		$NavContent.slideDown('slow', function(){});
		$HoverArea.show();
		$('a.back-to-work').hide();
	}

	function closeContentShowNav() {
		// console.log("closecontentshownav");

		// if ($NavContent.is(":hidden")){
		// 	$('body, html').stop().animate({ scrollTop: 0 }, function(){
		// 		$Content.fadeOut('fast', function(){
		// 			showNavContent();
		// 		});
		// 	});

		// 	// if it's stopped, start it again
		// 	if (!rotateImageID) {
		// 		rotateImageID = setInterval(rotateImage, 10000);
		// 	}
		// }

		// $('body, html').stop().animate({ scrollTop: 0 }, function(){
			// console.log("hiding content");
			$Content.fadeOut('fast', function(){
				// console.log("showing navcontent");
				showNavContent();
			});
		// });

		// if it's stopped, start it again
		if (!rotateImageID) {
			rotateImageID = setInterval(rotateImage, 10000);
		}
	}

	var images = new Array ('img/header_ford.jpg', 'img/header_amd.jpg', 'img/header_northshore.jpg');
	var index = 1;

	function rotateImage(){

		$('.rotate').fadeOut('slow', function(){
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
	rotateImageID = setInterval(rotateImage, 10000);

	$WorkLink.click(function(){
		closeContentShowNav();
	});

	$StudioLink.click(function(){
		closeContentShowNav();
	});

	$PressLink.click(function(){
		closeContentShowNav();
	});

	$('a.back-to-work').click(function(c){
		c.preventDefault();
		closeContentShowNav();
	});

	// when a project link is clicked
	$ProjectLinks.click(function(c){
		
		c.preventDefault();

		// stop the rotate
		clearInterval(rotateImageID);
		rotateImageID = false;

		// get path info for project
		var split = $(this).attr('href').split('#');
		var contentLocation = "content/"+split[1]+"/"+split[1]+".html";

		// display the corresponding header image
		$('.rotate').attr('src', "img/header_"+split[1]+".jpg");

		// load requested content into #content
		$LoadArea.load(contentLocation, function(){
			
			//hide hover
			$HoverArea.css('display','none');
			
			//show back to work link
			$('a.back-to-work').show();

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

	$NewsLink.click(function(){
		// console.log('newslink clicked');
		hideNavContent();
		$LoadArea.load("news/news.html", function(){
			$Content.fadeIn('slow', function(){});
		});
	});


	$PressLinks.click(function(){

		var split = $(this).attr('href').split('#');
		var pressLocation = "press/"+split[1]+".html";
		
		// load requested content into #content
		$LoadArea.load(pressLocation, function(){
			$Content.fadeIn('slow', function(){});
		});

	});

	// get the height of the header
	var aboveHeight = $('header').outerHeight();
	// var dirtTagHeight = aboveHeight - 138;

	$(window).scroll(function(){
 
		// Once the top of the nav gets to the top of the page,
		if ($(window).scrollTop() >= aboveHeight+20){

			// fix the nav to top...
			$('#nav').css({
				'position' : 'fixed',
				'top' : '0'
			});

			// ... as well as the DIRT logo.
			$('#dirt-tag').css({
				'top' : '0'
			});

			// $('.nav-padding').css('display', 'block');
			// $('#navContent').css('padding-top','75px');

			// if the menu is visible, then it needs a margin too
			if($NavContent.is(":visible")) {
				$NavContent.css('margin-top','75px');
			} else {
				$Content.css('margin-top','75px');
			}

		} else {
			$('#nav').css('position', 'static');

			$('#dirt-tag').css({
				'top' : '300px'
			});

			// $('#navContent').css('padding-top','0');
			if($NavContent.is(":visible")) {
				$NavContent.css('margin-top','0');
			} else {
				$Content.css('margin-top','0');
			}

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
					$("li.all-toggle").show();
				} else {
					$("li.all-toggle").hide();
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
					left: pos.left - 10 + "px"
					// left: (pos.left + width) + "px"
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


