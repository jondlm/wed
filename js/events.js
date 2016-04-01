(function() {
  var date, date$, domEvents, getValue, isArray, region, region$, renderEvent, renderEvents, search, search$, type, type$;

  search = document.querySelector('[data-hook="search"]');

  region = document.querySelector('[data-hook="region"]');

  type = document.querySelector('[data-hook="type"]');

  date = document.querySelector('[data-hook="date"]');

  domEvents = document.querySelector('[data-hook="events"]');

  getValue = function(event) {
    return event.target.value;
  };

  isArray = Array.isArray || function(value) {
    return {}.toString.call(value) === '[object Array]';
  };

  renderEvent = function(event) {
    return "<li data-id=\"" + event.sys.id + "\">\n  <a class=\"event-list-item\" href=\"events/" + event.slug + ".html\" style=\"background-image: url(" + event.featuredImage.fields.file.url + "?fm=jpg&w=400)\">\n    <div class=\"event-list-desc\">\n      <div class=\"row\">\n        <div class=\"nine columns\">\n          <span>" + event.title + "</span>\n        </div>\n        <div class=\"three columns event-list-date\">\n          <span>" + (event.startDate ? moment(event.startDate).format('MMM YYYY') : '') + "</span>\n        </div>\n      </div>\n    </div>\n  </a>\n</li>";
  };

  renderEvents = function(events) {
    var event, html;
    html = ((function() {
      var i, len, results;
      results = [];
      for (i = 0, len = events.length; i < len; i++) {
        event = events[i];
        results.push(renderEvent(event));
      }
      return results;
    })()).join('');
    return domEvents.innerHTML = html;
  };

  search$ = Rx.DOM.keyup(search).map(getValue).debounce(500).distinctUntilChanged().startWith('');

  region$ = Rx.DOM.change(region).map(getValue).startWith('');

  type$ = Rx.DOM.change(type).map(getValue).startWith('');

  date$ = Rx.DOM.change(date).map(getValue).startWith('');

  Rx.Observable.combineLatest(search$, region$, type$, date$).skip(1).subscribe(function(payload) {
    var newEvents, startDate;
    newEvents = events;
    if (payload[0]) {
      newEvents = newEvents.filter(function(event) {
        return event.title && event.title.toLowerCase().indexOf(payload[0].toLowerCase()) > -1;
      });
    }
    if (payload[1]) {
      newEvents = newEvents.filter(function(event) {
        if (isArray(event.region) && event.region.length > 0) {
          return event.region.some(function(region) {
            return region.sys.id === payload[1];
          });
        } else {
          return true;
        }
      });
    }
    if (payload[2]) {
      newEvents = newEvents.filter(function(event) {
        if (isArray(event.type) && event.type.length > 0) {
          return event.type.some(function(type) {
            return type.sys.id === payload[2];
          });
        } else {
          return true;
        }
      });
    }
    if (payload[3]) {
      startDate = moment(payload[3], 'MMM YYYY');
      newEvents = newEvents.filter(function(event) {
        return event.startDate && moment(event.startDate).isSame(startDate, 'month');
      });
    }
    return renderEvents(newEvents);
  });

}).call(this);
