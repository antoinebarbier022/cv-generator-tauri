import { vi } from 'vitest'

vi.mock('@tauri-apps/plugin-process', () => ({
  relaunch: vi.fn().mockResolvedValue(undefined)
}))

vi.mock('@tauri-apps/plugin-updater', () => ({
  check: vi.fn().mockImplementation(() => ({
    check: vi.fn().mockResolvedValue({
      /* mocked check result */
    }),
    download: vi.fn().mockResolvedValue({
      /* mocked download result */
    }),
    install: vi.fn().mockResolvedValue({
      /* mocked install result */
    })
  }))
}))

vi.mock('@tauri-apps/api/app', () => ({
  getVersion: vi.fn().mockResolvedValue('1.0.0') // Valeur mockée pour getVersion
  // Ajoute d'autres fonctions si nécessaire
}))

vi.mock('@tauri-apps/api', () => ({
  invoke: vi.fn().mockImplementation((command) => {
    switch (command) {
      case 'plugin:app|version':
        return Promise.resolve('1.0.0') // Valeur mockée pour `getVersion`
      case 'plugin:app|update':
        return Promise.resolve({ version: '1.2.3' }) // Exemple de mock pour une autre commande
      // Ajoute d'autres mocks ici si nécessaire
      default:
        return Promise.reject(new Error('Command not mocked'))
    }
  })
}))
