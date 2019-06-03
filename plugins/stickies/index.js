import { StickiesService } from './services';

/* Installer function - default export */
export default function install(todoClient) {
  console.log(
    'INSTALLING THE STICKIES PLUIGN ----------------------------------------'
  );
  StickiesService.getInstance(todoClient); // initialize StickiesService
  return Promise.resolve(null);
}

import StickyBoard from './StickyBoard.vue';

export { StickyBoard };
