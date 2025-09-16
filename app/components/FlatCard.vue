<script setup lang="ts">
import type { Apartment } from '~/types/flat';

import { formatNumber } from '~/utils/formatNumber';

defineProps<{
  flatData: Apartment,
}>();
</script>

<template>
  <div :class="$style['flat-card']">
    <div :class="$style['flat-card__plan-cell']">
      <img :src="flatData.plan" alt="Планировка" width="80px">
    </div>
    <div :class="$style['flat-card__apt-cell']">
      {{ flatData.apt }}
    </div>
    <div :class="$style['flat-card__area-cell']">
      {{ formatNumber(flatData.area) }}
    </div>
    <div :class="$style['flat-card__floor-cell']">
      {{ flatData.floor }}
      <span>&nbsp;из {{ flatData.floors }}
        <span :class="$style['flat-card__floor-postfix']">&nbsp;этаж</span>
      </span>
    </div>
    <div :class="$style['flat-card__price-cell']">
      {{ formatNumber(flatData.price) }}
    </div>
  </div>
</template>

<style module lang="scss">
.flat-card {
  display: grid;
  grid-template-areas: "a b c d e";
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
  gap: 20px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  padding: 16px 0;
  border-bottom: 1px solid $light-gray;

  @media (max-width: 1439px) {
    grid-template-areas:
      "b b b a"
      "c d e a";
    grid-template-columns: 1fr 1fr 2fr 1fr;
    border-radius: 8px;
    border: 1px solid $light-gray;
    padding: 16px 24px;
    font-size: 14px;
    line-height: 20px;
  }

  &__plan-cell {
    grid-area: a;

    @media (max-width: 1439px) {
      text-align: end;
    }
  }

  &__apt-cell {
    grid-area: b;
  }

  &__area-cell {
    grid-area: c;
  }

  &__floor {
    &-cell {
      grid-area: d;

      span {
        color: $gray;
      }
    }

    &-postfix {
      display: none;

      @media (max-width: 1439px) {
        display: unset;
      }
    }
  }

  &__price-cell {
    grid-area: e;
  }
}
</style>