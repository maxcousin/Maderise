app.filter("bool", function() {
  return function(data) {
    switch (data) {
      case true:
        return "Oui";
        break;
      case false:
        return "Non";
        break;
      default:
        return "";
    }
  }
});
