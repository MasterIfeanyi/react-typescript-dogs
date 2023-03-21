# Getting started

## Description

This is a simple web app that allows users to see images of different species of dogs.

I utilized the API [dog](https://dog.ceo/api/).

## React

This project was bootstrapped with typescript and create-react-app. `npx create-react-app . --template typescript`

## Project Set-up

The dependencies required are all included in the `package.json` file. They will all be installed by running the `npm install` command.

To start the project run `npm start`.

## Check out the web app

click the link below

Open [ifeanyi-typescript-dogs](https://ifeanyi-typescript-dogs.netlify.app) to view it in the browser.

## Writing Tests

**1**

I was wondering how to pass in props during testing.

```javascript
type componentProps = React.ComponentProps<typeof Select>;

const props: componentProps = {
  nameOfBreeds: ["bulldog", "african", "pitbull", "beagle"],
  setBreedName: jest.fn(),
  loadByBreed: jest.fn(),
};

render(<Select {...props} />);
```

[How to test react component with setState in react testing library with Typescript](https://stackoverflow.com/questions/69876996/how-to-test-react-component-with-setstate-in-react-testing-library-with-typescri)

**2**

I wanted to write test with typescript, but the extension I used was `select.test.ts` instead of `select.test.tsx`

**3**

How to test a select input element, I had to use typescript assertion

```javascript
selectInput as HTMLOptionElement
```

I learned how to test a select input element from this article [How to test a select element with React Testing Library](https://cathalmacdonnacha.com/how-to-test-a-select-element-with-react-testing-library)

stackoverflow: [How to select an option from a select list with React Testing Library](https://stackoverflow.com/questions/57946870/how-to-select-an-option-from-a-select-list-with-react-testing-library)

second question: [How to test select option logic with React Testing Library](https://stackoverflow.com/questions/63948194/how-to-test-select-option-logic-with-react-testing-library)

**4**

How to use a custom instance of `msw` server

[How to conditionally mock error responses with msw](https://stackoverflow.com/questions/67221429/how-to-conditionally-mock-error-responses-with-msw/67228587#67228587)

**5**

How to test for an error sceneraio using `msw` server

[MSW unit testing API in success & error scenario](https://stackoverflow.com/questions/71764462/msw-unit-testing-api-in-success-error-scenario)

### Resources

[How to select an option from a select list with React Testing Library](https://stackoverflow.com/questions/57946870/how-to-select-an-option-from-a-select-list-with-react-testing-library)
