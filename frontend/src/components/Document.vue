<template>
  <div class="main">
  <h1>{{title}}</h1>
    <p>By {{author}}</p>
  <md-editor v-model="text" language="en-US" preview-only toolbars-exclude="
  ['save',
  'image',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'htmlPreview',
  'catalog',
  'github',
  'prettier'
]"/>
    <v-btn @click="deleteNote()">Delete</v-btn>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {API} from "@/services/API-Service";
import router from "@/router";
import {AxiosResponse} from "axios";
import {Note} from "@/libraries/Types";
const title = ref("Loading...");
const text = ref("");
const author = ref("");

onBeforeMount(() => {
  if(!(router.currentRoute.value.params.document_id instanceof Array)){
    API.getDocument(BigInt(router.currentRoute.value.params.document_id)).then((res: AxiosResponse) => {
      if(res.data as Note) {
        text.value = res.data.content;
        title.value = res.data.title;
        author.value = res.data.authorName;
      }
    })
  }

})

function deleteNote(){
  if(!(router.currentRoute.value.params.document_id instanceof Array)){
    API.deleteDocument(BigInt(router.currentRoute.value.params.document_id)).then(() => {
      router.push("/documents");
    })
  }
}
</script>

<style scoped>
.main{
  margin-left: auto;
  margin-right: auto;
  width: 90%
}
</style>