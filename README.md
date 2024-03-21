# Daydreamer

Daydreamer is a lightweight, customizable datepicker component built for React applications. Utilizing `date-fns` for date operations, Daydreamer offers a flexible solution for integrating date selection within your projects. Whether you need a simple date picker or a more complex calendar-based component, Daydreamer is designed to meet your needs with ease.

Still adding features, not yet "complete"

## Features

- Lightweight and easy to integrate
- Customizable date formats and locales
- Built with React 18 and `date-fns`
- Provides both date input fields and a calendar view for date selection

## Installation

To install Daydreamer, you can use npm or yarn as follows:

```bash
npm install daydreamer
# or
yarn add daydreamer
```

## Usage

To use Daydreamer in your project, import the `Datepicker` component and add it to your component tree. Here's a basic example:

```jsx
import React from 'react';
import { Datepicker } from 'daydreamer';

function App() {
  const handleDateChange = (date) => {
    console.log('Selected date:', date);
  };

  return (
    <div>
      <Datepicker onDateChange={handleDateChange} />
    </div>
  );
}

export default App;
```

## Props

| Prop          | Type       | Description                                         |
|---------------|------------|-----------------------------------------------------|
| `locale`      | `Locale`   | Optional. Sets the initial locale for the datepicker. |
| `onDateChange`| `function` | Callback function that is called with the new date whenever the selected date changes. |

## Development

To run Daydreamer locally for development, you can follow these steps:

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

This will launch the Vite development server, making the project available at `http://localhost:3000`.

## Building for Production

To build Daydreamer for production, run the following command:

```bash
npm run build
```

This command compiles the TypeScript code and bundles the project using Vite, preparing it for deployment.

## Contributing

Contributions to Daydreamer are always welcome! Whether it's bug reports, feature requests, or pull requests, your help is appreciated. Please read our contributing guidelines before submitting your contributions.

## License

Daydreamer is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements

Date-fns and Theo for the inspiration.
