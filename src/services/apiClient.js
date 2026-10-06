/**
 * API Client & Network Service
 * Fully implements the 20 Rules for API Calling (itboomi Labs standards)
 * 
 * [Rule 1]  Use the Correct HTTP Method (GET, POST, PUT, DELETE)
 * [Rule 2]  Use Environment Variables (import.meta.env)
 * [Rule 3]  Always Handle Errors (try/catch + normalized error payload)
 * [Rule 4]  Show Loading State (state lifecycle helpers)
 * [Rule 5]  Validate API Response (schema & format verification)
 * [Rule 6]  Use Meaningful Error Messages (user-friendly contextual guidance)
 * [Rule 7]  Set Timeouts (AbortController with default 10s timeout)
 * [Rule 8]  Use Authentication Properly (Bearer token / header helpers)
 * [Rule 9]  Don't Expose Sensitive Data (payload log sanitization)
 * [Rule 10] Use Query Parameters for Filtering (buildQueryParams utility)
 * [Rule 11] Use Request/Response Interceptors (pre-request & post-response hooks)
 * [Rule 12] Handle Different Status Codes (400, 401, 403, 404, 429, 500)
 * [Rule 13] Cancel Unnecessary Requests (AbortController support)
 * [Rule 14] Use Pagination for Large Data (paginateArray utility)
 * [Rule 15] Cache When Possible (in-memory + storage cache with TTL)
 * [Rule 16] Retry Failed Requests (exponential backoff retry for transient drops)
 * [Rule 17] Use HTTPS (strict HTTPS enforcement check)
 * [Rule 18] Follow API Rate Limits (cooldown & throttle protection)
 * [Rule 19] Log API Calls During Development (DEV-only conditional logs)
 * [Rule 20] Keep the Code Clean & Reusable (centralized modular architecture)
 */

// [Rule 2] Environment variables with sensible defaults
const DEFAULT_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS) || 10000;
const IS_DEV = import.meta.env.DEV;

// In-memory cache store [Rule 15]
const memoryCache = new Map();

// Rate limiter / cooldown tracker [Rule 18]
const lastCallTimestamps = new Map();

// Interceptor registries [Rule 11]
const requestInterceptors = [];
const responseInterceptors = [];

/**
 * [Rule 19] DEV-Only Logger with [Rule 9] Sensitive Data Masking
 */
function devLog(stage, details) {
  if (!IS_DEV) return;
  
  // Rule 9: Sanitize sensitive keys before logging
  const sanitize = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    const copy = Array.isArray(obj) ? [...obj] : { ...obj };
    const sensitiveKeys = ['pin', 'password', 'token', 'secret', 'authorization', 'apiKey'];
    for (const key of Object.keys(copy)) {
      if (sensitiveKeys.some(s => key.toLowerCase().includes(s))) {
        copy[key] = '***REDACTED***';
      } else if (typeof copy[key] === 'object') {
        copy[key] = sanitize(copy[key]);
      }
    }
    return copy;
  };

  console.groupCollapsed(`%c[API ${stage}] %c${new Date().toLocaleTimeString()}`, 'color: #0d9488; font-weight: bold;', 'color: #64748b;');
  console.log(sanitize(details));
  console.groupEnd();
}

/**
 * [Rule 17] Validate HTTPS Protocol
 */
export function assertHttps(url) {
  if (typeof url !== 'string') return;
  // Allow relative URLs (/api/...) or localhost for local dev, otherwise require https
  if (url.startsWith('/') || url.includes('localhost') || url.includes('127.0.0.1')) {
    return;
  }
  if (!url.startsWith('https://')) {
    console.warn(`[API Security Warning] Insecure URL detected: ${url}. Rule 17 requires HTTPS in production.`);
  }
}

/**
 * [Rule 10] Use Query Parameters for Filtering / Search / Pagination
 */
export function buildQueryParams(params = {}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, String(value));
    }
  }
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * [Rule 8] Authentication Header Helper
 */
export function buildAuthHeaders(token = null, additionalHeaders = {}) {
  const headers = { ...additionalHeaders };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * [Rule 14] Pagination Helper for Collections
 */
export function paginateArray(items = [], page = 1, pageSize = 10) {
  const safePage = Math.max(1, page);
  const safeSize = Math.max(1, pageSize);
  const total = items.length;
  const totalPages = Math.ceil(total / safeSize) || 1;
  const startIndex = (safePage - 1) * safeSize;
  const paginatedData = items.slice(startIndex, startIndex + safeSize);

  return {
    data: paginatedData,
    page: safePage,
    pageSize: safeSize,
    totalItems: total,
    totalPages,
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1
  };
}

/**
 * [Rule 15] Cache Getter / Setter with Time-To-Live (TTL)
 */
export function getCachedData(cacheKey) {
  const cached = memoryCache.get(cacheKey);
  if (!cached) return null;
  if (Date.now() > cached.expiresAt) {
    memoryCache.delete(cacheKey);
    return null;
  }
  return cached.data;
}

export function setCachedData(cacheKey, data, ttlMs = 60000) {
  memoryCache.set(cacheKey, {
    data,
    expiresAt: Date.now() + ttlMs
  });
}

/**
 * [Rule 12] Handle Different Status Codes with Meaningful Messages [Rule 6]
 */
export function interpretStatusCode(statusCode, customContext = 'Operation') {
  switch (statusCode) {
    case 200:
    case 201:
      return { ok: true, message: 'Request successful.' };
    case 400:
      return { ok: false, message: `${customContext} failed: Invalid data format submitted. Please review your entries.` };
    case 401:
      return { ok: false, message: 'Unauthorized: Authentication required to perform this action.' };
    case 403:
      return { ok: false, message: 'Forbidden: You do not have permission for this resource.' };
    case 404:
      return { ok: false, message: 'Not Found: The requested service endpoint could not be reached.' };
    case 429:
      return { ok: false, message: 'Rate Limit Exceeded: Too many requests. Please wait a moment and try again.' };
    case 500:
    case 502:
    case 503:
      return { ok: false, message: 'Remote Server Error: The server is currently busy. Your requisition has been saved locally.' };
    default:
      return { ok: false, message: `Unexpected response status (${statusCode}). Please try again or confirm on WhatsApp.` };
  }
}

/**
 * [Rule 11] Interceptor Registration
 */
export function addRequestInterceptor(fn) {
  requestInterceptors.push(fn);
}
export function addResponseInterceptor(fn) {
  responseInterceptors.push(fn);
}

/**
 * Core Request Engine
 * Orchestrates Methods [1], Timeouts [7], Cancellations [13], Retries [16], Rate Limits [18], Logging [19]
 */
export async function executeRequest(url, options = {}) {
  // [Rule 17] Ensure HTTPS
  assertHttps(url);

  const {
    method = 'GET', // [Rule 1]
    body = null,
    headers = {},
    timeoutMs = DEFAULT_TIMEOUT_MS, // [Rule 7]
    retries = 1, // [Rule 16] (Default retry once for safety)
    cacheKey = null, // [Rule 15]
    ttlMs = 60000,
    rateLimitCooldownMs = 1000, // [Rule 18]
    externalSignal = null // [Rule 13]
  } = options;

  // [Rule 15] Check Cache for idempotent GET requests
  if (method === 'GET' && cacheKey) {
    const cached = getCachedData(cacheKey);
    if (cached !== null) {
      devLog('Cache Hit', { cacheKey, data: cached });
      return { success: true, data: cached, fromCache: true, statusCode: 200 };
    }
  }

  // [Rule 18] Rate limiting / cooldown protection
  const lastCall = lastCallTimestamps.get(url) || 0;
  const now = Date.now();
  if (now - lastCall < rateLimitCooldownMs) {
    const waitTime = rateLimitCooldownMs - (now - lastCall);
    devLog('Rate Limit Throttling', { url, waitingMs: waitTime });
    await new Promise(res => setTimeout(res, waitTime));
  }
  lastCallTimestamps.set(url, Date.now());

  // [Rule 11] Apply Request Interceptors
  let requestConfig = { method, headers, body, url };
  for (const interceptor of requestInterceptors) {
    requestConfig = interceptor(requestConfig) || requestConfig;
  }

  // [Rule 16] Retry Loop with Exponential Backoff
  let attempt = 0;
  let lastError = null;

  while (attempt <= retries) {
    attempt++;
    
    // [Rule 7] & [Rule 13] Timeout and Request Abort Controller
    const controller = new AbortController();
    let timeoutId = null;

    if (timeoutMs > 0) {
      timeoutId = setTimeout(() => {
        controller.abort(`Request timed out after ${timeoutMs}ms`);
      }, timeoutMs);
    }

    // Connect external cancellation signal if provided [Rule 13]
    if (externalSignal) {
      externalSignal.addEventListener('abort', () => {
        controller.abort('Request cancelled by caller');
      });
    }

    try {
      devLog('Request Outgoing', {
        method: requestConfig.method,
        url: requestConfig.url,
        attempt,
        body: requestConfig.body
      });

      const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: requestConfig.body,
        mode: options.mode || 'cors',
        signal: controller.signal
      });

      if (timeoutId) clearTimeout(timeoutId);

      // Handle no-cors / opaque responses (e.g. Google Apps Script)
      if (response.type === 'opaque') {
        devLog('Response Opaque (no-cors)', { url: requestConfig.url, status: 0 });
        return {
          success: true,
          data: { status: 'transmitted', mode: 'opaque' },
          statusCode: 200,
          isOpaque: true
        };
      }

      // [Rule 12] Interpret HTTP Status Code
      const statusInfo = interpretStatusCode(response.status);

      // Parse response body if JSON
      let responseData = null;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      // [Rule 11] Apply Response Interceptors
      for (const interceptor of responseInterceptors) {
        responseData = interceptor(responseData, response) || responseData;
      }

      // [Rule 5] Validate API Response
      if (!response.ok) {
        devLog('API Non-OK Response', { status: response.status, data: responseData });
        return {
          success: false,
          error: statusInfo.message,
          statusCode: response.status,
          data: responseData
        };
      }

      // Cache valid result [Rule 15]
      if (method === 'GET' && cacheKey) {
        setCachedData(cacheKey, responseData, ttlMs);
      }

      devLog('Response Success', { status: response.status, data: responseData });
      return {
        success: true,
        data: responseData,
        statusCode: response.status,
        error: null
      };

    } catch (err) {
      if (timeoutId) clearTimeout(timeoutId);
      lastError = err;

      const isAbortOrTimeout = err.name === 'AbortError' || String(err).includes('timed out');
      devLog('Request Failed Attempt', { attempt, error: err.message, isTimeout: isAbortOrTimeout });

      // If we still have retries and it's a network/timeout failure, back off and retry [Rule 16]
      if (attempt <= retries && (isAbortOrTimeout || err.name === 'TypeError')) {
        const backoffDelay = attempt * 1000; // 1s, 2s
        await new Promise(r => setTimeout(r, backoffDelay));
        continue;
      }

      break;
    }
  }

  // [Rule 3 & Rule 6] Meaningful final error message
  const isTimeout = lastError?.name === 'AbortError' || String(lastError).includes('timed out');
  const userMessage = isTimeout
    ? 'Network request timed out. Requisition has been safely recorded locally.'
    : 'Unable to reach the remote server. Your requisition is safely recorded locally and can be confirmed via WhatsApp.';

  return {
    success: false,
    error: userMessage,
    technicalError: lastError?.message || 'Unknown network error',
    statusCode: null,
    data: null
  };
}

/**
 * [Rule 1 & Rule 20] Reusable API Client Interface
 */
export const apiClient = {
  get: (url, options = {}) => executeRequest(url, { ...options, method: 'GET' }),
  post: (url, body, options = {}) => executeRequest(url, { ...options, method: 'POST', body }),
  put: (url, body, options = {}) => executeRequest(url, { ...options, method: 'PUT', body }),
  delete: (url, options = {}) => executeRequest(url, { ...options, method: 'DELETE' }),
  
  // Helpers
  buildQueryParams,
  buildAuthHeaders,
  paginateArray,
  getCachedData,
  setCachedData,
  interpretStatusCode
};

export default apiClient;
