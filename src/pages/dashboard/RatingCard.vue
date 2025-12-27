<template>
    <div
        class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div class="flex items-start justify-between mb-4">
            <div class="flex flex-col gap-1">
                <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">Category</span>
                <h3 class="text-lg font-semibold text-slate-800">{{ card.category }}</h3>
            </div>

            <div class="p-2 bg-slate-50 rounded-lg">
                <component :is="resolvedIcon" class="h-5 w-5 text-slate-500" />
            </div>
        </div>

        <div class="flex items-baseline gap-1 mb-4">
            <span class="text-3xl font-bold text-slate-900">{{ card.rating }}</span>
            <span class="text-slate-400 font-medium">/ 10</span>
        </div>

        <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                :style="{ width: `${(Number(card.rating) / 10) * 100}%` }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RatingCard } from '@/types/reviews';
import { Sparkles, MessageSquare, ShieldCheck, Star, HelpCircle } from 'lucide-vue-next';

interface Props {
    card: RatingCard;
}
const props = defineProps<Props>();

const iconMap: Record<string, any> = {
    'Cleanliness': Sparkles,
    'Communication': MessageSquare,
    'House Rules': ShieldCheck,
    'Overall Experience': Star
};

const resolvedIcon = computed(() => {
    return iconMap[props.card.category] || HelpCircle;
});
</script>