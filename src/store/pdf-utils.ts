import { LineCapStyle, PDFDocument, PDFFont, ReadingDirection, rgb } from 'pdf-lib';
import * as fontkit from 'fontkit';
import { QuestionnairesSummary } from './types';

const BODY_FONT_SIZE = 10;
const SUBTITLE_FONT_SIZE = 14;
const TITLE_FONT_SIZE = 20;

type PersonalDetailsSummary = { [key: string]: string | undefined };

export const exportToPdf = async (questionnairesSummary: QuestionnairesSummary,
                                  personalDetailsSummary?: PersonalDetailsSummary) => {
  const { pdfDoc, font, getAdjustedXPosition, boldFont, getBoldAdjustedXPosition, page } = await _createPdf();
  const { height, width } = page.getSize()

  const title = 'סיכום שאלוני אבחון פוסט־טראומה';
  const { indigo, gray, lightRed, lightGreen } = getColors();

  //Columns:
  const horizontalMargin = 30;
  const firstColumnX = width - horizontalMargin;
  const secondColumnX = 420;
  const thresholdColumnX = 340;
  const rangeColumnX = 250;
  const tableEndx = horizontalMargin;

  // Rows:
  const verticalMargin = 50;
  const dateRowY = height - verticalMargin;
  const titleRowY = dateRowY - TITLE_FONT_SIZE - BODY_FONT_SIZE;
  const tableHeaderRowY = titleRowY - 3 * BODY_FONT_SIZE;
  const tableHeaderLineY = tableHeaderRowY - BODY_FONT_SIZE;
  const tableRowsY = tableHeaderLineY - 2 * BODY_FONT_SIZE;

  const footerRowY = verticalMargin;
  const footerLineY = footerRowY + 2 * BODY_FONT_SIZE;


  const hebrewDate = new Date().toLocaleDateString('HE');
  page.drawText(hebrewDate, {
    x: horizontalMargin,
    y: dateRowY,
    size: BODY_FONT_SIZE,
    font,
  })

  page.drawText(title, {
    x: width / 2 - boldFont.widthOfTextAtSize(title, TITLE_FONT_SIZE) / 2,
    y: titleRowY,
    size: TITLE_FONT_SIZE,
    font: boldFont,
    color: indigo,
  })

  page.drawText('שם השאלון', {
    x: getBoldAdjustedXPosition(firstColumnX, 'שם השאלון', SUBTITLE_FONT_SIZE),
    y: tableHeaderRowY,
    size: SUBTITLE_FONT_SIZE,
    font: boldFont,
  });
  page.drawText('הציון שלי', {
    x: getBoldAdjustedXPosition(secondColumnX, 'הציון שלי', SUBTITLE_FONT_SIZE),
    y: tableHeaderRowY,
    size: SUBTITLE_FONT_SIZE,
    font: boldFont,
  });
  page.drawText('טווח תקין', {
    x: getBoldAdjustedXPosition(thresholdColumnX, 'טווח תקין', SUBTITLE_FONT_SIZE),
    y: tableHeaderRowY,
    size: SUBTITLE_FONT_SIZE,
    font: boldFont,
  });
  page.drawText('טווח תוצאות', {
    x: getBoldAdjustedXPosition(rangeColumnX, 'טווח תוצאות', SUBTITLE_FONT_SIZE),
    y: tableHeaderRowY,
    size: SUBTITLE_FONT_SIZE,
    font: boldFont,
  });
  page.drawLine({
    start: { x: horizontalMargin, y: tableHeaderLineY },
    end: { x: firstColumnX, y: tableHeaderLineY },
    thickness: 2,
    color: indigo,
  });
  let extraYSpace = 0
  const lineTotalWidth = rangeColumnX - 50 - tableEndx;
  questionnairesSummary.forEach((summary, index) => {
    page.drawText(summary.questionnaireName, {
      x: getBoldAdjustedXPosition(firstColumnX, summary.questionnaireName, BODY_FONT_SIZE),
      y: tableRowsY - (index * 2 * BODY_FONT_SIZE),
      size: BODY_FONT_SIZE,
      font: boldFont,
    });
    if (typeof summary.score === 'number') {
      const thresholdRange = `${summary.threshold} - ${summary.minScore}`;
      page.drawText(thresholdRange, {
        x: getAdjustedXPosition(thresholdColumnX, thresholdRange, BODY_FONT_SIZE),
        y: tableRowsY - (index * 2 * BODY_FONT_SIZE),
        size: BODY_FONT_SIZE,
        font    });

      const underThresholdPercentage = (summary.threshold - summary.minScore) / (summary.maxScore - summary.minScore);
      const overThresholdPercentage = (summary.maxScore - summary.threshold) / (summary.maxScore - summary.minScore);
      const underThresholdLineWidth = lineTotalWidth * underThresholdPercentage;
      const overThresholdLineWidth = lineTotalWidth * overThresholdPercentage;
      page.drawText(summary.minScore.toString(), {
        x: getAdjustedXPosition(rangeColumnX, summary.minScore.toString(), BODY_FONT_SIZE),
        y: tableRowsY - (index * 2 * BODY_FONT_SIZE),
        size: BODY_FONT_SIZE,
        font,
      });
      const rangeSliderStartX = rangeColumnX - 20;
      // under threshold line
      const underThresholdLineStart = rangeSliderStartX - underThresholdLineWidth;
      const rangeSlideY = tableRowsY - (index * 2 * BODY_FONT_SIZE) + 3;
      page.drawLine({
        start: { x: underThresholdLineStart, y: rangeSlideY },
        end: { x: rangeSliderStartX ,y: rangeSlideY },
        thickness: 3,
        color: lightGreen,
        lineCap: LineCapStyle.Round,
      });
      // over threshold line
      const overThresholdLineStart = underThresholdLineStart - overThresholdLineWidth - 4;
      page.drawLine({
        start: { x: overThresholdLineStart, y: rangeSlideY },
        end: { x: underThresholdLineStart - 4 ,y: rangeSlideY },
        thickness: 3,
        color: lightRed,
        lineCap: LineCapStyle.Round,
      });
      page.drawText(summary.maxScore.toString(), {
        x: getAdjustedXPosition(overThresholdLineStart - 8, summary.maxScore.toString(), BODY_FONT_SIZE),
        y: tableRowsY - (index * 2 * BODY_FONT_SIZE),
        size: BODY_FONT_SIZE,
        font,
      });

      // vertical score line
      const scoreLineWidth = (lineTotalWidth + 4) * (summary.score - summary.minScore) / (summary.maxScore - summary.minScore);
      page.drawCircle({
        x: rangeSliderStartX - scoreLineWidth,
        y: rangeSlideY,
        size: 3,
        color: gray,
      });
    }
    const lines = _breakLines(summary.score.toString());
    lines.forEach((line, lineIndex) => {
      page.drawText(line, {
        x: getAdjustedXPosition(secondColumnX, line, BODY_FONT_SIZE),
        y: tableRowsY - (index * 2 * BODY_FONT_SIZE),
        size: BODY_FONT_SIZE,
        font,
      });
    });
    extraYSpace += lines.length * BODY_FONT_SIZE * 2
  });

  page.drawLine({
    start: { x: horizontalMargin, y: footerLineY },
    end: { x: firstColumnX, y: footerLineY },
    thickness: 2,
    color: indigo,
  });
  const footerText = 'סיכום זה הופק באמצעות כלי האבחון המקוון שפותח ע"י המועצה הישראלית לפוסט־טראומה';
  page.drawText(footerText, {
    x: width / 2 - font.widthOfTextAtSize(footerText, BODY_FONT_SIZE) / 2,
    y: footerRowY,
    size: BODY_FONT_SIZE,
    font,
  });

  if (personalDetailsSummary) {

    const personalDetailsHeaderY = tableRowsY - extraYSpace - 2 * BODY_FONT_SIZE;
    const personalDetailsLineY = personalDetailsHeaderY - BODY_FONT_SIZE
    const personalDetailsRowY = personalDetailsLineY - 2 * BODY_FONT_SIZE;

    const personalDetailsTitle = 'פרטים אישיים:';
    page.drawText(personalDetailsTitle, {
      x: getBoldAdjustedXPosition(firstColumnX, personalDetailsTitle, SUBTITLE_FONT_SIZE),
      y: personalDetailsHeaderY,
      size: SUBTITLE_FONT_SIZE,
      font: boldFont,
    });
    page.drawLine({
      start: { x: horizontalMargin, y: personalDetailsLineY },
      end: { x: firstColumnX, y: personalDetailsLineY },
      thickness: 2,
      color: indigo,
    });
    Object.entries(personalDetailsSummary).forEach(([key, value], index) => {
      page.drawText(key, {
        x: getBoldAdjustedXPosition(firstColumnX, key, BODY_FONT_SIZE),
        y: personalDetailsRowY - (index * 2 * BODY_FONT_SIZE),
        size: BODY_FONT_SIZE,
        font: boldFont,
      });
      const lines = _breakLines(value ?? '');
      lines.forEach((line, lineIndex) => {
        page.drawText(line, {
          x: getAdjustedXPosition(secondColumnX, line, BODY_FONT_SIZE),
          y: personalDetailsRowY - (((index * 2) + lineIndex) * BODY_FONT_SIZE),
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

const getColors = () => {
  const indigo = rgb(0.357, 0.373, 0.78);
  const gray = rgb(0.4, 0.4, 0.4);
  const lightRed = rgb(0.96, 0.55, 0.55);
  const lightGreen = rgb(0.8, 0.9, 0.75);
  return { indigo, gray, lightRed, lightGreen };
};

const _breakLines = (text: string, maxLineLength = 80) => {
  const lines: string[] = [];
  let line = '';
  text.replaceAll('\n', ' ').split(' ').forEach(word => {
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
  const regularFontBinary = await fetch('Rubik-Regular.ttf').then(res => res.arrayBuffer())
  const boldFontBinary = await fetch('Rubik-Bold.ttf').then(res => res.arrayBuffer())
  const font = await pdfDoc.embedFont(regularFontBinary);
  const boldFont = await pdfDoc.embedFont(boldFontBinary);
  const getAdjustedXPosition = _getFontPositionAdjuster(font);
  const getBoldAdjustedXPosition = _getFontPositionAdjuster(boldFont);
  const viewerPrefs = pdfDoc.catalog.getOrCreateViewerPreferences();
  viewerPrefs.setReadingDirection(ReadingDirection.R2L)
  const page = pdfDoc.addPage()

  return { pdfDoc, font, getAdjustedXPosition, boldFont, getBoldAdjustedXPosition, page };
};
