import { useMutation } from '@tanstack/react-query'
import { invoke } from '@tauri-apps/api/core'
import { toast } from 'react-toastify'
import { ToastGenerationSuccess } from '../components/toast-generation-success'
import { CVGenerationService } from '../services/cv-generation.service'

export const useGenerate = () => {
  return useMutation({
    mutationKey: ['generate'],
    mutationFn: CVGenerationService.generate,
    onSuccess: async (data, { outputFilePath }) => {
      if (data) {
        const outputList = outputFilePath.split('/')
        const fileName = outputList[outputList.length - 1]

        const renderContent = (
          <ToastGenerationSuccess
            filename={fileName}
            onOpenFinder={(e) => {
              e.stopPropagation()
              invoke('open_finder', { path: outputFilePath })
              toast.dismiss('generation-succeeded')
            }}
            onClose={(e) => {
              e.stopPropagation()
              toast.dismiss('generation-succeeded')
            }}
          />
        )

        toast.info(renderContent, {
          type: 'info',
          toastId: `generation-succeeded`,
          icon: false,
          autoClose: 30000,
          hideProgressBar: false,
          pauseOnHover: true,
          progress: undefined,
          closeButton: false,
          theme: 'light',
          className: 'group',

          onClick(e) {
            e.stopPropagation()
            invoke('open_powerpoint', { path: outputFilePath })
          }
        })

        toast.update(`generation-succeeded`, {
          render: renderContent
        })
      }
    },
    onError: (e, variables) => {
      console.error(`Generate [error]`, e)
      console.error(e)
      console.error(`Generate variables`, JSON.stringify(variables))
      alert(`Generate [error] : ${e}`)
    }
  })
}
