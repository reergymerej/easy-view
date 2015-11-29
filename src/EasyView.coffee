$ = require 'jquery'
path = require 'path'
fs = require 'fs'

parseBindAttribute = (value) ->
  handlers = {}

  if value
    pairs = value.split ','
    pairs.forEach (pair) ->
      parts = pair.split ':'
      if parts.length == 2
        handlers[parts[0].trim()] = parts[1].trim()

  return if Object.keys(handlers).length then handlers else undefined

getElementFromTemplatePath = (templatePath) ->
  absoluteTemplatePath = path.join process.cwd(), templatePath
  file = fs.readFileSync absoluteTemplatePath, 'utf8'
  return $ file

module.exports =
class EasyView
  constructor: (parentElement) ->
    if parentElement
      @render parentElement

  render: (parent) ->
    element = getElementFromTemplatePath this.template
    this.bind element, this
    $(parent).append element

  bind: (element, scope) ->
    me = this
    children = element.children()

    if children.length
      children.each((i, item) ->
        me.bind $(item), me
      );

    bindString = element.attr 'data-bind'
    handlers = parseBindAttribute bindString

    if handlers
      Object.keys(handlers).forEach (event) ->
        methodName = handlers[event]
        method = scope[methodName]

        if typeof method == 'function'
          element.on event, () ->
            method(element)
        else
          console.warn 'unable to find method "' + methodName + '" in', scope
