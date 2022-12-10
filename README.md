# @michvh-dev: Scroll behavior
> This is a component that updates the scroll behavior of the browser, now the only type is scrolling over the content
> Live demo [_here_](https://scroll-behavior.michvh.dev/example/).

## Table of Contents
* [General Info](#general-information)
* [Installation](#installation)
* [Usage](#usage)



## General Information
This component gives you a new scroll behavior that gives a cleaner and beautifull scroll behavior
- It supports the mobile velocity autoscroll
- It supports the keyboard events



## Installation
### npm
```
npm i @michvh-dev/scroll-behavior -S
```

### yarn
```
yarn add @michvh-dev//scroll-behavior
```

## Usage

```js
import ScrollBehavior from '@michvh-dev//scroll-behavior';

const elements= document.querySelectorAll('.section');
new ScrollBehavior({
    element: elements,
});
// or 
new ScrollBehavior({
    elementSelector: '.section',
});
```