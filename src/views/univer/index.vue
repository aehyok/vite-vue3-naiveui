<template>
  <div id="univer" style="height:700px;" />
</template>

<script setup>
import { ref, onMounted } from "vue"
import { createUniver, defaultTheme, LocaleType, Tools } from '@univerjs/presets'
import { UniverSheetsConditionalFormattingPreset } from '@univerjs/presets/preset-sheets-conditional-formatting'
import sheetsConditionalFormattingZhCN from '@univerjs/presets/preset-sheets-conditional-formatting/locales/zh-CN'
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core'
import sheetsCoreZhCN from '@univerjs/presets/preset-sheets-core/locales/zh-CN'
import { UniverSheetsDataValidationPreset } from '@univerjs/presets/preset-sheets-data-validation'
import sheetsDataValidationZhCN from '@univerjs/presets/preset-sheets-data-validation/locales/zh-CN'
import { UniverSheetsDrawingPreset } from '@univerjs/presets/preset-sheets-drawing'
import sheetsDrawingZhCN from '@univerjs/presets/preset-sheets-drawing/locales/zh-CN'
import { UniverSheetsFilterPreset } from '@univerjs/presets/preset-sheets-filter'
import sheetsFilterZhCN from '@univerjs/presets/preset-sheets-filter/locales/zh-CN'
import { UniverSheetsHyperLinkPreset } from '@univerjs/presets/preset-sheets-hyper-link'
import sheetsHyperLinkZhCN from '@univerjs/presets/preset-sheets-hyper-link/locales/zh-CN'
import { WORKBOOK_DATA } from './data'

import '@univerjs/presets/lib/styles/preset-sheets-core.css'
import '@univerjs/presets/lib/styles/preset-sheets-conditional-formatting.css'
import '@univerjs/presets/lib/styles/preset-sheets-data-validation.css'
import '@univerjs/presets/lib/styles/preset-sheets-drawing.css'
import '@univerjs/presets/lib/styles/preset-sheets-filter.css'
import '@univerjs/presets/lib/styles/preset-sheets-hyper-link.css'


onMounted(() => {
  const { univerAPI } = createUniver({
  locale: LocaleType.ZH_CN,
  locales: {
    zhCN: Tools.deepMerge(
      {},
      sheetsCoreZhCN,
      sheetsConditionalFormattingZhCN,
      sheetsDataValidationZhCN,
      sheetsDrawingZhCN,
      sheetsFilterZhCN,
      sheetsHyperLinkZhCN,
    ),
  },
  theme: defaultTheme,
  presets: [
    UniverSheetsCorePreset({
      container: "univer"
    }),
    UniverSheetsConditionalFormattingPreset(),
    UniverSheetsDataValidationPreset(),
    UniverSheetsDrawingPreset(),
    UniverSheetsFilterPreset(),
    UniverSheetsHyperLinkPreset(),
  ],
})

univerAPI.createUniverSheet(WORKBOOK_DATA)
})

</script>
<style lang="scss" scoped>

</style>