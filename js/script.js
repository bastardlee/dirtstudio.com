$(document).ready(function () {

	var hashname = window.location.hash;
	var $Content = $(".content");
	var $LoadArea = $(".load-area");
	var $ProjectLinks = $("a.project-link");
	var $PressLinks = $("a.press-link");
	var $PressLink = $("a.press");
	var $NewsLink = $("a.news");
	var $WorkLink = $("a.work");
	var $StudioLink = $("a.studio");
	var $StudioLinks = $("a.studio-link");
	var $Nav = $("ul.nav");
	var $NavContent = $("ul.tabs-content");
	var $NavLinks = $Nav.find('li a');
	var $HoverArea = $("#projectHoverArea");
	var rotateImageID = null;
	var logoDown = null;

	function goToTop() {
		var offset = $Nav.offset().top;
		$('body, html').stop().animate({ scrollTop: "487px"}, 400, 'easeOutQuart');
	}

	function hideNavContent() {
		$NavContent.slideUp();
		$HoverArea.hide();
	}

	function showNavContent() {
		$NavContent.slideDown('fast', function(){});
		$HoverArea.show();
		$('a.back-to-work').hide();
	}

	function closeContentShowNav() {

		var offset = $Nav.offset().top;

		if(window.pageYOffset > 487){
			$('body, html').stop().animate({ scrollTop: "487px"}, 600, 'easeOutQuart');
		}
		// , function(){
			$Content.fadeOut('slow', function(){
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

	// deeplinking
	if (hashname !== '') {

		$('a.back-to-work').hide();

		var split = hashname.split('#');
		var contentLocation = "";

		// different #s need different paths
		switch(split[1]) {
			case 'schtick' :
				contentLocation = "studio/"+split[1]+".html";
				break;
			case 'peeps' :
				contentLocation = "studio/"+split[1]+".html";
				break;
			case 'collaborators':
				contentLocation = "studio/"+split[1]+".html";
				break;
			case 'contact':
				contentLocation = "studio/"+split[1]+".html";
				break;
			case 'publications':
				contentLocation = "press/"+split[1]+".html";
				break;
			case 'kudos':
				contentLocation = "press/"+split[1]+".html";
				break;
			case 'gigs':
				contentLocation = "press/"+split[1]+".html";
				break;
			case 'news':
				contentLocation = "news/"+split[1]+".html";
				break;
			default:
				contentLocation = "content/"+split[1]+"/"+split[1]+".html";
				clearInterval(rotateImageID);
				rotateImageID = false;
				$('.rotate').attr('src', "img/header_"+split[1]+".jpg");
		}

		$LoadArea.load(contentLocation, function(){
			
			//hide hover
			$HoverArea.css('display','none');
			
			$NavContent.slideUp(300, function(){
				$Content.slideDown('slow', function(){
					$('body, html').stop().animate({ scrollTop: "487px"}, 1000, 'easeOutQuart');
				});
			});
		});
	} // deeplinking

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

	$('.dirt-tag').click(function(c){
		goToTop();
	});

	// when a project link is clicked
	$ProjectLinks.click(function(c){
		
		// c.preventDefault();

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

			$NavContent.slideUp(300, function(){
				$Content.slideDown('slow', function(){

				});
			});
		});

	});

	$NewsLink.click(function(){
		hideNavContent();
		$LoadArea.load("news/news.html", function(){
			$Content.fadeIn('slow', function(){});
		});
	});


	$PressLinks.click(function(){

		$PressLinks.removeClass('active');
		$(this).addClass('active');

		var split = $(this).attr('href').split('#');
		var contentLocation = "press/"+split[1]+".html";
		
		// load requested content into #content
		$LoadArea.load(contentLocation, function(){
			$Content.fadeIn('slow', function(){});
		});

	});

	$StudioLinks.click(function(){

		$StudioLinks.removeClass('active');
		$(this).addClass('active');

		var split = $(this).attr('href').split('#');
		var contentLocation = "studio/"+split[1]+".html";
		
		// load requested content into #content
		$LoadArea.load(contentLocation, function(){
			$Content.fadeIn('slow', function(){});
		});

	});


	var firefoxPadding = 0;
	var nextMargin = "70px";

	// weird box model fix for firefox
	if ($.browser.mozilla === true) {
		firefoxPadding = 20;
		nextMargin = "90px";
	}

	// get the top height of the header
	var aboveHeight = ($('header').outerHeight())+firefoxPadding;

	$(window).scroll(function(){

		// Once the top of the nav gets to the top of the page,
		if ($(window).scrollTop() > aboveHeight){

			// fix the nav to top...
			$('.nav').addClass('fixed').css('top','0').next().
				css('margin-top', nextMargin);

			// ... as well as the DIRT logo.
			$('.dirt-tag').css({
				'top' : '0'
			});

			// if it hasn't moved yet, move it
			// if(logoDown === null) {
			//	$('.dirt-tag').css({
			//		'top' : '-20px'
			//	});

			//	$('.dirt-tag').stop().animate({'top' : '+=20px'}, 'easeOutQuart');
				
			//	logoDown = 1;

			// } else {
			//	$('.dirt-tag').css({
			//		'top' : '0'
			//	});
			// }



		} else {
			$('.nav').removeClass('fixed').next()
				.css('margin-top','0');

			$('.dirt-tag').css({
				'top' : '300px'
			});

			// $('.dirt-tag').stop().animate({'top' : '300'}, 'easeOutQuart');

			// logoDown = null;

		}
	});

	// loading gif
	$("#loading").ajaxStart(function(){
		$(this).show();
	}).ajaxStop(function(){
		$(this).hide();
	});

	/* Tabs Activiation
	================================================== */

	var tabs = $('ul.tabs');

	tabs.each(function(i) {

		//Get all tabs
		var tab = $(this).find('> li > a');
		tab.click(function(e) {

			// remove active class. need better solution
			$('ul#studio-categories').find('a').removeClass('active');
			$('ul#press-categories').find('a').removeClass('active');

			//Get Location of tab's content
			var contentLocation = $(this).attr('href');

			//Let go if not a hashed one
			if(contentLocation.charAt(0)=="#") {
				e.preventDefault();

				//Make Tab Active
				tab.removeClass('active');
				$(this).addClass('active');

				//Show Tab Content & add active class
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
				} else if (contentLocation=="#bydate" || contentLocation=="#a-z") {
					// do nothing
				} else {
					$("li.all-toggle").hide();
				}
				
				e.preventDefault();

				//Make tab active
				tabTwo.removeClass('active');
				$(this).addClass('active');

				$(contentLocation).siblings().slideUp('fast', function(){
					// setTimeout(function(){
					// $(contentLocation).show();

					// $(function() {
					$(contentLocation).hide().slideDown('fast');
					// });

					// $(contentLocation).fadeIn();
					// $(contentLocation).css({opacity: 0.0}).animate({opacity: 1.0}, 5000);

					// }, 200);
					//removeClass('active');
				//}).addClass('active');
				// $("#" + post.Id).css({opacity: 0.0}).html(PostHtml(post)).animate({opacity: 1.0}, 5000);

				});
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


