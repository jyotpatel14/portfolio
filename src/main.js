import './styles/main.css'

import { db } from './firebase.js'
import { collection, getDocs } from 'firebase/firestore'
import { getState, setState } from './store.js'
import { renderHeader } from './screens/Header.js'
import { renderHero, updateHero } from './screens/Hero.js'
import { renderAbout, updateAbout } from './screens/About.js'
import { renderSkills, updateSkills } from './screens/Skills.js'
import { renderExperience, updateExperience } from './screens/Experience.js'
import { renderProjects, updateProjects } from './screens/Projects.js'
import { renderEducation, updateEducation } from './screens/Education.js'
import { renderContact, updateContact } from './screens/Contact.js'
import { renderFooter } from './screens/Footer.js'

function render() {
  const main = document.querySelector('main') || document.createElement('main')
  main.innerHTML = ''

  main.append(renderHero())
  main.append(renderAbout())
  main.append(renderSkills())
  main.append(renderExperience())
  main.append(renderProjects())
  main.append(renderEducation())
  main.append(renderContact())

  document.body.append(main)
  document.body.append(renderFooter())
}

function updateAll(data) {
  if (data.profile) {
    updateHero(data.profile)
    updateContact(data.profile)
  }
  if (data.about) updateAbout(data.about)
  if (data.skills) updateSkills(data.skills)
  if (data.experience) updateExperience(data.experience)
  if (data.projects) updateProjects(data.projects)
  if (data.education) updateEducation(data.education)
}

async function fetchData() {
  const collectionName = import.meta.env.VITE_FIRESTORE_COLLECTION || 'portfolio'

  try {
    const snapshot = await getDocs(collection(db, collectionName))
    const data = {}

    snapshot.forEach((doc) => {
      if (doc.id !== 'meta') {
        data[doc.id] = doc.data()
      }
    })

    const sections = ['profile', 'about', 'skills', 'experience', 'projects', 'education']
    sections.forEach((key) => {
      if (data[key]) {
        setState(key, data[key])
      }
    })

    updateAll(data)
  } catch (error) {
    console.warn('Firestore fetch failed, using fallback data:', error)
  }
}

function init() {
  renderHeader()
  render()
  fetchData()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
