/*
 * jQuery liMenuHor v 1.0
 *
 * Copyright 2012, Linnik Yura | liMasscode
 * Free to use
 * 
 * August 2012
 */
(function($){
	$.fn.liMenuHor = function(params){
		return this.each(function(){
			var 
			menuWrap = $(this),
			menuWrapWidth = menuWrap.outerWidth(),
			menuWrapLeft = menuWrap.offset().left,
			menuSub = menuWrap.children('li').children('ul'),
			menuSubSub = $('ul',menuSub);
			
			menuSub.each(function(){
				
				var 
				mArrowDown = $('<div>').addClass('arrow-down'),
				mSub = $(this),
				mList = $(this).closest('li'),
				mLink = mList.children('a').append(mArrowDown),
				mArrow = $('<div>').addClass('arrow-up').prependTo(mSub),
				mArrow2 = $('<div>').addClass('arrow-up2').prependTo(mSub);
				
				mLink.on('mouseenter',function(){
					
					var 
					mArrowLeft = mLink.outerWidth()/2 - 5,
					mSubLeft = mLink.position().left;
					
					mSub.css({top:mLink.outerHeight()});
					sum1 = mSubLeft + mSub.outerWidth();
					if(sum1 > menuWrapWidth){
						mSubLeft = mSubLeft - (sum1 - menuWrapWidth);
						mArrowLeft = mArrowLeft + sum1 - menuWrapWidth;
						mSub.addClass('toLeft');
					}
					mArrow.css({left:mArrowLeft});
					mArrow2.css({left:mArrowLeft});
					mSub.css({left:mSubLeft});
					mSub.show()	;
					mLink.addClass('active')
				});
				mList.on('mouseleave',function(){
					mSub.hide();	
					mLink.removeClass('active');
				})
			});
			menuSubSub.each(function(){
				
				var 
				mArrowRight = $('<div>').addClass('arrow-right'),
				mSubSub = $(this),
				mSubList = mSubSub.closest('li'),
				mSubLink = mSubList.children('a').append(mArrowRight),
				mSubArrow = $('<div>').addClass('arrow-left').prependTo(mSubSub),
				mSubArrow2 = $('<div>').addClass('arrow-left2').prependTo(mSubSub);
				
				mSubLink.on('mouseenter',function(){
					mSubArrow.css({top:mSubLink.outerHeight()/2 - 5});
					mSubArrow2.css({top:mSubLink.outerHeight()/2 - 5});
					var mSubSubLeft = mSubLink.position().left + mSubLink.outerWidth()
					mSubSub.css({top:(mSubLink.position().top - (mSubLink.closest('ul').outerWidth()-mSubLink.closest('ul').width())/2)});	
					mSubSub.css({left:mSubSubLeft});
					mSubSub.show();
					
					var 
					w3 = (menuWrapLeft + menuWrapWidth),
					w6 = (mSubSub.offset().left + mSubSub.outerWidth());
					
					if(w6 >= w3){
						mSubSub.closest('ul').addClass('toLeft')
						mSubSubLeft = -mSubSub.outerWidth()
					}
					if(mSubSub.parents('ul').hasClass('toLeft')){
						mSubSubLeft = -mSubSub.outerWidth()
					}
					mSubSub.css({left:mSubSubLeft});				
					mSubLink.addClass('active')
				});
				mSubList.on('mouseleave',function(){
					mSubSub.hide();
					mSubLink.removeClass('active')
				})
			});
			menuWrapWidth = menuWrap.outerWidth();
			menuWrapLeft = menuWrap.offset().left;
			
			$(window).resize(function(){
				menuWrapWidth = menuWrap.outerWidth();
				menuWrapLeft = menuWrap.offset().left;	
			});

            var span = $(menuWrap).find('a');
            var size_set = 0;
            for(var i = 0; i<span.length; i++){
                if($(span[i]).width())
                size_set = size_set + $(span[i]).width()+20;
            }
            $(menuWrap).width(size_set);

		});
	};
})(tabs_menu_editor);