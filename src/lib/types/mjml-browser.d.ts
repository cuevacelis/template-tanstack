declare module 'mjml-browser' {
  function mjml2html(mjml: string): { html: string; errors: Array<unknown> }
  export default mjml2html
}
