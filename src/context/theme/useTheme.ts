import { useTheme as useNextTheme } from "next-themes";

export const useTheme = () => {
	const nextTheme = useNextTheme();

	if (nextTheme === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return nextTheme;
};
