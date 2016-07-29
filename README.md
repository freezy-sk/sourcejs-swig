# Swig support for SourceJS

[SourceJS](http://sourcejs.com) middleware to support [Swig](http://paularmstrong.github.io/swig/) template language (`*.swig` or `*.swig.html`) instead of native `*.src`.

## Install

To install, run npm in `sourcejs/user` folder:

```
npm install sourcejs-swig --save
```

In `sourcejs/user/options.js` you need to add `index.swig` or `index.swig.html` to `rendering.specFiles`:
```js
module.exports = {
    rendering: {
        specFiles: [
            'index.swig',
            'index.swig.html',
            'index.src',
            //...
        ]
    }
    //...
};
```

Then restart your SourceJS application, middleware will be loaded automatically.

## Usage

After installing middleware, instead of `index.src` pages, you can `index.swig.html` files with Swig markup.

index.swig

```
{#
This is a comment.
It will be fully stripped and ignored during parsing.
#}

<h1>{{ specData.info.title|title }}</h1>
```
