<template>
  <v-container>
    <v-text-field label="Search here..."
                  v-model.lazy="searchTerm"
                  @keyup.enter="triggerSearch()"
    ></v-text-field>
    <p>Searching for: {{router.currentRoute.value.query.q}}</p>
    <v-table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Content</th>
        <th>Visibility</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="note in table" :key="note.id" @click="router.push('/documents/' + note.id);" style="cursor: pointer">
        <td>{{note.title}}</td>
        <td>{{note.name}}</td>
        <td>{{note.content.substring(0,30)}}</td>
        <td>
          <v-icon v-if="note.privacy">mdi-lock</v-icon>
          <v-icon v-else>mdi-earth</v-icon>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {Note} from "@/libraries/Types";
import {API} from "@/services/API-Service";
import {AxiosResponse} from "axios";
import router from "@/router";

const table = ref<Array<Note>>();
const searchTerm = ref("");

function triggerSearch(){
  console.log("searching")
  router.push("/search?q=" + encodeURIComponent(searchTerm.value)).then(searchNotes);
}

onBeforeMount(() => {
  searchNotes();
})

function searchNotes() {
  if(router.currentRoute.value.query.q !== null && typeof router.currentRoute.value.query.q == "string"){
  API.searchDocuments(router.currentRoute.value.query.q).then((res:AxiosResponse) => {
    table.value = res.data
  });
}
}
</script>

<style scoped>

</style>