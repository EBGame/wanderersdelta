var wiki = {

  init() {

    let wiki = this;

    var $chapters = $(".chapters");

    this.chapters = [];
    this.chaptersByTitle = [];

    $(".content > div").each(function() {

      let $anchor = $("<a>");

      $anchor.html(this.title);

      $chapters.append($anchor);

      let chapter = {
        content: $(this),
        anchor: $anchor,
        title: this.title,
        index: wiki.chapters.length
      };

      wiki.chapters.push(chapter);
      wiki.chaptersByTitle[chapter.title] = chapter;

      $anchor.on("click pointerdown", wiki.select_chapter.bind(wiki, wiki.chapters.length - 1));

    });

    

    this.trackHash();

    if (window.location.hash) this.onHashChange();
    else this.select_chapter(0);

  },

  trackHash() {

    window.addEventListener("hashchange", this.onHashChange.bind(this));

  },

  onHashChange() {

    let hash = window.location.hash.substr(1);

    let chapter = this.chaptersByTitle[hash];

    if (!chapter) return;

    this.select_chapter(chapter.index);

  },

  select_chapter(index) {


    $(".chapters a").removeClass("selected");
    $(".content> div").hide();

    let chapter = this.chapters[index];

    window.location.hash = "#" + chapter.title;


    chapter.content.show();
    chapter.anchor.addClass("selected");

    let placeholder = chapter.content.find(".video-placeholder");

    if (placeholder.length) {

      let video = $("<video>");
      video.attr('src', placeholder.attr("src"));
      video.attr('autoplay', true);
      video.attr('loop', true);

      placeholder.replaceWith(video);

    }


  }

};

wiki.init();