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
ko.applyBindings(Home);
$.get("http://api.card.mangoeasy.com/api/CardType/", function (data) {
  ko.mapping.fromJS(data, {}, Home.viewModel.cardTypes);
  $.get("http://api.card.mangoeasy.com/api/Employee/", function (employees) {
    ko.mapping.fromJS(employees, {}, Home.viewModel.employees);
    initWorkFilter();
    $.get("http://api.card.mangoeasy.com/api/WeChatUser/", function (wechatuser) {
      if (wechatuser != null) {
        ko.mapping.fromJS(wechatuser, {}, Home.viewModel.wechatuser);
      }
    });
  });
});
