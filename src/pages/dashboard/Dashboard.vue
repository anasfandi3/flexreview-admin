<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-if="loading" class="col-span-full">Loading stats...</div>
        <RatingCardComp v-for="card in dashboardStats" :key="card.category" :card="card" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import RatingCardComp from '@/pages/dashboard/RatingCard.vue';
import type { RatingCard } from '@/types/reviews';
import axios from '@/axios';
const dashboardStats = ref<RatingCard[]>()
const loading = ref(true)
const isRefreshing = ref(false)
const fetchStats = async () => {
    isRefreshing.value = true
    try {
        const response = await axios.get('/reviews/stats')
        dashboardStats.value = response?.data
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
    } finally {
        loading.value = false
        isRefreshing.value = false
    }
}
onMounted(() => {
    fetchStats()
})
</script>