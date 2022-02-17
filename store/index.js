export const state = () => ({
  category: null,
  countCart: 0,
  itemsCart: [],
  total: 0,
  search: null
})

export const mutations = {
  setCategory(state, data) {
    state.category = data;
  },
  setCountCart(state, data) {
    state.countCart = data
  },
  addItemCart(state, data) {
    const items = data
    items.subtotal = data.cantidad * data.price;
    state.itemsCart.push(items)
  },
  updateCart(state, item) {
    const i = state.itemsCart.indexOf(item)
    const el = state.itemsCart[i]
    el.cantidad++
    const sub = el.cantidad * el.price;
    el.subtotal = sub
  },
  updateCartMinus(state, item) {
    const i = state.itemsCart.indexOf(item)
    const el = state.itemsCart[i]
    el.cantidad--
    const sub = el.cantidad * el.price;
    el.subtotal = sub
  },
  getTotalCart(state) {
    let total = 0;
    state.itemsCart.forEach(item => {
      total += item.subtotal
    })
    state.total = total
  },
  setSearch(state, data) {
    state.search = data
  }
}

export const getters = {
  getCategory(state) {
    return state.category;
  },
  getCountCart(state) {
    return state.countCart;
  },
}

export const actions = {
  addItem({ commit, state }, item) {
    commit("addItemCart", item)
    commit("setCountCart", state.itemsCart.length)
    commit("getTotalCart")
  },
  updateCount({ commit }, item) {
    commit("updateCart", item)
    commit("getTotalCart")
  },
  updateCountMinus({ commit }, item) {
    commit("updateCartMinus", item)
    commit("getTotalCart")
  },
}