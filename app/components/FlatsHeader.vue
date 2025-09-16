<script setup lang="ts">
import type {Apartment} from "~/types/flat";

import ArrowIcon from "~/assets/img/arrow.svg";
import { Directions, type SortState } from "~/types/sort";

type Column = {
  key: keyof Apartment,
  label: string
  sortable?: boolean
}

const columns: Column[] = [
  {key: 'plan', label: 'Планировка', sortable: false},
  {key: 'apt', label: 'Квартира', sortable: false},
  {key: 'area', label: 'S, м²', sortable: true},
  {key: 'floor', label: 'Этаж', sortable: true},
  {key: 'price', label: 'Цена, ₽', sortable: true},
];

const props = defineProps<{
  modelValue: SortState,
}>();
const emit = defineEmits<{
  'sort': [SortState]
}>();

function sortData(sortKey: keyof Apartment, sortable: boolean = false) {
  if (!sortable) return;

  const { key, direction } = props.modelValue;
  const newSortState: SortState = { ...props.modelValue };

  if (sortKey && key !== sortKey) {
    newSortState.key = sortKey;
  } else {
    newSortState.direction = direction === Directions.Asc ? Directions.Desc : Directions.Asc;
  }

  emit('sort', unref(newSortState));
}

function isAsc(columnKey: string) {
  const { key, direction } = props.modelValue;
  return key === columnKey && direction === Directions.Asc;
}

function isDesc(columnKey: string) {
  const { key, direction } = props.modelValue;
  return key === columnKey && direction === Directions.Desc;
}

</script>

<template>
  <div :class="$style['flats-header-wrapper']">
    <div :class="$style['flats-header']">
      <div
          v-for="{ key, label, sortable } in columns" :key="key"
          :class="[
                  $style['flats-header__col'],
                  key === 'plan' && $style['flats-header__plan-col'],
                  key === 'apt' && $style['flats-header__apt-col'],
                  key === 'area' && $style['flats-header__area-col'],
                  key === 'floor' && $style['flats-header__floor-col'],
                  key === 'price' && $style['flats-header__price-col'],
                ]"
          @click="sortData(key, sortable)"
      >
        <span
            :class="[
                $style['flats-header__label'],
                modelValue.key === key && $style['flats-header__arrow--active'],
              ]"
        >
          {{ label }}
        </span>
        <span
            v-if="sortable"
            :class="$style['flats-header__sort']" aria-hidden="true"
        >
        <ArrowIcon
            :class="[
              $style['flats-header__arrow'],
              isAsc(key) && $style['flats-header__arrow--active'],
            ]"
        />
        <ArrowIcon
            :class="[
              $style['flats-header__arrow'],
              $style['flats-header__arrow-down'],
              isDesc(key) && $style['flats-header__arrow--active'],
            ]"
        />
    </span>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.flats {
  &-header {
    display: grid;
    grid-template-areas: "a b c d e";
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
    gap: 20px;
    column-gap: 20px;
    padding-top: 24px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0;
    padding-bottom: 16px;
    border-bottom: 1px solid $light-gray;

    @media (max-width: 1439px) {
      display: inline-grid;
      grid-template-areas: "c d e";
      grid-template-columns: 1fr 1fr 1fr;
      border: none;
    }

    &-wrapper {
      width: 100%;
      position: sticky;
      top: 0;
      background-color: $white;
    }

    &__col {
      display: flex;
      gap: 8px;
    }

    &__plan-col {
      grid-area: a;

      @media (max-width: 1439px) {
        display: none;
      }
    }

    &__apt-col {
      grid-area: b;

      @media (max-width: 1439px) {
        display: none;
      }
    }

    &__area-col {
      grid-area: c;
    }

    &__floor-col {
      grid-area: d;
    }

    &__price-col {
      grid-area: e;
    }

    &__label {
      &:hover {
        cursor: pointer;
        color: $hover-main;
      }
    }

    &__sort {
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      gap: 2px;
    }

    &__arrow {
      width: 7px;
      height: 4px;
      fill: $main;

      &-down {
        transform: rotate(180deg);
      }

      &--active {
        fill: $hover-main;
        color: $hover-main;
      }
    }
  }
}
</style>