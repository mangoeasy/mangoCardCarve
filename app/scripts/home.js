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
$(function () {
  console.log('home')
  ko.applyBindings(Home);

  $.get("http://MangoCardsApi.local/api/CardType/", function (data) {
    ko.mapping.fromJS(data, {}, Home.viewModel.cardTypes);
    $.get("http://MangoCardsApi.local/api/Employee/", function (employees) {
      ko.mapping.fromJS(employees, {}, Home.viewModel.employees);
      $.get("http://MangoCardsApi.local/api/WeChatUser/", function (wechatuser) {
        if (wechatuser != null) {
          ko.mapping.fromJS(wechatuser, {}, Home.viewModel.wechatuser);
        }
      });
    });
  });
});
