import CONSTANTS from '../constants';

export class StickiesService {
  static _INSTANCE;

  constructor(todoClient) {
    this.localStorageService = todoClient.plugins.localStorage;
  }

  /** todoClient is optional. It is required to initialize the service */
  static getInstance(todoClient) {
    console.log('TODO CLIENT IN GLOBAL: ', global.todoClient);
    console.log('[INSTNACE]: ', StickiesService._INSTANCE);
    if (!todoClient && !StickiesService._INSTANCE) {
      throw new Error(
        'To create an instance of the StickiesService you need to pass the todoClient'
      );
    }

    if (todoClient) {
      console.log('INIT SERVICE');
      StickiesService._INSTANCE = new StickiesService(todoClient);
    }

    return StickiesService._INSTANCE;
  }

  loadStickies() {
    return this.localStorageService.getItem(CONSTANTS.LOCALSTORAGE_KEY);
    //return [new Sticky('This is my first Sticky')];
  }

  addSticky(sticky) {
    const stickies = this.localStorageService.getItem(
      CONSTANTS.LOCALSTORAGE_KEY
    );
    stickies.push(sticky);
    this.localStorageService.setItem(CONSTANTS.LOCALSTORAGE_KEY, stickies);
  }
}
