<script setup lang="ts"></script>

<template>
  <section class="error">
    <div>
      <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
      <h1 class="error__code">404</h1>
      <p class="error__msg">Page not found</p>
      <div class="error-footer">
        <p class="error-footer__text">You'll find lots to explore on the home page.</p>
        <RouterLink to="/">
          <Button class="max-w-36"> Back to homepage </Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference '@/assets/index.css';

.error {
  @apply mx-auto -mt-20 flex min-h-[90vh] flex-1 items-center justify-center p-10 text-center;
}

.error__icon {
  @apply text-7xl text-destructive;
}

.error__code {
  @apply text-7xl font-extrabold text-gray-400;
}

.error__msg {
  @apply text-3xl font-extrabold text-primary;
}

.error-footer {
  @apply mt-6 flex flex-col items-center justify-center gap-5 font-light;
}

.error-footer__text {
  @apply text-lg text-muted-foreground;
}

p {
  @apply my-2;
}
</style>
