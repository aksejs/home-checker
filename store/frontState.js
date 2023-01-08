import * as R from 'ramda'

export const state = () => ({
  objects: [],
  confirmedObject: null,
  request: null,
  isPickedFullTariff: false,
  order: {},
  client: {},
  nav: {
    reasons: 'О нас',
    prices: 'Тарифы',
    faq: 'Вопросы',
    partners: 'Гарантии'
  }
})

export const mutations = {
  set (state, data) {
    state.objects = R.dropRepeatsWith(R.eqProps('objectCn'), data)
  },
  setRequest (state, query) {
    state.request = query
  },
  setConfirmedObject (state, data) {
    state.confirmedObject = data
  },
  setIsPickedFullyTariff (state, isFull) {
    state.isPickedFullTariff = isFull
  },
  setOrder (state, newOrder) {
    state.order = newOrder
  },
  setClient (state, newClient) {
    state.client = newClient
  },
  select (state, egrn) {
    state.objects = R.pipe(
      R.filter(R.pipe(
        R.prop('objectCn'),
        R.equals(egrn)
      )),
      R.take(1)
    )(state.objects)
    state.confirmedObject = state.objects[0]
  }
}

export const getters = {
  objects: (state) => state.objects,
  confirmedObject: (state) => state.confirmedObject,
  isPickedFullTariff: (state) => state.isPickedFullTariff,
  request: (state) => state.request,
  order: (state) => state.order,
  client: (state) => state.client
}
