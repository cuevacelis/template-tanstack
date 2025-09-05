import type { IModule } from "@/hooks/services/sidebar-modules/use-sidebar-modules.query";

/**
 * Props for searching the current module in the sidebar.
 * @property dataModules List of sidebar modules (can be undefined).
 * @property options Search options: title, subModule, and url.
 */
interface IPropsCurrentModule {
	dataModules: IModule[] | undefined;
	options: {
		title: string;
		subModule?: string;
		url: string;
	};
}

/**
 * Finds the current module in the sidebar based on the provided title and URL.
 *
 * @param dataModules List of sidebar modules.
 * @param options Search options (title and URL).
 * @returns The found module or undefined if no match exists.
 *
 * @example
 * const module = getCurrentModuleOfSidebar({
 *   dataModules,
 *   options: { title: 'Finanzas', url: '/dashboard/finanzas' }
 * });
 */
export function getCurrentModuleOfSidebar({
	dataModules,
	options,
}: IPropsCurrentModule) {
	if (!dataModules) return undefined;
	const normalizedTitle = options.title.toLowerCase();
	return dataModules.find((module) => {
		const matchesTitle = module.c_dmodulo.toLowerCase() === normalizedTitle;
		const matchesUrl = options.url
			? module.c_tobjeto?.startsWith(options.url)
			: true;
		return matchesTitle && matchesUrl;
	});
}

/**
 * Recursively extracts all sidebar routes from the given modules, including static routes.
 *
 * @param modules List of sidebar modules.
 * @returns An array with all found routes (without duplicates).
 *
 * @example
 * const routes = extractSidebarRoutesRecursively(dataModules);
 * // routes = ["/dashboard", "/perfil", "/dashboard/finanzas", ...]
 */
export function extractSidebarRoutesRecursively(modules: IModule[]): string[] {
	const routes = new Set<string>([]); // Static routes

	function extractRoutes(module: IModule) {
		if (module.c_tobjeto) {
			routes.add(module.c_tobjeto);
		}
		if (module.submodulos?.length) {
			for (const submodule of module.submodulos) {
				extractRoutes(submodule as IModule);
			}
		}
	}

	for (const module of modules) {
		extractRoutes(module);
	}

	return Array.from(routes);
}

/**
 * Compares two paths for equality, ignoring trailing slashes.
 *
 * @param path1 First path to compare.
 * @param path2 Second path to compare.
 * @returns true if the paths are equivalent, false otherwise.
 *
 * @example
 * arePathsEqual('/dashboard/finanzas/', '/dashboard/finanzas') // true
 * arePathsEqual('/perfil', '/perfil/') // true
 * arePathsEqual('/dashboard', '/perfil') // false
 */
export function arePathsEqual(path1: string, path2: string): boolean {
	const normalizePath = (path: string) => path.replace(/\/+$/, "");
	return normalizePath(path1) === normalizePath(path2);
}

/**
 * Checks if a given path exists in the sidebar modules by reusing existing utility functions.
 * Uses extractSidebarRoutesRecursively and arePathsEqual for consistency and maintainability.
 *
 * @param params Object containing targetPath (optional) and modules (required).
 * @returns true if the path exists in any module or submodule, false otherwise.
 *
 * @example
 * const hasAccess = isPathInSidebarModules({ targetPath: '/dashboard/finanzas', modules: dataModules });
 * // hasAccess = true if the path exists in sidebar modules
 *
 * const hasAccessCurrent = isPathInSidebarModules({ modules: dataModules });
 * // hasAccessCurrent = true if the current URL exists in sidebar modules
 */
export function isPathInSidebarModules({
	targetPath,
	modules,
}: {
	targetPath?: string;
	modules: IModule[] | undefined;
}): boolean {
	if (!modules || modules.length === 0) return false;

	const pathToCheck =
		targetPath ??
		(typeof window !== "undefined" ? window.location.pathname : "");
	if (!pathToCheck) return false;

	const allRoutes = extractSidebarRoutesRecursively(modules);
	return allRoutes.some((route) => arePathsEqual(route, pathToCheck));
}
