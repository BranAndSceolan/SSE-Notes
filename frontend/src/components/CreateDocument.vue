<template>
<div class="main">
  <v-text-field
      label="Title"
      v-model.lazy.trim="title"/>
  <md-editor v-model="text" language="en-US" :sanitize="sanitize" toolbars-exclude="
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
  <v-checkbox class="checkbox" label="Private" v-model="privateCheckbox"></v-checkbox>
  <v-btn @click="saveNote();" class="button">Save this note</v-btn>
  </div>
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import sanitizeHtml from 'sanitize-html';
import {ref} from "vue";
import {API} from "@/services/API-Service";
import router from "@/router";

MdEditor.config({});
const text = ref('Start typing...');
const title = ref('');
const privateCheckbox = ref(false);
const sanitize = (html) => sanitizeHtml(html);

function saveNote(){
  API.createDocument(title.value, text.value, privateCheckbox.value).then(() =>
  {
    router.push("/documents");
  });
}
</script>

<style scoped>
.main{
  margin-left: auto;
  margin-right: auto;
  width: 90%
}
</style>