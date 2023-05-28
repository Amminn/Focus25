import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          nav: {
            note: "Note"
          },
          title: 'Focus Time',
          totalFocus: "Total Focus",
          progressFocus: "Focus",
          progressBreak: "Break",
          note: {
            title: 'Write your last idea to not forget',
            placeholder: 'Boost Your Productivity now...'
          },
          beginBtn: {
            start: "Start",
            reset: "Reset"
          },
          controlBtn: {
            pause: "Pause",
            play: "Start",
            skip: "Skip",
            stop: "Stop",
            quit: "Quit"
          }
        }
      },
      fr: {
        translation: {
          nav: {
            note: "Note"
          },
          title: 'Temps de concentration',
          totalFocus: "Concentration Totale",
          progressFocus: "Concentration",
          progressBreak: "Repos",
          note: {
            title: 'Augmentez votre productivité maintenant',
            placeholder: 'Augmentez votre productivité maintenant...'
          },
          beginBtn: {
            start: "Commencer",
            reset: "Repos"
          },
          controlBtn: {
            pause: "Pause",
            play: "Jouer",
            skip: "Passer",
            stop: "Stop",
            quit: "Quitter"
          }
        }
      },
      ar: {
        translation: {
          nav: {
            note: "مذكرة "
          },
          title: 'وقت التركيز',
          totalFocus: "أجمالي التركيز",
          progressFocus: "تركيز",
          progressBreak: "استراحة",
          note: {
            title: 'ثبّت آخر أفكارك لضمان عدم النسيان',
            placeholder: 'قم بزيادة إنتاجيتك الآن'
          },
          beginBtn: {
            start: "بدء",
            reset: "إعادة ضبط"
          },
          controlBtn: {
            pause: "توقف",
            play: "تشغيل",
            skip: "تخطى",
            stop: "إيقاف",
            quit: "خروج"
          }
        }
      },

    }
  });

export default i18n;