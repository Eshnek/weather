<template>
    <div class="flex gap-8 justify-center items-center w-screen h-screen bg-zinc-950">
        <!-- This seems to be necessary to get the styles to exist properly -->
        <div class="hidden border-orange-100" />
        <div class="hidden border-orange-200" />
        <div class="hidden border-orange-300" />
        <div class="hidden border-orange-400" />
        <div class="hidden border-orange-500" />
        <div class="hidden border-orange-600" />
        <div class="hidden border-orange-700" />

        <div v-for="city in cities" :key="city.name" class="p-6 h-min card rounded-xl border-2 text-white text-center flex flex-col gap-2" :class="computeCityClass(city)">
            <div class="text-xl">
                {{ city.name }}
            </div>
            <div class="text-lg text-gray-300">
                {{ city.temperature }}°F
            </div>
        </div>
    </div>

    <Corner link="https://github.com/Eshnek/weather" class="fixed top-0 right-0 w-16 z-50" />
</template>

<script lang="ts">
export default {
    methods: {
        async fetchCities(): Promise<any> {
            const { cities } = await $fetch('/api/cities') as any;

            console.info(cities);

            return cities;
        },
        sortCities(): any[] {
            return [...this.cities].sort((a, b) => a.temperature - b.temperature);
        },

        computeCityClass(city: any): string {
            let score = this.sortedCities.map(c => c.name).indexOf(city.name);

            score = 5 - score;

            return `border-orange-${score}00`;
        },
    },
    data() {
        return {
            cities: [] as any[],
            sortedCities: [] as any[],
        };
    },
    async mounted() {
        this.cities = await this.fetchCities();
        this.sortedCities = this.sortCities();
    }
}
</script>
