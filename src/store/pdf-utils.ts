import { LineCapStyle, PDFDocument, PDFFont, ReadingDirection, rgb } from 'pdf-lib';
import * as fontkit from 'fontkit';
import { QuestionnairesSummary } from './types';

const BODY_FONT_SIZE = 10;
const SUBTITLE_FONT_SIZE = 14;
const TITLE_FONT_SIZE = 20;

type PersonalDetailsSummary = { [key: string]: string | undefined };

export const exportToPdf = async (questionnairesSummary: QuestionnairesSummary,
                                  resultsVerbalSummary: string,
                                  symptoms: string | null,
                                  personalDetailsSummary?: PersonalDetailsSummary) => {
  const { pdfDoc, font, getAdjustedXPosition, boldFont, getBoldAdjustedXPosition, page } = await _createPdf();
  const { height, width } = page.getSize()

  const title = 'סיכום שאלוני אבחון פוסט־טראומה';
  const { indigo, gray, lightRed, lightGreen } = getColors();

  //Columns:
  const horizontalMargin = 30;
  const firstColumnWidth = 140;
  const secondColumnWidth = 80;
  const thirdColumnWidth = 80;
  const firstColumnX = width - horizontalMargin;
  const secondColumnX = firstColumnX - firstColumnWidth;
  const thirdColumnX = secondColumnX - secondColumnWidth;
  const rangeColumnX = thirdColumnX - thirdColumnWidth;
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
    x: getBoldAdjustedXPosition(thirdColumnX, 'טווח תקין', SUBTITLE_FONT_SIZE),
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
  let lastLineY = tableRowsY - (questionnairesSummary.length * BODY_FONT_SIZE) + 3;
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
        x: getAdjustedXPosition(thirdColumnX, thresholdRange, BODY_FONT_SIZE),
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
    const lines = _breakLines(summary.score.toString(), font, BODY_FONT_SIZE, width - secondColumnX - horizontalMargin);
    lines.forEach((line, lineIndex) => {
      page.drawText(line, {
        x: getAdjustedXPosition(secondColumnX, line, BODY_FONT_SIZE),
        y: tableRowsY - (index * 2 * BODY_FONT_SIZE),
        size: BODY_FONT_SIZE,
        font,
      });
    });
    lastLineY -= lines.length * BODY_FONT_SIZE;
  });

  page.drawLine({
    start: { x: horizontalMargin, y: footerLineY },
    end: { x: firstColumnX, y: footerLineY },
    thickness: 2,
    color: indigo,
  });

  const recommendationsTitleY = lastLineY - 2 * BODY_FONT_SIZE;
  const recommendationsLineY = recommendationsTitleY - BODY_FONT_SIZE
  const recommendationsSubtitleY = recommendationsLineY - 2 * BODY_FONT_SIZE;

  const recommendationsTitle = 'סיכום והמלצות:';
  page.drawText(recommendationsTitle, {
    x: getBoldAdjustedXPosition(firstColumnX, recommendationsTitle, SUBTITLE_FONT_SIZE),
    y: recommendationsTitleY,
    size: SUBTITLE_FONT_SIZE,
    font: boldFont,
  });
  page.drawLine({
    start: { x: horizontalMargin, y: recommendationsLineY },
    end: { x: firstColumnX, y: recommendationsLineY },
    thickness: 2,
    color: indigo,
  });

  let recommendationsRowY = recommendationsSubtitleY;
  if (symptoms) {
    const recommendationsSubtitle = 'כפי שניתן לראות בטבלה דיווחת על רמות מצוקה גבוהות בכמה אזורים, ובהם: ' + symptoms + '.';
    const symptomsLines = _breakLines(recommendationsSubtitle, font, BODY_FONT_SIZE, width - 2 * horizontalMargin);
    symptomsLines.forEach((line, lineIndex) => {
      page.drawText(line, {
        x: getAdjustedXPosition(firstColumnX, line, BODY_FONT_SIZE),
        y: recommendationsSubtitleY - (lineIndex * 1.3 * BODY_FONT_SIZE),
        size: BODY_FONT_SIZE,
        font,
      });
    });
    recommendationsRowY = recommendationsSubtitleY - symptomsLines.length * 1.3 * BODY_FONT_SIZE;
  }
  let lastRecommendationLineY = recommendationsRowY;
  const recommendationsLines = _breakLines(resultsVerbalSummary, font, BODY_FONT_SIZE, width - 2 * horizontalMargin);
  recommendationsLines.forEach((line, lineIndex) => {
    page.drawText(line, {
      x: getAdjustedXPosition(firstColumnX, line, BODY_FONT_SIZE),
      y: recommendationsRowY - (lineIndex * 1.3 * BODY_FONT_SIZE),
      size: BODY_FONT_SIZE,
      font,
    });
  });
  lastRecommendationLineY -= recommendationsLines.length * 1.3 * BODY_FONT_SIZE;

  if (personalDetailsSummary) {
    const personalDetailsHeaderY = lastRecommendationLineY - 2 * BODY_FONT_SIZE;
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
      const lines = _breakLines(value ?? '', font, BODY_FONT_SIZE, width - secondColumnX);
      lines.forEach((line, lineIndex) => {
        page.drawText(line, {
          x: getAdjustedXPosition(secondColumnX, line, BODY_FONT_SIZE),
          y: personalDetailsRowY - (((index * 2) + lineIndex) * BODY_FONT_SIZE),
          size: BODY_FONT_SIZE,
          font,
        });
      });
    });
  }

  const footerText = 'סיכום זה הופק באמצעות כלי האבחון המקוון שפותח ע"י המועצה הישראלית לפוסט־טראומה';
  page.drawText(footerText, {
    x: width / 2 - font.widthOfTextAtSize(footerText, BODY_FONT_SIZE) / 2,
    y: footerRowY,
    size: BODY_FONT_SIZE,
    font,
  });

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

const _breakLines = (text: string, font:PDFFont, fontSize: number, maxLineLength = 80) => {
  const lines: string[] = [];
  const paragraphs = text.split('\n');
  paragraphs.forEach(paragraph => {
    const paragraphLines = _breakParagraph(paragraph, font, fontSize, maxLineLength);
    lines.push(...paragraphLines);
  });
  return lines;
}

const _breakParagraph = (text: string, font:PDFFont, fontSize: number, maxLineLength = 80) => {
  const lines: string[] = [];
  let line = '';
  text.split(' ').forEach(word => {
    if (font.widthOfTextAtSize(line + word, fontSize) > maxLineLength) {
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
