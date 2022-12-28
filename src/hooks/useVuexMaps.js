import { computed } from "vue";
import { useStore } from "vuex";

export const mapState = (namespace = "") => {
  const store = useStore();
  return Object.fromEntries(
    Object.keys(store.state).map((key) => [
      namespace !== "" ? key.replace(namespace + "/", "") : key,
      computed(() => store.state[key]),
    ])
  );
};

export const mapGetters = (namespace = "") => {
  const store = useStore();
  return Object.fromEntries(
    Object.keys(store.getters).map((getter) => [
      namespace !== "" ? getter.replace(namespace + "/", "") : getter,
      computed(() => store.getters[getter]),
    ])
  );
};

export const mapMutations = (namespace = "") => {
  const store = useStore();
  return Object.fromEntries(
    Object.keys(store._mutations).map((mutation) => [
      namespace !== "" ? mutation.replace(namespace + "/", "") : mutation,
      (value) => store.commit(mutation, value),
    ])
  );
};

export const mapActions = (namespace = "") => {
  const store = useStore();
  return Object.fromEntries(
    Object.keys(store._actions).map((action) => [
      namespace !== "" ? action.replace(namespace + "/", "") : action,
      (value) => store.dispatch(action, value),
    ])
  );
};
