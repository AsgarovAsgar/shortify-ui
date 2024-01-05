<script setup lang="ts">
import { TailwindPagination } from 'laravel-vue-pagination'


const queries = ref({
  page: 1,
  'filter[full_link]': '',
  ...useRoute().query
})

const { data, index: getLinks } = useLinks({ queries }) // we pass whole reactive queries here

await getLinks()
const links = computed(() => data.value?.data)

watch(queries, () => useRouter().push({query: queries.value}), 
  { deep: true }
)


definePageMeta({ middleware: ['auth'] })
</script>

<template>
  <div>
    <nav class="flex justify-between mb-4 items-center">
      <h1 class="mb-0">My Links</h1>
      <div class="flex items-center">
        <SearchInput v-model="queries['filter[full_link]']" />
        <NuxtLink to="/links/create" class="ml-4 flex gap-1">
          <IconPlusCircle class="inline" /> Create New
        </NuxtLink>
      </div>
    </nav>

    <div v-if="true">
      <table class="mb-2 table-fixed w-full">
        <thead>
          <tr>
            <th class="w-[5%]">N</th>
            <th class="w-[35%]">Full Link</th>
            <th class="w-[30%]">Short Link</th>
            <th class="w-[10%]">Views</th>
            <th class="w-[10%]">Edit</th>
            <th class="w-[10%]">Trash</th>
            <th class="w-[6%] text-center">
              <button @click="getLinks()"><IconRefresh /></button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(link, index) in links">
            <td>{{ index + 1 }}</td>
            <td>
              <a :href="link.full_link" target="_blank">
                {{ link.full_link.replace(/^http(s?):\/\//, "") }}
              </a>
            </td>
            <td>
              <a :href="`${useRuntimeConfig().public.appURL}/${link.short_link}`" target="_blank">
                {{ useRuntimeConfig().public.appURL.replace(/^http(s?):\/\//, "") }}/{{ link.short_link }}
              </a>
            </td>
            <td>{{ link.views }}</td>
            <td>
              <NuxtLink class="no-underline" :to="`/links/${link.id}`">
                <IconEdit/>
              </NuxtLink>
            </td>
            <td>
              <button><IconTrash /></button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <TailwindPagination 
        :data="data"
        @pagination-change-page="queries.page = $event"
      />
      <div class="mt-5 flex justify-center"></div>
    </div>

    <!-- No links message for when table is empty -->
    <div v-else class="border-dashed border-gray-500 p-3 border-[1px] text-center">
      <div class="flex justify-center">
        <IconLink />
      </div>
      <p>
        <!-- Show this if reason for no links is none found in search -->
        <span v-if="false"> No links matching links found. </span>

        <!-- Show this if reason for no links is User has none -->
        <span v-else>
          No links created yet
          <NuxtLink to="/links/create" class="text-green-600">Go create your first link!</NuxtLink>
        </span>
      </p>
    </div>
  </div>
</template>
