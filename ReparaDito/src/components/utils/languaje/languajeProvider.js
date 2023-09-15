import React, { createContext, useState } from 'react';
import * as Localization from 'expo-localization';
// import i18n from  'i18n-js'
import { strings } from './stringsLanguaje';

export const LanguajeContext = createContext();
//  console.log("LocalizationContext",LocalizationContext)
export function LanguajeProvider(props) {
   const currentLocale = Localization.locale;
   
   const [locale, setLocale] = useState(currentLocale.substr(0,2));
  //  console.log("locale---->",locale)
   const StringsLanguaje = strings[locale];
  //  console.log("localizedStrings",localizedStrings)
  const toggleLanguaje = () => {
    if (locale=== 'es')
    setLocale('en')
    else 
    setLocale('es')
  };


  return (
    <LanguajeContext.Provider value={{ locale,  StringsLanguaje,toggleLanguaje }}>
      {props.children}
    </LanguajeContext.Provider>
  );
}
