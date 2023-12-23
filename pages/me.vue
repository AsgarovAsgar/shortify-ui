<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
})

// no need for calling initUser function here,
// because we initialize user in auth middleware before going to protected routes
const { user } = useAuth()
</script>

<template>
  <p><strong>User Name:</strong> {{ user.name }}</p>
  <p><strong>User Email:</strong> {{ user.email }}</p>
</template>
