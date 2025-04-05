<script setup lang="ts">
const open = defineModel<boolean>()
</script>

<template>
  <Sheet v-model:open="open">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>New Task</SheetTitle>
      </SheetHeader>

      <p>Hello</p>

      <SheetFooter>
        <SheetClose>Close</SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
