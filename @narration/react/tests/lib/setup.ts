// @ts-ignore
global.FinalizationRegistry = new class {};

import 'global-jsdom/register';
import '@testing-library/jest-dom';