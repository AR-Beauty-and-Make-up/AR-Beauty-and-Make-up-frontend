
import React, { useState, createContext } from 'react'

export const LanguageContext = createContext()

export const LanguageProvider = props => {

    const [language, setLanguage] =  useState('esp')

    return (
        <LanguageContext.Provider value={[language, setLanguage]}>
            {props.children}
        </LanguageContext.Provider>

    )
}