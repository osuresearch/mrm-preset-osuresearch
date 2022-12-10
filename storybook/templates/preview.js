
import React from "react";
import { useDarkMode } from "storybook-dark-mode";
import { themes } from "@storybook/theming";
import { DocsContainer } from './DocsContainer';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewMode: "docs",
  docs: {
    // theme: themes.dark,
    container: DocsContainer,
  },
};

export const decorators = [
  (Story) => (
    <div className={useDarkMode() ? 'dark' : 'light'}>
      <Story />
    </div>
  ),
];

