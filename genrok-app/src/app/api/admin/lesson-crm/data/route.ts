import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'lesson-crm-data.json');

interface CRMData {
  selections: {
    [lessonSlug: string]: {
      [slideIndex: string]: string; // componentId
    };
  };
  images: {
    [key: string]: string; // lessonSlug-slideIndex -> imageUrl
  };
  lastUpdated: string;
}

// Initialize empty data
const getEmptyData = (): CRMData => ({
  selections: {},
  images: {},
  lastUpdated: new Date().toISOString(),
});

// GET - Read current CRM data
export async function GET() {
  try {
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    const data = JSON.parse(content) as CRMData;
    return NextResponse.json(data);
  } catch {
    // File doesn't exist, return empty data
    return NextResponse.json(getEmptyData());
  }
}

// POST - Save CRM data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data: CRMData = {
      selections: body.selections || {},
      images: body.images || {},
      lastUpdated: new Date().toISOString(),
    };

    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Failed to save CRM data:', error);
    return NextResponse.json(
      { error: 'Failed to save data', details: String(error) },
      { status: 500 }
    );
  }
}

// PATCH - Update specific selection or image
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, lessonSlug, slideIndex, value } = body;

    // Read current data
    let data: CRMData;
    try {
      const content = await fs.readFile(DATA_FILE, 'utf-8');
      data = JSON.parse(content);
    } catch {
      data = getEmptyData();
    }

    if (type === 'selection') {
      if (!data.selections[lessonSlug]) {
        data.selections[lessonSlug] = {};
      }
      data.selections[lessonSlug][slideIndex] = value;
    } else if (type === 'image') {
      const key = `${lessonSlug}-${slideIndex}`;
      if (value) {
        data.images[key] = value;
      } else {
        delete data.images[key];
      }
    }

    data.lastUpdated = new Date().toISOString();
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Failed to update CRM data:', error);
    return NextResponse.json(
      { error: 'Failed to update data', details: String(error) },
      { status: 500 }
    );
  }
}
