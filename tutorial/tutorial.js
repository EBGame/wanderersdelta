var wiki={init(){let wiki=this;var $chapters=$(".chapters");this.chapters=[];$(".content > div").each(function(){if(this.classList.contains("separator")){$chapters.append("<span class='separator'></span>");}
let $anchor=$("<a>");$anchor.html(this.title);$chapters.append($anchor);wiki.chapters.push({content:$(this),anchor:$anchor,title:this.title});$anchor.on("click pointerdown",wiki.select_chapter.bind(wiki,wiki.chapters.length-1));});this.select_chapter(0);},select_chapter(index){$(".chapters a").removeClass("selected");$(".content> div").hide();let chapter=this.chapters[index];chapter.content.show();chapter.anchor.addClass("selected");let placeholder=chapter.content.find(".video-placeholder");if(placeholder.length){let video=$("<video>");video.attr('src',placeholder.attr("src"));video.attr('autoplay',true);video.attr('loop',true);placeholder.replaceWith(video);}}};wiki.init();