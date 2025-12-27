<template>
  <div class="flex grow">
    <Sidebar />
    <div class="wrapper flex grow flex-col">
      <Header />
      <Content />
      <Footer />
    </div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from '@/components/layout/default/SidebarSection.vue'
import Header from '@/components/layout/default/HeaderSection.vue'
import Content from '@/components/layout/default/ContentSection.vue'
import Footer from '@/components/layout/default/FooterSection.vue'
</script>
