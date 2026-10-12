import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const IMAGE_MAP: Record<string, string> = {
  rose: 'rose_stem_1791787014014.jpg',
  gerbera: 'gerbera_stem_1791787039026.jpg',
  orchid: 'orchid_stem_1791787074758.jpg',
  lily: 'lily_stem_1791787097952.jpg',
  carnation: 'carnation_stem_1791787125144.jpg',
  sunflower: 'sunflower_stem_1791787151239.jpg',
}

const ARTIFACT_DIR = 'C:\\Users\\ACER\\.gemini\\antigravity\\brain\\8b959601-636a-495a-9e76-d184f47646b0'
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images', 'exquisite')

export async function GET(
  request: Request,
  context: { params: { name: string } | Promise<{ name: string }> }
) {
  const resolvedParams = await context.params
  const rawParam = resolvedParams.name.toLowerCase().replace(/\.jpg$/, '').replace(/\.png$/, '')
  const matchedKey = Object.keys(IMAGE_MAP).find(k => rawParam === k || rawParam.startsWith(k))
  const filename = matchedKey ? IMAGE_MAP[matchedKey] : null

  if (!filename) {
    return new NextResponse('Image not found', { status: 404 })
  }

  try {
    const publicPath = path.join(PUBLIC_DIR, `${matchedKey}.jpg`)
    if (fs.existsSync(publicPath)) {
      const buffer = fs.readFileSync(publicPath)
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }

    const artifactPath = path.join(ARTIFACT_DIR, filename)
    if (fs.existsSync(artifactPath)) {
      const buffer = fs.readFileSync(artifactPath)

      try {
        if (!fs.existsSync(PUBLIC_DIR)) {
          fs.mkdirSync(PUBLIC_DIR, { recursive: true })
        }
        fs.writeFileSync(publicPath, buffer)
      } catch (err) {
      }

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }

    return new NextResponse('File missing on disk', { status: 404 })
  } catch (error) {
    console.error('Error serving flower image:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
