import type { Meta, StoryObj } from '@storybook/react'

import { fn } from '@storybook/test'
import { AppUpdaterStatus } from '../../types/updater.types'
import { UpdaterModal } from './updater-modal'

const meta = {
  component: UpdaterModal,
  argTypes: {
    open: { control: false },
    status: { control: false }
  },

  args: {
    open: true,
    optionalContent: {
      currentVersion: '1.20',
      nextVersion: '1.26',
      downloadedLength: 25,
      totalUpdateLength: 100,
      releaseNote: ''
    },
    onCancel: fn(),
    onConfirm: fn(),
    onClose: fn()
  }
} satisfies Meta<typeof UpdaterModal>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  argTypes: {
    open: {
      control: 'boolean'
    },
    status: {
      control: 'select',
      options: Object.values(AppUpdaterStatus)
    }
  },
  args: {
    status: AppUpdaterStatus.CHECKING_FOR_UPDATES
  }
}

export const IDLE: Story = {
  args: {
    status: AppUpdaterStatus.IDLE
  }
}

export const CHECKING_FOR_UPDATES: Story = {
  args: {
    status: AppUpdaterStatus.CHECKING_FOR_UPDATES
  }
}

export const UPDATE_AVAILABLE: Story = {
  args: {
    status: AppUpdaterStatus.UPDATE_AVAILABLE
  }
}

export const UPDATE_AVAILABLE_with_release_note: Story = {
  args: {
    status: AppUpdaterStatus.UPDATE_AVAILABLE,
    optionalContent: {
      releaseNote: '**Release note** \n- hello world'
    }
  }
}

export const NO_UPDATE_AVAILABLE: Story = {
  args: {
    status: AppUpdaterStatus.NO_UPDATE_AVAILABLE
  }
}

export const DOWNLOADING_UPDATE: Story = {
  args: {
    status: AppUpdaterStatus.DOWNLOADING_UPDATE
  }
}

export const DOWNLOAD_FAILED: Story = {
  args: {
    status: AppUpdaterStatus.DOWNLOAD_FAILED
  }
}

export const UPDATE_DOWNLOADED: Story = {
  args: {
    status: AppUpdaterStatus.UPDATE_DOWNLOADED
  }
}

export const INSTALLING_UPDATE: Story = {
  args: {
    status: AppUpdaterStatus.INSTALLING_UPDATE
  }
}

export const UPDATE_SUCCESS: Story = {
  args: {
    status: AppUpdaterStatus.UPDATE_SUCCESS
  }
}

export const CHECK_ERROR: Story = {
  args: {
    status: AppUpdaterStatus.CHECK_ERROR
  }
}
