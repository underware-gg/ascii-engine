console.log('_PATHNAME_', window.location.pathname)

const pathnames = [
  '/paint.html',
]

const slugs = {
  '/paint.html': 'paint',
}

const { pathname } = window.location

if (pathname === '/') {
  import('./pages/index.mjs')
} else if (pathnames.includes(pathname)) {
  import(`./pages/${slugs[pathname]}.mjs`)
}
