<template>
  <div>
    <h1>Hello!</h1>
    <p>I'm Vue2 App in React! <b>Counter: </b> {{ counter }}</p>
    <button @click="clearCounter">Clear counter</button>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    counter() {
      return this.$root.reactProp;
    },
  },
  methods: {
    clearCounter() {
      return this.$root.callRemoteAppMethod("clear-counter");
    },
  },
};
</script>
