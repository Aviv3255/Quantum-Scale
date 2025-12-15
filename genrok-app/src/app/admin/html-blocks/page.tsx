'use client';

import { useState, useEffect } from 'react';
import { Save, Check, Code, Eye, EyeOff, Trash2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// Course list for dropdown
const COURSES = [
  { slug: 'the-social-proof', name: 'The Social Proof', color: '#7700fd' },
  { slug: 'subconscious-trap', name: 'The Subconscious Trap', color: '#ff4f03' },
  { slug: 'ltv-system', name: 'The LTV System', color: '#00bc0d' },
  { slug: 'ai-photographer', name: 'AI Photographer', color: '#9ba4a6' },
  { slug: 'ad-copy-templates', name: 'Ad Copy Templates', color: '#D4B160' },
  { slug: 'meta-ad-templates', name: 'Meta Ad Templates', color: '#EFBF04' },
  { slug: 'email-marketing', name: 'Email Marketing', color: '#D4B160' },
  { slug: 'abandoned-checkout', name: 'Abandoned Checkout', color: '#00cc6e' },
  { slug: 'ab-test-results', name: 'A/B Tests Results', color: '#8E5DFF' },
];

const STORAGE_KEY = 'quantum-scale-html-blocks';

export default function HTMLBlocksAdmin() {
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0].slug);
  const [htmlContent, setHtmlContent] = useState('');
  const [savedBlocks, setSavedBlocks] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Load saved blocks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSavedBlocks(parsed);
      } catch (e) {
        console.error('Failed to parse stored HTML blocks:', e);
      }
    }
  }, []);

  // Load HTML for selected course
  useEffect(() => {
    setHtmlContent(savedBlocks[selectedCourse] || '');
    setShowPreview(false);
  }, [selectedCourse, savedBlocks]);

  const handleSave = () => {
    setSaveStatus('saving');

    const updatedBlocks = {
      ...savedBlocks,
      [selectedCourse]: htmlContent,
    };

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlocks));
    setSavedBlocks(updatedBlocks);

    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this HTML block?')) return;

    const updatedBlocks = { ...savedBlocks };
    delete updatedBlocks[selectedCourse];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlocks));
    setSavedBlocks(updatedBlocks);
    setHtmlContent('');
  };

  const selectedCourseData = COURSES.find(c => c.slug === selectedCourse);
  const hasContent = htmlContent.trim().length > 100;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/courses" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-bold">HTML Blocks Manager</h1>
              <p className="text-sm text-white/50">Paste HTML to create VIEW 2 landing pages</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasContent && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                <Trash2 size={16} />
                Delete
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: saveStatus === 'saved' ? '#22c55e' : selectedCourseData?.color,
                color: '#fff'
              }}
            >
              {saveStatus === 'saved' ? (
                <>
                  <Check size={16} />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save HTML Block
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Course Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/70 mb-2">Select Course</label>
          <div className="flex flex-wrap gap-2">
            {COURSES.map((course) => {
              const isSelected = selectedCourse === course.slug;
              const hasSavedContent = savedBlocks[course.slug] && savedBlocks[course.slug].length > 100;

              return (
                <button
                  key={course.slug}
                  onClick={() => setSelectedCourse(course.slug)}
                  className="relative px-4 py-2 rounded-lg font-medium transition-all"
                  style={{
                    backgroundColor: isSelected ? course.color : 'rgba(255,255,255,0.1)',
                    color: isSelected ? '#fff' : 'rgba(255,255,255,0.7)',
                    border: isSelected ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {course.name}
                  {hasSavedContent && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Code size={16} className="text-white/50" />
              <span className="text-sm text-white/70">
                {htmlContent.length.toLocaleString()} characters
              </span>
            </div>
            {hasContent && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                Ready to use
              </span>
            )}
          </div>

          <button
            onClick={() => setShowPreview(!showPreview)}
            disabled={!hasContent}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>

        {/* Main Content Area */}
        <div className={`grid ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
          {/* HTML Editor */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">
              HTML Content (paste your complete HTML including &lt;style&gt; tags)
            </label>
            <textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder={`<!-- Paste your complete HTML here -->
<style>
  /* Your CSS styles */
</style>

<!-- Your HTML content -->
<div class="hero-section">
  ...
</div>`}
              className="w-full h-[600px] p-4 rounded-xl bg-[#1a1a1a] border border-white/10 text-white/90 font-mono text-sm resize-none focus:outline-none focus:border-white/30 placeholder:text-white/30"
            />
          </div>

          {/* Preview */}
          {showPreview && hasContent && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/70">Live Preview</label>
              <div className="h-[600px] rounded-xl overflow-hidden border border-white/10 bg-white">
                <iframe
                  srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0;padding:0;">${htmlContent}</body></html>`}
                  className="w-full h-full"
                  title="Preview"
                />
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold mb-4">How to use:</h3>
          <ol className="list-decimal list-inside space-y-2 text-white/70">
            <li>Select the course you want to add a VIEW 2 layout for</li>
            <li>Paste your complete HTML (including &lt;style&gt; tags) into the editor</li>
            <li>Click "Save HTML Block" to save</li>
            <li>Go to the course page and click "Alternative Layout" to see your HTML</li>
          </ol>

          <div className="mt-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-sm text-yellow-400">
              <strong>Note:</strong> HTML blocks are saved in your browser's localStorage.
              They will persist across sessions but not across different browsers or devices.
            </p>
          </div>
        </div>

        {/* Quick Link */}
        {hasContent && (
          <div className="mt-6 text-center">
            <Link
              href={`/courses/${selectedCourse}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
              style={{ backgroundColor: selectedCourseData?.color }}
            >
              <Eye size={18} />
              View Course Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
