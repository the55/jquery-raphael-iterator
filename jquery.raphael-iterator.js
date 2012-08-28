
;(function ( $, window, document, undefined ) {
  var pluginName = 'raphaelIterator',
    defaults = {
      interval: 1000,
      width: 100,
      height: 100,
      rowSize: 5
    };

  // The actual plugin constructor
  function RaphaelIterator( container, drawFunction, options ) {
    this.container = $(container);
    this.options = $.extend( {}, defaults, options) ; // merge options with defaults
    this.drawFunction = drawFunction;
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  RaphaelIterator.prototype.init = function() {
    this.iteration = 0;
    this.rowCount = 0;
    this.pause = false;
    this.container.addClass('raphael-iterator');
    jQuery.raphaelIteratorGo;
    setInterval(jQuery.raphaelIteratorGo, this.options.interval);
  };

  RaphaelIterator.prototype.iterate = function() {
    if(this.pause) return true;

    this.incrementRow();

    var id = "raphael-iteration-"+this.iteration;

    this.newElement(id);
    var paper = Raphael(id, this.options.width, this.options.height);
    this.drawFunction(paper);
    this.iteration++;
  }

  RaphaelIterator.prototype.incrementRow = function() {
    if(this.iteration%this.options.rowSize == 0) {
      $("<div id='row_"+(this.rowCount++)+"' class='row'></div>").
        css('margin-top', -1.1*(this.options.height)).
        prependTo(this.container).
        animate({marginTop: '0'},{
          queue: 'mouse',
          duration:this.options.interval*1.2,
          easing: 'easeInOutCubic'
        });
    }
  };

  RaphaelIterator.prototype.newElement = function(id) {
    return $("<div id='"+id+"' class='iteration'></div>").
      css('opacity', 0).
      css('float', 'left').
      appendTo(this.container.find(".row:first-child")).delay(800).
      animate({opacity: 1},{queue: 'mouse', duration:400, easing: 'linear'});
  };

  $.extend({
    raphaelIteratorGo: function() {
      $('.raphael-iterator').data('plugin_raphaelIterator').iterate();
    }
  });

  $.fn[pluginName] = function ( drawFunction, options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
        new RaphaelIterator( this, drawFunction, options ));
      }
    });
  }
})( jQuery, window, document );
