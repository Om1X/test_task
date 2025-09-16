<script setup lang="ts">
import Slider from '@vueform/slider';
import { storeToRefs } from 'pinia';

import { MAX_ROOMS } from '~/assets/consts/flatFilter';
import RoomsButton from '~/components/ui/RoomsButton.vue';

const flatsStore = useFlatsStore();
const { toggleRoomOptions, resetFilter } = flatsStore;
const {
  roomsList,
  selectedRooms,
  minPrice,
  maxPrice,
  minArea,
  maxArea,
  priceFilterValue,
  areaFilterValue,
  flatsDataLoaded,
  filtersActive
} = storeToRefs(flatsStore);

function checkRoomAvailability(roomsCount: number): boolean {
  return roomsList.value.includes(roomsCount);
}
</script>

<template>
  <div :class="$style['flats-filter']">
    <div :class="$style['flats-filter__rooms-selector']">
      <RoomsButton
          v-for="roomsCount in MAX_ROOMS"
          :key="roomsCount"
          :count="roomsCount"
          :active="selectedRooms.has(roomsCount)"
          :disabled="!checkRoomAvailability(roomsCount)"
          @click="toggleRoomOptions(roomsCount)"
      />
    </div>
    <div>
      <h3 :class="$style['flats-filter__price-header']">
        Стоимость квартиры, ₽
      </h3>
      <div class="grid-12">
        <div class="span-6">
          <span :class="$style['flats-filter__label']">от</span>
          <span :class="$style['flats-filter__value']">
            {{ flatsDataLoaded? formatNumber(priceFilterValue[0] as number) : 0 }}
          </span>
        </div>
        <div class="span-6">
          <span :class="$style['flats-filter__label']">до</span>
          <span :class="$style['flats-filter__value']">
            {{ flatsDataLoaded ? formatNumber(priceFilterValue[1] as number) : 0 }}
          </span>
        </div>
      </div>
      <Slider
          v-if="flatsDataLoaded"
          v-model="priceFilterValue"
          :min="minPrice"
          :max="maxPrice"
          :step="10000"
          :tooltips="false"
          :lazy="false"
          :class="$style['flats-filter__slider']"
      />
      <h3 :class="$style['flats-filter__price-header']">
        Площадь, м²
      </h3>
      <div class="grid-12">
        <div class="span-6">
          <span :class="$style['flats-filter__label']">от</span>
          <span :class="$style['flats-filter__value']">
            {{ flatsDataLoaded ? formatNumber(areaFilterValue[0] as number) : 0 }}
          </span>
        </div>
        <div class="span-6">
          <span :class="$style['flats-filter__label']">до</span>
          <span :class="$style['flats-filter__value']">
            {{ flatsDataLoaded ? formatNumber(areaFilterValue[1] as number) : 0 }}
          </span>
        </div>
      </div>
      <Slider
          v-if="flatsDataLoaded"
          v-model="areaFilterValue"
          :min="minArea"
          :max="maxArea"
          :step="0.1"
          :tooltips="false"
          :lazy="false"
          :class="$style['flats-filter__slider']"
      />
    </div>
    <div>
      <button
          v-if="filtersActive"
          :class="$style['flats-filter__reset-button']"
          @click="resetFilter"
      >
        Сбросить параметры
      </button>
    </div>
  </div>
</template>

<style module lang="scss">
.flats-filter {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: linear-gradient(135deg, rgba(174, 228, 178, 0.3) 0%, rgba(149, 208, 161, 0.3) 100%);
  border-radius: 10px;
  padding: 40px;

  @media (max-width: 1439px) {
    padding: 20px;
  }

  &__label {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;

    @media (max-width: 1439px) {
      font-size: 14px;
      line-height: 20px;
    }
  }

  &__value {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
    background-color: transparent;
    border: 0;
    outline: none;
    margin-left: 8px;

    @media (max-width: 1439px) {
      font-size: 14px;
      line-height: 20px;
    }
  }

  &__rooms-selector {
    display: flex;
    gap: 16px;
  }

  &__price-header {
    margin: 0 0 8px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0;

  }

  &__slider {
    margin-top: 6px;
    margin-bottom: 24px;

    --slider-connect-bg: #3EB57C;
    --slider-bg: #e5e7eb;
    --slider-handle-bg: #3EB57C;
    --slider-handle-shadow: none;
    --slider-height: 3px;
    --slider-handle-width: 14px;
    --slider-handle-height: 14px;
    --slider-radius: 9999px;
  }

  &__reset-button {
    position: relative;
    display: flex;
    height: 32px;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0;
    padding: 0 24px 0 16px;
    background-color: transparent;
    border: none;

    @media (max-width: 1439px) {
      font-size: 13px;
      line-height: 18px;
    }

    &:hover {
      cursor: pointer;
    }

    &::after {
      position: absolute;
      display: block;
      width: 8px;
      height: 8px;
      content: "";
      top: 12px;
      right: 8px;
      background: url("@/assets/img/cross.svg") no-repeat;
    }
  }
}
</style>