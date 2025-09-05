/**
 * Returns a string representing the user's operating system.
 *
 * Detection order:
 *   1. Windows
 *   2. Android
 *   3. iOS
 *   4. Mac
 *   5. Linux
 *   6. Chrome OS
 *   7. Unknown
 *
 * Uses window.navigator.userAgent and window.navigator.platform for detection.
 *
 * Example:
 * ```ts
 * const os = getSO();
 * // os could be 'Windows', 'Android', 'iOS', 'Macintosh', 'Linux', 'Chrome OS', or 'Unknown'
 * ```
 *
 * @returns {string} The detected operating system name.
 */
export function getSO(): string {
  const ua = window.navigator.userAgent.toLowerCase()
  const platform = window.navigator.platform.toLowerCase()

  if (platform.includes('win')) return 'Windows'
  if (ua.includes('android')) return 'Android'
  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod'))
    return 'iOS'
  if (platform.includes('mac')) {
    // If Mac but user agent says iPhone/iPad, it's iOS
    if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod'))
      return 'iOS'
    return 'Macintosh'
  }
  if (platform.includes('linux')) return 'Linux'
  if (ua.includes('cros')) return 'Chrome OS'
  return 'Unknown'
}

/**
 * Returns a string representing the user's browser and its version.
 *
 * Detection order:
 *   1. Edge
 *   2. Opera
 *   3. Safari
 *   4. Chrome
 *   5. Firefox
 *   6. Internet Explorer
 *   7. Unknown browser
 *
 * Uses window.navigator.userAgent for detection.
 *
 * Example:
 * ```ts
 * const browser = getBrowserInfo();
 * // browser could be 'Edge 120.0.0.0', 'Opera 105.0.0.0', 'Safari 17', 'Chrome 120.0.0.0', 'Firefox 120.0.0.0', 'IE 11', or 'Unknown browser'
 * ```
 *
 * @returns {string} The detected browser name and version, or 'Unknown browser' if not found.
 */
export function getBrowserInfo(): string {
  const ua = navigator.userAgent
  let tem: RegExpMatchArray | null

  // Detect Edge and Opera first
  tem = /\b(Edg|OPR)\/(\d+(\.\d+)+)/.exec(ua)
  if (tem) {
    const browser = tem[1] === 'OPR' ? 'Opera' : 'Edge'
    return `${browser} ${tem[2]}`
  }

  // Safari
  if (ua.includes('safari') && /version\/(\d+)/i.test(ua)) {
    tem = /version\/(\d+)/i.exec(ua)
    if (tem) return `Safari ${tem[1]}`
  }

  // Chrome
  tem = /chrome\/(\d+(\.\d+)+)/i.exec(ua)
  if (tem) return `Chrome ${tem[1]}`

  // Firefox
  tem = /firefox\/(\d+(\.\d+)+)/i.exec(ua)
  if (tem) return `Firefox ${tem[1]}`

  // Internet Explorer
  tem = /msie (\d+)/i.exec(ua)
  if (tem) return `IE ${tem[1]}`

  return 'Unknown browser'
}
