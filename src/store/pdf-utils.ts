import { PDFDocument, PDFFont, ReadingDirection, rgb } from 'pdf-lib';
import * as fontkit from 'fontkit';

const BODY_FONT_SIZE = 10;
const SUBTITLE_FONT_SIZE = 14;
const TITLE_FONT_SIZE = 20;

type QuestionnairesSummary = { questionnaireName: string; questionnaireType: string; score: number; }[];
type PersonalDetailsSummary = { [key: string]: string | undefined };

export const exportToPdf = async (questionnairesSummary: QuestionnairesSummary,
                                  personalDetailsSummary?: PersonalDetailsSummary) => {
  const { pdfDoc, font, getAdjustedXPosition, page } = await _createPdf();
  const { height, width } = page.getSize()

  const title = 'סיכום הערכת פוסט טראומה';
  const indigo = rgb(0.357, 0.373, 0.78);
  page.drawText(title, {
    x: width / 2 - font.widthOfTextAtSize(title, TITLE_FONT_SIZE) / 2,
    y: height - 4 * BODY_FONT_SIZE,
    size: TITLE_FONT_SIZE,
    font,
    color: indigo,
  })

  page.drawText('שם השאלון', {
    x: getAdjustedXPosition(width - 30, 'שם השאלון', SUBTITLE_FONT_SIZE),
    y: height - 8 * BODY_FONT_SIZE,
    size: SUBTITLE_FONT_SIZE,
    font,
  });
  page.drawText('ציון', {
    x: getAdjustedXPosition(400, 'ציון', SUBTITLE_FONT_SIZE),
    y: height - 8 * BODY_FONT_SIZE,
    size: SUBTITLE_FONT_SIZE,
    font,
  });
  page.drawLine({
    start: { x: 30, y: height - 9 * BODY_FONT_SIZE },
    end: { x: width - 30, y: height - 9 * BODY_FONT_SIZE },
    thickness: 2,
    color: indigo,
  });
  let extraYSpace = 0
  questionnairesSummary.forEach((summary, index) => {
    page.drawText(summary.questionnaireName, {
      x: getAdjustedXPosition(width - 30, summary.questionnaireName, BODY_FONT_SIZE),
      y: height - (11 + index * 2) * BODY_FONT_SIZE,
      size: BODY_FONT_SIZE,
      font,
    });
    const lines = _breakLines(summary.score.toString());
    lines.forEach((line, lineIndex) => {
      page.drawText(line, {
        x: getAdjustedXPosition(400, line, BODY_FONT_SIZE),
        y: height - (11 + index * 2 + lineIndex) * BODY_FONT_SIZE,
        size: BODY_FONT_SIZE,
        font,
      });
    });
    extraYSpace += lines.length * BODY_FONT_SIZE * 2
  });

  if (personalDetailsSummary) {
    // table of this.personalDetailsStore.summary
    const personalDetailsTitle = 'פרטים אישיים:';
    const personalDetailsTitleFontSize = BODY_FONT_SIZE + 5;
    page.drawText(personalDetailsTitle, {
      x: getAdjustedXPosition(width - 30, personalDetailsTitle, personalDetailsTitleFontSize),
      y: height - 12 * BODY_FONT_SIZE - extraYSpace,
      size: personalDetailsTitleFontSize,
      font,
    });
    Object.entries(personalDetailsSummary).forEach(([key, value], index) => {
      page.drawText(key, {
        x: getAdjustedXPosition(width - 30, key, BODY_FONT_SIZE),
        y: height - (15 + index) * BODY_FONT_SIZE - extraYSpace,
        size: BODY_FONT_SIZE,
        font,
      });
      const lines = _breakLines(value ?? '');
      lines.forEach((line, lineIndex) => {
        page.drawText(line, {
          x: getAdjustedXPosition(400, line, BODY_FONT_SIZE),
          y: height - (15 + index + lineIndex) * BODY_FONT_SIZE - extraYSpace,
          size: BODY_FONT_SIZE,
          font,
        });
      });
      extraYSpace += lines.length * BODY_FONT_SIZE;
    });
  }

  const pdfBytes = await pdfDoc.save();
  _download(pdfBytes);
}
const _getFontPositionAdjuster = (font: PDFFont) => {
  return (x: number, text: string, size: number) => _getAdjustedXPosition(x, text, size, font);
}

const _getAdjustedXPosition = (x: number, text: string, size: number, font: PDFFont) => {
  return x - font.widthOfTextAtSize(text, size);
}

const _breakLines = (text: string, maxLineLength = 80) => {
  const lines: string[] = [];
  let line = '';
  text.split(' ').forEach(word => {
    if (line.length + word.length > maxLineLength) {
      lines.push(line);
      line = '';
    }
    line += `${word} `;
  });
  lines.push(line);
  return lines;
}

const _download = (pdfBytes: Uint8Array) => {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'summary.pdf';
  link.click();
};

const _createPdf = async () => {
  const pdfDoc = await PDFDocument.create()
  pdfDoc.registerFontkit(fontkit);
  const fontBinary = await fetch('Arial.ttf').then(res => res.arrayBuffer())
  const font = await pdfDoc.embedFont(fontBinary);
  const getAdjustedXPosition = _getFontPositionAdjuster(font);
  const viewerPrefs = pdfDoc.catalog.getOrCreateViewerPreferences();
  viewerPrefs.setReadingDirection(ReadingDirection.R2L)
  const page = pdfDoc.addPage()

  return { pdfDoc, font, getAdjustedXPosition, page };
};
