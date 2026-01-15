export type FieldType = 'text' | 'textarea' | 'color' | 'image' | 'url' | 'number';

export interface CustomizableField {
  id: string;
  label: string;
  type: FieldType;
  defaultValue: string;
  placeholder?: string;
}

export interface Section {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  fields: CustomizableField[];
  generateHtml: (values: Record<string, string>) => string;
}

export interface SectionCategory {
  id: string;
  name: string;
  count: number;
}
