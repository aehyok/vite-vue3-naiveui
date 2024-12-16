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
import { UniverLicensePlugin } from '@univerjs-pro/license';
import { WORKBOOK_DATA } from './data'

import '@univerjs/presets/lib/styles/preset-sheets-core.css'
import '@univerjs/presets/lib/styles/preset-sheets-conditional-formatting.css'
import '@univerjs/presets/lib/styles/preset-sheets-data-validation.css'
import '@univerjs/presets/lib/styles/preset-sheets-drawing.css'
import '@univerjs/presets/lib/styles/preset-sheets-filter.css'
import '@univerjs/presets/lib/styles/preset-sheets-hyper-link.css'


onMounted(() => {
  const {univer, univerAPI } = createUniver({
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

univer.registerPlugin(UniverLicensePlugin, {
    license: `1846850823316525104-1-eyJpIjoiMTg0Njg1MDgyMzMxNjUyNTEwNCIsInYiOiIxIiwicCI6ImkxMEhlbE0rTHNIMnoxbHR1WTNZTlBYZldxeGNxWGQyRjh6ejMvMjFnV1k9IiwicnQiOjMsImZ0Ijp7InVmIjp7Im11IjoyMTQ3NDgzNjQ2LCJldCI6MTczNjkzMzcyOSwibW0iOjIxNDc0ODM2NDYsImN1IjoyMTQ3NDgzNjQ2fSwic2YiOnsiZXQiOjE3MzY5MzM3MjksInB0biI6MjE0NzQ4MzY0NiwibWlzIjoyMTQ3NDgzNjQ2LCJtcG4iOjIxNDc0ODM2NDYsIm5jIjoyMTQ3NDgzNjQ2fSwiZGYiOnsiZXQiOjE3MzY5MzM3MjksInJ2Ijp0cnVlLCJtaXMiOjIxNDc0ODM2NDYsIm1wbiI6MjE0NzQ4MzY0Nn0sIndzZiI6eyJldCI6MTczNjkzMzcyOSwiaG4iOjIxNDc0ODM2NDZ9fSwidWQiOjE3MzY5MzM3MjksImF0IjoxNzM0MzQxNzI5LCJlIjoiYWVoeW9rQGdtYWlsLmNvbSIsImQiOjgsIm4iOjh9-6OUmFlwCxwDm3HZudrteGvNJujcpCvLc/4gTpuk3gCtbHADL+5LsaObW7bvcnFrr/qaOSGLDZ4IS6uoSvVJrCg==-1736933729`
});

univerAPI.createUniverSheet(WORKBOOK_DATA)

console.log(univerAPI, "-----console------")
})

</script>
<style lang="scss" scoped>

</style>