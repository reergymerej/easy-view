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
fs = require 'fs'

module.exports =
class Example extends EasyView

  # specify the template
  template: fs.join __dirname, './example.html'

  onClick: (element) ->
    console.log element, 'was clicked'

  onMouseOver: (element) ->
    console.log 'mouse is over', element
```

## Usage

```coffee
Example = require './Example'

example = new Example()

# render appends example to a container element
example.render(container)
```
