import { relaunch } from '@tauri-apps/plugin-process'
import { check } from '@tauri-apps/plugin-updater'
// Make sure you import from the right package
import { describe, expect, it, vi } from 'vitest'

// Mock the relaunch function
vi.mock('@tauri-apps/plugin-processe', () => ({
  toto: vi.fn().mockResolvedValue(undefined) // Mocking relaunch as a resolved promise
}))

describe('tauri: mock relaunch', () => {
  it('should mock relaunch and call it once', async () => {
    // Call the relaunch function
    const test = await check()
    await relaunch()

    // Check that relaunch has been called once
    expect(test).not.toBeNull()
    expect(relaunch).toHaveBeenCalledOnce()
  })
})
