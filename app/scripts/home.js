var Home = {
  viewModel: {
    cardTypes: ko.observableArray(),
    employees: ko.observableArray(),
    wechatuser: {
      Id: ko.observable(),
      NickName: ko.observable(),
      Gender: ko.observable(),
      Language: ko.observable(),
      City: ko.observable(),
      Province: ko.observable(),
      Country: ko.observable(),
      Headimgurl: ko.observable(),
    }
  }
};

// Converts canvas to an image
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}
// Converts image to canvas; returns new canvas element
function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);

	return canvas;
}

ko.bindingHandlers.qrbind = {
  init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
    // This will be called when the binding is first applied to an element
    // Set up any initial state, event handlers, etc. here
  },
  update: function(element, valueAccessor) {
    var data = ko.unwrap(valueAccessor());
    var url = window.location.href + "demo.html?id=" + data;
    var $item = $(element).find('.work-canvas-link');

    $(element).find('.work-canvas-link').qrcode(url).find('canvas').hide();

    $item.attr('href', "#").on('click', function(e) {
      e.preventDefault();
      var thisItem = $(this);
      var thisCanvasImage = convertCanvasToImage(thisItem.find('canvas')[0]);
      var thisHtmlString = '<div class="mfp-figure"><figure>'+$(thisCanvasImage).addClass('mfp-img').prop('outerHTML')+'</figure></div>';



      $.magnificPopup.open({
        items: {
          src: thisHtmlString ,// can be a HTML string, jQuery object, or CSS selector
          type: 'inline'
        }
      });

    });



  }
};
ko.applyBindings(Home);
$.get("http://api.card.mangoeasy.com/api/CardType/", function(data) {
  ko.mapping.fromJS(data, {}, Home.viewModel.cardTypes);
  $.get("http://api.card.mangoeasy.com/api/Employee/", function(employees) {
    ko.mapping.fromJS(employees, {}, Home.viewModel.employees);
    initWorkFilter();
    $.get("http://api.card.mangoeasy.com/api/WeChatUser/", function(wechatuser) {
      if (wechatuser != null) {
        ko.mapping.fromJS(wechatuser, {}, Home.viewModel.wechatuser);
      }

    });
  });
});
