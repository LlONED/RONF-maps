export default {
  state: () => ({
    maps: {},
  }),

  getters: {
    maps(state) {
      return state.maps;
    },
  },

  mutations: {
    setMaps(state, maps) {
      state.maps = maps;
    },

    setPoints(state, { map, image, imageData }) {
      state.maps[map][image].points = imageData;
    },
  },

  namespaced: true,
};
