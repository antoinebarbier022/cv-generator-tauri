import { fireEvent, render, screen } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, Mock, test, vi } from 'vitest'
import { AppUpdaterStatus } from '../../types/updater.types'
import { UpdaterContainer } from './updater-container'

import { UpdaterHookResponse, useUpdater } from '../../hooks/useUpdater'

vi.mock('../../hooks/useUpdater', () => ({
  useUpdater: vi.fn()
}))

describe('UpdaterContainer', () => {
  const setup = (params: Partial<UpdaterHookResponse> = {}) => {
    const mockOnClose = vi.fn()

    const initialAppUpdaterResponse: UpdaterHookResponse = {
      status: AppUpdaterStatus.IDLE,
      nextVersion: null,
      releaseNote: null,
      currentVersion: '1.0.0',
      downloadedLength: 0,
      totalUpdateLength: 0,
      downloadAndInstall: vi.fn(),
      checkForUpdates: vi.fn(),
      resetUpdater: vi.fn(),
      relaunchApplication: vi.fn()
    }

    const appUpdaterResponse: UpdaterHookResponse = {
      ...initialAppUpdaterResponse,
      ...params
    }

    ;(useUpdater as Mock).mockReturnValue(appUpdaterResponse)

    render(
      <MemoryRouter>
        <UpdaterContainer open={true} onClose={mockOnClose} />
      </MemoryRouter>
    )

    return { mockOnClose, appUpdaterResponse }
  }

  beforeEach(() =>
    (useUpdater as Mock).mockReturnValue({
      status: AppUpdaterStatus.IDLE,
      nextVersion: null,
      releaseNote: null,
      currentVersion: '1.0.0',
      downloadedLength: 0,
      totalUpdateLength: 0,
      downloadAndInstall: vi.fn(),
      checkForUpdates: vi.fn(),
      resetUpdater: vi.fn(),
      relaunchApplication: vi.fn()
    })
  )

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  describe('status IDLE', () => {
    test('no modal shown', () => {
      setup({ status: AppUpdaterStatus.IDLE })

      const updaterContainer = screen.queryByTestId('modal-', { exact: false })
      expect(updaterContainer).toBeNull()
    })
  })

  describe('status CHECKING_FOR_UPDATES', () => {
    test('fired "close" button', () => {
      const { mockOnClose, appUpdaterResponse } = setup({
        status: AppUpdaterStatus.CHECKING_FOR_UPDATES
      })

      const updaterContainer = screen.queryByTestId(
        `modal-${AppUpdaterStatus.CHECKING_FOR_UPDATES}`
      )
      expect(updaterContainer).toBeTruthy()
      const onClose = screen.queryByTestId('on-close')

      expect(onClose).not.toBeNull()
      expect(onClose).toBeTruthy()

      fireEvent.click(onClose!)

      expect(appUpdaterResponse.resetUpdater).not.toHaveBeenCalledOnce()
      expect(mockOnClose).toHaveBeenCalledOnce()
    })
  })

  describe('status NO_UPDATE_AVAILABLE', () => {
    test('renders modal with action buttons', () => {
      setup({
        status: AppUpdaterStatus.NO_UPDATE_AVAILABLE
      })

      const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.NO_UPDATE_AVAILABLE}`)
      expect(updaterContainer).toBeTruthy()

      expect(screen.queryByTestId('on-close')).not.toBeNull()
      expect(screen.queryByTestId('on-confirm')).toBeNull()
      expect(screen.queryByTestId('on-cancel')).not.toBeNull()
    })

    test('fired "close" button', () => {
      const { mockOnClose } = setup({ status: AppUpdaterStatus.NO_UPDATE_AVAILABLE })

      const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.NO_UPDATE_AVAILABLE}`)
      expect(updaterContainer).toBeTruthy()
      const onClose = screen.queryByTestId('on-close')

      expect(onClose).not.toBeNull()
      expect(onClose).toBeTruthy()

      fireEvent.click(onClose!)

      expect(mockOnClose).toHaveBeenCalledOnce()
    })

    test('fired "cancel" button', () => {
      const { mockOnClose, appUpdaterResponse } = setup({
        status: AppUpdaterStatus.NO_UPDATE_AVAILABLE
      })

      const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.NO_UPDATE_AVAILABLE}`)
      expect(updaterContainer).toBeTruthy()
      const onCancel = screen.queryByTestId('on-cancel')

      expect(onCancel).not.toBeNull()
      expect(onCancel).toBeTruthy()

      fireEvent.click(onCancel!)

      expect(appUpdaterResponse.resetUpdater).toHaveBeenCalledOnce()
      expect(mockOnClose).toHaveBeenCalledOnce()
    })
  })

  describe('status UPDATE_AVAILABLE', () => {
    test('renders modal with action buttons', () => {
      setup({
        status: AppUpdaterStatus.UPDATE_AVAILABLE
      })

      const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.UPDATE_AVAILABLE}`)
      expect(updaterContainer).toBeTruthy()

      expect(screen.queryByTestId('on-close')).not.toBeNull()
      expect(screen.queryByTestId('on-confirm')).not.toBeNull()
      expect(screen.queryByTestId('on-cancel')).not.toBeNull()
    })

    test('fired "close" button', () => {
      const { mockOnClose, appUpdaterResponse } = setup({
        status: AppUpdaterStatus.UPDATE_AVAILABLE
      })

      const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.UPDATE_AVAILABLE}`)
      expect(updaterContainer).toBeTruthy()

      const onClose = screen.queryByTestId('on-close')
      expect(onClose).not.toBeNull()
      expect(onClose).toBeTruthy()

      fireEvent.click(onClose!)

      expect(mockOnClose).toHaveBeenCalledOnce()
      expect(appUpdaterResponse.resetUpdater).not.toHaveBeenCalledOnce()
    })

    test('fired "cancel" button', () => {
      const { mockOnClose, appUpdaterResponse } = setup({
        status: AppUpdaterStatus.UPDATE_AVAILABLE
      })

      const onCancel = screen.queryByTestId('on-cancel')
      expect(onCancel).toBeTruthy()

      fireEvent.click(onCancel!)

      expect(appUpdaterResponse.resetUpdater).toHaveBeenCalledOnce()
      expect(mockOnClose).toHaveBeenCalledOnce()
    })

    test('fired "download" button', () => {
      const { appUpdaterResponse } = setup({
        status: AppUpdaterStatus.UPDATE_AVAILABLE
      })

      const onConfirm = screen.queryByTestId('on-confirm')
      expect(onConfirm).toBeTruthy()

      fireEvent.click(onConfirm!)

      expect(appUpdaterResponse.downloadAndInstall).toHaveBeenCalledOnce()
    })
  })

  describe('status DOWNLOADING_UPDATE', () => {
    test('renders modal with action buttons', () => {
      setup({
        status: AppUpdaterStatus.DOWNLOADING_UPDATE,
        nextVersion: '1.0.1',
        totalUpdateLength: 50,
        downloadedLength: 2000
      })

      const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.DOWNLOADING_UPDATE}`)
      expect(updaterContainer).toBeTruthy()

      expect(screen.queryByTestId('on-close')).toBeNull()
      expect(screen.queryByTestId('on-confirm')).toBeNull()
      expect(screen.queryByTestId('on-cancel')).not.toBeNull()
    })

    test('fired "hide" button', () => {
      const { mockOnClose, appUpdaterResponse } = setup({
        status: AppUpdaterStatus.DOWNLOADING_UPDATE,
        nextVersion: '1.0.1',
        totalUpdateLength: 50,
        downloadedLength: 2000
      })

      const onCancel = screen.getByTestId('on-cancel')
      expect(onCancel).toBeTruthy()

      fireEvent.click(onCancel!)
      expect(mockOnClose).toHaveBeenCalledOnce()
      expect(appUpdaterResponse.resetUpdater).not.toHaveBeenCalled()
    })
  })

  describe('status UPDATE_DOWNLOADED', () => {
    test('renders modal with action buttons', () => {
      setup({
        status: AppUpdaterStatus.UPDATE_DOWNLOADED,
        nextVersion: '1.0.1',
        totalUpdateLength: 2000,
        downloadedLength: 2000
      })

      const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.UPDATE_DOWNLOADED}`)
      expect(updaterContainer).toBeTruthy()

      expect(screen.queryByTestId('on-close')).not.toBeNull()
      expect(screen.queryByTestId('on-confirm')).not.toBeNull()
      expect(screen.queryByTestId('on-cancel')).not.toBeNull()
    })

    test('fired "relaunch app" button', () => {
      const { appUpdaterResponse } = setup({
        status: AppUpdaterStatus.UPDATE_DOWNLOADED,
        nextVersion: '1.0.1',
        totalUpdateLength: 2000,
        downloadedLength: 2000
      })

      const onConfirm = screen.queryByTestId('on-confirm')
      expect(onConfirm).toBeTruthy()

      fireEvent.click(onConfirm!)
      expect(appUpdaterResponse.relaunchApplication).toHaveBeenCalledOnce()
      expect(appUpdaterResponse.resetUpdater).not.toHaveBeenCalled()
    })

    test('fired "close" button', () => {
      const { mockOnClose, appUpdaterResponse } = setup({
        status: AppUpdaterStatus.UPDATE_DOWNLOADED,
        nextVersion: '1.0.1',
        totalUpdateLength: 2000,
        downloadedLength: 2000
      })

      const onClose = screen.queryByTestId('on-close')
      expect(onClose).toBeTruthy()

      fireEvent.click(onClose!)
      expect(mockOnClose).toHaveBeenCalledOnce()
      expect(appUpdaterResponse.resetUpdater).not.toHaveBeenCalled()
    })

    test('fired "restart later" button', () => {
      const { mockOnClose, appUpdaterResponse } = setup({
        status: AppUpdaterStatus.UPDATE_DOWNLOADED,
        nextVersion: '1.0.1',
        totalUpdateLength: 2000,
        downloadedLength: 2000
      })

      const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.UPDATE_DOWNLOADED}`)
      expect(updaterContainer).toBeTruthy()
      const onCancel = screen.queryByTestId('on-cancel')

      expect(onCancel).not.toBeNull()
      expect(onCancel).toBeTruthy()

      fireEvent.click(onCancel!)
      expect(mockOnClose).toHaveBeenCalledOnce()
      expect(appUpdaterResponse.resetUpdater).not.toHaveBeenCalled()
    })
  })

  describe('status DOWNLOAD_FAILED', () => {
    test('renders modal with action buttons', () => {
      setup({
        status: AppUpdaterStatus.DOWNLOAD_FAILED
      })

      const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.DOWNLOAD_FAILED}`)
      expect(updaterContainer).toBeTruthy()

      expect(screen.queryByTestId('on-close')).toBeNull()
      expect(screen.queryByTestId('on-confirm')).not.toBeNull()
      expect(screen.queryByTestId('on-cancel')).not.toBeNull()
    })

    test('fired "retry" button', () => {
      const { appUpdaterResponse } = setup({
        status: AppUpdaterStatus.DOWNLOAD_FAILED
      })

      const onConfirm = screen.queryByTestId('on-confirm')
      expect(onConfirm).toBeTruthy()

      fireEvent.click(onConfirm!)

      expect(appUpdaterResponse.downloadAndInstall).toHaveBeenCalledOnce()
    })

    test('fired "cancel" button', () => {
      const { mockOnClose, appUpdaterResponse } = setup({
        status: AppUpdaterStatus.DOWNLOAD_FAILED
      })

      const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.DOWNLOAD_FAILED}`)
      expect(updaterContainer).toBeTruthy()
      const onCancel = screen.queryByTestId('on-cancel')

      expect(onCancel).not.toBeNull()
      expect(onCancel).toBeTruthy()

      fireEvent.click(onCancel!)

      expect(appUpdaterResponse.resetUpdater).toHaveBeenCalledOnce()
      expect(mockOnClose).toHaveBeenCalledOnce()
    })
  })

  describe('status CHECK_ERROR', () => {
    test('renders modal with action buttons', () => {
      setup({
        status: AppUpdaterStatus.CHECK_ERROR
      })

      const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.CHECK_ERROR}`)
      expect(updaterContainer).toBeTruthy()

      expect(screen.queryByTestId('on-close')).toBeNull()
      expect(screen.queryByTestId('on-confirm')).not.toBeNull()
      expect(screen.queryByTestId('on-cancel')).not.toBeNull()
    })

    test('fired "retry" button', () => {
      const { appUpdaterResponse } = setup({
        status: AppUpdaterStatus.CHECK_ERROR
      })

      const onConfirm = screen.queryByTestId('on-confirm')
      expect(onConfirm).toBeTruthy()

      fireEvent.click(onConfirm!)

      expect(appUpdaterResponse.checkForUpdates).toHaveBeenCalledOnce()
    })

    test('fired "cancel" button', () => {
      const { mockOnClose, appUpdaterResponse } = setup({
        status: AppUpdaterStatus.CHECK_ERROR
      })

      const onCancel = screen.queryByTestId('on-cancel')
      expect(onCancel).toBeTruthy()

      fireEvent.click(onCancel!)

      expect(appUpdaterResponse.resetUpdater).toHaveBeenCalledOnce()
      expect(mockOnClose).toHaveBeenCalledOnce()
    })
  })
})
