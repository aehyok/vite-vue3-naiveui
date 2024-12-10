<template>
  <div id="univer" style="height:700px;" />
</template>

<script setup>
import { ref, onMounted } from "vue"
import { createUniver, defaultTheme, LocaleType, Tools } from '@univerjs/presets'
import { UniverSheetsConditionalFormattingPreset } from '@univerjs/presets/preset-sheets-conditional-formatting'
import sheetsConditionalFormattingEnUS from '@univerjs/presets/preset-sheets-conditional-formatting/locales/en-US'
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core'
import sheetsCoreEnUS from '@univerjs/presets/preset-sheets-core/locales/en-US'
import { UniverSheetsDataValidationPreset } from '@univerjs/presets/preset-sheets-data-validation'
import sheetsDataValidationEnUS from '@univerjs/presets/preset-sheets-data-validation/locales/en-US'
import { UniverSheetsDrawingPreset } from '@univerjs/presets/preset-sheets-drawing'
import sheetsDrawingEnUS from '@univerjs/presets/preset-sheets-drawing/locales/en-US'
import { UniverSheetsFilterPreset } from '@univerjs/presets/preset-sheets-filter'
import sheetsFilterEnUS from '@univerjs/presets/preset-sheets-filter/locales/en-US'
import { UniverSheetsHyperLinkPreset } from '@univerjs/presets/preset-sheets-hyper-link'
import sheetsHyperLinkEnUS from '@univerjs/presets/preset-sheets-hyper-link/locales/en-US'
import { WORKBOOK_DATA } from './data'

import '@univerjs/presets/lib/styles/preset-sheets-core.css'
import '@univerjs/presets/lib/styles/preset-sheets-conditional-formatting.css'
import '@univerjs/presets/lib/styles/preset-sheets-data-validation.css'
import '@univerjs/presets/lib/styles/preset-sheets-drawing.css'
import '@univerjs/presets/lib/styles/preset-sheets-filter.css'
import '@univerjs/presets/lib/styles/preset-sheets-hyper-link.css'


onMounted(() => {
  const { univerAPI } = createUniver({
  locale: LocaleType.EN_US,
  locales: {
    enUS: Tools.deepMerge(
      {},
      sheetsCoreEnUS,
      sheetsConditionalFormattingEnUS,
      sheetsDataValidationEnUS,
      sheetsDrawingEnUS,
      sheetsFilterEnUS,
      sheetsHyperLinkEnUS,
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
:deep(.univer-workbench-layout){
  height: 600;
}
</style>