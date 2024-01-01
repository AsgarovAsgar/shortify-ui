<script setup lang="ts">
import type { LoginPayload } from '@/types';
import type { FormKitNode } from '@formkit/core'

definePageMeta({
  layout: "centered",
  middleware: ['guest']
});

const { login } = useAuth()

async function handleLogin(payload: LoginPayload, node?: FormKitNode) {
  try {
    await login(payload)
  } catch (err) {
    handleInvalidForm(err, node)
  }
}

</script>

<template>
  <div class="login">
    <h1>Login</h1>

    <FormKit type="form" submit-label="Login" @submit="handleLogin">
      <FormKit label="Email" name="email" type="email" />
      <FormKit label="Password" name="password" type="password" />
    </FormKit>

    <!-- <form @submit.prevent="handleLogin">
      <label>
        <div>Email</div>
        <input type="text" v-model="form.email" />
        <div class="p-1 text-red-400" v-for="error in errors.email">{{ error }}</div>
      </label>

      <label>
        <div>Password</div>
        <input type="password" v-model="form.password" />
        <div class="p-1 text-red-400" v-for="error in errors.password">{{ error }}</div>
      </label>
      <button class="btn">Login</button>
    </form> -->

    <p>
      Don't have an account?
      <NuxtLink class="underline text-lime-600" to="/register">Register now!</NuxtLink>
    </p>
  </div>
</template>
