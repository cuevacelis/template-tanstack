declare module "mjml-browser" {
	function mjml2html(mjml: string): { html: string; errors: unknown[] };
	export default mjml2html;
}
