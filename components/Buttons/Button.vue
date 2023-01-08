<template>
  <button class="button--green" :disabled="disabled" @click="onClick">
    <slot>Button</slot>
    <Arrow icon-color="#fff" width="15" class="arrow-icon" />
  </button>
</template>

<script>
import Arrow from '~/components/Icons/Arrow'

export default {
  components: {
    Arrow
  },
  props: {
    onClick: {
      type: Function,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.arrow-icon {
  position: relative;
  top: .15em;
  left: .3em;
}
</style>
