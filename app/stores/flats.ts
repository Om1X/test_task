import {defineStore} from 'pinia';

import type {Apartment} from "~/types/flat";

import { API } from "~/assets/consts/api";
import {CACHE_KEY} from "~/assets/consts/flatFilter";

type FlatsResponse = {
    count: number
    next: number | null
    items: Apartment[]
};

type RoomsResponse = {
    items: number[]
}

export const useFlatsStore = defineStore('flatsStore', () => {
    const flatsList = ref<Apartment[]>([]);
    const roomsList = ref<number[]>([]);
    const currentPage = ref<number>(1);
    const flatsLoading = ref<boolean>(false);
    const roomsLoading = ref<boolean>(false);
    const flatsDataLoaded = ref(false);
    const roomsDataLoaded = ref(false);
    const canFetchMore = ref<boolean>(false);

    const selectedRooms = ref<Set<number>>(new Set());
    const priceFilterValue = ref<number[]>([0, 0]);
    const areaFilterValue = ref<number[]>([0, 0]);

    const minPrice = computed(() =>
        flatsList.value.reduce((minPrice: number, flat: Apartment) =>
                flat.price < minPrice ? flat.price : minPrice
            , flatsList.value[0]?.price ?? 0)
    );
    const maxPrice = computed(() =>
        flatsList.value.reduce((minPrice: number, flat: Apartment) =>
                flat.price > minPrice ? flat.price : minPrice
            , flatsList.value[0]?.price ?? 0)
    );


    const minArea = computed(() =>
        flatsList.value.reduce((minArea: number, flat: Apartment) =>
                flat.area < minArea ? flat.area : minArea
            , flatsList.value[0]?.area ?? 0)
    );
    const maxArea = computed(() =>
        flatsList.value.reduce((maxArea: number, flat: Apartment) =>
                flat.area > maxArea ? flat.area : maxArea
            , flatsList.value[0]?.area ?? 0)
    );

    const filteredFlatsList = computed<Apartment[]>(() => {
        return flatsList.value.filter((flat: Apartment) =>
            (selectedRooms.value.size === 0 || selectedRooms.value.has(flat.rooms))
            && flat.price >= (priceFilterValue.value[0] as number)
            && flat.price <= (priceFilterValue.value[1] as number)
            && flat.area >= (areaFilterValue.value[0] as number)
            && flat.area <= (areaFilterValue.value[1] as number)
        );
    });

    const filtersActive = computed(() => Boolean(selectedRooms.value.size)
            || priceFilterValue.value[0] !== minPrice.value
            || priceFilterValue.value[1] !== maxPrice.value
            || areaFilterValue.value[0] !== minArea.value
            || areaFilterValue.value[1] !== maxArea.value
    );

    function cacheSave() {
        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
                selectedRooms: Array.from(selectedRooms.value),
                priceFilterValue: priceFilterValue.value,
                areaFilterValue: areaFilterValue.value,
            })
        );
    }

    function loadCache() {
        if (import.meta.client) {
            const storageState = localStorage.getItem(CACHE_KEY);

            if (!storageState) return;

            const data = JSON.parse(storageState);

            selectedRooms.value = new Set<number>(data.selectedRooms ?? []);

            if (Array.isArray(data.priceFilterValue) && data.priceFilterValue.length === 2) {
                priceFilterValue.value = [Number(data.priceFilterValue[0]), Number(data.priceFilterValue[1])];
            }

            if (Array.isArray(data.areaFilterValue) && data.areaFilterValue.length === 2) {
                areaFilterValue.value = [Number(data.areaFilterValue[0]), Number(data.areaFilterValue[1])];
            }
        }
    }

    async function fetchMoreFlats() {
        const api = `${API.flatsUrl}/${currentPage.value}.json`;

        try {
            if (flatsLoading.value) return;

            flatsLoading.value = true;
            const { items, next } = await fetch(api,{ method: 'GET' })
                .then((res) => res.json()) as FlatsResponse;

            if (items?.length) flatsList.value.push(...items);
            currentPage.value += 1;
            canFetchMore.value = Boolean(next);

            if (!flatsDataLoaded.value) {
                priceFilterValue.value = [minPrice.value, maxPrice.value];
                areaFilterValue.value = [minArea.value, maxArea.value];
            }

            loadCache();

            flatsDataLoaded.value = true;
        } catch (error) {
            console.log(error);
        } finally {
            flatsLoading.value = false;
        }
    }

    async function fetchAvailableRoomsData() {
        try {
            if (roomsLoading.value) return;

            roomsLoading.value = true;
            const { items } = await fetch(API.roomsUrl,{ method: 'GET' })
                .then((res) => res.json()) as RoomsResponse;

            if (items?.length) {
                roomsList.value = items;
            }
            roomsDataLoaded.value = true;
        } catch (error) {
            console.log(error);
        } finally {
            roomsLoading.value = false;
        }
    }

    function toggleRoomOptions(rooms: number): void {
        const roomsOptions = new Set<number>(selectedRooms.value);

        if (roomsOptions.has(rooms)) roomsOptions.delete(rooms);
        else roomsOptions.add(rooms);

        selectedRooms.value = roomsOptions;
    }

    function resetFilter(): void {
        selectedRooms.value.clear();
        priceFilterValue.value = [minPrice.value, maxPrice.value];
        areaFilterValue.value = [minArea.value, maxArea.value];
    }

    const cacheSaveDebounce = debounce(cacheSave);

    if (import.meta.client) {
        watch(selectedRooms, cacheSaveDebounce, { deep: true });
        watch(priceFilterValue, cacheSaveDebounce, { deep: true });
        watch(areaFilterValue, cacheSaveDebounce, { deep: true });
    }

    return {
        flatsLoading,
        roomsLoading,
        canFetchMore,
        flatsList,
        roomsList,
        filteredFlatsList,
        selectedRooms,
        minPrice,
        maxPrice,
        minArea,
        maxArea,
        priceFilterValue,
        areaFilterValue,
        flatsDataLoaded,
        filtersActive,
        fetchMoreFlats,
        fetchAvailableRoomsData,
        toggleRoomOptions,
        resetFilter
    };
});
