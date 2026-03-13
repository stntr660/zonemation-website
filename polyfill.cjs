// Polyfill browser globals that Payload CMS references at build time
// Node 18 doesn't have File as a global (Node 20+ does)
if (typeof globalThis.File === 'undefined') {
  globalThis.File = class File {
    constructor(bits, name, options) {
      this.name = name || ''
      this.size = Array.isArray(bits) ? bits.reduce((s, b) => s + (b.length || b.byteLength || 0), 0) : 0
      this.type = (options && options.type) || ''
      this.lastModified = (options && options.lastModified) || Date.now()
    }
  }
}
