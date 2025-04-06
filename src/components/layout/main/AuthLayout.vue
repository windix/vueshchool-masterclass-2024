<script setup lang="ts">
const { menuOpen } = useMenu()

const { pageData } = storeToRefs(usePageStore())
const projectSheetOpen = ref(false)
const taskSheetOpen = ref(false)
</script>

<template>
  <div>
    <Sidebar @newProjectClicked="projectSheetOpen = true" @newTaskClicked="taskSheetOpen = true" />
    <AppNewProject v-model="projectSheetOpen" />
    <AppNewTask v-model="taskSheetOpen" />
    <div
      class="flex flex-col transition-[margin]"
      :class="{
        'ml-24': !menuOpen,
        'ml-52': menuOpen,
      }"
    >
      <TopNavbar />
      <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>
