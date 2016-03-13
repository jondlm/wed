search = document.querySelector('[data-hook="search"]')
region = document.querySelector('[data-hook="region"]')
type = document.querySelector('[data-hook="type"]')
date = document.querySelector('[data-hook="date"]')

domEvents = document.querySelector('[data-hook="events"]')

if !search
  return

search.addEventListener('input', (event) ->
  searchValue = event.target.value

  console.log(event.target.value)
)

region.addEventListener('input', (event) ->
  regionId = event.target.value

  if !regionId
    return

  console.log(regionId)
)

type.addEventListener('input', (event) ->
  typeId = event.target.value

  if !typeId
    return

  console.log(typeId)
)

date.addEventListener('input', (event) ->
  dateId = event.target.value

  if !dateId
    return

  console.log(dateId)
)

