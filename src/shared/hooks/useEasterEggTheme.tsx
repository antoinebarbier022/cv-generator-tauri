import { Translation } from '@/core/storage/types/storage'
import { SectionFieldName } from '@/features/section/sections.types'
import { useFormStore } from '@/shared/stores/useFormStore'
import { UUID } from 'crypto'
import { AppTheme, useAppTheme } from './useAppTheme'

type EasterEggSectionTarget = Exclude<SectionFieldName, 'experiences'>

export const useEasterEggTheme = () => {
  const { appTheme, setAppTheme, setOverrideAppTheme } = useAppTheme()
  const { formValues } = useFormStore()

  const revertTheme = ({ targetTheme }: { targetTheme: AppTheme }) => {
    if (appTheme === targetTheme) {
      setAppTheme(AppTheme.FROG)
      console.debug('Default theme applied. ')
    } else {
      console.debug(`🔄 Reverted to previous theme '${appTheme}'`)
    }
    setOverrideAppTheme(null)
    console.debug(`🎉 Exiting Easter Egg mode for '${targetTheme}' theme.`)
  }

  const remove = ({
    secretWord,
    currentSectionKey,
    targetSectionKey,
    itemId,
    targetTheme
  }: {
    currentSectionKey: EasterEggSectionTarget
    targetSectionKey: EasterEggSectionTarget
    secretWord: string
    itemId: string | UUID
    targetTheme: AppTheme
  }) => {
    const secretWordItemId = formValues[targetSectionKey].find(
      (el) =>
        el.content.en.toLocaleLowerCase() === secretWord ||
        el.content.fr.toLocaleLowerCase() === secretWord
    )?.id

    if (currentSectionKey === targetSectionKey && secretWordItemId && secretWordItemId === itemId) {
      revertTheme({ targetTheme })
    }
  }

  const checkAndApplyTo = ({
    currentSectionKey,
    targetSectionKey,
    targetTheme,
    currentContent,
    secretWord
  }: {
    currentSectionKey: EasterEggSectionTarget
    targetSectionKey: EasterEggSectionTarget
    secretWord: string
    targetTheme: AppTheme
    currentContent: Translation
  }) => {
    /** Easter Egg -> One Piece Theme */
    const secretWordItemId = formValues[targetSectionKey].findIndex(
      (el) =>
        el.content.en.toLocaleLowerCase() === secretWord ||
        el.content.fr.toLocaleLowerCase() === secretWord
    )
    const newContentHasTheSecretWord =
      currentContent.en.toLocaleLowerCase() === secretWord ||
      currentContent.fr.toLocaleLowerCase() === secretWord

    if (secretWordItemId !== -1) {
      if (newContentHasTheSecretWord && targetSectionKey === currentSectionKey) {
        console.debug(`🎉 Entered Easter Egg mode for '${targetTheme}' theme.`)
        setOverrideAppTheme(targetTheme)
        console.debug(`Theme changed to '${targetTheme}' theme`)
      }
    } else {
      revertTheme({ targetTheme })
    }
  }
  return {
    checkAndApplyTo,
    remove
  }
}
