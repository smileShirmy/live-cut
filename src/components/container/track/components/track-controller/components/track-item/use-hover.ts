import { ref } from 'vue'

export const useHover = () => {
  const isHover = ref(false)

  function onmouseenter() {
    isHover.value = true
  }

  function onmouseleave() {
    isHover.value = false
  }

  return {
    isHover,
    onmouseenter,
    onmouseleave,
  }
}
