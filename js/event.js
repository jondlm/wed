(function() {
  var links;

  links = document.querySelectorAll('.event a');

  Array.prototype.forEach.call(links, function(link) {
    return link.setAttribute('target', '_blank');
  });

}).call(this);
