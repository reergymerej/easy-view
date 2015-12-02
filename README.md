# easy-view

Create Atom views' DOM with html... like a sane person.

## Example

Specify [jQuery event](http://api.jquery.com/category/events/) handlers using `data-bind` attributes in your markup.

```html
<!-- example.html -->
<section>
  <div>
    <h3 data-bind="click: onClick, mouseover: onMouseOver">A Header</h3>
    <p>This is pretty <a href="#" data-bind="click: onClick">easy</a>.</p>
  </div>
</section>

```

When the event is triggered, the handler will be called within the scope of the EasyView.

```coffee
# Example.coffee
EasyView = require 'easy-view'
path = require 'path'

module.exports =
class Example extends EasyView

  # specify the template
  template: path.join __dirname, './example.html'

  onClick: (element) ->
    console.log element, 'was clicked'

  onMouseOver: (element) ->
    console.log 'mouse is over', element
```

## Usage

```coffee
Example = require './Example'

example = new Example()

# Call render to append the DOM with event handlers to a container element.
example.render(container)
```

## Note

This is a beta release, quickly thrown together while trying to develop an Atom package.  Please feel free to [report bugs](https://github.com/reergymerej/easy-view/issues) in order to make it better...stronger...faster.
