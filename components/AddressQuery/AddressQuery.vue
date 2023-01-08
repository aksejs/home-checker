<template>
  <div
    :class="{
      aq: true,
      'aq--mobile': isMobile,
      'aq--focused': isFocused,
      'aq--with-options': isFocused && options.length,
      'aq--highlighted': isHighlighted,
    }"
  >
    <div
      ref="container"
      class="aq__container"
    >
      <div class="aq__icon" />
      <label class="aq__field">
        <span
          v-if="placeholder"
          :class="{
            'aq__placeholder': true,
            'aq__placeholder--focused': queryString.length || isFocused,
          }"
        >
          {{ placeholder }}
        </span>
        <input
          ref="input"
          v-model="queryString"
          type="text"
          class="aq__input"
          @input="dropValue"
          @focus="onFocus"
          @blur="onBlur"
        >
      </label>
      <button
        v-if="!isMobile"
        :disabled="isButtonDisabled"
        :class="{
          'aq__button': true,
          'aq__button--inline': true,
          'aq__button--disabled': isButtonDisabled
        }"
        @click="submit"
      >
        <span class="aq__button-label">
          {{ buttonLabel }}
        </span>
        <span class="aq__button-icon" />
      </button>
    </div>
    <button
      v-if="isMobile"
      :disabled="isButtonDisabled"
      :class="{
        'aq__button': true,
        'aq__button--block': true,
        'aq__button--disabled': isButtonDisabled
      }"
      @click="submit"
    >
      <span class="aq__button-label">
        {{ buttonLabel }}
      </span>
      <span class="aq__button-icon" />
    </button>
    <div class="aq__hint">
      {{ hint }}
    </div>
    <div
      v-if="options.length"
      ref="popup"
      class="aq__options"
    >
      <div class="aq__options-label">
        {{ optionsLabel }}
      </div>
      <div class="aq__options-list">
        <button
          v-for="(option, index) in options"
          :key="index"
          :class="{
            'aq__option': true,
            'aq__option--active': value && (value.id === option.id),
          }"
          @click="selectOption(option)"
        >
          <span class="aq__option-label">
            {{ option.label }}
          </span>
          <span class="aq__option-icon" @click.prevent="optionArrowClick(option)" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressQuery',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    buttonLabel: {
      type: String,
      default: ''
    },
    timeout: {
      type: Number,
      default: 250
    },
    optionsLabel: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: null
    },
    isMobile: Boolean
  },
  data () {
    return {
      queryString: '',
      isFocused: false,
      queryTimeout: null,
      isHighlighted: false
    }
  },
  computed: {
    isButtonDisabled () {
      return !this.value
    }
  },
  watch: {
    queryString (value) {
      if (this.queryTimeout) {
        clearTimeout(this.queryTimeout)
      }
      this.queryTimeout = setTimeout(() => {
        this.$emit('query', value)
      }, this.timeout)
    }
  },
  created () {
    this.$root.$on('focusInput', () => {
      this.isHighlighted = true

      this.$refs.input.focus()

      setTimeout(() => {
        this.isHighlighted = false
      }, 1500)
    })
  },
  methods: {
    dropValue () {
      this.$emit('input', null)
    },
    optionArrowClick (option) {
      this.selectOption(option)
      this.submit()
    },
    submit () {
      this.$emit('submit')
    },
    selectOption (option) {
      this.$emit('input', option.data)
      this.isFocused = false
      this.queryString = option.label
    },
    onFocus () {
      this.isFocused = true
    },
    onBlur ({ relatedTarget }) {
      if (
        this.$refs.popup && (
          this.$refs.popup.contains(relatedTarget) || this.$refs.popup === relatedTarget
        )
      ) {
        return
      }
      this.isFocused = false
    }
  }
}
</script>

<style lang="scss">
  @import "./addressQuery";
</style>
