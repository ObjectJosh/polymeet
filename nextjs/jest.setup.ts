import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// import '@testing-library/jest-dom/extend-expect';
// import fetchMock from 'jest-fetch-mock';

// fetchMock.enableMocks();
