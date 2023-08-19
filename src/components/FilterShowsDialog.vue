<template>
  <dialog class="filters-dialog" ref="dialog">
    <header class="title">Select {{ typeOfFilter }}</header>
    <section>
      <div class="select-unselect-all">
        <button class="select-dialog-button" @click="selectAllItems">
          Select All
        </button>
        <button class="select-dialog-button" @click="unselectAllItems">
          Unselect All
        </button>
      </div>
    </section>
    <main>
      <div class="filter-item" v-for="(item, ix) in availableItems" :key="ix">
        <input
          type="checkbox"
          :id="item"
          :value="item"
          v-model="selectedItems"
        />
        <label :for="item">{{ item }}</label>
      </div>
    </main>
    <footer>
      <button class="filters-dialog-button" @click="closeDialog">Cancel</button>
      <button
        class="filters-dialog-button"
        @click="filterShows"
        :disabled="!selectedItems.length"
      >
        Apply
      </button>
    </footer>
  </dialog>
</template>
<script>
export default {
  name: "Genres",
  emits: ["filterShows"],
  props: {
    typeOfFilter: {
      required: true,
      type: String,
    },
    availableItems: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      selectedItems: [],
    };
  },
  methods: {
    closeDialog() {
      this.$refs.dialog.close();
    },
    filterShows() {
      this.$emit("filterShows", this.selectedItems);
      this.closeDialog();
    },
    selectAllItems() {
      this.selectedItems = [];
      this.availableItems.forEach((item) => {
        this.selectedItems.push(item);
      });
    },
    unselectAllItems() {
      this.selectedItems = [];
    },
  },
};
</script>
<style scoped>
.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}
main {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.select-unselect-all {
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
}
.filter-item {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}
.filters-dialog {
  width: 50vw;
}
main {
  margin-bottom: 3rem;
}
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.select-dialog-button {
  width: auto;
}
.filters-dialog-button {
  width: 20vw;
}
.filters-dialog-button:disabled {
  background-color: rgba(0, 0, 0, 0.3);
  cursor: default;
}
.filters-dialog-button:disabled:hover,
.filters-dialog-button:disabled:active {
  background-color: rgba(0, 0, 0, 0.3);
  cursor: default;
}
</style>
