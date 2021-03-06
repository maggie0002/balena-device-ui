<template>
  <q-tabs
    v-model="tab"
    no-caps
    outside-arrows
    mobile-arrows
    class="bg-accent shadow-2"
  >
    <q-tab
      name="welcome"
      :label="$t('components.layouts.captive_portal.welcome')"
    />
    <q-tab
      name="wifi"
      :label="$t('components.layouts.captive_portal.connect_to_wifi')"
    />
  </q-tabs>

  <!-- Welcome page -->
  <div v-if="tab == 'welcome'" class="q-pa-lg text-center">
    <!-- Logo -->
    <div class="q-mb-md">
      <q-img :src="qHeaderStyle.logo_coloured" style="max-width: 175px" />
    </div>
    <!-- Title -->
    <div class="text-h4 q-mb-md">
      {{ $t('title') }}
    </div>
    <!-- Welcome text -->
    <div v-if="hostname" class="text-body1 text-center">
      <div>
        {{ $t('components.layouts.captive_portal.visit_to_begin') }}
      </div>
      <div class="q-mt-md">
        <!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
        http://{{ hostname }}.local
        <q-btn
          class="q-ml-sm"
          icon="content_copy"
          padding="0"
          flat
          size="sm"
          @click="copyUrl()"
        >
          <q-tooltip class="text-caption text-center">
            {{ $t('components.layouts.captive_portal.copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>

  <!-- Wi-Fi page -->
  <div v-else>
    <wifi-connect class="q-pa-lg" />
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios'
import WifiConnect from 'components/WifiConnect.vue'
import { copyToClipboard, useQuasar } from 'quasar'
import { qHeaderStyle } from 'src/config/qStyles'
import { supervisor } from 'src/api/supervisor'
import { defineComponent, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface hostConfig {
  network: { hostname: string }
}

export default defineComponent({
  name: 'LayoutsCaptivePortal',
  components: {
    WifiConnect
  },
  setup() {
    const $q = useQuasar()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t } = useI18n()

    const hostname = ref<string>()

    onMounted(async () => {
      try {
        const response =
          (await supervisor.v1.device_host_config_get()) as AxiosResponse<hostConfig>
        hostname.value = response.data.network.hostname
      } catch (error) {
        console.error(error)
      }
    })

    const copyUrl = async () => {
      if (hostname.value) {
        await copyToClipboard(`http://${hostname.value}.local`)
        $q.notify(t('components.layouts.captive_portal.url_copied'))
      }
    }

    return {
      copyUrl,
      hostname,
      qHeaderStyle,
      tab: ref('welcome')
    }
  }
})
</script>
