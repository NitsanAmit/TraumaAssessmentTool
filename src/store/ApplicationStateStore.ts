import { computed, makeAutoObservable } from 'mobx';
import { PDFDocument, ReadingDirection, rgb } from 'pdf-lib';
import { PersonalDetailsStore } from './PersonalDetailsStore';
import { QuestionnairesStore } from './QuestionnairesStore';
import * as fontkit from 'fontkit';

export enum APPLICATION_STEP {
  WELCOME = 'WELCOME',
  PERSONAL_DETAILS = 'PERSONAL_DETAILS',
  QUESTIONNAIRES = 'QUESTIONNAIRES',
  SUMMARY = 'SUMMARY',
}

const APPLICATION_STEPS = [
  APPLICATION_STEP.WELCOME,
  APPLICATION_STEP.PERSONAL_DETAILS,
  APPLICATION_STEP.QUESTIONNAIRES,
  APPLICATION_STEP.SUMMARY,
];

export class ApplicationStateStore {

  personalDetailsStore: PersonalDetailsStore;

  questionnairesStore: QuestionnairesStore;

  step: APPLICATION_STEP = APPLICATION_STEP.WELCOME;

  constructor() {
    makeAutoObservable(this)
    this.personalDetailsStore = new PersonalDetailsStore();
    this.questionnairesStore = new QuestionnairesStore(this.next.bind(this));
  }

  @computed
  get stepDisplayName() {
    switch (this.step) {
      case APPLICATION_STEP.WELCOME:
        return 'התחלה';
      case APPLICATION_STEP.PERSONAL_DETAILS:
        return 'פרטים אישיים';
      case APPLICATION_STEP.QUESTIONNAIRES:
        return this.questionnairesStore.stepDisplayName;
      case APPLICATION_STEP.SUMMARY:
        return 'סיכום';
      default:
        return '';
    }
  }

  back() {
    if (this.step === APPLICATION_STEP.QUESTIONNAIRES && this.questionnairesStore.questionnaireIndex !== 0) {
      this.questionnairesStore.previousQuestion();
    } else {
      const currentIndex = APPLICATION_STEPS.indexOf(this.step);
      this.step = APPLICATION_STEPS[currentIndex - 1];
    }
  }

  next() {
    const currentIndex = APPLICATION_STEPS.indexOf(this.step);
    this.step = APPLICATION_STEPS[currentIndex + 1];
  }

  async exportToPdf(includePersonalDetails: boolean) {
    const fontBinary = await fetch('Arial.ttf').then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.create()
    pdfDoc.registerFontkit(fontkit);
    const hebrewFont = await pdfDoc.embedFont(fontBinary);
    const viewerPrefs = pdfDoc.catalog.getOrCreateViewerPreferences();
    viewerPrefs.setReadingDirection(ReadingDirection.R2L)

    const page = pdfDoc.addPage()
    const { height, width } = page.getSize()
    const fontSize = 10;
    // table of this.questionnairesStore.summary
    const title = 'סיכום הערכת פוסט טראומה';
    const titleFontSize = fontSize + 10;
    page.drawText(title, {
      x: width / 2 - hebrewFont.widthOfTextAtSize(title, titleFontSize) / 2,
      y: height - 4 * fontSize,
      size: titleFontSize,
      font: hebrewFont,
      color: rgb(0.357, 0.373, 0.78),
    })

    page.drawText('שם השאלון', {
      x: 30,
      y: height - 8 * fontSize,
      size: fontSize + 4,
      font: hebrewFont,
      color: undefined,
    });
    page.drawText('ציון', {
      x: 300,
      y: height - 8 * fontSize,
      size: fontSize + 4,
      font: hebrewFont,
      color: undefined,
    });
    page.drawLine({
      start: { x: 30, y: height - 9 * fontSize },
      end: { x: width - 30, y: height - 9 * fontSize },
      thickness: 2,
      color: rgb(0.357, 0.373, 0.78),
    });
    this.questionnairesStore.summary.forEach((summary, index) => {
      page.drawText(summary.questionnaireName, {
        x: 30,
        y: height - (11 + index*2) * fontSize,
        size: fontSize,
        font: hebrewFont,
        color: undefined,
      });
      page.drawText(summary.score.toString(), {
        x: 300,
        y: height - (11 + index*2) * fontSize,
        size: fontSize,
        font: hebrewFont,
        color: undefined,
      });
    });

    if (includePersonalDetails) {
      page.drawText('פרטים אישיים:', {
        x: 30,
        y: height - (16 + this.questionnairesStore.summary.length * 2) * fontSize,
        size: fontSize + 4,
        font: hebrewFont,
        color: undefined,
      });
    }

    const pdfBytes = await pdfDoc.save();
    // prompt to download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'summary.pdf';
    link.click();
  }
}
