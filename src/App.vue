<template>
  <div id="app">
    <ShowList />
  </div>
</template>

<script>
import ShowList from "@/components/ShowList.vue";
export default {
  name: "App",
  components: {
    ShowList,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}
button:hover:not(:disabled),
a:hover:not(:disabled) {
  opacity: 0.7;
}
</style>
