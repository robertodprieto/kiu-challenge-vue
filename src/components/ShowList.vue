<template>
  <div>
    <button class="fixed-button filter-button" @click="openFilterShowsDialog">
      Filter Shows
    </button>
    <button class="fixed-button reload-button" @click="loadShows">
      Reload Shows
    </button>
    <div class="container">
      <div v-for="(show, index) in shows" :key="index">
        <div class="card">
          <img :src="show.image" alt="image" />
          <div class="show-details">
            <h1 class="name">{{ show.name }}</h1>
            <p class="type">{{ show.type }}</p>
            <p>Network: {{ show.network }}</p>
            <ul class="genres-list">
              <span class="genres-list__title">Genres:</span>
              <li v-for="(genre, ix) in show.genres" :key="ix">
                {{ genre }}
              </li>
            </ul>
          </div>
          <p v-if="show.officialSite" class="official-site">
            <button @click="goToSite(show.officialSite)">Official Site</button>
          </p>
          <p v-else class="official-site">
            <span class="no-official-site">Official Site Not Available</span>
          </p>
        </div>
      </div>
    </div>
    <FilterShowsDialog
      ref="filterDialog"
      :typeOfFilter="TYPE_OF_FILTERS.GENRES"
      :availableItems="availableGenres"
      @filterShows="filterShows($event)"
    />
  </div>
</template>

<script>
import { TYPE_OF_FILTERS } from "../constants/enums.js";

import FilterShowsDialog from "./FilterShowsDialog.vue";
import { getShowsByPage } from "@/services/ShowsService.js";
export default {
  name: "ShowList",
  components: { FilterShowsDialog },
  data() {
    return {
      shows: [],
      availableGenres: [],
      TYPE_OF_FILTERS,
    };
  },
  methods: {
    openFilterShowsDialog() {
      this.$refs.filterDialog.$refs.dialog.showModal();
    },
    filterShows(selectedItems) {
      this.shows = this.originalShows.filter((item) =>
        item.genres.some((genre) => selectedItems.includes(genre))
      );
    },
    goToSite(siteUrl) {
      window.open(siteUrl, "_blank");
    },
    findUniqueGenres(showsData) {
      let genres = [];
      showsData.map((item) => {
        genres = [...genres, ...item.genres];
      });
      return Array.from(new Set(genres)).sort();
    },
    mapResponse(showsData) {
      return showsData.map((item) => {
        return {
          image: item.image?.original,
          name: item.name,
          type: item.type,
          network: item.network?.name,
          officialSite: item.officialSite,
          genres: item.genres,
        };
      });
    },
    orderListByVowelsAmount(items) {
      return items.sort(
        (item1, item2) =>
          this.countVowels(item1) - this.countVowels(item2) ||
          item1.name.localeCompare(item2.name)
      );
    },
    countVowels(item) {
      return item.name.match(/[aeiou]/gi) === null
        ? 0
        : item.name.match(/[aeiou]/gi).length;
    },
    async loadShows() {
      const showsData = await getShowsByPage(1);

      this.availableGenres = this.findUniqueGenres(showsData);

      const mappedResponse = this.mapResponse(showsData);
      this.shows = this.orderListByVowelsAmount(mappedResponse);
      this.originalShows = [...this.shows];
    },
  },
  async mounted() {
    await this.loadShows();
  },
};
</script>

<style lang="css" scoped>
.container {
  background-color: lightgray;
  display: flex;
  gap: 15px;
  flex-direction: column;
  padding-top: 15px;
}

.fixed-button {
  width: 10%;
  position: fixed;
  top: 0.5rem;
}

.filter-button {
  align-self: flex-start;
  left: 0.5rem;
}

.reload-button {
  align-self: flex-end;
  right: 0.5rem;
}

.card {
  border: 6px solid #bbb;
  border-bottom: 3px solid #bbb;
  max-width: 25rem;
  margin: auto;
  text-align: center;
  font-family: arial;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  justify-items: center;
  overflow-x: hidden;
}

.name {
  margin-top: 0;
}

.type {
  color: grey;
  font-size: 18px;
}

img {
  width: 100px;
  height: auto;
  align-self: center;
  margin-left: 2rem;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

.show-details {
  margin-top: 1rem;
}

.no-official-site {
  display: inline-block;
  background-color: #555;
  width: 100%;
  color: #fff;
  padding: 8px;
  font-size: 18px;
}

.genres-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.genres-list__title {
  color: #555;
}

.genres-list {
  overflow: hidden;
  text-overflow: ellipsis;
}

.official-site {
  justify-self: stretch;
  grid-column: 1 / -1;
  margin: 0.1rem 0 0 0;
}
</style>
