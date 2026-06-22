import { fallbackData } from './fallback.js'

const state = {
  profile: { ...fallbackData.profile },
  about: { ...fallbackData.about },
  skills: { ...fallbackData.skills },
  experience: { ...fallbackData.experience },
  projects: { ...fallbackData.projects },
  education: { ...fallbackData.education },
}

const listeners = new Set()

export function getState() {
  return state
}

export function setState(section, data) {
  state[section] = data
  listeners.forEach((fn) => fn(section, data))
}

export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
