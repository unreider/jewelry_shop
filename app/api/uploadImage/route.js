// import { NextResponse } from 'next/server';
// import path from 'path';
// import { writeFile } from 'fs/promises';

// export async function POST(request) {
//   const data = await request.formData()
//   const file = data.get('file')
//   const imageFileName = data.get('imageFileName')

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const serverDirectory = path.resolve("public/uploads");
//   const serverPath = path.join(serverDirectory, imageFileName);

//   await writeFile(serverPath, buffer);
//   console.log(`open ${serverPath} to see the uploaded file`);

//   if (!file)
//     return NextResponse.json({ success: false })
//   return NextResponse.json({ success: true })
// }


import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  const file = await request.blob();
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const result = await put(filename, buffer, {
      access: 'public',
      contentType: file.type,
    });
    console.log('result', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
