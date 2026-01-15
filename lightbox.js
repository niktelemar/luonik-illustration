/* 
const lightbox = document.createElement('div')
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)

const images = document.querySelectorAll('img')
images.forEach(image => {
  image.addEventListener('click', e => {
    lightbox.classList.add('active')
    const img = document.createElement('img')
    img.src = image.src
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild)
    }
    lightbox.appendChild(img)
  })
})

lightbox.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return
  lightbox.classList.remove('active')
}) */

if (window.matchMedia('(min-width: 720px)').matches) {

  const lightbox = document.createElement('div')
  lightbox.id = 'lightbox'
  lightbox.setAttribute('role', 'dialog')
  lightbox.setAttribute('aria-modal', 'true')
  lightbox.setAttribute('aria-label', 'Image viewer')
  document.body.appendChild(lightbox)

  const images = document.querySelectorAll('img.illustration')
  const imageList = Array.from(images)
  let currentIndex = -1

  // Create close button
  const closeButton = document.createElement('button')
  closeButton.className = 'lightbox-close'
  closeButton.setAttribute('aria-label', 'Close lightbox')
  closeButton.innerHTML = '×'

  // Create navigation buttons
  const prevButton = document.createElement('button')
  prevButton.className = 'lightbox-arrow lightbox-arrow-left'
  prevButton.setAttribute('aria-label', 'Previous image')
  prevButton.innerHTML = '‹'

  const nextButton = document.createElement('button')
  nextButton.className = 'lightbox-arrow lightbox-arrow-right'
  nextButton.setAttribute('aria-label', 'Next image')
  nextButton.innerHTML = '›'

  // Create image container
  const imgContainer = document.createElement('div')
  imgContainer.className = 'lightbox-image-container'

  // Add elements to lightbox once
  lightbox.appendChild(closeButton)
  lightbox.appendChild(imgContainer)
  lightbox.appendChild(prevButton)
  lightbox.appendChild(nextButton)

  function showImage(index) {
    if (imageList.length === 0) return

    currentIndex = (index + imageList.length) % imageList.length

    const img = document.createElement('img')
    img.src = imageList[currentIndex].src
    img.alt = imageList[currentIndex].alt || 'Lightbox image'
    img.className = 'lightbox-image'

    // Clear and update image container
    imgContainer.innerHTML = ''
    imgContainer.appendChild(img)

    // Hide arrows if only one image
    const shouldShowArrows = imageList.length > 1
    prevButton.style.display = shouldShowArrows ? 'block' : 'none'
    nextButton.style.display = shouldShowArrows ? 'block' : 'none'
  }

  function closeLightbox() {
    lightbox.classList.remove('active')
    imgContainer.innerHTML = ''
    document.body.style.overflow = '' // Restore scrolling
  }

  function handleKeydown(e) {
    if (!lightbox.classList.contains('active')) return

    if (e.key === 'Escape') {
      closeLightbox()
      return
    }
    if (e.key === 'ArrowRight') {
      showImage(currentIndex + 1)
    }
    if (e.key === 'ArrowLeft') {
      showImage(currentIndex - 1)
    }
  }

  // Add click listeners to images
  imageList.forEach((image, index) => {
    image.style.cursor = 'pointer'
    image.addEventListener('click', () => {
      lightbox.classList.add('active')
      document.body.style.overflow = 'hidden' // Prevent background scrolling
      showImage(index)
    })
  })

  // Close on background click
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  // Close button
  closeButton.addEventListener('click', e => {
    e.stopPropagation()
    closeLightbox()
  })

  // Navigation buttons
  prevButton.addEventListener('click', e => {
    e.stopPropagation()
    showImage(currentIndex - 1)
  })

  nextButton.addEventListener('click', e => {
    e.stopPropagation()
    showImage(currentIndex + 1)
  })

  // Keyboard navigation
  document.addEventListener('keydown', handleKeydown)

}


