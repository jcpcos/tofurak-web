const API_HOST = 'api.gratouxia.com';

const AUTH_PATHS = ['/admin', '/account', '/pagos/historial'];

function getRequestUrl(url: string): URL | null {
  const baseOrigin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'https://gratouxia.com';

  try {
    return new URL(url, baseOrigin);
  } catch {
    return null;
  }
}

function normalizePathname(pathname: string): string {
  return pathname.startsWith('/api/') ? pathname.slice(4) : pathname;
}

export function requiresBearerAuth(url: string): boolean {
  const requestUrl = getRequestUrl(url);

  if (!requestUrl) {
    return false;
  }

  const isApiHost = requestUrl.hostname === API_HOST;
  const isSameOriginApiProxy = normalizePathname(requestUrl.pathname) !== requestUrl.pathname;

  if (!isApiHost && !isSameOriginApiProxy) {
    return false;
  }

  const pathname = normalizePathname(requestUrl.pathname);

  return AUTH_PATHS.some(path => pathname === path || pathname.startsWith(`${path}/`));
}

export function isAdminApiRequest(url: string): boolean {
  const requestUrl = getRequestUrl(url);

  if (!requestUrl) {
    return false;
  }

  const isApiHost = requestUrl.hostname === API_HOST;
  const isSameOriginApiProxy = normalizePathname(requestUrl.pathname) !== requestUrl.pathname;

  if (!isApiHost && !isSameOriginApiProxy) {
    return false;
  }

  const pathname = normalizePathname(requestUrl.pathname);

  return pathname === '/admin' || pathname.startsWith('/admin/');
}
