import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'src/data/course-inputs.json');

interface CourseInput {
  id: string;
  courseName: string;
  mockupUrl: string;
  htmlBlocks: string;
  createdAt: string;
}

interface CourseInputsData {
  courses: CourseInput[];
  _instructions?: string;
}

// GET - Read all course inputs
export async function GET() {
  try {
    const fileContent = await readFile(DATA_FILE_PATH, 'utf-8');
    const data: CourseInputsData = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading course inputs:', error);
    return NextResponse.json(
      { error: 'Failed to read course inputs' },
      { status: 500 }
    );
  }
}

// POST - Add a new course input
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseName, mockupUrl, htmlBlocks } = body;

    if (!courseName || !courseName.trim()) {
      return NextResponse.json(
        { error: 'Course name is required' },
        { status: 400 }
      );
    }

    // Read existing data
    let data: CourseInputsData;
    try {
      const fileContent = await readFile(DATA_FILE_PATH, 'utf-8');
      data = JSON.parse(fileContent);
    } catch {
      // If file doesn't exist or is invalid, create new structure
      data = { courses: [] };
    }

    // Create new course input
    const newCourse: CourseInput = {
      id: Date.now().toString(),
      courseName: courseName.trim(),
      mockupUrl: mockupUrl?.trim() || '',
      htmlBlocks: htmlBlocks?.trim() || '',
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Add to array
    data.courses.push(newCourse);

    // Write back to file
    await writeFile(
      DATA_FILE_PATH,
      JSON.stringify(data, null, 2),
      'utf-8'
    );

    return NextResponse.json({
      success: true,
      course: newCourse,
      message: `Course "${courseName}" saved successfully!`,
    });
  } catch (error) {
    console.error('Error saving course input:', error);
    return NextResponse.json(
      { error: 'Failed to save course input' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a course input by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    // Read existing data
    const fileContent = await readFile(DATA_FILE_PATH, 'utf-8');
    const data: CourseInputsData = JSON.parse(fileContent);

    // Filter out the course to delete
    const originalLength = data.courses.length;
    data.courses = data.courses.filter((c) => c.id !== id);

    if (data.courses.length === originalLength) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Write back to file
    await writeFile(
      DATA_FILE_PATH,
      JSON.stringify(data, null, 2),
      'utf-8'
    );

    return NextResponse.json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting course input:', error);
    return NextResponse.json(
      { error: 'Failed to delete course input' },
      { status: 500 }
    );
  }
}
