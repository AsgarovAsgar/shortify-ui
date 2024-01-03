<script lang="ts" setup>
import axios from 'axios';
import { nanoid } from 'nanoid';
import type { FormKitNode } from '@formkit/core'

definePageMeta({
  middleware: ['auth']
})

interface LinkPayload {
  full_link: string
}

async function createLink(payload: LinkPayload, node?: FormKitNode) {
  try {
    await axios.post('/links', {
      ...payload,
      short_link: nanoid(8)
    })
    useRouter().push('/links')
  } catch (err) {
    handleInvalidForm(err, node)
  }
}
</script>

<template>
  <h1>Create New Link</h1>
  <GoBack>or go back to links</GoBack>
  <FormKit type="form" submit-label="Create Link" @submit="createLink">
    <FormKit label="Link" type="url" name="full_link" />
  </FormKit>
  <!-- <form>
    <label>
      <div>Link</div>
      <input type="text" name="full_link" />
    </label>
    <button class="btn">Create Link</button>
  </form> -->
</template>
