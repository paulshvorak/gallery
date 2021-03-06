# Gallery - lightweight and simple carousel with no dependencies
## Installation

Setup is trivially easy. A little bit of markup...

```html
<div class="gallery">
  <div class="gallery-item">Hi, I'm slide 1</div>
  <div class="gallery-item">Hi, I'm slide 2</div>
  <div class="gallery-item">Hi, I'm slide 3</div>
  <div class="gallery-item">Hi, I'm slide 4</div>
</div>
```

or

```html
<div class="gallery">
  <?php foreach( $images as $image ) { ?>
      <div class="gallery-item" style="background-image: url(<?= $image; ?>)"></div>
  <?php } ?>
</div>
```


...inject the minified script into your website.

```html
<link rel="stylesheet" type="text/css" href="gallery.min.css"/>
<script src="gallery.min.js"></script>
<script>
  new Gallery();
</script>
```

## Options

Siema comes with a few (optional) settings that you can change by passing an object as an argument. Default values are presented below.

```js
new Gallery({
  selector : '.gallery',
  slides : 3,
  interval : 1,
  duration : '.3s',
  animation : 'ease',
  preview : true
});
```

- `selector` - (string) specify the selector
- `slides` - (number) the number of slides to be shown
- `interval` - (number) setInterval value (in second)
- `duration` - (string) slide transition duration (in ms)
- `animation` - (string) the same as transition-timing-function in CSS
- `preview` - (boolean) thumbnail


## Works great in all modern browsers.
