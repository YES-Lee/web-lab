function SlopingFactory (target, options = {}) {
  this.target = target
  const height = target.clientHeight
  const width = target.clientWidth
  const cachedStyles = {}
  target.addEventListener('mouseenter', mouseEnterHandler)
  target.addEventListener('mousemove', mouseMoveHandler)
  target.addEventListener('mouseout', mouseOutHandler)
  function mouseEnterHandler (event) {
    cachedStyles.transform = event.target.style.transform
    cachedStyles.boxShadow = event.target.style.boxShadow
  }
  function mouseMoveHandler (event) {
    const { offsetX, offsetY } = event
    const rx = (width / 2 - offsetX) / width
    const ry = -(height / 2 - offsetY) / height
    if (options.type === 'sink') {
      target.style.transform = `rotateX(${-10 * ry}deg) rotateY(${-10 * rx}deg)`
      target.style.boxShadow = `rgba(0, 0, 0, 0.5) ${30 * rx}px ${-30 * ry}px 40px 0px`
    } else {
      target.style.transform = `rotateX(${10 * ry}deg) rotateY(${10 * rx}deg)`
      target.style.boxShadow = `rgba(0, 0, 0, 0.5) ${-30 * rx}px ${30 * ry}px 40px 0px`
    }
  }
  function mouseOutHandler (event) {
    Object.keys(cachedStyles).forEach(k => {
      target.style[k] = cachedStyles[k]
    })
  }

  return {
    destroy () {
      target.removeEventListener('mouseenter', mouseEnterHandler)
      target.removeEventListener('mousemove', mouseMoveHandler)
      target.removeEventListener('mouseout', mouseOutHandler)
    },
    init () {
      target.addEventListener('mouseenter', mouseEnterHandler)
      target.addEventListener('mousemove', mouseMoveHandler)
      target.addEventListener('mouseout', mouseOutHandler)
    },
    setType (type) {
      options.type = type
      target.removeEventListener('mouseenter', mouseEnterHandler)
      target.removeEventListener('mousemove', mouseMoveHandler)
      target.removeEventListener('mouseout', mouseOutHandler)
      target.addEventListener('mouseenter', mouseEnterHandler)
      target.addEventListener('mousemove', mouseMoveHandler)
      target.addEventListener('mouseout', mouseOutHandler)
    }
  }
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
    type: 'lift' // lift or sink
  }

  const opts = {
    ...defaultOptions,
    ...options
  }
  return new SlopingFactory(target, opts)
}

export default Sloping
