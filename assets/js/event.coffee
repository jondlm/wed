links = document.querySelectorAll('.event a')

Array.prototype.forEach.call links, (link) ->
  link.setAttribute('target', '_blank')
