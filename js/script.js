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
	var $HoverArea = $("ul#projectHoverArea");

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




		/*$("html, body").animate({ scrollTop: "1000px" });*/


		/*$('html, body').animate({
			scrollTop: $Content.offset().top
		}, 2000);*/

	});
	// Sticky sidebar!
	/*$(window).scroll(function(){
		if (window.pageYOffset > 420) {
			$('#nav').css('position', 'fixed');
			$('#nav').css({
				'top' : '0'
			});
		} else {
			$('#nav').css('position', 'static');
		}
	});
*/

	var aboveHeight = $('header').outerHeight();

	$(window).scroll(function(){
 
		if ($(window).scrollTop() >= aboveHeight){
			//$('#nav').addClass('fixed').css('top','0').next().css('padding-top','60px');
			$('#nav').css('position', 'fixed');
			$('#nav').css({
				'top' : '0'
			});

			$Content.css('padding-top','50px');

			$('#logoSmaller').css('display', 'block');
			// $('#logoSmaller').animate({
			//	top: '+=50'
			//	}, 500, function(){
			// });

		} else {
			$('#nav').css('position', 'static');
			$Content.css('padding-top','0');
			$('#logoSmaller').css('display', 'none');
			// $('#logoSmaller').animate({
			//	top: -50
			//	}, 500, function(){
			// });

			/*$('#nav').removeClass('fixed').next()
				.css('padding-top','0');
			}*/
		}
    });
	
});




