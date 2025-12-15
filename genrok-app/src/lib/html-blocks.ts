// HTML Blocks Storage Utility
// Manages HTML blocks stored in localStorage for VIEW 2 alternative layouts

const STORAGE_KEY = 'quantum-scale-html-blocks';

/**
 * Get HTML block for a specific course from localStorage
 * Returns null if no block exists or if it's too short to be valid
 */
export function getStoredHTMLBlock(slug: string): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const blocks = JSON.parse(stored) as Record<string, string>;
    const html = blocks[slug];

    // Only return if HTML is substantial (more than 100 chars)
    if (html && html.trim().length > 100) {
      return html;
    }

    return null;
  } catch (e) {
    console.error('Failed to get HTML block:', e);
    return null;
  }
}

/**
 * Check if a course has a stored HTML block
 */
export function hasStoredHTMLBlock(slug: string): boolean {
  return getStoredHTMLBlock(slug) !== null;
}

/**
 * Save HTML block for a course
 */
export function saveHTMLBlock(slug: string, html: string): void {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const blocks = stored ? JSON.parse(stored) : {};

    blocks[slug] = html;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
  } catch (e) {
    console.error('Failed to save HTML block:', e);
  }
}

/**
 * Delete HTML block for a course
 */
export function deleteHTMLBlock(slug: string): void {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const blocks = JSON.parse(stored);
    delete blocks[slug];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
  } catch (e) {
    console.error('Failed to delete HTML block:', e);
  }
}

/**
 * Get all stored HTML blocks
 */
export function getAllHTMLBlocks(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error('Failed to get all HTML blocks:', e);
    return {};
  }
}
