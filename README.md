# Makue
![image](src/assets/makue192.png)

Phonetically: **Mah-*koo*-ay**

**Makue** is a sleek, modern CSS framework for React applications. It comes with built-in theming, modals, toasts, and customizable components designed to create vibrant, polished user interfaces with minimal setup.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [Button](#button)
  - [Modal](#modal)
  - [Toast](#toast)
  - [Checkbox](#checkbox)
  - [TextInput](#textinput)
  - [Card](#card)
- [Theming](#theming)
- [Context Providers](#context-providers)
  - [ThemeProvider](#themeprovider)
  - [ModalProvider](#modalprovider)
  - [ToastProvider](#toastprovider)

## Installation
To install **Makue**, run the following command using GitHub Packages:

```
npm install @mtwlz/makue --registry=https://npm.pkg.github.com
```

Alternatively, you can use Yarn:

```
yarn add @mtwlz/makue --registry=https://npm.pkg.github.com
```

## Usage

### Setting Up the Providers
Before using **Makue** components, you need to wrap your application with the required context providers (`ThemeProvider`, `ModalProvider`, `ToastProvider`):

```jsx
import React from 'react';
import { ThemeProvider, ModalProvider, ToastProvider } from '@mtwlz/makue';
import App from './App';

ReactDOM.render(
  <ThemeProvider>
    <ModalProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ModalProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
```

### Importing and Using Components
After setting up the providers, you can start using **Makue** components in your application. Here’s an example of how to use a `Button`:

```jsx
import React from 'react';
import { Button } from '@mtwlz/makue';

const ExampleComponent = () => (
  <Button context="primary" onClick={() => alert('Button clicked!')}>
    Click Me
  </Button>
);
```

## Components

### Button
Buttons come with various context-based styles and states.

**Props:**
- `context`: Sets the style of the button. Options: `primary`, `secondary`, `success`, `danger`, `caution`, `info`, `important`.
- `onClick`: Function to execute on button click.

**Example:**
```jsx
<Button context="success" onClick={() => alert('Success!')}>
  Success Button
</Button>
```

### Modal
The `Modal` component can be dynamically opened using the `useModalContext` hook.

**Props (from `openModal` function):**
- `title`: Modal title.
- `content`: The content inside the modal.
- `onOkay`: Callback for the Okay button.
- `onCancel`: Callback for the Cancel button.
- `context`: Style the modal based on context.

**Example:**
```jsx
import { useModalContext } from '@mtwlz/makue';

const Example = () => {
  const { openModal, closeModal } = useModalContext();

  const handleOpenModal = () => {
    openModal({
      title: 'Important Message',
      content: <p>This is a custom message inside the modal.</p>,
      onOkay: () => closeModal(),
      onCancel: closeModal,
      context: 'danger'
    });
  };

  return <Button context="danger" onClick={handleOpenModal}>Open Modal</Button>;
};
```

### Toast
The `Toast` system provides lightweight notifications. Toasts can be triggered using `useToastContext`.

**Props (from `addToast` function):**
- `message`: The text message in the toast.
- `context`: Style of the toast (same options as the Button).
- `duration`: Time (in ms) the toast stays visible.
- `progressBar`: Option to show a progress bar.

**Example:**
```jsx
import { useToastContext } from '@mtwlz/makue';

const Example = () => {
  const { addToast } = useToastContext();

  const handleAddToast = () => {
    addToast({
      message: 'Action successful!',
      context: 'success',
      duration: 3000,
      progressBar: true,
    });
  };

  return <Button context="success" onClick={handleAddToast}>Show Toast</Button>;
};
```

### Checkbox
A styled checkbox component.

**Props:**
- `checked`: Boolean that indicates whether the checkbox is checked.
- `onChange`: Callback function when the checkbox state changes.
- `label`: Optional label text.
- `context`: Sets the checkbox style based on the theme.

**Example:**
```jsx
<Checkbox
  checked={true}
  onChange={(checked) => console.log(checked)}
  label="Accept Terms"
  context="primary"
/>
```

### TextInput
An input field for text with optional validation and styling.

**Props:**
- `value`: The current value of the input field.
- `onChange`: Function to handle value changes.
- `placeholder`: Placeholder text for the input field.
- `context`: Style the input based on the theme.
- `label`: Optional label for the input.
- `success`: Boolean for success validation state.
- `error`: Boolean for error validation state.
- `validText`: Text that shows below the input, based on success/error.

**Example:**
```jsx
<TextInput
  value={inputValue}
  onChange={setInputValue}
  placeholder="Enter your name"
  label="Name"
  context="primary"
  success={inputValue.length > 5}
  error={inputValue.length <= 5}
  validText="Must be more than 5 characters"
/>
```

### Card
A basic card component for grouping content.

**Props:**
- `children`: Content inside the card.

**Example:**
```jsx
<Card>
  <h2>Card Title</h2>
  <p>This is some text inside a card.</p>
</Card>
```

## Theming
Makue supports multiple themes out of the box, which can be switched dynamically. Use `ThemeProvider` and the `useTheme` hook to apply and switch themes in your app.

**Example:**
```jsx
import { useTheme } from '@mtwlz/makue';

const ThemeSwitcher = () => {
  const { theme, switchTheme } = useTheme();

  return (
    <Button context="primary" onClick={() => switchTheme('theme-dark')}>
      Switch to Dark Theme
    </Button>
  );
};
```

## Context Providers

### ThemeProvider
Wrap your app with `ThemeProvider` to manage and switch themes. The `useTheme` hook provides access to the current theme and functions to switch themes.

### ModalProvider
The `ModalProvider` allows for dynamic modal control throughout your application via the `useModalContext` hook.

### ToastProvider
The `ToastProvider` manages toast notifications and can be accessed via the `useToastContext` hook.

