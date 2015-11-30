EasyView = require 'easy-view'

module.exports =
class Example extends EasyView
  template: './example.html'

  onClick: (element) ->
    console.log element, 'was clicked'

  onMouseOver: (element) ->
    console.log 'mouse is over', element
