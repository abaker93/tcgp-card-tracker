// 'use client'

// import { useState } from 'react'

export const leadingZero = (num:number, len:number) => {
	return num.toString().padStart(len, '0')
}

// export const useLocalStorage = (key:any, initialValue:any) => {
// 	const [state, setState] = useState(() => {
// 		try {
// 			const value = window.localStorage.getItem(key)
// 			return value ? JSON.parse(value) : initialValue
// 		} catch (e) {
// 			console.log(e)
// 		}
// 	})

// 	const setValue = (value:any) => {
// 		try {
// 			const valueToStore = value instanceof Function ? value(state) : value
// 			window.localStorage.setItem(key, JSON.stringify(valueToStore))
// 			setState(value)
// 		} catch (e) {
// 			console.log(e)
// 		}
// 	}

// 	return [state, setValue]
// }