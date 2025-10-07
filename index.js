// WhatsApp Shortlink Generator (wa.me only, no prefilled message)

document.addEventListener('DOMContentLoaded', () => {
  const phoneEl = document.getElementById('phone')
  const generateBtn = document.getElementById('generate')
  const linkEl = document.getElementById('link')
  const copyBtn = document.getElementById('copy')
  const openBtn = document.getElementById('open')
  const preview = document.getElementById('preview')

  function sanitizePhone(raw) {
    if (!raw) return ''
    return raw.replace(/[^0-9]/g, '')
  }

  function buildLink() {
    const phone = sanitizePhone(phoneEl.value.trim())
    if (!phone) return { error: 'Please enter a valid phone number (include country code).' }

    const url = `https://wa.me/${phone}`
    return { url }
  }

  function updatePreview(url) {
    try {
      preview.src = url
    } catch {
      preview.srcdoc = `<div style="font-family:Inter, system-ui; padding:12px; color:#374151;">Preview unavailable. Click the link to open WhatsApp.</div>`
    }
  }

  function showError(text) {
    linkEl.textContent = text
    linkEl.href = '#'
    preview.removeAttribute('src')
    preview.srcdoc = ''
  }

  generateBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const { url, error } = buildLink()
    if (error) return showError(error)

    linkEl.textContent = url
    linkEl.href = url
    linkEl.target = '_blank'
    linkEl.rel = 'noopener noreferrer'

    updatePreview(url)
  })

  copyBtn.addEventListener('click', async () => {
    const text = linkEl.href
    if (!text || text === '#') return alert('No link to copy — generate first.')
    try {
      await navigator.clipboard.writeText(text)
      const original = copyBtn.textContent
      copyBtn.textContent = 'Copied!'
      setTimeout(() => (copyBtn.textContent = original), 1400)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
      alert('Copied to clipboard')
    }
  })

  openBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const href = linkEl.href
    if (!href || href === '#') return alert('No link to open — generate first.')
    window.open(href, '_blank', 'noopener')
  })
})
