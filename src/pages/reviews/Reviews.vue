<template>
    <div class="space-y-6">
        <div
            class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <Filter class="h-4 w-4 text-slate-400" />
                    <span class="text-sm font-medium text-slate-700">Filter by Channel:</span>
                </div>
                <div class="flex gap-2">
                    <button v-for="channel in ['All', 'Google', 'Hostaway']" :key="channel"
                        class="px-3 py-1.5 text-xs font-medium rounded-full border transition-all"
                        :class="activeChannel === channel ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'"
                        @click="activeChannel = channel">
                        {{ channel }}
                    </button>
                </div>
            </div>

            <div class="text-sm text-slate-500">
                Total: <span class="font-bold text-slate-800">{{ totalResults }} Reviews</span>
            </div>
        </div>

        <div class="relative bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[400px]">
            <div v-if="loading"
                class="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                <Loader2 class="h-8 w-8 text-indigo-600 animate-spin" />
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse min-w-[1000px]">
                    <thead class="bg-slate-50/80 border-b border-slate-200">
                        <tr>
                            <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Guest &
                                Listing</th>

                            <th @click="toggleSort('submitted_at')"
                                class="px-4 py-4 cursor-pointer group hover:bg-slate-100 transition-colors">
                                <div class="flex items-center gap-1">
                                    <span
                                        class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Submitted
                                        At</span>
                                    <ArrowUpDown class="h-3 w-3"
                                        :class="sortConfig.field === 'submitted_at' ? 'text-indigo-500' : 'text-slate-300'" />
                                </div>
                            </th>

                            <th @click="toggleSort('cleanliness')"
                                class="px-4 py-4 cursor-pointer group hover:bg-slate-100">
                                <div class="flex items-center gap-1">
                                    <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        cleanliness
                                    </span>
                                    <ArrowUpDown class="h-3 w-3"
                                        :class="sortConfig.field === 'cleanliness' ? 'text-indigo-500' : 'text-slate-300'" />
                                </div>
                            </th>
                            <th @click="toggleSort('communication')"
                                class="px-4 py-4 cursor-pointer group hover:bg-slate-100">
                                <div class="flex items-center gap-1">
                                    <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Communication
                                    </span>
                                    <ArrowUpDown class="h-3 w-3"
                                        :class="sortConfig.field === 'communication' ? 'text-indigo-500' : 'text-slate-300'" />
                                </div>
                            </th>
                            <th @click="toggleSort('respect_house_rules')"
                                class="px-4 py-4 cursor-pointer group hover:bg-slate-100">
                                <div class="flex items-center gap-1">
                                    <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        House Rules
                                    </span>
                                    <ArrowUpDown class="h-3 w-3"
                                        :class="sortConfig.field === 'respect_house_rules' ? 'text-indigo-500' : 'text-slate-300'" />
                                </div>
                            </th>

                            <th @click="toggleSort('average_rating')"
                                class="px-4 py-4 cursor-pointer group hover:bg-slate-100">
                                <div class="flex items-center gap-1">
                                    <span
                                        class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Overall</span>
                                    <ArrowUpDown class="h-3 w-3"
                                        :class="sortConfig.field === 'rating' ? 'text-indigo-500' : 'text-slate-300'" />
                                </div>
                            </th>

                            <th
                                class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
                                Public Website</th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-slate-100 text-sm">
                        <tr v-for="review in reviews" :key="review.id" class="hover:bg-slate-50/30 transition-colors">
                            <td class="px-6 py-4">
                                <div class="font-semibold text-slate-800">{{ review.guest_name }}</div>
                                <div class="text-[11px] text-slate-400 truncate w-40">{{ review.listing_name }}</div>
                            </td>

                            <td class="px-4 py-4 text-slate-500 whitespace-nowrap">
                                {{ review.submitted_at }}
                            </td>

                            <td class="px-4 py-4">
                                <span :class="getRatingColor(review.cleanliness)">
                                    {{ review.cleanliness }}
                                </span>
                            </td>
                            <td class="px-4 py-4">
                                <span :class="getRatingColor(review.communication)">
                                    {{ review.communication }}
                                </span>
                            </td>
                            <td class="px-4 py-4">
                                <span :class="getRatingColor(review.respect_house_rules)">
                                    {{ review.respect_house_rules }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <div class="flex items-center font-bold text-slate-900">
                                    <Star class="h-3 w-3 text-amber-400 fill-amber-400 mr-1" />
                                    {{ review.average_rating || calculateAverage(review.average_rating) }}
                                </div>
                            </td>

                            <td class="px-6 py-4">
                                <div class="flex justify-center">
                                    <button @click="togglePublicStatus(review)"
                                        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none"
                                        :class="review.status === 'published' ? 'bg-emerald-500' : 'bg-slate-200'">
                                        <span
                                            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"
                                            :class="review.status === 'published' ? 'translate-x-5' : 'translate-x-0'"></span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div
                class="px-6 py-4 bg-slate-50/80 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <span class="text-sm text-slate-500">
                        Showing <span class="font-semibold text-slate-800">{{ (currentPage - 1) * perPage + 1 }}</span>
                        to
                        <span class="font-semibold text-slate-800">{{ Math.min(currentPage * perPage, totalResults)
                        }}</span> of
                        <span class="font-semibold text-slate-800">{{ totalResults }}</span> results
                    </span>

                    <div class="hidden md:flex items-center gap-2">
                        <span class="text-xs text-slate-400 font-medium uppercase tracking-wider">Per Page:</span>
                        <select v-model="perPage"
                            class="bg-white border border-slate-200 text-xs rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500/20 outline-none">
                            <option :value="10">10</option>
                            <option :value="25">25</option>
                            <option :value="50">50</option>
                        </select>
                    </div>
                </div>

                <div class="flex items-center gap-1">
                    <button @click="currentPage = 1" :disabled="currentPage === 1"
                        class="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30">
                        <ChevronsLeft class="h-4 w-4" />
                    </button>
                    <button @click="currentPage--" :disabled="currentPage === 1"
                        class="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30 mr-2">
                        <ChevronLeft class="h-4 w-4" />
                    </button>

                    <div class="flex items-center gap-1">
                        <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                            v-show="page >= currentPage - 2 && page <= currentPage + 2"
                            :class="['w-8 h-8 text-xs font-bold rounded-lg transition-all', page === currentPage ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-white border border-transparent hover:border-slate-200']">
                            {{ page }}
                        </button>
                    </div>

                    <button @click="currentPage++" :disabled="currentPage === totalPages"
                        class="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30 ml-2">
                        <ChevronRight class="h-4 w-4" />
                    </button>
                    <button @click="currentPage = totalPages" :disabled="currentPage === totalPages"
                        class="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30">
                        <ChevronsRight class="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from '@/axios';
import {
    ArrowUpDown, Star, Filter, ChevronLeft, ChevronRight,
    ChevronsLeft, ChevronsRight, Loader2
} from 'lucide-vue-next';
import type { Review } from '@/types/reviews';

const reviews = ref<Review[]>([]);
const loading = ref(true);
const activeChannel = ref('All');
const currentPage = ref(1);
const totalPages = ref(1);
const totalResults = ref(0);
const perPage = ref(10);
const sortConfig = ref({ field: 'submitted_at', order: 'desc' });

const fetchReviews = async () => {
    loading.value = true;
    try {
        const response = await axios.get('/reviews', {
            params: {
                page: currentPage.value,
                channel: activeChannel.value,
                sort: sortConfig.value.field,
                order: sortConfig.value.order,
                per_page: perPage.value
            }
        });
        reviews.value = response.data.data;
        totalPages.value = response.data.last_page;
        totalResults.value = response.data.total;
    } catch (error) {
        console.error("Error fetching reviews:", error);
    } finally {
        loading.value = false;
    }
};

const getRatingColor = (score: number) => {
    if (score >= 9) return 'font-bold text-emerald-600';
    if (score >= 7) return 'font-bold text-amber-600';
    return 'font-bold text-rose-600';
};

const calculateAverage = (categories: any) => {
    if (!categories || categories.length === 0) return 0;
    const sum = categories.reduce((acc: number, curr: any) => acc + curr.rating, 0);
    return (sum / categories.length).toFixed(1);
};

const togglePublicStatus = async (review: any) => {
    const newStatus = review.status === 'published' ? 'hidden' : 'published';
    try {
        await axios.put(`/reviews/toggle/${review.id}`, { status: newStatus });
        review.status = newStatus;
    } catch (error) {
        console.error("Failed to update status", error);
    }
};

const toggleSort = (field: string) => {
    if (sortConfig.value.field === field) {
        sortConfig.value.order = sortConfig.value.order === 'asc' ? 'desc' : 'asc';
    } else {
        sortConfig.value.field = field;
        sortConfig.value.order = 'desc';
    }
    fetchReviews();
};


watch([activeChannel, perPage], () => {
    currentPage.value = 1;
    fetchReviews();
});

watch(currentPage, () => {
    fetchReviews();
});

onMounted(fetchReviews);
</script>