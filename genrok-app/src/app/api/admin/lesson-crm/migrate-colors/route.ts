import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Color migration: old purple palette → new lime green
const COLOR_REPLACEMENTS = [
  // Main accent colors
  { old: '#8b5cf6', new: '#88da1c' },
  { old: '#7c3aed', new: '#6fb816' },
  { old: '#a78bfa', new: '#a3e635' },
  { old: '#6d28d9', new: '#65a30d' },
  { old: '#5b21b6', new: '#4d7c0f' },
  // RGB values
  { old: '139, 92, 246', new: '136, 218, 28' },
  { old: '124, 58, 237', new: '111, 184, 22' },
  { old: '167, 139, 250', new: '163, 230, 53' },
  // Also handle red accent lessons (convert to lime)
  { old: '#dc2626', new: '#88da1c' },
  { old: '#b91c1c', new: '#6fb816' },
  { old: '#ef4444', new: '#a3e635' },
  { old: '220, 38, 38', new: '136, 218, 28' },
  // Green variations (keep consistent)
  { old: '#10b981', new: '#88da1c' },
  { old: '#059669', new: '#6fb816' },
  { old: '#34d399', new: '#a3e635' },
  { old: '16, 185, 129', new: '136, 218, 28' },
];

export async function POST(request: NextRequest) {
  try {
    const lessonsDir = path.join(process.cwd(), 'public', 'lessons');

    // Get all lesson directories
    const entries = await fs.readdir(lessonsDir, { withFileTypes: true });
    const lessonDirs = entries.filter(e => e.isDirectory()).map(e => e.name);

    const results: { slug: string; status: string; changes: number }[] = [];
    let totalChanges = 0;

    for (const slug of lessonDirs) {
      const lessonPath = path.join(lessonsDir, slug, 'lesson.html');

      try {
        await fs.access(lessonPath);
      } catch {
        continue; // Skip if no lesson.html
      }

      let content = await fs.readFile(lessonPath, 'utf-8');
      let changeCount = 0;

      // Apply all color replacements
      for (const { old: oldColor, new: newColor } of COLOR_REPLACEMENTS) {
        const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        const matches = content.match(regex);
        if (matches) {
          changeCount += matches.length;
          content = content.replace(regex, newColor);
        }
      }

      if (changeCount > 0) {
        // Create backup
        const backupPath = path.join(lessonsDir, slug, 'lesson.backup.html');
        const originalContent = await fs.readFile(lessonPath, 'utf-8');
        await fs.writeFile(backupPath, originalContent, 'utf-8');

        // Write updated content
        await fs.writeFile(lessonPath, content, 'utf-8');

        results.push({ slug, status: 'migrated', changes: changeCount });
        totalChanges += changeCount;
      } else {
        results.push({ slug, status: 'already_migrated', changes: 0 });
      }
    }

    return NextResponse.json({
      success: true,
      totalLessons: lessonDirs.length,
      migratedLessons: results.filter(r => r.status === 'migrated').length,
      totalChanges,
      results,
    });

  } catch (error) {
    console.error('Error migrating colors:', error);
    return NextResponse.json(
      { error: 'Failed to migrate colors', details: String(error) },
      { status: 500 }
    );
  }
}

// GET to check current migration status
export async function GET() {
  try {
    const lessonsDir = path.join(process.cwd(), 'public', 'lessons');
    const entries = await fs.readdir(lessonsDir, { withFileTypes: true });
    const lessonDirs = entries.filter(e => e.isDirectory()).map(e => e.name);

    let migratedCount = 0;
    let pendingCount = 0;

    for (const slug of lessonDirs) {
      const lessonPath = path.join(lessonsDir, slug, 'lesson.html');

      try {
        const content = await fs.readFile(lessonPath, 'utf-8');
        // Check if it has the new lime green accent
        if (content.includes('#88da1c') || content.includes('136, 218, 28')) {
          migratedCount++;
        } else {
          pendingCount++;
        }
      } catch {
        continue;
      }
    }

    return NextResponse.json({
      total: lessonDirs.length,
      migrated: migratedCount,
      pending: pendingCount,
      progress: Math.round((migratedCount / lessonDirs.length) * 100),
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check status', details: String(error) },
      { status: 500 }
    );
  }
}
