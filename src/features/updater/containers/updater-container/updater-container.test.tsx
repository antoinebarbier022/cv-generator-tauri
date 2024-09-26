import { render, screen } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { AppUpdaterStatus } from '../../types/updater.types'
import { UpdaterContainer } from './updater-container'

import { afterEach } from 'node:test'
import * as useProductsHooks from '../../hooks/useAppUpdater'

describe('UpdaterContainer', () => {
  const useAppUpdaterSpy = vi.spyOn(useProductsHooks, 'useAppUpdater')

  const initialAppUpdaterResponse = {
    status: AppUpdaterStatus.CHECK_ERROR,
    update: null,
    autoCheckActive: true,
    lastCheck: null,
    currentVersion: '1.0.0',
    downloadedLength: 0,
    totalUpdateLength: 0,
    downloadAndInstall: vi.fn(),
    checkForUpdates: vi.fn(),
    cancelUpdater: vi.fn(),
    relaunch: vi.fn(),
    setAutoCheckActive: vi.fn()
  }

  beforeEach(() => useAppUpdaterSpy.mockReturnValue(initialAppUpdaterResponse))
  afterEach(() => vi.clearAllMocks())
  test('status IDLE: no modal shown', () => {
    const mockOnClose = vi.fn()

    render(
      <MemoryRouter>
        <UpdaterContainer open={true} onClose={mockOnClose} />
      </MemoryRouter>
    )

    const updaterContainer = screen.getByTestId(/'modal-'/i)
    expect(updaterContainer).not.toBeNull()
    expect(updaterContainer).toBeTruthy()
  })
})
