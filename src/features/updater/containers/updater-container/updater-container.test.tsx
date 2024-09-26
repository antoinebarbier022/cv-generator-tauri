import { fireEvent, render, screen } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { AppUpdaterStatus } from '../../types/updater.types'
import { UpdaterContainer } from './updater-container'

import { afterEach } from 'node:test'
import * as useProductsHooks from '../../hooks/useUpdater'

describe('UpdaterContainer', () => {
  const useAppUpdaterSpy = vi.spyOn(useProductsHooks, 'useUpdater')

  const setup = (params: Partial<useProductsHooks.UpdaterHookResponse> = {}) => {
    const mockOnClose = vi.fn()

    const initialAppUpdaterResponse: useProductsHooks.UpdaterHookResponse = {
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

    const appUpdaterResponse = {
      ...initialAppUpdaterResponse,
      ...params
    }
    useAppUpdaterSpy.mockReturnValue(appUpdaterResponse)

    render(
      <MemoryRouter>
        <UpdaterContainer open={true} onClose={mockOnClose} />
      </MemoryRouter>
    )

    return { mockOnClose, appUpdaterResponse }
  }

  beforeEach(() =>
    useAppUpdaterSpy.mockReturnValue({
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

  test('status IDLE: no modal shown', () => {
    setup({ status: AppUpdaterStatus.IDLE })

    const updaterContainer = screen.queryByTestId('modal-', { exact: false })
    expect(updaterContainer).toBeNull()
  })

  test('status CHECKING_FOR_UPDATES: fired close button', () => {
    const { mockOnClose } = setup({ status: AppUpdaterStatus.CHECKING_FOR_UPDATES })

    const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.CHECKING_FOR_UPDATES}`)
    expect(updaterContainer).toBeTruthy()
    const onClose = screen.queryByTestId('on-close')

    expect(onClose).not.toBeNull()
    expect(onClose).toBeTruthy()

    fireEvent.click(onClose!)

    expect(mockOnClose).toHaveBeenCalledOnce()
  })

  test('status NO_UPDATE_AVAILABLE: fired close button', () => {
    const { mockOnClose } = setup({ status: AppUpdaterStatus.NO_UPDATE_AVAILABLE })

    const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.NO_UPDATE_AVAILABLE}`)
    expect(updaterContainer).toBeTruthy()
    const onClose = screen.queryByTestId('on-close')

    expect(onClose).not.toBeNull()
    expect(onClose).toBeTruthy()

    fireEvent.click(onClose!)

    expect(mockOnClose).toHaveBeenCalledOnce()
  })

  test('status NO_UPDATE_AVAILABLE: fired cancel button', () => {
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

  test('status UPDATE_AVAILABLE: fired close button', () => {
    const { mockOnClose } = setup({ status: AppUpdaterStatus.UPDATE_AVAILABLE })

    const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.UPDATE_AVAILABLE}`)
    expect(updaterContainer).toBeTruthy()

    const onClose = screen.queryByTestId('on-close')
    expect(onClose).not.toBeNull()
    expect(onClose).toBeTruthy()

    fireEvent.click(onClose!)

    expect(mockOnClose).toHaveBeenCalledOnce()
  })

  test('status UPDATE_AVAILABLE: fired cancel button', () => {
    const { mockOnClose, appUpdaterResponse } = setup({
      status: AppUpdaterStatus.UPDATE_AVAILABLE
    })

    const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.UPDATE_AVAILABLE}`)
    expect(updaterContainer).toBeTruthy()
    const onCancel = screen.queryByTestId('on-cancel')

    expect(onCancel).not.toBeNull()
    expect(onCancel).toBeTruthy()

    fireEvent.click(onCancel!)

    expect(appUpdaterResponse.resetUpdater).toHaveBeenCalledOnce()
    expect(mockOnClose).toHaveBeenCalledOnce()
  })

  test('status UPDATE_AVAILABLE: fired download button', () => {
    const { mockOnClose, appUpdaterResponse } = setup({
      status: AppUpdaterStatus.UPDATE_AVAILABLE
    })

    const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.UPDATE_AVAILABLE}`)
    expect(updaterContainer).toBeTruthy()
    const onConfirm = screen.queryByTestId('on-confirm')

    expect(onConfirm).not.toBeNull()
    expect(onConfirm).toBeTruthy()

    fireEvent.click(onConfirm!)

    expect(appUpdaterResponse.resetUpdater).toHaveBeenCalledOnce()
    expect(mockOnClose).toHaveBeenCalledOnce()
  })

  test('status UPDATE_DOWNLOADED: fired "relaunch app" button', () => {
    const { mockOnClose, appUpdaterResponse } = setup({
      status: AppUpdaterStatus.UPDATE_DOWNLOADED,
      nextVersion: '1.0.1',
      totalUpdateLength: 2000,
      downloadedLength: 2000
    })

    const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.UPDATE_DOWNLOADED}`)
    expect(updaterContainer).toBeTruthy()
    const onConfirm = screen.queryByTestId('on-confirm')

    expect(onConfirm).not.toBeNull()
    expect(onConfirm).toBeTruthy()

    fireEvent.click(onConfirm!)

    expect(appUpdaterResponse.relaunchApplication).toHaveBeenCalledOnce()
    expect(mockOnClose).toHaveBeenCalledOnce()
  })

  test('status UPDATE_DOWNLOADED: fired close button', () => {
    const { mockOnClose } = setup({
      status: AppUpdaterStatus.UPDATE_DOWNLOADED,
      nextVersion: '1.0.1',
      totalUpdateLength: 2000,
      downloadedLength: 2000
    })

    const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.UPDATE_DOWNLOADED}`)
    expect(updaterContainer).toBeTruthy()
    const onClose = screen.queryByTestId('on-close')

    expect(onClose).not.toBeNull()
    expect(onClose).toBeTruthy()

    fireEvent.click(onClose!)
    expect(mockOnClose).toHaveBeenCalledOnce()
  })

  test('status UPDATE_DOWNLOADED: fired "restart later" button', () => {
    const { mockOnClose } = setup({
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
  })

  test('status DOWNLOAD_FAILED: fired retry button', () => {
    const { mockOnClose, appUpdaterResponse } = setup({
      status: AppUpdaterStatus.DOWNLOAD_FAILED
    })

    const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.DOWNLOAD_FAILED}`)
    expect(updaterContainer).toBeTruthy()
    const onConfirm = screen.queryByTestId('on-confirm')

    expect(onConfirm).not.toBeNull()
    expect(onConfirm).toBeTruthy()

    fireEvent.click(onConfirm!)

    expect(appUpdaterResponse.downloadAndInstall).toHaveBeenCalledOnce()
    expect(mockOnClose).toHaveBeenCalledOnce()
  })

  test('status DOWNLOAD_FAILED: fired cancel button', () => {
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

  test('status CHECK_ERROR: fired retry button', () => {
    const { appUpdaterResponse } = setup({
      status: AppUpdaterStatus.CHECK_ERROR
    })

    const updaterContainer = screen.queryByTestId(`modal-${AppUpdaterStatus.CHECK_ERROR}`)
    expect(updaterContainer).toBeTruthy()
    const onConfirm = screen.queryByTestId('on-confirm')

    expect(onConfirm).not.toBeNull()
    expect(onConfirm).toBeTruthy()

    fireEvent.click(onConfirm!)

    expect(appUpdaterResponse.checkForUpdates).toHaveBeenCalledOnce()
  })
})
