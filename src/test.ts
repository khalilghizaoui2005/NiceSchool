// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
<<<<<<< HEAD
    <T>(id: string): T;
    keys(): string[];
=======
    keys(): string[];
    <T>(id: string): T;
>>>>>>> 9f685caed91c7db03b6ec1cf424982bb65cd5b9c
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
<<<<<<< HEAD
=======
  { teardown: { destroyAfterEach: true }},
>>>>>>> 9f685caed91c7db03b6ec1cf424982bb65cd5b9c
);

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
<<<<<<< HEAD
context.keys().forEach(context);
=======
context.keys().map(context);
>>>>>>> 9f685caed91c7db03b6ec1cf424982bb65cd5b9c
