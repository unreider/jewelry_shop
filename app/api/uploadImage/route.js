import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';

export async function POST(request) {
  const data = await request.formData()
  const file = data.get('file')
  const imageFileName = data.get('imageFileName')

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const serverDirectory = path.resolve("public/uploads");
  const serverPath = path.join(serverDirectory, imageFileName);

  await writeFile(serverPath, buffer);
  console.log(`open ${serverPath} to see the uploaded file`);

  if (!file)
    return NextResponse.json({ success: false })
  return NextResponse.json({ success: true })
}