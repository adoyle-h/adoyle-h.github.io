import {ThemeApp} from '@adoyle.me/website-basics';

export class HackerApp extends ThemeApp {
    async getPage(name) {
        return import(`./pages/${name}`);
    }

    getUI() {
    }
}

export const themeApp = new HackerApp();
