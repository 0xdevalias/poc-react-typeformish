# poc-react-typeishform

I was looking for something in [React](https://reactjs.org/) that had a simple to use [Typeform](https://www.typeform.com/help/question-types/)'ish syntax/API. Since I didn't find anything, I hacked together my own PoC.

This is a basic PoC for some of the more common question types:

* `ShortText`
* `LongText`
* `YesNo`
* `MultipleChoice`
* `Block`

One of the major benefits of Typeform is their focus on a really pretty/functional/usable interface. This PoC doesn't do any of that, it's more focussed on getting some basic functionality in place, and abstracting away the lower level form concepts.

This is more an exploration of concepts than code you should use.. so.. probably don't use it.

## Underlying Libraries

* https://react-form.js.org/ (`npm i react-form`)
  * This handles most of the underlying form stuff.. and just generally makes things easy.
* http://getbootstrap.com/ (`npm i bootstrap`)
  * Because noone wants to waste time making the UI pretty for a PoC
* [facebook/prop-types](https://github.com/facebook/prop-types) (`npm i prop-types`)
  * "Runtime type checking for React props and similar objects"
* [JedWatson/classnames](https://github.com/JedWatson/classnames) (`npm i classnames`)
  * "A simple javascript utility for conditionally joining classNames together"

## Usage

```
npm install
npm start
```

The example code can be found in [./src/TypeishformExample.js](./src/TypeishformExample.js)

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
