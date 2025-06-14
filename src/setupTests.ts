import '@testing-library/jest-dom';
import 'jest-styled-components';
import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';
import * as reactRedux from 'react-redux';

jest.mock('@/assets/logo.svg', () => 'logo-mock.svg');
jest.mock('@/assets/pin.svg', () => 'pin-mock.svg');

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder as any;
}
if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder as any;
}
window.scrollTo = jest.fn();
window.HTMLElement.prototype.scrollIntoView = jest.fn();

export function mockUseDispatch(mockFn: jest.Mock) {
  (reactRedux.useDispatch as unknown as jest.Mock).mockReturnValue(mockFn);
}

export function mockUseSelector(mockFn: jest.Mock) {
  (reactRedux.useSelector as unknown as jest.Mock).mockImplementation(mockFn);
}
