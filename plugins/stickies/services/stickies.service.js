import CONSTANTS from '../constants';

const INSTANCE = Symbol('INSTANCE');

export class StickiesService {
  static [INSTANCE];

  constructor(todoClient) {
    this.localStorageService = todoClient.plugins.localStorage;
  }

  /** todoClient is options. It is required to initialize the service */
  static getInstance(todoClient) {
    if (!todoClient && !stickiesService) {
      throw new Error(
        'To create an instance of the StickiesService you need to pass the todoClient'
      );
    }

    if (todoClient) {
      StickiesService[INSTANCE] = new StickiesService(todoClient);
    }

    return StickiesService[INSTANCE];
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

let stickiesService;
