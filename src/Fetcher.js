import React, { useState, useEffect } from "react"

export function Fetcher() {
    const [state, setState] = useState({
        lista: [],
        dettaglio: {},
        selectedCity: ""
    })

    useEffect(() => {
        (async () => {
            const cities = await fetch('https://comuni-istat-api.herokuapp.com/api/comuni/codici')
            const res = await cities.json()
            const citiesArray = Object.entries(res) // Francesco non esisti

            setState(prevState => ({
                ...prevState,
                lista: citiesArray}))
        })()

    }, [])

    function handle(e) {
        setState(prevState => ({
            ...prevState,
            selectedCity: e.target.name}))
    }

    useEffect(() => {
        (async () => {
            const cities = await fetch(`https://comuni-istat-api.herokuapp.com/api/comune/${state.selectedCity}`)
            const res = await cities.json()

        setState(prevState => ({
            ...prevState,
            dettaglio: res}))
        })()
    }, [state.selectedCity]);

      return (
        <>
        <div className="container flex w-full p-5">
            <ul className="mx-5 w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {state.lista.map(e => <li className="flex justify-between py-2 px-4 w-full text-white bg-blue-700 rounded-t-lg border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600" key={e[1]}>{e[0]} <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" name={e[1]} onClick={handle}>Dettaglio</button></li>)}
            </ul>
            <div className="w-full text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <button type="button" className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                    <svg aria-hidden="true" className="mr-2 w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
                    Nome Comune: {state.dettaglio.denominazione_in_italiano}
                </button>
                <button type="button" className="w-full inline-flex relative items-center py-2 px-4 selection:text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                    <svg aria-hidden="true" className="mr-2 w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>
                    Nome Provincia: {state.dettaglio.sigla_automobilistica}
                </button>
                <button type="button" className="w-full inline-flex relative items-center py-2 px-4 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                    <svg aria-hidden="true" className="mr-2 w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd"></path></svg>
                    Nome Regione: {state.dettaglio.denominazione_regione}
                </button>
            </div>
        </div>
        </>
    )
}
