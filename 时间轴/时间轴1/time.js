$(function(){
	var mySwiper = new Swiper('.swiper-container', {
		autoplay: true,//可选选项，自动滑动
		slidesPerView: 15,
		slidesPerGroup:1,
		loopFillGroupWithBlank:true,
		navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev',
	    },

	})
	$(".time-container ul li:first-child").addClass("on");
	$(".time-container ul li").on("click",function(){
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
	})
	$(".swiper-button-prev").click(function(){
		var index = $(".time-container ul li.on").index();
		if(index!=0)
		{
			$(".time-container ul li").removeClass("on");
			$(".time-container ul li").eq(index-1).addClass("on");
		}
	})
	$(".swiper-button-next").click(function(){
		var index = $(".time-container ul li.on").index();
		if(index<=24){
			$(".time-container ul li").removeClass("on");
			$(".time-container ul li").eq(index+1).addClass("on");
		}
		
	})
})