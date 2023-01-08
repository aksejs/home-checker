<template>
  <h1>Hello</h1>
</template>

<script>
export default {
  validate ({ params }) {
    // Must be a number with dashes
    return /[\d -]+/g.test(params.egrn)
  },
  mounted () {
  }
}
</script>
