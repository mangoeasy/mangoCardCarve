/**
 * Created by Ben on 2015/12/30.
 */
var Demo = {
  viewModel: {
    cardDemo: {
      Id: ko.observable(),
      CardTypeId: ko.observable(),
      HtmlCode: ko.observable(),
      ThumbnailUrl: ko.observable(),
      EmployeeId: ko.observable()
    }
  }
};
function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
$(function () {
  ko.applyBindings(Demo);
  var model = {
    id: getUrlVars()["id"]
  };
  $.get("http://api.card.mangoeasy.com/api/CardDemo/", model, function (cardDemo) {
    ko.mapping.fromJS(cardDemo, {}, Demo.viewModel.cardDemo);
    document.title=Demo.viewModel.cardDemo.Title();
    $("meta[name='description']").attr('content',Demo.viewModel.cardDemo.Description())
  });
});
