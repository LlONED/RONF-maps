export default {
  state: () => ({
    map: "",
    image: "",
    color: "",
  }),

  getters: {
    currentMap(state) {
      return state.map;
    },

    currentImage(state) {
      return state.image;
    },

    currentColor(state) {
      return state.color;
    },
  },

  mutations: {
    setCurrentMap(state, map) {
      state.map = map;
    },

    setCurrentImage(state, image) {
      state.image = image;
    },

    setCurrentColor(state, color) {
      state.color = color;
    },
  },

  namespaced: true,
};
