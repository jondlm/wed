search = document.querySelector('[data-hook="search"]')
region = document.querySelector('[data-hook="region"]')
type = document.querySelector('[data-hook="type"]')
date = document.querySelector('[data-hook="date"]')

domEvents = document.querySelector('[data-hook="events"]')

getValue = (event) -> event.target.value
isArray = Array.isArray || (value) -> return {}.toString.call(value) is '[object Array]'

# DANGER DANGER DANGER
# If you update this template in any way, do the same in the jade
renderEvent = (event) ->
  """
  <li data-id="#{event.sys.id}">
    <a class="event-list-item" href="events/#{event.slug}.html" style="background-image: url(#{event.featuredImage.fields.file.url})">
      <div class="event-list-desc">
        <div class="row">
          <div class="nine columns">
            <span>#{event.title}</span>
          </div>
          <div class="three columns event-list-date">
            <span>#{if event.startDate then moment(event.startDate).format('MMM YYYY') else ''}</span>
          </div>
        </div>
      </div>
    </a>
  </li>
  """

renderEvents = (events) ->
  html = (renderEvent(event) for event in events).join('')
  domEvents.innerHTML = html

search$ = Rx.DOM.keyup(search)
  .map(getValue)
  .debounce(500)
  .distinctUntilChanged()
  .startWith('')

region$ = Rx.DOM.change(region)
  .map(getValue)
  .startWith('')

type$ = Rx.DOM.change(type)
  .map(getValue)
  .startWith('')

date$ = Rx.DOM.change(date)
  .map(getValue)
  .startWith('')

Rx.Observable.combineLatest(search$, region$, type$, date$)
  .skip(1)
  .subscribe((payload) ->
    newEvents = events

    # search
    if payload[0]
      newEvents = newEvents.filter((event) ->
        event.title && event.title.toLowerCase().indexOf(payload[0].toLowerCase()) > -1
      )

    # region
    if payload[1]
      newEvents = newEvents.filter (event) ->
        if isArray(event.region) and event.region.length > 0
          event.region.some (region) ->
            region.sys.id is payload[1]
        else
          true

    # type
    if payload[2]
      newEvents = newEvents.filter (event) ->
        if isArray(event.type) and event.type.length > 0
          event.type.some (type) ->
            type.sys.id is payload[2]
        else
          true

    # startDate
    if payload[3]
      startDate = moment(payload[3], 'MMM YYYY')

      newEvents = newEvents.filter (event) ->
        event.startDate && moment(event.startDate).isSame(startDate, 'month')

    # event.title
    # event.region[].sys.id
    # event.type[].sys.id
    # event.startDate
    # validEvents = events.map((event) -> true)
    renderEvents(newEvents)
  )

