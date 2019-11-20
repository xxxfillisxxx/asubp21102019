import Vue from 'vue'
import AtComponents from 'at-ui'

//Fixing broken handleResize method
AtComponents.Table.methods.handleResize = function handleResize() {}

// import 'at-ui-style/src/index.scss'      // Or import the unbuilt version of SCSS

Vue.use(AtComponents)