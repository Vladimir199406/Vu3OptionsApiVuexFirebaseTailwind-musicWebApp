<template>
  <router-link :to="{ name: 'song', params: { id: song.docID }}" :id="`song-id-${song.docID}`">
    <li class="
        flex
        justify-between
        items-center
        p-3
        pl-6
        cursor-pointer
        transition
        duration-300
        hover:bg-gray-50
      ">
        <div>
          <span
            class="font-bold block text-gray-600"
          >
            {{ song.modified_name }}
          </span>
          <span class="text-gray-500 text-sm">{{ song.display_name }}</span>
        </div>

        <div class="text-gray-600 text-lg">
          <router-link
            custom
            :to="{ name: 'song', params: { id: song.docID }, hash: '#comments' }"
            v-slot="{ navigate }"
          >
            <span
              class="comments"
              @click="navigate"
              v-simple-icon="'fa fa-comments text-gray-600 ml-3'"
            >
              {{ song.comment_count }}
            </span>
          </router-link>
        </div>
    </li>
  </router-link>
</template>

<script>
export default {
  name: 'SongItem',
  props: ['song'],
};
</script>

<style>
</style>
