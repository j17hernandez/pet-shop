export const state = () => ({
  countCart: 0,
  itemsCart: [],
  total: 0,
  search: null,
  personalData: {},
  shippingAddressData: {},
  paymentGatewayData: {},
})

export const mutations = {
  setCountCart(state, data) {
    state.countCart = data
  },
  addItemCart(state, data) {
    const items = data
    items.subtotal = data.cantidad * data.price
    state.itemsCart.push(items)
  },
  updateCart(state, item) {
    const i = state.itemsCart.indexOf(item)
    const el = state.itemsCart[i]
    el.cantidad++
    const sub = el.cantidad * el.price
    el.subtotal = sub
  },
  updateCartMinus(state, item) {
    const i = state.itemsCart.indexOf(item)
    const el = state.itemsCart[i]
    if (el.cantidad > 1) {
      el.cantidad--
      const sub = el.cantidad * el.price
      el.subtotal = sub
    }
  },
  deleteItemCart(state, item) {
    const index = state.itemsCart.indexOf(item)
    state.itemsCart.splice(index, 1)
  },
  getTotalCart(state) {
    let total = 0
    state.itemsCart.forEach((item) => {
      total += item.subtotal
    })
    state.total = total
  },
  setSearch(state, data) {
    state.search = data
  },
  updatePersonalDataField(state, data) {
    state.personalData = data
  },
  updateShippingAddressData(state, data) {
    state.shippingAddressData = data
  },
  updatePaymentGatewayData(state, data) {
    state.paymentGatewayData = data
  },
  cleanCart(state) {
    state.itemsCart = []
  },
}

export const getters = {
  getCountCart(state) {
    return state.countCart
  },
}

export const actions = {
  addItem({ commit, state }, item) {
    commit('addItemCart', item)
    commit('setCountCart', state.itemsCart.length)
    commit('getTotalCart')
  },
  updateCount({ commit }, item) {
    commit('updateCart', item)
    commit('getTotalCart')
  },
  updateCountMinus({ commit }, item) {
    commit('updateCartMinus', item)
    commit('getTotalCart')
  },
  deleteItem({ commit, state }, item) {
    commit('deleteItemCart', item)
    commit('setCountCart', state.itemsCart.length)
    commit('getTotalCart')
  },
  updatePersonalData({ commit }, data) {
    commit('updatePersonalDataField', data)
  },
  updateShippingAddress({ commit }, data) {
    commit('updateShippingAddressData', data)
  },
  updatePaymentGateway({ commit }, data) {
    commit('updatePaymentGatewayData', data)
  },
  cleanAllData({ commit, state }, data) {
    commit('cleanCart')
    commit('setCountCart', state.itemsCart.length)
    commit('updatePersonalDataField', data)
    commit('updateShippingAddressData', data)
    commit('updatePaymentGatewayData', data)
  },
}
