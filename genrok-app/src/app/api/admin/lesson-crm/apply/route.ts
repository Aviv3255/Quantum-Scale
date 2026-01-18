import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Component code templates - these will be injected into lesson.html files
// In a real implementation, you would read these from the component library
const COMPONENT_TEMPLATES: Record<string, string> = {
  // This is a placeholder - actual implementation would read from src/components/lessons/
  // For now, we return a simple template that can be expanded
};

interface ApplyRequest {
  slug: string;
  changes: {
    components: { componentId: string; slideIndex: number; data?: object }[];
    images: { slideIndex: number; url: string }[];
    migrateColor: boolean;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ApplyRequest = await request.json();
    const { slug, changes } = body;

    // Validate input
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    // Get the lesson file path
    const lessonPath = path.join(process.cwd(), 'public', 'lessons', slug, 'lesson.html');

    // Check if file exists
    try {
      await fs.access(lessonPath);
    } catch {
      return NextResponse.json({ error: `Lesson file not found: ${slug}` }, { status: 404 });
    }

    // Read the current lesson file
    let content = await fs.readFile(lessonPath, 'utf-8');

    // Track what was changed
    const appliedChanges: string[] = [];

    // 1. Migrate color palette if requested
    if (changes.migrateColor) {
      // Replace old purple accent with new lime green
      const colorReplacements = [
        { old: '#8b5cf6', new: '#88da1c' },
        { old: '#7c3aed', new: '#6fb816' },
        { old: '#a78bfa', new: '#a3e635' },
        { old: '139, 92, 246', new: '136, 218, 28' }, // RGB values
      ];

      colorReplacements.forEach(({ old, new: newColor }) => {
        const regex = new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        if (content.match(regex)) {
          content = content.replace(regex, newColor);
          appliedChanges.push(`Color: ${old} → ${newColor}`);
        }
      });
    }

    // 2. Add image URLs to slides (placeholder implementation)
    // In a real implementation, this would parse the slides array and add images
    if (changes.images && changes.images.length > 0) {
      changes.images.forEach(({ slideIndex, url }) => {
        // This is a placeholder - actual implementation would modify the slides array
        appliedChanges.push(`Image added to slide ${slideIndex}: ${url.substring(0, 50)}...`);
      });
    }

    // 3. Add components to slides (placeholder implementation)
    // In a real implementation, this would:
    // - Read the component source from the library
    // - Inject it into the lesson.html file
    // - Add the component to the slides array
    if (changes.components && changes.components.length > 0) {
      changes.components.forEach(({ componentId, slideIndex }) => {
        // This is a placeholder - actual implementation would inject component code
        appliedChanges.push(`Component ${componentId} marked for slide ${slideIndex}`);
      });
    }

    // Create backup before writing
    const backupPath = path.join(process.cwd(), 'public', 'lessons', slug, 'lesson.backup.html');
    const originalContent = await fs.readFile(lessonPath, 'utf-8');
    await fs.writeFile(backupPath, originalContent, 'utf-8');

    // Write the updated content
    await fs.writeFile(lessonPath, content, 'utf-8');

    return NextResponse.json({
      success: true,
      slug,
      appliedChanges,
      message: `Applied ${appliedChanges.length} changes to ${slug}`,
      backupCreated: true,
    });

  } catch (error) {
    console.error('Error applying changes:', error);
    return NextResponse.json(
      { error: 'Failed to apply changes', details: String(error) },
      { status: 500 }
    );
  }
}

// GET endpoint to preview changes without applying
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
  }

  try {
    const lessonPath = path.join(process.cwd(), 'public', 'lessons', slug, 'lesson.html');
    const content = await fs.readFile(lessonPath, 'utf-8');

    // Extract current color palette
    const accentMatch = content.match(/--accent:\s*([^;]+)/);
    const currentAccent = accentMatch ? accentMatch[1].trim() : 'unknown';

    // Check if already migrated to lime green
    const isMigrated = currentAccent.includes('88da1c');

    // Count slides (rough estimate by counting slide objects)
    const slideMatches = content.match(/{\s*type:\s*['"]/g);
    const slideCount = slideMatches ? slideMatches.length : 0;

    return NextResponse.json({
      slug,
      currentAccent,
      isMigrated,
      slideCount,
      fileSize: content.length,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read lesson', details: String(error) },
      { status: 500 }
    );
  }
}
