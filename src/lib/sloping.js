function SlopingFactory (target, options = {}) {
  this._target = target
  this.init(options)

  const mouseEnterHandler = (event) => {
    this._cachedStyles.transform = event.target.style.transform
    this._cachedStyles.boxShadow = event.target.style.boxShadow
  }

  const mouseMoveHandler = (event) => {
    const { offsetX, offsetY } = event
    const { clientHeight: height, clientWidth: width } = event.target
    const rx = (width / 2 - offsetX) / width
    const ry = -(height / 2 - offsetY) / height
    if (this._options.type === 'sink') {
      this._target.style.transform = `rotateX(${-10 * ry}deg) rotateY(${-10 * rx}deg)`
      !this._options.hideShadow && (this._target.style.boxShadow = `rgba(0, 0, 0, 0.5) ${30 * rx}px ${-30 * ry}px 40px 0px`)
    } else {
      this._target.style.transform = `rotateX(${10 * ry}deg) rotateY(${10 * rx}deg)`
      !this._options.hideShadow && (this._target.style.boxShadow = `rgba(0, 0, 0, 0.5) ${-30 * rx}px ${30 * ry}px 40px 0px`)
    }
  }

  const mouseOutHandler = () => {
    Object.keys(this._cachedStyles).forEach(k => {
      target.style[k] = this._cachedStyles[k]
    })
  }

  this.destroy = function () {
    mouseOutHandler()
    target.removeEventListener('mouseenter', mouseEnterHandler)
    target.removeEventListener('mousemove', mouseMoveHandler)
    target.removeEventListener('mouseout', mouseOutHandler)
  }

  target.addEventListener('mouseenter', mouseEnterHandler)
  target.addEventListener('mousemove', mouseMoveHandler)
  target.addEventListener('mouseout', mouseOutHandler)
}

SlopingFactory.prototype.init = function (options = {}) {
  this._options = Object.assign(this._options || {}, options)
  this._cachedStyles = {}
  this._target.style.boxShadow = this._options.hideShadow ? '' : 'rgba(0, 0, 0, 0.5) 0 0 40px 0px'
}

function Sloping (target, options = {}) {
  if (!target) {
    throw new TypeError('target must be an element or a query string of an element.')
  }
  if (typeof target === 'string') {
    target = document.querySelector(target)
  }
  if (!(target instanceof HTMLElement)) {
    throw new TypeError('target must be an element or a query string of an element.')
  }

  const defaultOptions = {
    type: 'lift', // lift or sink
    hideShadow: false
  }

  const opts = {
    ...defaultOptions,
    ...options
  }
  return new SlopingFactory(target, opts)
}

export default Sloping
