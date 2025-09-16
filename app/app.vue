<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import type { Apartment } from "~/types/flat";

import FlatsHeader from "~/components/FlatsHeader.vue";
import Button from "~/components/ui/Button.vue";
import { Directions, type SortState } from "~/types/sort";

useHead({
  title: 'Квартиры в новостройке — цены и планировки',
  meta: [
    { name: 'description', content: 'Подборка квартир в новостройке: цены, планировки, фото. Удобный поиск по фильтрам.' },
    { name: 'keywords', content: 'квартиры, купить квартиру, новостройки, недвижимость' },
    { property: 'og:title', content: 'Квартиры в новостройке — цены и планировки' },
    { property: 'og:description', content: 'Актуальные цены и планировки квартир. Удобный фильтр по комнатам и этажам.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://example.com/og/kvartiry.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Квартиры в новостройке — цены и планировки' },
    { name: 'twitter:description', content: 'Подборка квартир по цене, комнатам и этажам. С фото и планировками.' },
    { name: 'twitter:image', content: 'https://example.com/og/kvartiry.jpg' },
  ],
});

const flatsStore = useFlatsStore();
const { fetchMoreFlats, fetchAvailableRoomsData } = flatsStore;
const { filteredFlatsList, canFetchMore, flatsLoading, flatsDataLoaded } = storeToRefs(flatsStore);
const sortState = ref<SortState>({ key: null, direction: Directions.Asc });
const sortedFlats = computed(() => {
  const { key, direction } = sortState.value;

  return [...filteredFlatsList.value].sort((a: Apartment, b: Apartment) => {
    if (!key || a[key] === b[key]) return 0;

    return direction === Directions.Asc
        ? a[key] > b[key]
            ? 1 : -1
        : a[key] < b[key]
            ? 1 : -1;
  });
});

function sortFlats(sortData: SortState): void {
  sortState.value = sortData;
}

onMounted(async () => {
  await Promise.all([fetchAvailableRoomsData(), fetchMoreFlats()]);
});
</script>

<template>
  <ScrollUp/>
  <div class="container grid-12" :class="$style['flats']">
    <div class="span-7">
      <h1>
        Квартиры
      </h1>
      <FlatsHeader v-model="sortState" @sort="sortFlats"/>
      <div :class="$style['flats-list']">
        <FlatCard v-for="flat of sortedFlats" :key="flat.id" :flat-data="flat"/>
        <div v-if="flatsDataLoaded && !sortedFlats.length" :class="$style['flats-list__not-found']">
          По данным параметрам ничего не найдено.
        </div>
      </div>
      <Button
          v-if="canFetchMore"
          :class="$style['flats-list__load-more']"
          @click="fetchMoreFlats"
      >
        {{ flatsLoading ? 'Загрузка...' : 'Загрузить ещё' }}
      </Button>
    </div>
    <div class="span-5">
      <FlatsFilter
          :class="$style['flats__filters']"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.flats {
  column-gap: 80px;

  @media (max-width: 1439px) {
    column-gap: 28px;
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &__load-more {
      margin-top: 48px;

      @media (max-width: 1439px) {
        margin-top: 24px;
      }
    }

    &__not-found {
      padding-top: 16px;
    }
  }

  &__filters {
    position: sticky;
    top: 24px;
  }
}
</style>
