<template>
  <q-page>
    <div><component-frame :components="[{ component: FileManager }]" /></div>
  </q-page>
</template>

<script lang="ts">
import ComponentFrame from 'layouts/ComponentFrame.vue'
import FileManager from 'components/ToolsFileManager.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FileManagerPage',
  components: { ComponentFrame },
  setup() {
    return { FileManager }
  }
})
</script>
