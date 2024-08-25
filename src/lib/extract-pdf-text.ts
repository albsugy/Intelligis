'use server';

import { revalidatePath } from 'next/cache';
import PDFParser from 'pdf2json';

type ExtractResult = {
  success: boolean;
  text?: string;
  error?: string;
};

export async function uploadAndExtractPDF(
  formData: FormData,
): Promise<ExtractResult> {
  const file = formData.get('pdfFile') as File | null;
  if (!file) {
    return { success: false, error: 'No file uploaded' };
  }

  if (file.type !== 'application/pdf') {
    return { success: false, error: 'Uploaded file is not a PDF' };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pdfParser = new PDFParser(null, true);

    const extractedText = await new Promise<string>((resolve, reject) => {
      pdfParser.on('pdfParser_dataError', (errData: any) =>
        reject(errData.parserError),
      );
      pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
        const text = pdfParser.getRawTextContent();
        resolve(text);
      });

      pdfParser.parseBuffer(buffer);
    });

    revalidatePath('/');

    return { success: true, text: extractedText };
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return { success: false, error: 'Failed to extract text from PDF' };
  }
}
