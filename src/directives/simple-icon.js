export default {
  beforeMount(el, binding) {
    const iconClass = binding.value;

    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
