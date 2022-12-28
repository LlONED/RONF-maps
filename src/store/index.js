import { createStore } from "vuex";
import currentModule from "@/store/module/current";
import mapsModule from "@/store/module/maps";

export default createStore({
  modules: { current: currentModule, maps: mapsModule },
});
