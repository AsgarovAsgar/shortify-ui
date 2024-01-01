<script setup lang="ts">
import type { RegisterPayload } from '@/types';
import type { FormKitNode } from '@formkit/core'

definePageMeta({
  layout: "centered",
  middleware: ['guest']
});

const { register } = useAuth()

// const form = ref({
//   name: 'test2',
//   email: 'test2@mail.com',
//   password: '12345678',
//   password_confirmation: '12345678'
// })

async function handleRegister(payload: RegisterPayload, node?: FormKitNode) {
  try {
    await register(payload)
  } catch (err) {
    handleInvalidForm(err, node)
  }
}

</script>

<template>
  <div class="register">
    <h1>Register</h1>
    <FormKit type="form" @submit="handleRegister">
      <FormKit label="Name" name="name" type="text"/>
      <FormKit label="Email" name="email" type="email"/>
      <FormKit label="Password" name="password" type="password"/>
      <FormKit label="Confirm Password" name="password" type="password"/>
    </FormKit>
    <!-- <form @submit.prevent="register(form)">
      <label>
        <div>Name</div>
        <input type="text" v-model="form.name" />
      </label>

      <label>
        <div>Email</div>
        <input type="email" v-model="form.email" />
      </label>

      <label>
        <div>Password</div>
        <input type="password" v-model="form.password" />
      </label>

      <label>
        <div>Confirm Password</div>
        <input type="password" v-model="form.password_confirmation" />
      </label>

      <button class="btn">Register</button>
    </form> -->

    <p>
      Already have an account?
      <NuxtLink class="underline text-lime-600" to="/login">Login</NuxtLink>
    </p>
  </div>
</template>
